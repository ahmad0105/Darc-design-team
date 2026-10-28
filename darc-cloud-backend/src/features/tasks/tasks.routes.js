import { Hono } from 'hono';
import { getDB } from '../../core/db.js';
import { hasPermission, isProjectVisible } from '../../utils/permissions.js';
import { toCamelCase } from '../../utils/transformers.js';
import { createNotification } from '../notifications/notifications.service.js';
import { invalidateBootstrapCache } from '../../core/cache.js';
import { applyDemoTaskUpdate, createDemoTask } from '../demo/demo.service.js';

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

// Helper: Sanitize custom_fields (prevent XSS in external assignees, constrain array lengths, prototype pollution guard)
function sanitizeCustomFields(cf) {
  if (!cf || typeof cf !== 'object' || Array.isArray(cf)) return {};
  const clean = { ...cf };
  delete clean.__proto__;
  delete clean.constructor;
  delete clean.prototype;
  delete clean.tokenVersion;
  delete clean.resetToken;
  delete clean.resetExpiresAt;
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
  const body = await c.req.json();

  if (c.get('isDemo')) {
    const created = createDemoTask(body);
    return c.json({ task: created }, 201);
  }

  const supabase = c.get('supabase');
  const projectId = body.projectId || body.project_id;
  
  if (!(await hasPermission(supabase, userId, roleId, 'create_tasks', projectId))) {
    return c.json({ error: 'لا تملك الصلاحية المطلوبة لهذه العملية' }, 403);
  }

  let titleAr = body.titleAr || body.title_ar || body.title;
  let titleEn = body.titleEn || body.title_en;

  // Handle template cloning if templateId provided
  const templateId = body.templateId || body.template_id;
  if (templateId) {
    const { data: template } = await supabase.from('templates').select('*').eq('id', templateId).single();
    if (template) {
      if (!titleAr) titleAr = template.name_ar;
      if (!titleEn) titleEn = template.name_en;
    }
  }

  titleAr = String(titleAr || '').trim();
  titleEn = String(titleEn || titleAr).trim();
  
  if (!titleAr) return c.json({ error: 'اسم المهمة مطلوب' }, 400);

  // Support idempotent offline sync with pre-assigned ID
  const providedId = (body.id && typeof body.id === 'string' && /^tsk_[a-zA-Z0-9_-]{6,36}$/.test(body.id)) ? body.id : null;
  if (providedId) {
    const { data: existing } = await supabase.from('tasks').select('*').eq('id', providedId).single();
    if (existing) {
      return c.json({ task: toCamelCase(existing), idempotent: true }, 200);
    }
  }

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
    ...(providedId ? { id: providedId } : {}),
    project_id: projectId,
    title_ar: titleAr,
    title_en: titleEn,
    description_ar: String(body.descriptionAr || '').trim(),
    description_en: String(body.descriptionEn || body.descriptionAr || '').trim(),
    status,
    priority: ['low', 'medium', 'high', 'urgent'].includes(body.priority) ? body.priority : 'medium',
    assignee_id: body.assigneeId || body.assignee_id || null,
    reviewer_id: body.reviewerId || body.reviewer_id || null,
    approver_id: body.approverId || body.approver_id || null,
    parent_task_id: body.parentTaskId || body.parent_task_id || null,
    start_date: body.startDate || body.start_date || null,
    due_date: body.dueDate || body.due_date || null,
    weight: typeof body.weight === 'number' ? body.weight : 1,
    progress,
    custom_fields: customFields,
    template_id: templateId || null,
    type_ar: body.typeAr || body.type_ar || null,
    type_en: body.typeEn || body.type_en || null
  };

  const { data: task, error } = await supabase.from('tasks').insert([taskData]).select().single();
  if (error) throw error;

  invalidateBootstrapCache();

  supabase.from('audit_logs').insert([{ user_id: userId, action: 'create', entity_type: 'task', entity_id: task.id, details: { title: task.title_ar } }]).then().catch(() => {});

  return c.json({ task: toCamelCase(task) }, 201);
});

