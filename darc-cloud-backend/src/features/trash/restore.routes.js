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
  const roleId = c.get('roleId');
  if (roleId !== 'admin') {
    return c.json({ error: 'غير مصرح لك باستعادة العناصر، الصلاحية للمشرفين فقط' }, 403);
  }
  const type = c.req.param('type'); // 'project' or 'task'
  const id = c.req.param('id');
  const supabase = c.get('supabase');
  const now = new Date().toISOString();

  if (type === 'project') {
    const { error: pErr } = await supabase.from('projects').update({ lifecycle: 'active', deleted_at: null, updated_at: now }).eq('id', id);
    if (pErr) throw pErr;
    await supabase.from('tasks').update({ deleted_at: null, updated_at: now }).eq('project_id', id);
    invalidateBootstrapCache();
    return c.json({ ok: true });
  } else if (type === 'task') {
    const { data: task } = await supabase.from('tasks').select('project_id').eq('id', id).single();
    if (task && task.project_id) {
      // Ensure parent project is active if it was deleted
      const { data: proj } = await supabase.from('projects').select('deleted_at').eq('id', task.project_id).single();
      if (proj && proj.deleted_at) {
        await supabase.from('projects').update({ lifecycle: 'active', deleted_at: null, updated_at: now }).eq('id', task.project_id);
      }
    }
    const { error: tErr } = await supabase.from('tasks').update({ deleted_at: null, status: 'not_started', updated_at: now }).eq('id', id);
    if (tErr) throw tErr;
    invalidateBootstrapCache();
    return c.json({ ok: true });
  } else {
    return c.json({ error: 'نوع غير صالح. يجب أن يكون project أو task.' }, 400);
  }
});

export default app;
