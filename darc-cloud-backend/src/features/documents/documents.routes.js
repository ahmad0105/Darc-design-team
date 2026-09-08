import { Hono } from 'hono';
import { getDB } from '../../core/db.js';
import {
  uploadToGoogleDrive,
  deleteFromGoogleDrive,
  createResumableSession,
  finalizeGoogleDrivePermissions,
  resolveTargetFolder
} from '../../core/gdrive.js';
import { hasPermission, isProjectVisible } from '../../utils/permissions.js';
import { toCamelCase } from '../../utils/transformers.js';

const app = new Hono();

app.use('*', async (c, next) => {
  c.set('supabase', getDB(c.env));
  await next();
});

// GET /api/documents/:id -> Redirect to view
app.get('/:id', async (c) => {
  const docId = c.req.param('id');
  const userId = c.get('userId');
  const roleId = c.get('roleId');
  const supabase = c.get('supabase');
  const { data: doc } = await supabase.from('documents').select('*').eq('id', docId).is('deleted_at', null).single();
  if (!doc) return c.text('المستند غير موجود', 404);

  if (doc.project_id && !(await isProjectVisible(supabase, userId, roleId, doc.project_id))) {
    return c.text('غير مصرح لك بعرض هذا المستند', 403);
  }
  
  if (doc.disk_filename && doc.disk_filename.startsWith('http')) {
    return c.redirect(doc.disk_filename);
  }
  return c.json({ ok: true, document: doc });
});

// POST /api/documents/session -> Create Direct Resumable Upload Session for Google Drive
app.post('/session', async (c) => {
  const body = await c.req.json();
  const { compiledName, mimeType, projectId, taskId, size } = body;
  const userId = c.get('userId');
  const roleId = c.get('roleId');
  const supabase = c.get('supabase');

  if (projectId && !(await hasPermission(supabase, userId, roleId, 'edit_tasks', projectId))) {
    return c.json({ error: 'غير مصرح لك برفع مستندات لهذا المشروع' }, 403);
  }

  const origin = c.req.header('origin') || 'http://127.0.0.1:8787';

  try {
    const targetFolderId = await resolveTargetFolder(c.env, supabase, { projectId, taskId });

    const sessionUrl = await createResumableSession(
      c.env,
      compiledName || 'document',
      mimeType || 'application/octet-stream',
      origin,
      size,
      targetFolderId
    );
    return c.json({ sessionUrl, folderId: targetFolderId });
  } catch (error) {
    return c.json({ error: 'فشل بدء جلسة الرفع: ' + error.message }, 500);
  }
});

// POST /api/documents/finalize -> Finalize Google Drive permissions and save metadata
app.post('/finalize', async (c) => {
  const body = await c.req.json();
  const { driveFileId, projectId, taskId, compiledName, mimeType, size } = body;
  const userId = c.get('userId');
  const roleId = c.get('roleId');
  const supabase = c.get('supabase');

  if (!driveFileId) return c.json({ error: 'معرف الملف مفقود' }, 400);

  if (projectId && !(await hasPermission(supabase, userId, roleId, 'edit_tasks', projectId))) {
    return c.json({ error: 'غير مصرح لك برفع مستندات لهذا المشروع' }, 403);
  }

  try {
    const driveResult = await finalizeGoogleDrivePermissions(c.env, driveFileId);
    const docId = 'doc_' + Math.random().toString(36).substr(2, 9);

    const docData = {
      id: docId,
      project_id: projectId || null,
      task_id: taskId || null,
      uploader_id: userId,
      original_name: compiledName || 'document',
      disk_filename: driveResult.webViewLink,
      mime_type: mimeType || 'application/octet-stream',
      size: size || 0,
      status: ['draft', 'review', 'approved', 'superseded'].includes(body.status) ? body.status : 'draft'
    };

    const { data, error } = await supabase.from('documents').insert([docData]).select().single();
    if (error) throw error;

    supabase.from('audit_logs').insert([{
      user_id: userId,
      action: 'create',
      entity_type: 'document',
      entity_id: docId,
      details: { name: docData.original_name, link: driveResult.webViewLink }
    }]).then().catch(() => {});

    return c.json({ ok: true, document: toCamelCase(data) });
  } catch (err) {
    console.error('[Documents] Finalize Error:', err);
    return c.json({ error: 'فشل حفظ بيانات الملف: ' + err.message }, 500);
  }
});