// PATCH /api/tasks/reorder - Batch update task sort orders & statuses (Anti-N+1 Optimized)
app.patch('/reorder', async (c) => {
  const body = await c.req.json();
  const items = Array.isArray(body.items) ? body.items : [];

  if (c.get('isDemo')) {
    items.forEach(item => applyDemoTaskUpdate(item.id, item));
    return c.json({ ok: true });
  }

  const userId = c.get('userId');
  const roleId = c.get('roleId');
  const supabase = c.get('supabase');

  if (!items.length) return c.json({ ok: true });

  const now = new Date().toISOString();
  const taskIds = Array.from(new Set(items.map(i => i.id).filter(Boolean)));
  if (!taskIds.length) return c.json({ ok: true });

  // 1. Anti-N+1: Batch fetch all relevant tasks in a single query
  const { data: existingTasks, error: fetchErr } = await supabase
    .from('tasks')
    .select('id, project_id, assignee_id, custom_fields, status')
    .in('id', taskIds);

  if (fetchErr || !existingTasks || !existingTasks.length) {
    return c.json({ ok: true });
  }

  const taskMap = new Map(existingTasks.map(t => [t.id, t]));
  const projectIds = Array.from(new Set(existingTasks.map(t => t.project_id).filter(Boolean)));

  // 2. Anti-N+1: Batch check project visibility and editing permissions
  const projectEditAllowed = new Map();
  const isGlobalAdmin = roleId === 'admin' || roleId === 'account_permissions_manager';

  if (isGlobalAdmin) {
    for (const pid of projectIds) projectEditAllowed.set(pid, true);
  } else {
    // Single query to fetch user memberships across all distinct projects in this batch
    const { data: memberships } = await supabase
      .from('project_members')
      .select('project_id, role_id')
      .eq('user_id', userId)
      .in('project_id', projectIds);

    const memberRoleMap = new Map((memberships || []).map(m => [m.project_id, m.role_id]));

    for (const pid of projectIds) {
      const activeRole = memberRoleMap.get(pid);
      if (activeRole) {
        const canEdit = await hasPermission(supabase, userId, activeRole, 'edit_tasks', pid);
        projectEditAllowed.set(pid, canEdit);
      } else {
        projectEditAllowed.set(pid, false);
      }
    }
  }

  // 3. Process updates and aggregate status-change audit logs
  const auditLogsToInsert = [];
  const updatePromises = [];

  for (const item of items) {
    if (!item.id) continue;
    const existing = taskMap.get(item.id);
    if (!existing) continue;

    // Check project-level permission or assignee self-update
    const canEditProject = projectEditAllowed.get(existing.project_id) || false;
    const canEdit = canEditProject || existing.assignee_id === userId;
    if (!canEdit) continue;

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
      if (existing.status !== item.status) {
        auditLogsToInsert.push({
          user_id: userId,
          action: 'status_change',
          entity_type: 'task',
          entity_id: item.id,
          details: { oldStatus: existing.status, newStatus: item.status }
        });
      }
      updates.status = item.status;
      const autoP = calculateAutoProgress(item.status);
      if (autoP !== null) updates.progress = autoP;
    }

    updatePromises.push(supabase.from('tasks').update(updates).eq('id', item.id));
  }

  // 4. Execute updates and batch insert audit logs in parallel
  if (auditLogsToInsert.length > 0) {
    updatePromises.push(supabase.from('audit_logs').insert(auditLogsToInsert));
  }

  await Promise.all(updatePromises);
  invalidateBootstrapCache();
  return c.json({ ok: true });
});

// Helper: Validate entity ID format
const isValidEntityId = (id) => typeof id === 'string' && /^[a-zA-Z0-9_-]{4,50}$/.test(id);

