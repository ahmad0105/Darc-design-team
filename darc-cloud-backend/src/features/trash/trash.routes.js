import { Hono } from 'hono';
import { getDB } from '../../core/db.js';
import { toCamelCase } from '../../utils/transformers.js';
import { invalidateBootstrapCache } from '../../core/cache.js';
import { deleteFromGoogleDrive } from '../../core/gdrive.js';

const app = new Hono();

app.use('*', async (c, next) => {
  c.set('supabase', getDB(c.env));
  await next();
});

// Helper: Extract Google Drive file ID from URL
function extractDriveFileId(url) {
  if (!url || typeof url !== 'string' || !url.includes('drive.google.com')) return null;
  const match = url.match(/\/d\/([a-zA-Z0-9_-]+)/) || url.match(/id=([a-zA-Z0-9_-]+)/);
  return match ? match[1] : null;
}

// GET /api/trash — returns soft-deleted projects, tasks, and documents filtered by project membership / role
app.get('/', async (c) => {
  const userId = c.get('userId');
  const roleId = c.get('roleId');
  const supabase = c.get('supabase');

  const isGlobalAdmin = roleId === 'admin';
  let hasManageTrash = isGlobalAdmin;
  if (!hasManageTrash) {
    const { data: userRole } = await supabase.from('roles').select('permissions').eq('id', roleId).single();
    hasManageTrash = userRole?.permissions?.includes('manage_trash') || userRole?.permissions?.includes('*');
  }

  if (!hasManageTrash) {
    return c.json({ error: 'غير مصرح لك بالوصول إلى سلة المهملات، تتطلب صلاحية إدارة سلة المهملات' }, 403);
  }

  // 1. Fetch soft-deleted records and deletion audit logs in parallel
  const [projRes, taskRes, docRes, auditRes] = await Promise.all([
    supabase.from('projects')
      .select('id, name_ar, name_en, code, lifecycle, client_ar, client_en, manager_id, deleted_at, created_at')
      .not('deleted_at', 'is', null)
      .order('deleted_at', { ascending: false }),
    supabase.from('tasks')
      .select('id, title_ar, title_en, project_id, status, priority, assignee_id, deleted_at, created_at')
      .not('deleted_at', 'is', null)
      .order('deleted_at', { ascending: false }),
    supabase.from('documents')
      .select('id, original_name, mime_type, size, project_id, task_id, uploader_id, disk_filename, status, deleted_at, created_at')
      .not('deleted_at', 'is', null)
      .order('deleted_at', { ascending: false }),
    supabase.from('audit_logs')
      .select('entity_id, entity_type, user_id')
      .eq('action', 'delete')
  ]);

  const auditMap = new Map(); // entity_id -> userId who deleted it
  (auditRes.data || []).forEach(a => {
    if (a.entity_id && a.user_id) auditMap.set(a.entity_id, a.user_id);
  });

  // 2. Fetch project metadata for display
  const allProjectIds = new Set();
  (projRes.data || []).forEach(p => allProjectIds.add(p.id));
  (taskRes.data || []).forEach(t => { if (t.project_id) allProjectIds.add(t.project_id); });
  (docRes.data || []).forEach(d => { if (d.project_id) allProjectIds.add(d.project_id); });

  const projectMap = new Map();
  if (allProjectIds.size > 0) {
    const { data: relatedProjects } = await supabase
      .from('projects')
      .select('id, name_ar, name_en, code, manager_id')
      .in('id', Array.from(allProjectIds));
    (relatedProjects || []).forEach(p => projectMap.set(p.id, p));
  }

  // Also map tasks for documents
  const allTaskIds = new Set((docRes.data || []).map(d => d.task_id).filter(Boolean));
  const taskMap = new Map();
  if (allTaskIds.size > 0) {
    const { data: relatedTasks } = await supabase
      .from('tasks')
      .select('id, title_ar, title_en')
      .in('id', Array.from(allTaskIds));
    (relatedTasks || []).forEach(t => taskMap.set(t.id, t));
  }

  // 3. User Project Membership Resolution (if not admin)
  const userProjectIds = new Set();
  const managedProjectIds = new Set();

  if (!hasManageTrash) {
    const [memberRes, managedRes] = await Promise.all([
      supabase.from('project_members').select('project_id').eq('user_id', userId),
      supabase.from('projects').select('id').eq('manager_id', userId)
    ]);
    (memberRes.data || []).forEach(m => userProjectIds.add(m.project_id));
    (managedRes.data || []).forEach(p => {
      userProjectIds.add(p.id);
      managedProjectIds.add(p.id);
    });
  }

  // 4. Filter Projects in Trash
  let rawProjects = projRes.data || [];
  if (!hasManageTrash) {
    rawProjects = rawProjects.filter(p => {
      const isMember = userProjectIds.has(p.id);
      const isManager = p.manager_id === userId;
      const isDeleter = auditMap.get(p.id) === userId;
      return isMember || isManager || isDeleter;
    });
  }

  const pList = rawProjects.map(p => ({
    id: p.id,
    name: p.name_ar || p.name_en || p.code || 'مشروع محذوف',
    name_ar: p.name_ar,
    name_en: p.name_en,
    code: p.code,
    lifecycle: p.lifecycle,
    status: p.lifecycle,
    client_ar: p.client_ar,
    client_name: p.client_ar || p.client_en,
    deleted_at: p.deleted_at,
    created_at: p.created_at,
    type: 'project'
  }));

  // 5. Filter Tasks in Trash
  let rawTasks = taskRes.data || [];
  if (!hasManageTrash) {
    rawTasks = rawTasks.filter(t => {
      // Must be a member of the project to see its deleted tasks
      if (!t.project_id || !userProjectIds.has(t.project_id)) return false;
      const isAssignee = t.assignee_id === userId;
      const isDeleter = auditMap.get(t.id) === userId;
      const isManager = managedProjectIds.has(t.project_id);
      return isAssignee || isDeleter || isManager || true; // All members of this project can see its deleted tasks
    });
  }

  const tList = rawTasks.map(t => {
    const parent = projectMap.get(t.project_id);
    return {
      id: t.id,
      name: t.title_ar || t.title_en || 'مهمة محذوفة',
      title_ar: t.title_ar,
      title_en: t.title_en,
      name_ar: t.title_ar,
      name_en: t.title_en,
      project_id: t.project_id,
      project_name_ar: parent?.name_ar || '',
      project_name_en: parent?.name_en || '',
      project_code: parent?.code || '',
      status: t.status,
      priority: t.priority,
      deleted_at: t.deleted_at,
      created_at: t.created_at,
      type: 'task'
    };
  });

  // 6. Filter Documents in Trash
  let rawDocs = docRes.data || [];
  if (!hasManageTrash) {
    rawDocs = rawDocs.filter(d => {
      // User must belong to the document's project to see it in trash
      if (!d.project_id || !userProjectIds.has(d.project_id)) return false;
      const isUploader = d.uploader_id === userId;
      const isDeleter = auditMap.get(d.id) === userId;
      const isManager = managedProjectIds.has(d.project_id);
      return isUploader || isDeleter || isManager;
    });
  }

  const dList = rawDocs.map(d => {
    const parentProj = projectMap.get(d.project_id);
    const parentTask = taskMap.get(d.task_id);
    return {
      id: d.id,
      name: d.original_name || 'مستند محذوف',
      original_name: d.original_name,
      project_id: d.project_id,
      task_id: d.task_id,
      uploader_id: d.uploader_id,
      disk_filename: d.disk_filename,
      size: d.size,
      mime_type: d.mime_type,
      status: d.status,
      project_name_ar: parentProj?.name_ar || '',
      project_name_en: parentProj?.name_en || '',
      project_code: parentProj?.code || '',
      task_title_ar: parentTask?.title_ar || '',
      task_title_en: parentTask?.title_en || '',
      deleted_at: d.deleted_at,
      created_at: d.created_at,
      type: 'document'
    };
  });

  const combinedTrash = [...pList, ...tList, ...dList].sort((a, b) => new Date(b.deleted_at || 0) - new Date(a.deleted_at || 0));

  return c.json({
    trash: toCamelCase(combinedTrash),
    projects: toCamelCase(pList),
    tasks: toCamelCase(tList),
    documents: toCamelCase(dList)
  });
});

