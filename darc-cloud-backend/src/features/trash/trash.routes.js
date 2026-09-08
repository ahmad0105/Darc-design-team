import { Hono } from 'hono';
import { getDB } from '../../core/db.js';
import { toCamelCase } from '../../utils/transformers.js';

const app = new Hono();

app.use('*', async (c, next) => {
  c.set('supabase', getDB(c.env));
  await next();
});

// GET /api/trash — returns soft-deleted projects and tasks
app.get('/', async (c) => {
  const userId = c.get('userId');
  const roleId = c.get('roleId');
  const supabase = c.get('supabase');
  if (roleId !== 'admin') {
    return c.json({ error: 'غير مصرح لك باستعراض سلة المحذوفات، الصلاحية للمشرفين فقط' }, 403);
  }

  const [projRes, taskRes] = await Promise.all([
    supabase.from('projects').select('id, name_ar, name_en, code, deleted_at').not('deleted_at', 'is', null),
    supabase.from('tasks').select('id, title_ar, title_en, project_id, deleted_at').not('deleted_at', 'is', null)
  ]);

  const pList = (projRes.data || []).map(p => ({ ...p, type: 'project' }));
  const tList = (taskRes.data || []).map(t => ({ ...t, type: 'task' }));
  return c.json({
    trash: toCamelCase([...pList, ...tList]),
    projects: toCamelCase(projRes.data || []),
    tasks: toCamelCase(taskRes.data || [])
  });
});

// POST /api/trash/cleanup — Permanently deletes soft-deleted items older than 30 days (TTL)
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
    // 1. Try calling the stored database procedure if present
    const { data: rpcRes, error: rpcErr } = await supabase.rpc('cleanup_expired_trash', { days_threshold: daysThreshold });
    if (!rpcErr && rpcRes && rpcRes.length > 0) {
      deletedTasksCount = rpcRes[0].deleted_tasks_count;
      deletedProjectsCount = rpcRes[0].deleted_projects_count;
    } else {
      // 2. Direct fallback cleanup via Supabase client
      const [delTasks, delProjects] = await Promise.all([
        supabase.from('tasks').delete().not('deleted_at', 'is', null).lt('deleted_at', cutoffDate).select('id'),
        supabase.from('projects').delete().not('deleted_at', 'is', null).lt('deleted_at', cutoffDate).select('id')
      ]);
      deletedTasksCount = delTasks.data?.length || 0;
      deletedProjectsCount = delProjects.data?.length || 0;
    }

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