// PATCH /api/tasks/:id
app.patch('/:id', async (c) => {
  const taskId = c.req.param('id');
  if (!isValidEntityId(taskId)) {
    return c.json({ error: 'معرف المهمة غير صالح' }, 400);
  }
  const body = await c.req.json();

  if (c.get('isDemo')) {
    const updated = applyDemoTaskUpdate(taskId, body);
    return c.json({ task: toCamelCase(updated || body) });
  }

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

  // Optimistic Locking: Prevent silent concurrent overwrites between team members
  if (body.expectedUpdatedAt && !body.forceOverwrite && task.updated_at) {
    const serverUpdatedMs = new Date(task.updated_at).getTime();
    const clientExpectedMs = new Date(body.expectedUpdatedAt).getTime();
    if (serverUpdatedMs - clientExpectedMs > 2000) {
      return c.json({
        error: 'تعارض في التعديل: قام عضو آخر في الفريق بتحديث هذه المهمة أثناء قيامك بالعمل عليها. تم منع الكتابة فوق التعديل الأحدث للحفاظ على سلامة البيانات.',
        code: 'CONCURRENT_MODIFICATION_CONFLICT',
        latestTask: toCamelCase(task)
      }, 409);
    }
  }

  const updates = {};
  
  const fieldMap = { 
    titleAr: 'title_ar', titleEn: 'title_en', descriptionAr: 'description_ar', descriptionEn: 'description_en', 
    status: 'status', priority: 'priority', 
    assigneeId: 'assignee_id', reviewerId: 'reviewer_id', approverId: 'approver_id', parentTaskId: 'parent_task_id',
    startDate: 'start_date', dueDate: 'due_date', 
    weight: 'weight', progress: 'progress',
    templateId: 'template_id', typeAr: 'type_ar', typeEn: 'type_en'
  };
  
  for (const [camel, snake] of Object.entries(fieldMap)) {
    const valInBody = body[camel] !== undefined ? body[camel] : body[snake];
    if (valInBody !== undefined) {
      let val = valInBody;
      if (['start_date', 'due_date', 'assignee_id', 'reviewer_id', 'approver_id', 'parent_task_id', 'template_id'].includes(snake)) {
        val = val ? val : null;
      }
      if (snake === 'status' && val && !['not_started', 'in_progress', 'review', 'approval', 'done', 'canceled'].includes(val)) {
        continue;
      }
      if (snake === 'priority' && val && !['low', 'medium', 'high', 'urgent'].includes(val)) {
        continue;
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
  if (!isValidEntityId(taskId)) {
    return c.json({ error: 'معرف المهمة غير صالح' }, 400);
  }
  const userId = c.get('userId');
  const roleId = c.get('roleId');
  const supabase = c.get('supabase');

  const { data: task } = await supabase.from('tasks').select('*').eq('id', taskId).single();
  if (!task) return c.json({ error: 'المهمة غير موجودة' }, 404);

  const canDelete = roleId === 'admin' ||
    (await hasPermission(supabase, userId, roleId, 'delete_tasks', task.project_id)) ||
    (await hasPermission(supabase, userId, roleId, 'edit_tasks', task.project_id));

  if (!canDelete) {
    return c.json({ error: 'لا تملك الصلاحية المطلوبة لهذه العملية' }, 403);
  }

  const now = new Date().toISOString();
  const [delRes] = await Promise.all([
    supabase.from('tasks').update({ status: 'canceled', updated_at: now, deleted_at: now }).eq('id', taskId),
    supabase.from('documents').update({ deleted_at: now, updated_at: now }).eq('task_id', taskId).is('deleted_at', null),
    supabase.from('audit_logs').insert([{ user_id: userId, action: 'delete', entity_type: 'task', entity_id: taskId }])
  ]);

  if (delRes.error) throw delRes.error;

  invalidateBootstrapCache();

  return c.json({ ok: true });
});

// POST /api/tasks/:id/comments
app.post('/:id/comments', async (c) => {
  const taskId = c.req.param('id');
  if (!isValidEntityId(taskId)) {
    return c.json({ error: 'معرف المهمة غير صالح' }, 400);
  }
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

  // Support idempotent offline sync with pre-assigned comment ID
  const providedCommentId = (body.id && typeof body.id === 'string' && /^cmt_[a-zA-Z0-9_-]{6,36}$/.test(body.id)) ? body.id : null;
  if (providedCommentId) {
    const { data: existing } = await supabase
      .from('comments')
      .select(`*, user:user_id(id, name, name_en, email, avatar_color)`)
      .eq('id', providedCommentId)
      .single();
    if (existing) {
      return c.json({ comment: toCamelCase(existing), idempotent: true }, 200);
    }
  }

  const { data: comment, error } = await supabase
    .from('comments')
    .insert([{
      ...(providedCommentId ? { id: providedCommentId } : {}),
      task_id: taskId,
      user_id: userId,
      content
    }])
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
  if (!isValidEntityId(taskId) || !isValidEntityId(commentId)) {
    return c.json({ error: 'معرف غير صالح' }, 400);
  }
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
  if (!isValidEntityId(taskId) || !isValidEntityId(commentId)) {
    return c.json({ error: 'معرف غير صالح' }, 400);
  }
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

// GET /api/tasks/:id/comments — Lazy load comments for a task (Performance Optimization)
app.get('/:id/comments', async (c) => {
  const taskId = c.req.param('id');
  if (!isValidEntityId(taskId)) {
    return c.json({ error: 'معرف المهمة غير صالح' }, 400);
  }
  const userId = c.get('userId');
  const roleId = c.get('roleId');
  const supabase = c.get('supabase');

  const { data: task } = await supabase.from('tasks').select('project_id').eq('id', taskId).single();
  if (!task || !(await isProjectVisible(supabase, userId, roleId, task.project_id))) {
    return c.json({ error: 'غير مصرح' }, 403);
  }

  const { data: comments, error } = await supabase
    .from('comments')
    .select('id, task_id, user_id, content, created_at, updated_at, deleted_at, user:user_id(id, name, name_en, email, avatar_color)')
    .eq('task_id', taskId)
    .is('deleted_at', null)
    .order('created_at', { ascending: true });

  if (error) throw error;
  return c.json({ comments: toCamelCase(comments || []) });
});

export default app;
