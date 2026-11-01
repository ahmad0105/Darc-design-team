import { Hono } from 'hono';
import { getDB } from '../../core/db.js';
import { toCamelCase } from '../../utils/transformers.js';
import { createNotification } from './notifications.service.js';

const app = new Hono();

app.use('*', async (c, next) => {
  c.set('supabase', getDB(c.env));
  await next();
});

app.get('/', async (c) => {
  if (c.get('isDemo')) {
    const { getDemoPayload } = await import('../demo/demo.service.js');
    const demo = getDemoPayload();
    return c.json({ notifications: toCamelCase(demo.notifications || []) });
  }
  const userId = c.get('userId');
  const supabase = c.get('supabase');
  const { data, error } = await supabase.from('notifications').select('*').eq('user_id', userId).order('created_at', { ascending: false }).limit(30);
  if (error) return c.json({ notifications: [] });
  return c.json({ notifications: toCamelCase(data || []) });
});

app.post('/read-all', async (c) => {
  if (c.get('isDemo')) {
    const { getDemoPayload } = await import('../demo/demo.service.js');
    const demo = getDemoPayload();
    (demo.notifications || []).forEach(n => { n.read = true; n.readAt = new Date().toISOString(); });
    return c.json({ ok: true });
  }
  const userId = c.get('userId');
  const supabase = c.get('supabase');
  const now = new Date().toISOString();
  await supabase.from('notifications').update({ read: true, read_at: now }).eq('user_id', userId).eq('read', false);
  return c.json({ ok: true });
});

app.post('/clear-read', async (c) => {
  if (c.get('isDemo')) {
    return c.json({ ok: true });
  }
  const userId = c.get('userId');
  const supabase = c.get('supabase');
  await supabase.from('notifications').delete().eq('user_id', userId).eq('read', true);
  return c.json({ ok: true });
});

app.patch('/:id', async (c) => {
  const notificationId = c.req.param('id');
  if (!/^[a-zA-Z0-9_-]{3,64}$/.test(notificationId)) {
    return c.json({ error: 'معرف الإشعار غير صالح' }, 400);
  }
  const userId = c.get('userId');
  const supabase = c.get('supabase');
  const body = await c.req.json().catch(() => ({}));
  const isRead = body.read !== undefined ? Boolean(body.read) : true;
  const now = new Date().toISOString();
  await supabase.from('notifications').update({ read: isRead, read_at: isRead ? now : null }).eq('id', notificationId).eq('user_id', userId);
  return c.json({ ok: true });
});

app.delete('/:id', async (c) => {
  const notificationId = c.req.param('id');
  if (!/^[a-zA-Z0-9_-]{3,64}$/.test(notificationId)) {
    return c.json({ error: 'معرف الإشعار غير صالح' }, 400);
  }
  const userId = c.get('userId');
  const supabase = c.get('supabase');
  await supabase.from('notifications').delete().eq('id', notificationId).eq('user_id', userId);
  return c.json({ ok: true });
});

app.post('/test', async (c) => {
  const isDemo = c.get('isDemo');
  const userId = c.get('userId');
  const supabase = c.get('supabase');
  const body = await c.req.json().catch(() => ({}));
  
  const testEntry = {
    userId,
    type: body.type || 'general',
    titleAr: body.titleAr || 'إشعار فحص النظام المباشر 🔔',
    titleEn: body.titleEn || 'Live System Test Notification 🔔',
    messageAr: body.messageAr || 'هذا إشعار تجريبي مباشر للتأكد من اتصال السيرفر والربط اللحظي بنجاح!',
    messageEn: body.messageEn || 'This live test notification verifies backend dispatch and real-time connectivity!'
  };

  if (isDemo) {
    const { addDemoNotification } = await import('../demo/demo.service.js');
    const notif = addDemoNotification(testEntry);
    return c.json({ ok: true, isDemo: true, notification: toCamelCase(notif), message: 'تم إرسال الإشعار التجريبي بنجاح' });
  }

  await createNotification(supabase, testEntry);
  return c.json({ ok: true, message: 'تم إرسال الإشعار التجريبي بنجاح' });
});

export default app;