// PUT /api/documents/chunk -> Upload a Chunk and on finish save to DB
app.put('/chunk', async (c) => {
  const sessionUrl = c.req.header('x-session-url');
  const contentRange = c.req.header('content-range');
  if (!sessionUrl) return c.json({ error: 'Missing x-session-url' }, 400);

  // Security check: Prevent Server-Side Request Forgery (SSRF)
  if (!sessionUrl.startsWith('https://www.googleapis.com/upload/drive/')) {
    return c.json({ error: 'Invalid session URL' }, 403);
  }

  const chunk = await c.req.arrayBuffer();

  const res = await fetch(sessionUrl, {
    method: 'PUT',
    headers: {
      'Content-Length': chunk.byteLength.toString(),
      ...(contentRange ? { 'Content-Range': contentRange } : {})
    },
    body: chunk
  });

  if (res.status === 308) {
    // Resume Incomplete - Chunk uploaded successfully, but file is not yet complete
    const rangeHeader = res.headers.get('Range');
    const respHeaders = rangeHeader ? { 'Range': rangeHeader } : {};
    return c.text('Incomplete', 308, respHeaders);
  }

  if (res.ok) {
    // File upload completed!
    const driveData = await res.json();
    
    // Now finalize permissions and save to Supabase
    try {
      const rawMeta = c.req.header('x-doc-meta') || '{}';
      let docMeta = {};
      try {
        docMeta = JSON.parse(rawMeta.includes('%') ? decodeURIComponent(rawMeta) : rawMeta);
      } catch (parseErr) {
        docMeta = JSON.parse(rawMeta);
      }

      const userId = c.get('userId');
      const roleId = c.get('roleId');
      const supabase = c.get('supabase');

      if (docMeta.projectId && !(await hasPermission(supabase, userId, roleId, 'edit_tasks', docMeta.projectId))) {
        return c.json({ error: 'غير مصرح لك برفع مستندات لهذا المشروع' }, 403);
      }

      const driveResult = await finalizeGoogleDrivePermissions(c.env, driveData.id);
      const docId = 'doc_' + Math.random().toString(36).substr(2, 9);

      const docData = {
        id: docId,
        project_id: docMeta.projectId || null,
        task_id: docMeta.taskId || null,
        uploader_id: userId,
        original_name: docMeta.compiledName || driveData.name,
        disk_filename: driveResult.webViewLink,
        mime_type: docMeta.mimeType || 'application/octet-stream',
        size: docMeta.size || 0,
        status: ['draft', 'review', 'approved', 'superseded'].includes(docMeta.status) ? docMeta.status : 'draft'
      };

      const { data, error } = await supabase.from('documents').insert([docData]).select().single();
      if (error) throw error;

      supabase.from('audit_logs').insert([{
        user_id: userId, action: 'create', entity_type: 'document', entity_id: docId, details: { name: docData.original_name, link: driveResult.webViewLink }
      }]).then().catch(()=>{});

      return c.json({ ok: true, document: toCamelCase(data) });
    } catch (err) {
      console.error("[Documents] Finalize Error:", err);
      return c.json({ error: 'فشل حفظ بيانات الملف' }, 500);
    }
  }

  const errData = await res.text();
  console.error("Chunk Error:", res.status, errData);
  return c.json({ error: 'فشل رفع الجزء: ' + res.status }, res.status);
});


