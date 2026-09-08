import { Hono } from 'hono';
import { getDB } from '../../core/db.js';
import { hasPermission, isProjectVisible } from '../../utils/permissions.js';
import { toCamelCase } from '../../utils/transformers.js';
import { createNotification } from '../notifications/notifications.service.js';
import { invalidateBootstrapCache } from '../../core/cache.js';

const app = new Hono();

app.use('*', async (c, next) => {
  c.set('supabase', getDB(c.env));
  await next();
});

// Helper: Calculate progress automatically based on task status
function calculateAutoProgress(status) {
  switch (status) {
    case 'not_started': return 0;
    case 'in_progress': return 50;
    case 'review':
    case 'approval': return 80;
    case 'done': return 100;
    default: return null;
  }
}

// Helper: Sanitize custom_fields (prevent XSS in external assignees, constrain array lengths)
function sanitizeCustomFields(cf) {
  if (!cf || typeof cf !== 'object' || Array.isArray(cf)) return {};
  const clean = { ...cf };
  if (Array.isArray(clean.additional_assignees)) {
    clean.additional_assignees = clean.additional_assignees
      .filter(x => typeof x === 'string' && x.trim().length > 0)
      .map(x => x.trim().slice(0, 50));
  } else if (Array.isArray(clean.additionalAssignees)) {
    clean.additional_assignees = clean.additionalAssignees
      .filter(x => typeof x === 'string' && x.trim().length > 0)
      .map(x => x.trim().slice(0, 50));
    delete clean.additionalAssignees;
  }
  if (Array.isArray(clean.external_assignees)) {
    clean.external_assignees = clean.external_assignees
      .filter(x => typeof x === 'string' && x.trim().length > 0)
      .map(x => x.trim().replace(/<[^>]*>/g, '').replace(/[<>]/g, '').slice(0, 100));
  } else if (Array.isArray(clean.externalAssignees)) {
    clean.external_assignees = clean.externalAssignees
      .filter(x => typeof x === 'string' && x.trim().length > 0)
      .map(x => x.trim().replace(/<[^>]*>/g, '').replace(/[<>]/g, '').slice(0, 100));
    delete clean.externalAssignees;
  }
  if (Array.isArray(clean.dependencies)) {
    clean.dependencies = clean.dependencies
      .filter(x => typeof x === 'string' && x.trim().length > 0)
      .map(x => x.trim().slice(0, 50));
  }
  return clean;
}

// POST /api/tasks
app.post('/', async (c) => {
  const userId = c.get('userId');
  const roleId = c.get('roleId');
  const supabase = c.get('supabase');
  
  const body = await c.req.json();
  const projectId = body.projectId;
  
  if (!(await hasPermission(supabase, userId, roleId, 'create_tasks', projectId))) {
    return c.json({ error: 'لا تملك الصلاحية المطلوبة لهذه العملية' }, 403);
  }

  let titleAr = body.titleAr;
  let titleEn = body.titleEn;

  // Handle template cloning if templateId provided
  if (body.templateId) {
    const { data: template } = await supabase.from('templates').select('*').eq('id', body.templateId).single();
    if (template) {
      if (!titleAr) titleAr = template.name_ar;
      if (!titleEn) titleEn = template.name_en;
    }
  }

  titleAr = String(titleAr || '').trim();
  titleEn = String(titleEn || titleAr).trim();
  
  if (!titleAr) return c.json({ error: 'اسم المهمة مطلوب' }, 400);

  const status = ['not_started', 'in_progress', 'review', 'approval', 'done', 'blocked', 'canceled'].includes(body.status) ? body.status : 'not_started';
  
  // Reversible auto-progress mapping
  let progress = calculateAutoProgress(status);
  if (progress === null) {
    progress = typeof body.progress === 'number' ? body.progress : 0;
  }

  const customFields = sanitizeCustomFields({
    ...(body.customFields || body.custom_fields || {}),
    ...(Array.isArray(body.dependencies) ? { dependencies: body.dependencies } : {})
  });

  const taskData = {
    project_id: projectId,
    title_ar: titleAr,
    title_en: titleEn,
    description_ar: String(body.descriptionAr || '').trim(),
    description_en: String(body.descriptionEn || body.descriptionAr || '').trim(),
    status,
    priority: ['low', 'medium', 'high', 'urgent'].includes(body.priority) ? body.priority : 'medium',
    assignee_id: body.assigneeId || null,
    reviewer_id: body.reviewerId || null,
    start_date: body.startDate || null,
    due_date: body.dueDate || null,
    weight: typeof body.weight === 'number' ? body.weight : 1,
    progress,
    custom_fields: customFields,
    template_id: body.templateId || null,
    type_ar: body.typeAr || null,
    type_en: body.typeEn || null
  };

  const { data: task, error } = await supabase.from('tasks').insert([taskData]).select().single();
  if (error) throw error;

  invalidateBootstrapCache();

  supabase.from('audit_logs').insert([{ user_id: userId, action: 'create', entity_type: 'task', entity_id: task.id, details: { title: task.title_ar } }]).then().catch(() => {});

  return c.json({ task: toCamelCase(task) }, 201);
});

