import { Hono } from 'hono';
import { getDB } from '../../core/db.js';
import { toCamelCase } from '../../utils/transformers.js';

const app = new Hono();

app.use('*', async (c, next) => {
  c.set('supabase', getDB(c.env));
  await next();
});

app.get('/', async (c) => {
  const userId = c.get('userId');
  const supabase = c.get('supabase');
  const { data, error } = await supabase.from('notifications').select('*').eq('user_id', userId).order('created_at', { ascending: false }).limit(30);
  if (error) return c.json({ notifications: [] });
  return c.json({ notifications: toCamelCase(data || []) });
});

app.patch('/:id', async (c) => {
  const notificationId = c.req.param('id');
  const userId = c.get('userId');
  const supabase = c.get('supabase');
  const { error } = await supabase.from('notifications').update({ read: true }).eq('id', notificationId).eq('user_id', userId);
  return c.json({ ok: true });
});

export default app;
