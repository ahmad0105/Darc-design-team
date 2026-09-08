import { Hono } from 'hono';
import { getDB } from '../../core/db.js';

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

  if (type === 'project') {
    const { error: pErr } = await supabase.from('projects').update({ deleted_at: null }).eq('id', id);
    if (pErr) throw pErr;
    await supabase.from('tasks').update({ deleted_at: null }).eq('project_id', id);
    return c.json({ ok: true });
  } else if (type === 'task') {
    const { error: tErr } = await supabase.from('tasks').update({ deleted_at: null }).eq('id', id);
    if (tErr) throw tErr;
    return c.json({ ok: true });
  } else {
    return c.json({ error: 'نوع غير صالح. يجب أن يكون project أو task.' }, 400);
  }
});

export default app;
