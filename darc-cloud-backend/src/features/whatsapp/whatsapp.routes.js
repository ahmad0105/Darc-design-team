import { Hono } from 'hono';
import { getDB } from '../../core/db.js';
import { sendWhatsAppAlert, getWhatsAppConfig } from './whatsapp.service.js';
import { validateSafeExternalUrl } from '../../core/security.js';

const app = new Hono();

// GET /api/whatsapp/config
app.get('/config', async (c) => {
  const roleId = c.get('roleId');
  const canManage = roleId === 'admin' || roleId === 'account_permissions_manager';

  const supabase = getDB(c.env);
  const config = await getWhatsAppConfig(supabase);

  // Sensitive Information Disclosure Prevention (CWE-200 / CWE-319):
  // Plain-text API keys must NEVER be exposed to non-administrative roles.
  const safeConfig = { ...config };
  if (!canManage && safeConfig.apiKey) {
    safeConfig.apiKey = '••••••••';
  }

  return c.json({ ok: true, config: safeConfig });
});

// POST /api/whatsapp/config
app.post('/config', async (c) => {
  const roleId = c.get('roleId');
  if (roleId !== 'admin' && roleId !== 'account_permissions_manager') {
    return c.json({ error: 'صلاحية غير كافية لتعديل إعدادات التنبيهات' }, 403);
  }

  const body = await c.req.json().catch(() => ({}));
  const incoming = body.config || {};

  // SSRF Protection (CWE-918): Strictly validate outbound serverUrl
  const rawServerUrl = String(incoming.serverUrl || '').trim();
  if (rawServerUrl) {
    const urlValidation = validateSafeExternalUrl(rawServerUrl);
    if (!urlValidation.ok) {
      return c.json({ error: urlValidation.error }, 400);
    }
  }

  const supabase = getDB(c.env);

  let { data: comp } = await supabase.from('company').select('id, settings, custom_fields').eq('id', 'default').maybeSingle();
  if (!comp) {
    const fallback = await supabase.from('companies').select('id, settings, custom_fields').limit(1).maybeSingle();
    comp = fallback.data;
  }

  const existingSettings = comp?.settings || comp?.custom_fields || {};
  let resolvedApiKey = String(incoming.apiKey || '').trim();
  // Preserve existing secret API key if submitted as masked bullets or left untouched
  if (!resolvedApiKey || resolvedApiKey === '••••••••' || resolvedApiKey === '••••••••••••••••') {
    resolvedApiKey = existingSettings.whatsapp?.apiKey || '';
  }

  const updatedWhatsApp = {
    enabled: Boolean(incoming.enabled),
    serverUrl: rawServerUrl,
    apiKey: resolvedApiKey,
    instanceName: String(incoming.instanceName || 'darc-workspace').trim(),
    recipient: String(incoming.recipient || '').trim(),
    notifyOnBlocked: incoming.notifyOnBlocked !== false,
    notifyOnApproval: incoming.notifyOnApproval !== false,
    notifyOnDrawing: incoming.notifyOnDrawing !== false,
    provider: incoming.provider === 'webhook' ? 'webhook' : 'evolution',
    updatedAt: new Date().toISOString()
  };

  const newSettings = { ...existingSettings, whatsapp: updatedWhatsApp };
  
  let { error } = await supabase.from('company').upsert([{
    id: comp?.id || 'default',
    settings: newSettings,
    updated_at: new Date().toISOString()
  }]);

  if (error) {
    await supabase.from('company').upsert([{
      id: comp?.id || 'default',
      custom_fields: newSettings,
      updated_at: new Date().toISOString()
    }]);
  }

  return c.json({ ok: true, config: updatedWhatsApp });
});

// POST /api/whatsapp/test -> Send instant test message
app.post('/test', async (c) => {
  const roleId = c.get('roleId');
  if (roleId !== 'admin' && roleId !== 'account_permissions_manager') {
    return c.json({ error: 'صلاحية غير كافية لإجراء اختبار التنبيهات' }, 403);
  }

  const supabase = getDB(c.env);
  const body = await c.req.json().catch(() => ({}));
  let config = body.config;
  if (!config || !config.serverUrl) {
    config = await getWhatsAppConfig(supabase);
  }

  if (!config.serverUrl || !config.recipient) {
    return c.json({ error: 'يرجى إدخال رابط الخادم ورقم الهاتف أو كود القروب أولاً' }, 400);
  }

  // SSRF Protection (CWE-918): Strictly validate outbound serverUrl
  const urlValidation = validateSafeExternalUrl(config.serverUrl);
  if (!urlValidation.ok) {
    return c.json({ error: urlValidation.error }, 400);
  }

  const res = await sendWhatsAppAlert(
    { ...config, enabled: true },
    'custom',
    { text: '✨ *تم التحقق من اتصال منصة DARC بنجاح!*\nأنت الآن جاهز لاستلام تنبيهات المشاريع والمهام الهندسية مباشرة.' },
    supabase,
    { isTest: true }
  );

  if (!res.ok) {
    return c.json({ error: res.error || 'فشل إرسال رسالة الاختبار، تحقق من صحة الرابط ومفتاح الـ API.' }, 400);
  }

  return c.json({ ok: true, message: 'تم إرسال رسالة الاختبار بنجاح إلى الواتساب! 🚀' });
});

export default app;