// PATCH /api/tasks/reorder - Batch update task sort orders & statuses
app.patch('/reorder', async (c) => {
  const userId = c.get('userId');
  const roleId = c.get('roleId');
  const supabase = c.get('supabase');
  const body = await c.req.json();
  const items = Array.isArray(body.items) ? body.items : [];

  if (!items.length) return c.json({ ok: true });

  const now = new Date().toISOString();
  await Promise.all(items.map(async (item) => {
    if (!item.id) return;
    const { data: existing } = await supabase.from('tasks').select('id, project_id, assignee_id, custom_fields, status').eq('id', item.id).single();
    if (!existing) return;
    
    // Check permission
    const isVisible = await isProjectVisible(supabase, userId, roleId, existing.project_id);
    const canEdit = isVisible && (
      (await hasPermission(supabase, userId, roleId, 'edit_tasks', existing.project_id)) ||
      existing.assignee_id === userId
    );
    if (!canEdit) return;

    const existingCF = (existing.custom_fields && typeof existing.custom_fields === 'object') ? existing.custom_fields : {};
    const incomingCF = (item.customFields || item.custom_fields || {});
    const sortOrderVal = typeof item.sortOrder === 'number' ? item.sortOrder : (typeof item.sort_order === 'number' ? item.sort_order : 0);
    const mergedCF = {
      ...existingCF,
      ...incomingCF,
      sortOrder: sortOrderVal,
      sort_order: sortOrderVal
    };

    const updates = {
      custom_fields: sanitizeCustomFields(mergedCF),
      updated_at: now
    };
    if (item.status && ['not_started', 'in_progress', 'review', 'approval', 'done', 'blocked', 'canceled'].includes(item.status)) {
      updates.status = item.status;
      const autoP = calculateAutoProgress(item.status);
      if (autoP !== null) updates.progress = autoP;
    }

    await supabase.from('tasks').update(updates).eq('id', item.id);
  }));

  invalidateBootstrapCache();
  return c.json({ ok: true });
});

// PATCH /api/tasks/:id
app.patch('/:id', async (c) => {
  const taskId = c.req.param('id');
  const userId = c.get('userId');
  const roleId = c.get('roleId');
  const supabase = c.get('supabase');

  // We need to fetch the task first to check permissions (need project_id and assignee_id)
  const { data: task } = await supabase.from('tasks').select('*').eq('id', taskId).single();
  if (!task) return c.json({ error: 'المهمة غير موجودة' }, 404);

  const isVisible = await isProjectVisible(supabase, userId, roleId, task.project_id);
  const canEdit = isVisible && (
    (await hasPermission(supabase, userId, roleId, 'edit_tasks', task.project_id)) || 
    task.assignee_id === userId
  );

  if (!canEdit) {
    return c.json({ error: 'لا تملك الصلاحية المطلوبة لهذه العملية' }, 403);
  }

  const body = await c.req.json();
  const updates = {};
  
  const fieldMap = { 
    titleAr: 'title_ar', titleEn: 'title_en', descriptionAr: 'description_ar', descriptionEn: 'description_en', 
    status: 'status', priority: 'priority', 
    assigneeId: 'assignee_id', reviewerId: 'reviewer_id', 
    startDate: 'start_date', dueDate: 'due_date', 
    weight: 'weight', progress: 'progress',
    templateId: 'template_id', typeAr: 'type_ar', typeEn: 'type_en'
  };
  
  for (const [camel, snake] of Object.entries(fieldMap)) {
    if (body[camel] !== undefined) {
      let val = body[camel];
      if (['start_date', 'due_date', 'assignee_id', 'reviewer_id', 'template_id'].includes(snake)) {
        val = val ? val : null;
      }
      updates[snake] = val;
    }
  }

  // Handle custom_fields and dependencies update
  if (body.customFields !== undefined || body.custom_fields !== undefined || body.dependencies !== undefined) {
    const incomingCF = body.customFields !== undefined ? body.customFields : (body.custom_fields || {});
    const existingCF = (task.custom_fields && typeof task.custom_fields === 'object') ? task.custom_fields : {};
    const depUpdate = Array.isArray(body.dependencies) ? { dependencies: body.dependencies } : {};
    updates.custom_fields = sanitizeCustomFields({ ...existingCF, ...incomingCF, ...depUpdate });
  }

  // Reversible auto-progress on status change (unless caller explicitly provided progress number)
  if (updates.status !== undefined && body.progress === undefined) {
    const autoP = calculateAutoProgress(updates.status);
    if (autoP !== null) {
      updates.progress = autoP;
    }
  }

  updates.updated_at = new Date().toISOString();

  const { data: updatedTask, error } = await supabase.from('tasks').update(updates).eq('id', taskId).select().single();
  if (error) throw error;

  invalidateBootstrapCache();

  supabase.from('audit_logs').insert([{ user_id: userId, action: 'update', entity_type: 'task', entity_id: taskId, details: body }]).then().catch(() => {});

  return c.json({ task: toCamelCase(updatedTask) });
});

