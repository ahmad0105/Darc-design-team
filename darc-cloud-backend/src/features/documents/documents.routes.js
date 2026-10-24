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
import { generateSecureId } from '../../core/security.js';
import { invalidateBootstrapCache } from '../../core/cache.js';

const DANGEROUS_EXTENSIONS = new Set([
  'exe', 'bat', 'cmd', 'sh', 'bash', 'ps1', 'vbs', 'js', 'mjs', 'cjs',
  'py', 'php', 'phtml', 'php3', 'php4', 'php5', 'phps', 'html', 'htm',
  'xhtml', 'jar', 'msi', 'dll', 'com', 'scr', 'hta', 'svg', 'apk', 'app',
  'deb', 'rpm', 'vbe', 'wsf', 'wsh', 'jsp', 'asp', 'aspx', 'cgi', 'pl',
  'elf', 'bin', 'reg', 'gadget'
]);

export function isDangerousFile(filename, mimeType = '') {
  if (!filename || typeof filename !== 'string') return true;
  const trimmed = filename.trim();

  // 1. Block Unicode BiDi / RTLO override attacks & control characters
  if (/[\u202A-\u202E\u2066-\u2069\x00-\x1f\x7f-\x9f]/.test(trimmed)) return true;

  // 2. Block Directory Traversal & separators
  if (trimmed.includes('..') || trimmed.includes('/') || trimmed.includes('\\')) return true;

  // 3. Block Hidden system files (.env, .htaccess, .git, etc.)
  if (trimmed.startsWith('.')) return true;

  // 4. Check all extensions (prevent double-extension bypass e.g. plan.dwg.exe or test.php.pdf)
  const parts = trimmed.toLowerCase().split('.');
  if (parts.length >= 2) {
    for (const part of parts.slice(1)) {
      if (DANGEROUS_EXTENSIONS.has(part.trim())) return true;
    }
  }

  // 5. Block dangerous executable and scripting MIME types
  const lowMime = (mimeType || '').toLowerCase();
  if (
    lowMime.includes('javascript') ||
    lowMime.includes('html') ||
    lowMime.includes('svg+xml') ||
    lowMime.includes('x-msdownload') ||
    lowMime.includes('x-sh') ||
    lowMime.includes('x-php') ||
    lowMime.includes('x-executable') ||
    lowMime.includes('application/x-bat') ||
    lowMime.includes('application/x-msdos-program')
  ) {
    return true;
  }
  return false;
}

/**
 * Checks if a user is authorized to upload documents / drawings
 */
async function canUserUpload(supabase, userId, roleId, projectId = null) {
  if (roleId === 'admin') return true;
  if (projectId) {
    return (
      (await hasPermission(supabase, userId, roleId, 'edit_tasks', projectId)) ||
      (await hasPermission(supabase, userId, roleId, 'upload_documents', projectId))
    );
  }
  return roleId === 'team_lead' || roleId === 'member';
}

/**
 * Checks if a user is authorized to approve engineering drawings
 */
async function canUserApprove(supabase, userId, roleId, projectId = null) {
  if (roleId === 'admin' || roleId === 'team_lead') return true;
  if (projectId) {
    return (
      (await hasPermission(supabase, userId, roleId, 'manage_tasks', projectId)) ||
      (await hasPermission(supabase, userId, roleId, 'approve_tasks', projectId))
    );
  }
  return false;
}

/**
 * Automatically marks prior approved versions of the same drawing as 'superseded'
 */
