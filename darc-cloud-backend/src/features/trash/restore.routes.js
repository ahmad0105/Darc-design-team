import { Hono } from 'hono';
import { getDB } from '../../core/db.js';
import { invalidateBootstrapCache } from '../../core/cache.js';

const app = new Hono();

app.use('*', async (c, next) => {
  c.set('supabase', getDB(c.env));
  await next();
});

// POST /api/restore/:type/:id
app.post('/:type/:id', async (c) => {
  const userId = c.get('userId');
  const roleId = c.get('roleId');
  const type = c.req.param('type'); // 'project', 'task', or 'document'
  const id = c.req.param('id');

  const validTypes = new Set(['project', 'task', 'document']);
  if (!validTypes.has(type)) {
    return c.json({ error: 'نوع غير صالح. يجب أن يكون project أو task أو document.' }, 400);
  }
  if (!/^[a-zA-Z0-9_-]{3,64}$/.test(id)) {
    return c.json({ error: 'معرف غير صالح' }, 400);
  }

  const supabase = c.get('supabase');
  const now = new Date().toISOString();

  const isGlobalAdmin = roleId === 'admin';

  if (type === 'document') {
    const { data: doc } = await supabase.from('documents').select('*').eq('id', id).single();
    if (!doc) return c.json({ error: 'المستند غير موجود' }, 404);
    if (!doc.deleted_at) {
      return c.json({ error: 'المستند غير محذوف بالفعل' }, 400);
    }

    if (!isGlobalAdmin) {
      // Must belong to the project, and be uploader, deleter, or project manager
      const { data: member } = await supabase.from('project_members').select('project_id').eq('project_id', doc.project_id).eq('user_id', userId).single();
      const { data: audit } = await supabase.from('audit_logs').select('user_id').eq('entity_id', id).eq('action', 'delete').single();
      const { data: proj } = await supabase.from('projects').select('manager_id').eq('id', doc.project_id).single();

      const isMember = !!member || proj?.manager_id === userId;
      const isAuthorized = doc.uploader_id === userId || audit?.user_id === userId || proj?.manager_id === userId;

      if (!isMember || !isAuthorized) {
        return c.json({ error: 'غير مصرح لك باستعادة هذا المستند' }, 403);
      }
    }

    // Ensure parent project is active if it was deleted
    if (doc.project_id) {
      const { data: proj } = await supabase.from('projects').select('manager_id, deleted_at').eq('id', doc.project_id).single();
      if (proj && proj.deleted_at) {
        if (!isGlobalAdmin && proj.manager_id !== userId) {
          return c.json({ error: 'المشروع التابع له هذا المستند محذوف حالياً. يجب استعادة المشروع أولاً من قِبل مدير المشروع أو المشرف.' }, 400);
        }
        await supabase.from('projects').update({ lifecycle: 'active', deleted_at: null, updated_at: now }).eq('id', doc.project_id);
      }
    }

    // Ensure parent task is active if it was deleted
    if (doc.task_id) {
      const { data: task } = await supabase.from('tasks').select('deleted_at').eq('id', doc.task_id).single();
      if (task && task.deleted_at) {
        await supabase.from('tasks').update({ deleted_at: null, status: 'not_started', updated_at: now }).eq('id', doc.task_id);
      }
    }

    const { error: dErr } = await supabase.from('documents').update({ deleted_at: null, updated_at: now }).eq('id', id);
    if (dErr) throw dErr;

    invalidateBootstrapCache();
    return c.json({ ok: true, message: 'تم استعادة المستند بنجاح.' });

  } else if (type === 'project') {
    const { data: proj } = await supabase.from('projects').select('manager_id, deleted_at').eq('id', id).single();
    if (!proj) return c.json({ error: 'المشروع غير موجود' }, 404);
    if (!proj.deleted_at) {
      return c.json({ error: 'المشروع غير محذوف بالفعل' }, 400);
    }

    if (!isGlobalAdmin) {
      if (proj?.manager_id !== userId) {
        return c.json({ error: 'غير مصرح لك باستعادة هذا المشروع، الصلاحية لمدير المشروع أو المشرفين فقط' }, 403);
      }
    }

    const { error: pErr } = await supabase.from('projects').update({ lifecycle: 'active', deleted_at: null, updated_at: now }).eq('id', id);
    if (pErr) throw pErr;

    // Reactivate tasks and documents associated with this project
    await Promise.all([
      supabase.from('tasks').update({ deleted_at: null, updated_at: now }).eq('project_id', id),
      supabase.from('documents').update({ deleted_at: null, updated_at: now }).eq('project_id', id)
    ]);

    invalidateBootstrapCache();
    return c.json({ ok: true, message: 'تم استعادة المشروع ومهامه ومستنداته بنجاح.' });

  } else if (type === 'task') {
    const { data: task } = await supabase.from('tasks').select('project_id, assignee_id, deleted_at').eq('id', id).single();
    if (!task) return c.json({ error: 'المهمة غير موجودة' }, 404);
    if (!task.deleted_at) {
      return c.json({ error: 'المهمة غير محذوفة بالفعل' }, 400);
    }

    if (!isGlobalAdmin) {
      const { data: member } = await supabase.from('project_members').select('project_id').eq('project_id', task.project_id).eq('user_id', userId).single();
      const { data: proj } = await supabase.from('projects').select('manager_id').eq('id', task.project_id).single();
      const { data: audit } = await supabase.from('audit_logs').select('user_id').eq('entity_id', id).eq('action', 'delete').single();

      const isMember = !!member || proj?.manager_id === userId;
      const isAuthorized = task.assignee_id === userId || audit?.user_id === userId || proj?.manager_id === userId;

      if (!isMember || !isAuthorized) {
        return c.json({ error: 'غير مصرح لك باستعادة هذه المهمة' }, 403);
      }
    }

    if (task && task.project_id) {
      // Ensure parent project is active if it was deleted
      const { data: proj } = await supabase.from('projects').select('manager_id, deleted_at').eq('id', task.project_id).single();
      if (proj && proj.deleted_at) {
        if (!isGlobalAdmin && proj.manager_id !== userId) {
          return c.json({ error: 'المشروع التابع له هذه المهمة محذوف حالياً. يجب استعادة المشروع أولاً من قِبل مدير المشروع أو المشرف.' }, 400);
        }
        await supabase.from('projects').update({ lifecycle: 'active', deleted_at: null, updated_at: now }).eq('id', task.project_id);
      }
    }

    const { error: tErr } = await supabase.from('tasks').update({ deleted_at: null, status: 'not_started', updated_at: now }).eq('id', id);
    if (tErr) throw tErr;

    // Also restore documents of this task
    await supabase.from('documents').update({ deleted_at: null, updated_at: now }).eq('task_id', id);

    invalidateBootstrapCache();
    return c.json({ ok: true, message: 'تم استعادة المهمة ومستنداتها بنجاح.' });

  } else {
    return c.json({ error: 'نوع غير صالح. يجب أن يكون project أو task أو document.' }, 400);
  }
});

export default app;