// DELETE /api/trash/empty — Permanently purges all items currently in the trash bin
app.delete('/empty', async (c) => {
  const roleId = c.get('roleId');
  const supabase = c.get('supabase');
  let hasManageTrash = roleId === 'admin';
  if (!hasManageTrash) {
    const { data: userRole } = await supabase.from('roles').select('permissions').eq('id', roleId).single();
    hasManageTrash = userRole?.permissions?.includes('manage_trash') || userRole?.permissions?.includes('*');
  }

  if (!hasManageTrash) {
    return c.json({ error: 'غير مصرح لك بإفراغ سلة المهملات، الصلاحية للمشرفين ولمدراء سلة المهملات فقط' }, 403);
  }

  try {
    // 1. Purge all soft-deleted documents (and remove from Google Drive)
    const { data: delDocs } = await supabase.from('documents').select('id, disk_filename').not('deleted_at', 'is', null);
    if (delDocs && delDocs.length > 0) {
      for (const d of delDocs) {
        const fileId = extractDriveFileId(d.disk_filename);
        if (fileId) {
          await deleteFromGoogleDrive(c.env, fileId).catch(e => console.warn('[Drive Delete]', e.message));
        }
      }
      const docIds = delDocs.map(d => d.id);
      await supabase.from('documents').delete().in('id', docIds);
    }

    // 2. Purge all soft-deleted tasks
    const { data: delTasks } = await supabase.from('tasks').select('id').not('deleted_at', 'is', null);
    const taskIds = (delTasks || []).map(t => t.id);

    if (taskIds.length > 0) {
      await Promise.all([
        supabase.from('comments').delete().in('task_id', taskIds),
        supabase.from('task_history').delete().in('task_id', taskIds),
        supabase.from('reminders').delete().in('task_id', taskIds),
        supabase.from('notifications').delete().in('task_id', taskIds)
      ]);
      await supabase.from('tasks').delete().in('id', taskIds);
    }

    // 3. Purge all soft-deleted projects
    const { data: delProjects } = await supabase.from('projects').select('id').not('deleted_at', 'is', null);
    const projectIds = (delProjects || []).map(p => p.id);

    if (projectIds.length > 0) {
      const { data: remainingTasks } = await supabase.from('tasks').select('id').in('project_id', projectIds);
      const remainingTaskIds = (remainingTasks || []).map(t => t.id);
      if (remainingTaskIds.length > 0) {
        await Promise.all([
          supabase.from('comments').delete().in('task_id', remainingTaskIds),
          supabase.from('task_history').delete().in('task_id', remainingTaskIds),
          supabase.from('reminders').delete().in('task_id', remainingTaskIds),
          supabase.from('notifications').delete().in('task_id', remainingTaskIds)
        ]);
        await supabase.from('tasks').delete().in('id', remainingTaskIds);
      }
      await supabase.from('documents').delete().in('project_id', projectIds);
      await supabase.from('projects').delete().in('id', projectIds);
    }

    invalidateBootstrapCache();

    return c.json({
      ok: true,
      deletedDocsCount: delDocs?.length || 0,
      deletedTasksCount: taskIds.length,
      deletedProjectsCount: projectIds.length,
      message: 'تم إفراغ سلة المهملات بالكامل بنجاح.'
    });
  } catch (err) {
    console.error('[Empty Trash Error]', err.message);
    return c.json({ error: 'فشل إفراغ سلة المهملات، يرجى المحاولة لاحقاً.' }, 500);
  }
});