// POST /api/documents -> Upload file to GDrive with Smart Naming (Legacy Fallback)
app.post('/', async (c) => {
  const userId = c.get('userId');
  const roleId = c.get('roleId');
  const supabase = c.get('supabase');
  
  const body = await c.req.parseBody();
  const file = body['file'];
  const projectId = body['projectId'];
  const taskId = body['taskId'];
  const compiledName = body['compiledName'] || file?.name || 'document';
  
  if (!file) return c.json({ error: 'لم يتم إرفاق ملف' }, 400);

  if (projectId && !(await hasPermission(supabase, userId, roleId, 'edit_tasks', projectId))) {
    return c.json({ error: 'غير مصرح لك برفع مستندات لهذا المشروع' }, 403);
  }

  try {
    const arrayBuffer = await file.arrayBuffer();
    const targetFolderId = await resolveTargetFolder(c.env, supabase, { projectId, taskId });
    const driveResult = await uploadToGoogleDrive(c.env, arrayBuffer, compiledName, file.type, targetFolderId);
    
    const docId = 'doc_' + Math.random().toString(36).substr(2, 9);
    const docData = {
      id: docId,
      project_id: projectId || null,
      task_id: taskId || null,
      uploader_id: userId,
      original_name: compiledName,
      disk_filename: driveResult.webViewLink,
      mime_type: file.type,
      size: file.size,
      status: ['draft', 'review', 'approved', 'superseded'].includes(body.status) ? body.status : 'draft'
    };
    
    const { data, error } = await supabase.from('documents').insert([docData]).select().single();
    if (error) throw error;
    
    supabase.from('audit_logs').insert([{
      user_id: userId, action: 'create', entity_type: 'document', entity_id: docId, details: { name: compiledName, link: driveResult.webViewLink }
    }]).then().catch(()=>{});

    return c.json({ ok: true, document: toCamelCase(data) }, 201);
  } catch (error) {
    console.error("[Documents] Upload Error:", error);
    return c.json({ error: 'فشل رفع الملف: ' + error.message }, 500);
  }
});

// PATCH /api/documents/:id -> Rename Document
app.patch('/:id', async (c) => {
  const docId = c.req.param('id');
  const body = await c.req.json();
  const supabase = c.get('supabase');
  const userId = c.get('userId');
  const roleId = c.get('roleId');

  const { data: doc } = await supabase.from('documents').select('project_id, uploader_id').eq('id', docId).single();
  if (!doc) return c.json({ error: 'المستند غير موجود' }, 404);
  
  if (doc.uploader_id !== userId && !(await hasPermission(supabase, userId, roleId, 'edit_tasks', doc.project_id))) {
    return c.json({ error: 'غير مصرح لك بتعديل هذا الملف' }, 403);
  }
  
  const updates = {};
  if (body.originalName) updates.original_name = body.originalName;
  if (body.status) updates.status = body.status;
  
  const { data, error } = await supabase.from('documents').update(updates).eq('id', docId).select().single();
  if (error) throw error;
  
  return c.json({ ok: true, document: toCamelCase(data) });
});

// DELETE /api/documents/:id -> Soft delete DB, Hard delete GDrive
app.delete('/:id', async (c) => {
  const docId = c.req.param('id');
  const supabase = c.get('supabase');
  const userId = c.get('userId');
  const roleId = c.get('roleId');
  
  const { data: doc } = await supabase.from('documents').select('*').eq('id', docId).single();
  if (!doc) return c.json({ error: 'المستند غير موجود' }, 404);

  if (doc.uploader_id !== userId && !(await hasPermission(supabase, userId, roleId, 'edit_tasks', doc.project_id))) {
    return c.json({ error: 'غير مصرح لك بحذف هذا الملف' }, 403);
  }

  const { error } = await supabase.from('documents').update({ deleted_at: new Date().toISOString() }).eq('id', docId);
  if (error) throw error;

  if (doc.disk_filename && doc.disk_filename.includes('drive.google.com')) {
    const match = doc.disk_filename.match(/\/d\/([a-zA-Z0-9_-]+)/);
    if (match && match[1]) {
      deleteFromGoogleDrive(c.env, match[1]).catch(e => console.error(e));
    }
  }

  return c.json({ ok: true });
});

export default app;
