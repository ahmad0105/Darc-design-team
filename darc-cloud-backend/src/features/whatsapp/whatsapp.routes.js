import { Hono } from 'hono';
import { getDB } from '../../core/db.js';
import { sendWhatsAppAlert } from './whatsapp.service.js';

const app = new Hono();

// Helper: load whatsapp configuration from company custom_fields or settings
async function getWhatsAppConfig(supabase) {
  const { data: comp } = await supabase.from('companies').select('custom_fields').limit(1).single();
  const cf = comp?.custom_fields || {};
  return cf.whatsapp || {
    enabled: false,
    serverUrl: '',
    apiKey: '',
    instanceName: 'darc-workspace',
    recipient: '', // Phone number or Group JID (e.g. 1203630...@g.us)
    notifyOnBlocked: true,
    notifyOnApproval: true,
    notifyOnDrawing: true,
    provider: 'evolution'
  };
}

// GET /api/whatsapp/config
app.get('/config', async (c) => {
  const supabase = getDB(c.env);
  const config = await getWhatsAppConfig(supabase);
  return c.json({ ok: true, config });
});

// POST /api/whatsapp/config
app.post('/config', async (c) => {
  const roleId = c.get('roleId');
  if (roleId !== 'admin' && roleId !== 'account_permissions_manager') {
    return c.json({ error: 'صلاحية غير كافية لتعديل إعدادات التنبيهات' }, 403);
  }

  const supabase = getDB(c.env);
  const body = await c.req.json();
  const incoming = body.config || {};

  const { data: comp } = await supabase.from('companies').select('id, custom_fields').limit(1).single();
  if (!comp) return c.json({ error: 'الشركة غير موجودة' }, 404);

  const existingCF = comp.custom_fields || {};
  const updatedWhatsApp = {
    enabled: Boolean(incoming.enabled),
    serverUrl: String(incoming.serverUrl || '').trim(),
    apiKey: String(incoming.apiKey || '').trim(),
    instanceName: String(incoming.instanceName || 'darc-workspace').trim(),
    recipient: String(incoming.recipient || '').trim(),
    notifyOnBlocked: incoming.notifyOnBlocked !== false,
    notifyOnApproval: incoming.notifyOnApproval !== false,
    notifyOnDrawing: incoming.notifyOnDrawing !== false,
    provider: incoming.provider === 'webhook' ? 'webhook' : 'evolution',
    updatedAt: new Date().toISOString()
  };

  const newCF = { ...existingCF, whatsapp: updatedWhatsApp };
  const { error } = await supabase.from('companies').update({
    custom_fields: newCF,
    updated_at: new Date().toISOString()
  }).eq('id', comp.id);

  if (error) return c.json({ error: error.message }, 500);

  return c.json({ ok: true, config: updatedWhatsApp });
});

// POST /api/whatsapp/test -> Send instant test message
app.post('/test', async (c) => {
  const supabase = getDB(c.env);
  const body = await c.req.json().catch(() => ({}));
  let config = body.config;
  if (!config || !config.serverUrl) {
    config = await getWhatsAppConfig(supabase);
  }

  if (!config.serverUrl || !config.recipient) {
    return c.json({ error: 'يرجى إدخال رابط الخادم ورقم الهاتف أو كود القروب أولاً' }, 400);
  }

  const res = await sendWhatsAppAlert(
    { ...config, enabled: true },
    'custom',
    { text: '✨ *تم التحقق من اتصال منصة DARC بنجاح!*\nأنت الآن جاهز لاستلام تنبيهات المشاريع والمهام الهندسية مباشرة.' }
  );

  if (!res.ok) {
    return c.json({ error: res.error || 'فشل إرسال رسالة الاختبار، تحقق من صحة الرابط ومفتاح الـ API.' }, 400);
  }

  return c.json({ ok: true, message: 'تم إرسال رسالة الاختبار بنجاح إلى الواتساب! 🚀' });
});

export default app;