// DELETE /api/trash/:type/:id — Permanently deletes a single item from trash
app.delete('/:type/:id', async (c) => {
  const type = c.req.param('type');
  const id = c.req.param('id');

  const validTypes = new Set(['project', 'task', 'document']);
  if (!validTypes.has(type)) {
    return c.json({ error: 'نوع غير صالح. يجب أن يكون project أو task أو document.' }, 400);
  }
  if (!/^[a-zA-Z0-9_-]{3,64}$/.test(id)) {
    return c.json({ error: 'معرف غير صالح' }, 400);
  }

  const userId = c.get('userId');
  const roleId = c.get('roleId');
  const supabase = c.get('supabase');

  const isGlobalAdmin = roleId === 'admin';
  let hasManageTrash = isGlobalAdmin;
  if (!hasManageTrash) {
    const { data: userRole } = await supabase.from('roles').select('permissions').eq('id', roleId).single();
    hasManageTrash = userRole?.permissions?.includes('manage_trash') || userRole?.permissions?.includes('*');
  }

  if (!hasManageTrash) {
    return c.json({ error: 'غير مصرح لك بالحذف النهائي، تتطلب هذه العملية صلاحية إدارة سلة المهملات' }, 403);
  }

  try {
    if (type === 'document') {
      const { data: doc } = await supabase.from('documents').select('*').eq('id', id).single();
      if (!doc) return c.json({ error: 'المستند غير موجود' }, 404);
      if (!doc.deleted_at) {
        return c.json({ error: 'المستند ليس في سلة المحذوفات' }, 400);
      }

      if (!isGlobalAdmin && doc.uploader_id !== userId) {
        // Check if user is manager of the project or the one who deleted it
        const { data: audit } = await supabase.from('audit_logs').select('user_id').eq('entity_id', id).eq('action', 'delete').single();
        if (audit?.user_id !== userId) {
          const { data: proj } = await supabase.from('projects').select('manager_id').eq('id', doc.project_id).single();
          if (proj?.manager_id !== userId) {
            return c.json({ error: 'غير مصرح لك بالحذف النهائي لهذا المستند' }, 403);
          }
        }
      }

      // Hard delete from Google Drive
      const fileId = extractDriveFileId(doc.disk_filename);
      if (fileId) {
        await deleteFromGoogleDrive(c.env, fileId).catch(e => console.warn('[Drive Delete]', e.message));
      }

      const { error } = await supabase.from('documents').delete().eq('id', id);
      if (error) throw error;

    } else if (type === 'task') {
      const { data: task } = await supabase.from('tasks').select('project_id, assignee_id, deleted_at').eq('id', id).single();
      if (!task) return c.json({ error: 'المهمة غير موجودة' }, 404);
      if (!task.deleted_at) {
        return c.json({ error: 'المهمة ليست في سلة المحذوفات' }, 400);
      }

      if (!isGlobalAdmin) {
        const { data: audit } = await supabase.from('audit_logs').select('user_id').eq('entity_id', id).eq('action', 'delete').single();
        const { data: proj } = await supabase.from('projects').select('manager_id').eq('id', task.project_id).single();
        if (audit?.user_id !== userId && proj?.manager_id !== userId && task.assignee_id !== userId) {
          return c.json({ error: 'غير مصرح لك بالحذف النهائي لهذه المهمة' }, 403);
        }
      }

      // Also clean up any documents linked to this task
      const { data: taskDocs } = await supabase.from('documents').select('id, disk_filename').eq('task_id', id);
      if (taskDocs && taskDocs.length > 0) {
        for (const d of taskDocs) {
          const fileId = extractDriveFileId(d.disk_filename);
          if (fileId) await deleteFromGoogleDrive(c.env, fileId).catch(e => console.warn(e));
        }
        await supabase.from('documents').delete().eq('task_id', id);
      }

      await Promise.all([
        supabase.from('comments').delete().eq('task_id', id),
        supabase.from('task_history').delete().eq('task_id', id),
        supabase.from('reminders').delete().eq('task_id', id),
        supabase.from('notifications').delete().eq('task_id', id)
      ]);
      const { error } = await supabase.from('tasks').delete().eq('id', id);
      if (error) throw error;

    } else if (type === 'project') {
      const { data: proj } = await supabase.from('projects').select('manager_id, deleted_at').eq('id', id).single();
      if (!proj) return c.json({ error: 'المشروع غير موجود' }, 404);
      if (!proj.deleted_at) {
        return c.json({ error: 'المشروع ليس في سلة المحذوفات' }, 400);
      }

      if (!isGlobalAdmin) {
        if (proj?.manager_id !== userId) {
          return c.json({ error: 'غير مصرح لك بالحذف النهائي لهذا المشروع' }, 403);
        }
      }

      // Clean up project documents
      const { data: projDocs } = await supabase.from('documents').select('id, disk_filename').eq('project_id', id);
      if (projDocs && projDocs.length > 0) {
        for (const d of projDocs) {
          const fileId = extractDriveFileId(d.disk_filename);
          if (fileId) await deleteFromGoogleDrive(c.env, fileId).catch(e => console.warn(e));
        }
        await supabase.from('documents').delete().eq('project_id', id);
      }

      const { data: projectTasks } = await supabase.from('tasks').select('id').eq('project_id', id);
      const taskIds = (projectTasks || []).map(t => t.id);
      if (taskIds.length > 0) {
        await Promise.all([
          supabase.from('comments').delete().in('task_id', taskIds),
          supabase.from('task_history').delete().in('task_id', taskIds),
          supabase.from('reminders').delete().in('task_id', taskIds),
          supabase.from('notifications').delete().in('task_id', taskIds)
        ]);
        await supabase.from('tasks').delete().in('id', taskIds);
      }
      const { error } = await supabase.from('projects').delete().eq('id', id);
      if (error) throw error;

    } else {
      return c.json({ error: 'نوع غير صالح. يجب أن يكون project أو task أو document.' }, 400);
    }

    invalidateBootstrapCache();
    return c.json({ ok: true, message: 'تم الحذف النهائي بنجاح.' });
  } catch (err) {
    return c.json({ error: 'فشلت عملية الحذف النهائي: ' + err.message }, 500);
  }
});