async function autoSupersedePriorVersions(supabase, projectId, docId, filename) {
  if (!projectId || !filename) return;
  // Extract root drawing name without version (e.g. "ARCH-FL-01_v2.dwg" -> "ARCH-FL-01")
  const basePrefix = filename.replace(/(_v\d+)?\.[^.]+$/i, '').trim();
  if (!basePrefix || basePrefix.length < 3) return;

  try {
    await supabase.from('documents')
      .update({ status: 'superseded', updated_at: new Date().toISOString() })
      .eq('project_id', projectId)
      .eq('status', 'approved')
      .neq('id', docId)
      .ilike('original_name', `${basePrefix}%`);
  } catch (err) {
    console.warn('[Documents] Auto-supersede warning:', err.message);
  }
}

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
    try {
      const u = new URL(doc.disk_filename);
      if (u.hostname.endsWith('google.com') || u.hostname.endsWith('googleusercontent.com')) {
        return c.redirect(doc.disk_filename);
      }
    } catch (e) {}
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

  if (!(await canUserUpload(supabase, userId, roleId, projectId))) {
    return c.json({ error: 'غير مصرح لك برفع مستندات لهذا المشروع' }, 403);
  }

  if (isDangerousFile(compiledName, mimeType)) {
    return c.json({ error: 'صيغة الملف غير مسموح برفعها لأسباب أمنية.' }, 400);
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

  if (!(await canUserUpload(supabase, userId, roleId, projectId))) {
    return c.json({ error: 'غير مصرح لك برفع مستندات لهذا المشروع' }, 403);
  }

  if (isDangerousFile(compiledName, mimeType)) {
    return c.json({ error: 'صيغة الملف غير مسموح برفعها لأسباب أمنية.' }, 400);
  }

  try {
    let finalStatus = ['draft', 'review', 'approved', 'superseded'].includes(body.status) ? body.status : 'draft';
    if (finalStatus === 'approved') {
      const authorized = await canUserApprove(supabase, userId, roleId, projectId);
      if (!authorized) {
        finalStatus = 'review';
      }
    }

    const driveResult = await finalizeGoogleDrivePermissions(c.env, driveFileId);
    const docId = generateSecureId('doc_');
    const verifiedSize = driveResult.size || size || 0;

    const docData = {
      id: docId,
      project_id: projectId || null,
      task_id: taskId || null,
      uploader_id: userId,
      original_name: compiledName || 'document',
      disk_filename: driveResult.webViewLink,
      mime_type: mimeType || 'application/octet-stream',
      size: verifiedSize,
      status: finalStatus
    };

    const { data, error } = await supabase.from('documents').insert([docData]).select().single();
    if (error) throw error;

    if (finalStatus === 'approved' && projectId) {
      await autoSupersedePriorVersions(supabase, projectId, docId, docData.original_name);
    }

    supabase.from('audit_logs').insert([{
      user_id: userId,
      action: 'create',
      entity_type: 'document',
      entity_id: docId,
      details: {
        name: docData.original_name,
        link: driveResult.webViewLink,
        size: verifiedSize,
        md5: driveResult.md5Checksum || null,
        status: finalStatus
      }
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
      const projectId = docMeta.projectId || null;

      if (!(await canUserUpload(supabase, userId, roleId, projectId))) {
        return c.json({ error: 'غير مصرح لك برفع مستندات لهذا المشروع' }, 403);
      }

      const fileName = docMeta.compiledName || driveData.name || 'document';
      if (isDangerousFile(fileName, docMeta.mimeType)) {
        return c.json({ error: 'صيغة الملف غير مسموح برفعها لأسباب أمنية.' }, 400);
      }

      let finalStatus = ['draft', 'review', 'approved', 'superseded'].includes(docMeta.status) ? docMeta.status : 'draft';
      if (finalStatus === 'approved') {
        const authorized = await canUserApprove(supabase, userId, roleId, projectId);
        if (!authorized) {
          finalStatus = 'review';
        }
      }

      const driveResult = await finalizeGoogleDrivePermissions(c.env, driveData.id);
      const docId = generateSecureId('doc_');
      const verifiedSize = driveResult.size || docMeta.size || driveData.size || 0;

      const docData = {
        id: docId,
        project_id: projectId,
        task_id: docMeta.taskId || null,
        uploader_id: userId,
        original_name: fileName,
        disk_filename: driveResult.webViewLink,
        mime_type: docMeta.mimeType || 'application/octet-stream',
        size: verifiedSize,
        status: finalStatus
      };

      const { data, error } = await supabase.from('documents').insert([docData]).select().single();
      if (error) throw error;

      if (finalStatus === 'approved' && projectId) {
        await autoSupersedePriorVersions(supabase, projectId, docId, fileName);
      }

      supabase.from('audit_logs').insert([{
        user_id: userId,
        action: 'create',
        entity_type: 'document',
        entity_id: docId,
        details: {
          name: docData.original_name,
          link: driveResult.webViewLink,
          size: verifiedSize,
          md5: driveResult.md5Checksum || null,
          status: finalStatus
        }
      }]).then().catch(() => {});

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

  if (isDangerousFile(compiledName || file?.name, file?.type)) {
    return c.json({ error: 'صيغة الملف غير مسموح برفعها لأسباب أمنية.' }, 400);
  }

  if (!(await canUserUpload(supabase, userId, roleId, projectId))) {
    return c.json({ error: 'غير مصرح لك برفع مستندات لهذا المشروع' }, 403);
  }

  try {
    let finalStatus = ['draft', 'review', 'approved', 'superseded'].includes(body.status) ? body.status : 'draft';
    if (finalStatus === 'approved') {
      const authorized = await canUserApprove(supabase, userId, roleId, projectId);
      if (!authorized) {
        finalStatus = 'review';
      }
    }

    const arrayBuffer = await file.arrayBuffer();
    const targetFolderId = await resolveTargetFolder(c.env, supabase, { projectId, taskId });
    const driveResult = await uploadToGoogleDrive(c.env, arrayBuffer, compiledName, file.type, targetFolderId);
    
    const docId = generateSecureId('doc_');
    const docData = {
      id: docId,
      project_id: projectId || null,
      task_id: taskId || null,
      uploader_id: userId,
      original_name: compiledName,
      disk_filename: driveResult.webViewLink,
      mime_type: file.type,
      size: file.size,
      status: finalStatus
    };
    
    const { data, error } = await supabase.from('documents').insert([docData]).select().single();
    if (error) throw error;

    if (finalStatus === 'approved' && projectId) {
      await autoSupersedePriorVersions(supabase, projectId, docId, compiledName);
    }
    
    supabase.from('audit_logs').insert([{
      user_id: userId,
      action: 'create',
      entity_type: 'document',
      entity_id: docId,
      details: { name: compiledName, link: driveResult.webViewLink, status: finalStatus }
    }]).then().catch(() => {});

    return c.json({ ok: true, document: toCamelCase(data) }, 201);
  } catch (error) {
    console.error("[Documents] Upload Error:", error);
    return c.json({ error: 'فشل رفع الملف: ' + error.message }, 500);
  }
});

// PATCH /api/documents/:id -> Update Document Name or Status
app.patch('/:id', async (c) => {
  const docId = c.req.param('id');
  const body = await c.req.json();
  const supabase = c.get('supabase');
  const userId = c.get('userId');
  const roleId = c.get('roleId');

  const { data: doc } = await supabase.from('documents').select('project_id, uploader_id, original_name').eq('id', docId).single();
  if (!doc) return c.json({ error: 'المستند غير موجود' }, 404);
  
  if (doc.uploader_id !== userId && !(await hasPermission(supabase, userId, roleId, 'edit_tasks', doc.project_id))) {
    return c.json({ error: 'غير مصرح لك بتعديل هذا الملف' }, 403);
  }
  
  const updates = {};
  if (body.originalName) updates.original_name = body.originalName;
  if (body.status) {
    if (body.status === 'approved') {
      const authorized = await canUserApprove(supabase, userId, roleId, doc.project_id);
      if (!authorized) {
        return c.json({ error: 'غير مصرح لك باعتماد هذا المخطط (صلاحية مدير أو قائد مشروع فقط)' }, 403);
      }
    }
    updates.status = body.status;
  }
  updates.updated_at = new Date().toISOString();
  
  const { data, error } = await supabase.from('documents').update(updates).eq('id', docId).select().single();
  if (error) throw error;

  if (body.status === 'approved' && doc.project_id) {
    await autoSupersedePriorVersions(supabase, doc.project_id, docId, updates.original_name || doc.original_name);
  }
  
  return c.json({ ok: true, document: toCamelCase(data) });
});

// DELETE /api/documents/:id -> Soft delete to Trash (retained for 30 days)
app.delete('/:id', async (c) => {
  const docId = c.req.param('id');
  const supabase = c.get('supabase');
  const userId = c.get('userId');
  const roleId = c.get('roleId');
  
  const { data: doc } = await supabase.from('documents').select('*').eq('id', docId).is('deleted_at', null).single();
  if (!doc) return c.json({ error: 'المستند غير موجود أو محذوف مسبقاً' }, 404);

  const canDelete = (roleId === 'admin') ||
    (doc.uploader_id === userId) ||
    (await hasPermission(supabase, userId, roleId, 'delete_documents', doc.project_id)) ||
    (await hasPermission(supabase, userId, roleId, 'edit_tasks', doc.project_id));

  if (!canDelete) {
    return c.json({ error: 'غير مصرح لك بحذف هذا الملف' }, 403);
  }

  const now = new Date().toISOString();
  const { error } = await supabase.from('documents').update({ deleted_at: now, updated_at: now }).eq('id', docId);
  if (error) throw error;

  // Log deletion in audit_logs so trash knows who deleted it
  supabase.from('audit_logs').insert([{
    user_id: userId,
    action: 'delete',
    entity_type: 'document',
    entity_id: docId,
    details: { name: doc.original_name, project_id: doc.project_id, task_id: doc.task_id }
  }]).then().catch(() => {});

  // Note: We do NOT delete from Google Drive here. The file is preserved in Trash
  // for 30 days so users can restore it. It is permanently deleted only upon manual purge or 30-day cleanup.

  invalidateBootstrapCache();

  return c.json({ ok: true, message: 'تم نقل المستند إلى سلة المهملات بنجاح.' });
});

export default app;