// DELETE /api/tasks/:id
app.delete('/:id', async (c) => {
  const taskId = c.req.param('id');
  const userId = c.get('userId');
  const roleId = c.get('roleId');
  const supabase = c.get('supabase');

  const { data: task } = await supabase.from('tasks').select('*').eq('id', taskId).single();
  if (!task) return c.json({ error: 'المهمة غير موجودة' }, 404);

  if (!(await hasPermission(supabase, userId, roleId, 'edit_tasks', task.project_id))) {
    return c.json({ error: 'لا تملك الصلاحية المطلوبة لهذه العملية' }, 403);
  }

  const now = new Date().toISOString();
  const [delRes] = await Promise.all([
    supabase.from('tasks').update({ status: 'canceled', updated_at: now, deleted_at: now }).eq('id', taskId),
    supabase.from('audit_logs').insert([{ user_id: userId, action: 'delete', entity_type: 'task', entity_id: taskId }])
  ]);

  if (delRes.error) throw delRes.error;

  invalidateBootstrapCache();

  return c.json({ ok: true });
});

// GET /api/tasks/:id/comments
app.get('/:id/comments', async (c) => {
  const taskId = c.req.param('id');
  const userId = c.get('userId');
  const roleId = c.get('roleId');
  const supabase = c.get('supabase');

  const { data: task } = await supabase.from('tasks').select('project_id').eq('id', taskId).single();
  if (!task || !(await isProjectVisible(supabase, userId, roleId, task.project_id))) {
    return c.json({ error: 'غير مصرح' }, 403);
  }

  const { data: comments } = await supabase
    .from('comments')
    .select(`*, user:user_id(id, name, name_en, email, avatar_color)`)
    .eq('task_id', taskId)
    .order('created_at', { ascending: true });

  return c.json({ comments: toCamelCase(comments || []) });
});

