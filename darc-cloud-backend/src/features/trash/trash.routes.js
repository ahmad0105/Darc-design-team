import { Hono } from 'hono';
import { getDB } from '../../core/db.js';
import { toCamelCase } from '../../utils/transformers.js';
import { invalidateBootstrapCache } from '../../core/cache.js';

const app = new Hono();

app.use('*', async (c, next) => {
  c.set('supabase', getDB(c.env));
  await next();
});

// GET /api/trash — returns soft-deleted projects and tasks with rich metadata
app.get('/', async (c) => {
  const roleId = c.get('roleId');
  const supabase = c.get('supabase');
  if (roleId !== 'admin') {
    return c.json({ error: 'غير مصرح لك باستعراض سلة المحذوفات، الصلاحية للمشرفين فقط' }, 403);
  }

  const [projRes, taskRes] = await Promise.all([
    supabase.from('projects')
      .select('id, name_ar, name_en, code, status, client_name, deleted_at, created_at')
      .not('deleted_at', 'is', null)
      .order('deleted_at', { ascending: false }),
    supabase.from('tasks')
      .select('id, title_ar, title_en, project_id, status, priority, deleted_at, created_at')
      .not('deleted_at', 'is', null)
      .order('deleted_at', { ascending: false })
  ]);

  // Fetch parent project metadata for all tasks (including projects that might also be deleted)
  const projectMap = new Map();
  const projectIds = [...new Set((taskRes.data || []).map(t => t.project_id).filter(Boolean))];
  if (projectIds.length > 0) {
    const { data: relatedProjects } = await supabase
      .from('projects')
      .select('id, name_ar, name_en, code')
      .in('id', projectIds);
    (relatedProjects || []).forEach(p => projectMap.set(p.id, p));
  }

  const pList = (projRes.data || []).map(p => ({
    id: p.id,
    name: p.name_ar || p.name_en || p.code || 'مشروع محذوف',
    name_ar: p.name_ar,
    name_en: p.name_en,
    code: p.code,
    status: p.status,
    client_name: p.client_name,
    deleted_at: p.deleted_at,
    created_at: p.created_at,
    type: 'project'
  }));

  const tList = (taskRes.data || []).map(t => {
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

  return c.json({
    trash: toCamelCase([...pList, ...tList]),
    projects: toCamelCase(pList),
    tasks: toCamelCase(tList)
  });
});

// DELETE /api/trash/empty — Permanently purges all items currently in the trash bin
app.delete('/empty', async (c) => {
  const roleId = c.get('roleId');
  if (roleId !== 'admin') {
    return c.json({ error: 'غير مصرح لك بإفراغ سلة المهملات، الصلاحية للمشرفين فقط' }, 403);
  }

  const supabase = c.get('supabase');

  try {
    // 1. Get all soft-deleted tasks
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

    // 2. Get all soft-deleted projects
    const { data: delProjects } = await supabase.from('projects').select('id').not('deleted_at', 'is', null);
    const projectIds = (delProjects || []).map(p => p.id);

    if (projectIds.length > 0) {
      // Find any tasks remaining under these projects
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
      deletedTasksCount: taskIds.length,
      deletedProjectsCount: projectIds.length,
      message: 'تم إفراغ سلة المهملات بالكامل بنجاح.'
    });
  } catch (err) {
    return c.json({ error: 'فشل إفراغ سلة المهملات: ' + err.message }, 500);
  }
});

// DELETE /api/trash/:type/:id — Permanently deletes a single item from trash
app.delete('/:type/:id', async (c) => {
  const roleId = c.get('roleId');
  if (roleId !== 'admin') {
    return c.json({ error: 'غير مصرح لك بالحذف النهائي، الصلاحية للمشرفين فقط' }, 403);
  }

  const type = c.req.param('type');
  const id = c.req.param('id');
  const supabase = c.get('supabase');

  try {
    if (type === 'task') {
      await Promise.all([
        supabase.from('comments').delete().eq('task_id', id),
        supabase.from('task_history').delete().eq('task_id', id),
        supabase.from('reminders').delete().eq('task_id', id),
        supabase.from('notifications').delete().eq('task_id', id)
      ]);
      const { error } = await supabase.from('tasks').delete().eq('id', id);
      if (error) throw error;
    } else if (type === 'project') {
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
      await supabase.from('documents').delete().eq('project_id', id);
      const { error } = await supabase.from('projects').delete().eq('id', id);
      if (error) throw error;
    } else {
      return c.json({ error: 'نوع غير صالح. يجب أن يكون project أو task.' }, 400);
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
  const daysThreshold = parseInt(body.days || 30, 10);
  const cutoffDate = new Date(Date.now() - daysThreshold * 24 * 60 * 60 * 1000).toISOString();

  let deletedTasksCount = 0;
  let deletedProjectsCount = 0;

  try {
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
      deletedTasksCount,
      deletedProjectsCount,
      message: `تم تنظيف العناصر المحذوفة منذ أكثر من ${daysThreshold} يوماً بنجاح.`
    });
  } catch (error) {
    return c.json({ error: 'فشلت عملية تنظيف سلة المهملات: ' + error.message }, 500);
  }
});

export default app;