// POST /api/trash/cleanup — Permanently deletes soft-deleted items older than TTL threshold (default 30 days)
app.post('/cleanup', async (c) => {
  const roleId = c.get('roleId');
  if (roleId !== 'admin') {
    return c.json({ error: 'غير مصرح لك بتنفيذ عملية تنظيف سلة المهملات، الصلاحية للمشرفين فقط' }, 403);
  }

  const supabase = c.get('supabase');
  let body = {};
  try { body = await c.req.json(); } catch (e) {}
  const parsedDays = parseInt(body.days, 10);
  const daysThreshold = (!isNaN(parsedDays) && parsedDays >= 1 && parsedDays <= 365) ? parsedDays : 30;
  const cutoffDate = new Date(Date.now() - daysThreshold * 24 * 60 * 60 * 1000).toISOString();

  let deletedDocsCount = 0;
  let deletedTasksCount = 0;
  let deletedProjectsCount = 0;

  try {
    // 1. Clean up expired documents
    const { data: expiredDocs } = await supabase.from('documents')
      .select('id, disk_filename')
      .not('deleted_at', 'is', null)
      .lt('deleted_at', cutoffDate);

    if (expiredDocs && expiredDocs.length > 0) {
      for (const d of expiredDocs) {
        const fileId = extractDriveFileId(d.disk_filename);
        if (fileId) await deleteFromGoogleDrive(c.env, fileId).catch(e => console.warn(e));
      }
      const docIds = expiredDocs.map(d => d.id);
      await supabase.from('documents').delete().in('id', docIds);
      deletedDocsCount = docIds.length;
    }

    // 2. Clean up expired tasks & projects
    const { data: rpcRes, error: rpcErr } = await supabase.rpc('cleanup_expired_trash', { days_threshold: daysThreshold });
    if (!rpcErr && rpcRes && rpcRes.length > 0) {
      deletedTasksCount = rpcRes[0].deleted_tasks_count;
      deletedProjectsCount = rpcRes[0].deleted_projects_count;
    } else {
      const [delTasks, delProjects] = await Promise.all([
        supabase.from('tasks').delete().not('deleted_at', 'is', null).lt('deleted_at', cutoffDate).select('id'),
        supabase.from('projects').delete().not('deleted_at', 'is', null).lt('deleted_at', cutoffDate).select('id')
      ]);
      deletedTasksCount = delTasks.data?.length || 0;
      deletedProjectsCount = delProjects.data?.length || 0;
    }

    invalidateBootstrapCache();

    return c.json({
      ok: true,
      cutoffDate,
      daysThreshold,
      deletedDocsCount,
      deletedTasksCount,
      deletedProjectsCount,
      message: `تم تنظيف العناصر المحذوفة منذ أكثر من ${daysThreshold} يوماً بنجاح.`
    });
  } catch (error) {
    console.error('[Purge Trash Error]', error.message);
    return c.json({ error: 'فشلت عملية تنظيف سلة المهملات، يرجى المحاولة لاحقاً.' }, 500);
  }
});

export default app;