// POST /api/tasks/:id/comments
app.post('/:id/comments', async (c) => {
  const taskId = c.req.param('id');
  const userId = c.get('userId');
  const roleId = c.get('roleId');
  const supabase = c.get('supabase');

  const { data: task } = await supabase.from('tasks').select('project_id, title_ar, assignee_id').eq('id', taskId).single();
  if (!task || !(await isProjectVisible(supabase, userId, roleId, task.project_id))) {
    return c.json({ error: 'غير مصرح' }, 403);
  }

  const body = await c.req.json();
  const content = String(body.content || '').trim();
  if (!content) return c.json({ error: 'التعليق فارغ' }, 400);

  const { data: comment, error } = await supabase
    .from('comments')
    .insert([{ task_id: taskId, user_id: userId, content }])
    .select(`*, user:user_id(id, name, name_en, email, avatar_color)`)
    .single();

  if (error) throw error;

  // Fire notifications asynchronously in the background so user response is instantaneous
  const bgTask = (async () => {
    try {
      if (task.assignee_id && task.assignee_id !== userId) {
        await createNotification(supabase, {
          userId: task.assignee_id,
          type: 'comment',
          content: `تعليق جديد على: ${task.title_ar || 'مهمة'}`,
          taskId
        });
      }

      const mentionsMatch = content.match(/@([\p{L}\p{N}_.\-]+)/gu);
      if (mentionsMatch) {
        const usernames = Array.from(new Set(mentionsMatch.map(m => m.slice(1).toLowerCase())));
        if (usernames.length > 0) {
          const { data: members } = await supabase
            .from('project_members')
            .select('user_id, users!inner(name_en, name, email)')
            .eq('project_id', task.project_id);
            
          if (members) {
            const notifications = [];
            for (const username of usernames) {
              const mentionedUser = members.find(m => 
                m.user_id !== userId &&
                ((m.users.name_en && m.users.name_en.toLowerCase().replace(/\s+/g, '') === username) ||
                 (m.users.name && m.users.name.toLowerCase().replace(/\s+/g, '') === username) ||
                 (m.users.email && m.users.email.split('@')[0].toLowerCase() === username))
              );
              if (mentionedUser) {
                notifications.push({
                  user_id: mentionedUser.user_id,
                  type: 'mention',
                  title_ar: 'إشارة جديدة',
                  title_en: 'New Mention',
                  body_ar: `تمت الإشارة إليك في المهمة: ${task.title_ar}`,
                  body_en: `You were mentioned in: ${task.title_ar}`,
                  link: `/project/${task.project_id}?task=${taskId}`
                });
              }
            }
            if (notifications.length > 0) {
              await supabase.from('notifications').insert(notifications);
            }
          }
        }
      }
    } catch (notifErr) {
      console.warn('[Notifications] Async dispatch error:', notifErr.message);
    }
  })();

  if (c.executionCtx && typeof c.executionCtx.waitUntil === 'function') {
    c.executionCtx.waitUntil(bgTask);
  }

  return c.json({ comment: toCamelCase(comment) }, 201);
});

// PATCH /api/tasks/:id/comments/:commentId
app.patch('/:id/comments/:commentId', async (c) => {
  const taskId = c.req.param('id');
  const commentId = c.req.param('commentId');
  const userId = c.get('userId');
  const roleId = c.get('roleId');
  const supabase = c.get('supabase');

  const { data: task } = await supabase.from('tasks').select('project_id').eq('id', taskId).single();
  if (!task || !(await isProjectVisible(supabase, userId, roleId, task.project_id))) {
    return c.json({ error: 'غير مصرح' }, 403);
  }

  const { data: comment, error: fetchErr } = await supabase
    .from('comments')
    .select('*')
    .eq('id', commentId)
    .eq('task_id', taskId)
    .single();

  if (fetchErr || !comment) {
    return c.json({ error: 'التعليق غير موجود' }, 404);
  }

  if (comment.user_id !== userId && roleId !== 'admin') {
    return c.json({ error: 'غير مصرح لك بتعديل هذا التعليق' }, 403);
  }

  const body = await c.req.json();
  const content = String(body.content || '').trim();
  if (!content) return c.json({ error: 'محتوى التعليق لا يمكن أن يكون فارغاً' }, 400);

  const { data: updatedComment, error: updateErr } = await supabase
    .from('comments')
    .update({ content, updated_at: new Date().toISOString() })
    .eq('id', commentId)
    .select(`*, user:user_id(id, name, name_en, email, avatar_color)`)
    .single();

  if (updateErr) throw updateErr;

  return c.json({ comment: toCamelCase(updatedComment) });
});

// DELETE /api/tasks/:id/comments/:commentId
app.delete('/:id/comments/:commentId', async (c) => {
  const taskId = c.req.param('id');
  const commentId = c.req.param('commentId');
  const userId = c.get('userId');
  const roleId = c.get('roleId');
  const supabase = c.get('supabase');

  const { data: task } = await supabase.from('tasks').select('project_id').eq('id', taskId).single();
  if (!task || !(await isProjectVisible(supabase, userId, roleId, task.project_id))) {
    return c.json({ error: 'غير مصرح' }, 403);
  }

  const { data: comment, error: fetchErr } = await supabase
    .from('comments')
    .select('*')
    .eq('id', commentId)
    .eq('task_id', taskId)
    .single();

  if (fetchErr || !comment) {
    return c.json({ error: 'التعليق غير موجود' }, 404);
  }

  if (comment.user_id !== userId && roleId !== 'admin') {
    return c.json({ error: 'غير مصرح لك بحذف هذا التعليق' }, 403);
  }

  const { error: delErr } = await supabase
    .from('comments')
    .delete()
    .eq('id', commentId)
    .eq('task_id', taskId);

  if (delErr) throw delErr;

  return c.json({ ok: true });
});

export default app;
