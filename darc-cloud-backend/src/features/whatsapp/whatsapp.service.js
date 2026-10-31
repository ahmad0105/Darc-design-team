// DARC Design Team — Low-Risk WhatsApp Notification Gateway Service
// Built on Evolution API / Baileys Multi-Device Protocol with Anti-Ban Hygiene
import { validateSafeExternalUrl } from '../../core/security.js';

export async function getWhatsAppConfig(supabase) {
  try {
    let comp = null;
    const { data } = await supabase.from('company').select('*').eq('id', 'default').maybeSingle();
    comp = data;
    if (!comp) {
      const res = await supabase.from('companies').select('*').limit(1).maybeSingle();
      comp = res.data;
    }
    const cf = comp?.settings?.whatsapp || comp?.custom_fields?.whatsapp || {};
    return {
      enabled: Boolean(cf.enabled),
      serverUrl: cf.serverUrl || '',
      apiKey: cf.apiKey || '',
      instanceName: cf.instanceName || 'darc-workspace',
      recipient: cf.recipient || '', // Team group or fallback recipient
      notifyOnBlocked: cf.notifyOnBlocked !== false,
      notifyOnApproval: cf.notifyOnApproval !== false,
      notifyOnDrawing: cf.notifyOnDrawing !== false,
      provider: cf.provider || 'evolution'
    };
  } catch (err) {
    console.warn('[WhatsApp] getWhatsAppConfig error:', err.message);
    return { enabled: false };
  }
}

export function normalizeWhatsAppNumber(raw) {
  if (!raw) return '';
  let str = String(raw).trim().replace(/[\s\-\(\)]/g, '');
  if (str.includes('@g.us')) return str;
  if (str.startsWith('+')) str = str.slice(1);
  if (/^05[0-9]{8}$/.test(str)) {
    str = '966' + str.slice(1);
  }
  return str.replace(/[^0-9@.-]/g, '');
}

export function formatWhatsAppMessage(type, data) {
  const portalUrl = 'https://panel.darc-design.bond';
  switch (type) {
    case 'task_status': {
      const { taskTitle, projectName, statusAr, updatedBy } = data;
      return (
        `🏗️ *تنبيه من DARC Design Team*\n` +
        `━━━━━━━━━━━━━━━━━━━━\n` +
        `📋 *المهمة:* ${taskTitle || 'مهمة هندسية'}\n` +
        `🏢 *المشروع:* ${projectName || 'مشروع هندسي'}\n` +
        `⚡ *الحالة الجديدة:* ${statusAr || 'قيد المتابعة'}\n` +
        `👤 *بواسطة:* ${updatedBy || 'فريق العمل'}\n` +
        `🔗 *المعاينة:* ${portalUrl}/#tasks\n` +
        `━━━━━━━━━━━━━━━━━━━━`
      );
    }
    case 'document_approved': {
      const { docName, projectName, version, approvedBy } = data;
      return (
        `📐 *اعتماد مخطط هندسي جديد ✅*\n` +
        `━━━━━━━━━━━━━━━━━━━━\n` +
        `📁 *المخطط:* ${docName || 'مخطط معماري'}\n` +
        `🏢 *المشروع:* ${projectName || 'مشروع'}\n` +
        `🏷️ *الإصدار:* ${version || 'V1'}\n` +
        `✅ *معتمد من:* ${approvedBy || 'المشرف الهندسي'}\n` +
        `🔗 *مركز المخططات:* ${portalUrl}/#documents\n` +
        `━━━━━━━━━━━━━━━━━━━━`
      );
    }
    case 'task_blocked': {
      const { taskTitle, projectName, reason, blockedBy } = data;
      return (
        `⚠️ *تنبيه عاجل: مهمة هندسية معلقة (Blocked)*\n` +
        `━━━━━━━━━━━━━━━━━━━━\n` +
        `📋 *المهمة:* ${taskTitle || 'مهمة'}\n` +
        `🏢 *المشروع:* ${projectName || 'مشروع'}\n` +
        `🛑 *ملاحظة:* ${reason || 'بحاجة لتدخل وتوضيح هندسي'}\n` +
        `👤 *المبلغ:* ${blockedBy || 'مهندس الموقع'}\n` +
        `🔗 *فتح المهمة:* ${portalUrl}/#tasks\n` +
        `━━━━━━━━━━━━━━━━━━━━`
      );
    }
    case 'direct_notification': {
      const { title, content } = data;
      return (
        `🔔 *تنبيه شخصي — DARC Design Team*\n` +
        `━━━━━━━━━━━━━━━━━━━━\n` +
        `📌 *${title || 'إشعار جديد'}*\n` +
        `${content || ''}\n` +
        `🔗 ${portalUrl}\n` +
        `━━━━━━━━━━━━━━━━━━━━`
      );
    }
    default: {
      return (
        `🔔 *تنبيه من DARC Design Team*\n` +
        `━━━━━━━━━━━━━━━━━━━━\n` +
        `${data.text || data.content || 'تحديث جديد في مساحة العمل.'}\n` +
        `🔗 ${portalUrl}\n` +
        `━━━━━━━━━━━━━━━━━━━━`
      );
    }
  }
}

let _whatsappQueuePromise = Promise.resolve();
const _recentWhatsAppAlerts = new Map(); // hash -> timestamp
let _isDrainingQueue = false;

// Anti-Ban: Daily message counter (resets at midnight AST)
const _dailySendLog = new Map(); // 'YYYY-MM-DD' -> count
const DAILY_SEND_LIMIT = 50; // Max messages per calendar day (AST)

// Anti-Ban: Safe sending hours (Saudi Arabia AST = UTC+3)
const SAFE_HOUR_START = 7;  // 7:00 AM
const SAFE_HOUR_END   = 23; // 11:00 PM

export function isSafeHour() {
  const nowAst = new Date(Date.now() + 3 * 60 * 60 * 1000); // UTC → AST
  const hour = nowAst.getUTCHours();
  return hour >= SAFE_HOUR_START && hour < SAFE_HOUR_END;
}

function isDailyLimitReached() {
  const nowAst = new Date(Date.now() + 3 * 60 * 60 * 1000);
  const today = nowAst.toISOString().slice(0, 10); // 'YYYY-MM-DD'
  const count = _dailySendLog.get(today) || 0;
  if (count >= DAILY_SEND_LIMIT) return true;
  _dailySendLog.set(today, count + 1);
  // Prune old days (keep only last 2 days)
  for (const key of _dailySendLog.keys()) {
    if (key < today) _dailySendLog.delete(key);
  }
  return false;
}

function isDuplicateAlert(recipient, type, text) {
  const hash = `${recipient}:${type}:${String(text).slice(0, 50)}`;
  const now = Date.now();
  const lastTime = _recentWhatsAppAlerts.get(hash);
  if (lastTime && now - lastTime < 30000) {
    return true; // Duplicate alert within 30 seconds
  }
  _recentWhatsAppAlerts.set(hash, now);
  // Auto-prune old entries
  if (_recentWhatsAppAlerts.size > 200) {
    for (const [k, v] of _recentWhatsAppAlerts.entries()) {
      if (now - v > 60000) _recentWhatsAppAlerts.delete(k);
    }
  }
  return false;
}

/**
 * Enqueue an alert to be sent during morning safe hours (Zero DB Migration)
 */
export async function enqueueWhatsAppAlert(supabase, item) {
  if (!supabase) return false;
  try {
    let comp = null;
    const { data } = await supabase.from('company').select('id, settings, custom_fields').eq('id', 'default').maybeSingle();
    comp = data;
    if (!comp) {
      const fallback = await supabase.from('companies').select('id, settings, custom_fields').limit(1).maybeSingle();
      comp = fallback.data;
    }
    if (!comp) return false;

    const existingSettings = comp.settings || comp.custom_fields || {};
    const existingQueue = Array.isArray(existingSettings.whatsapp_queue) ? existingSettings.whatsapp_queue : [];

    // Keep queue bounded to max 30 alerts (FIFO)
    const newQueue = [
      ...existingQueue.slice(-29),
      {
        id: 'waq_' + Date.now() + '_' + Math.random().toString(36).slice(2, 6),
        ...item,
        queuedAt: new Date().toISOString()
      }
    ];

    const updatedSettings = { ...existingSettings, whatsapp_queue: newQueue };
    const targetCol = comp.settings !== undefined ? 'settings' : 'custom_fields';

    await supabase.from('company').update({
      [targetCol]: updatedSettings,
      updated_at: new Date().toISOString()
    }).eq('id', comp.id);

    return true;
  } catch (err) {
    console.warn('[WhatsApp Queue] enqueue error:', err.message);
    return false;
  }
}

/**
 * Drain and dispatch queued messages gently during safe hours (7 AM - 11 PM AST)
 */
export async function processWhatsAppQueue(supabase) {
  if (!supabase) return { processed: 0 };
  if (!isSafeHour()) return { processed: 0, reason: 'Outside safe hours' };
  if (_isDrainingQueue) return { processed: 0, reason: 'Already draining' };

  _isDrainingQueue = true;
  try {
    let comp = null;
    const { data } = await supabase.from('company').select('id, settings, custom_fields').eq('id', 'default').maybeSingle();
    comp = data;
    if (!comp) {
      const fallback = await supabase.from('companies').select('id, settings, custom_fields').limit(1).maybeSingle();
      comp = fallback.data;
    }
    if (!comp) return { processed: 0 };

    const settings = comp.settings || comp.custom_fields || {};
    const queue = Array.isArray(settings.whatsapp_queue) ? [...settings.whatsapp_queue] : [];
    if (queue.length === 0) return { processed: 0 };

    // Anti-burst: process at most 3 messages per tick to prevent sudden activity spike
    const batchSize = Math.min(queue.length, 3);
    const toProcess = queue.slice(0, batchSize);
    const remaining = queue.slice(batchSize);

    let processedCount = 0;
    for (const item of toProcess) {
      if (item.config && item.recipient && item.type) {
        await sendWhatsAppAlert(
          { ...item.config, recipient: item.recipient },
          item.type,
          item.payload,
          supabase,
          { isQueueDrain: true }
        );
        processedCount++;
        // Polite delay between queued dispatches
        await new Promise(r => setTimeout(r, 2500));
      }
    }

    // Update remaining queue in DB
    const updatedSettings = { ...settings, whatsapp_queue: remaining };
    const targetCol = comp.settings !== undefined ? 'settings' : 'custom_fields';
    await supabase.from('company').update({
      [targetCol]: updatedSettings,
      updated_at: new Date().toISOString()
    }).eq('id', comp.id);

    return { processed: processedCount, remaining: remaining.length };
  } catch (err) {
    console.warn('[WhatsApp Queue] process error:', err.message);
    return { processed: 0, error: err.message };
  } finally {
    _isDrainingQueue = false;
  }
}

export async function sendWhatsAppAlert(config, type, payload, supabase = null, options = {}) {
  if (!config || !config.enabled || !config.serverUrl || !config.recipient) {
    return { ok: false, skipped: true, reason: 'WhatsApp alerts not configured or disabled' };
  }

  // SSRF Protection (CWE-918): Strictly ensure outbound serverUrl is public and safe
  const urlCheck = validateSafeExternalUrl(config.serverUrl);
  if (!urlCheck.ok) {
    return { ok: false, error: urlCheck.error, skipped: true };
  }

  const messageText = formatWhatsAppMessage(type, payload);
  const cleanServerUrl = urlCheck.cleanUrl || config.serverUrl.replace(/\/+$/, '');
  const instance = config.instanceName || 'darc-workspace';
  const recipient = normalizeWhatsAppNumber(config.recipient);
  if (!recipient) {
    return { ok: false, skipped: true, reason: 'Invalid recipient phone number format' };
  }

  // Anti-Spam: Suppress duplicate alerts for the same target within 30 seconds
  if (!options.isQueueDrain && isDuplicateAlert(recipient, type, messageText)) {
    return { ok: true, skipped: true, reason: 'Duplicate alert suppressed within 30s' };
  }

  // Anti-Ban: Defer night hours (11 PM – 7 AM AST) to the morning queue
  if (!options.isTest && !options.isQueueDrain && !isSafeHour()) {
    if (supabase) {
      await enqueueWhatsAppAlert(supabase, {
        config: {
          serverUrl: cleanServerUrl,
          apiKey: config.apiKey,
          instanceName: instance,
          provider: config.provider,
          enabled: true
        },
        recipient,
        type,
        payload
      });
      return { ok: true, queued: true, reason: 'Queued for morning delivery (safe hours start at 7:00 AM AST)' };
    }
    return { ok: true, skipped: true, reason: 'Outside safe sending hours (7AM–11PM AST)' };
  }

  // Anti-Ban: Circuit breaker — max 50 messages per day
  if (!options.isTest && isDailyLimitReached()) {
    console.warn('[WhatsApp] Daily send limit reached (50/day). Message suppressed.');
    return { ok: true, skipped: true, reason: 'Daily send limit reached' };
  }

  // Anti-Ban Serial Queue: Chain onto promise queue to enforce strict serial transmission
  const task = _whatsappQueuePromise.then(async () => {
    try {
      // Anti-Ban Hygiene: Random Human-like Delay (2000ms - 5000ms)
      const jitterMs = Math.floor(Math.random() * 3000) + 2000;
      await new Promise(r => setTimeout(r, jitterMs));

      // Support both Evolution API standard endpoint and generic webhook
      let targetEndpoint = `${cleanServerUrl}/message/sendText/${encodeURIComponent(instance)}`;
      let requestBody = {
        number: recipient,
        text: messageText,
        options: {
          delay: 1200,
          presence: 'composing',
          linkPreview: false
        }
      };

      if (config.provider === 'webhook') {
        targetEndpoint = cleanServerUrl;
        requestBody = {
          recipient,
          message: messageText,
          type,
          payload,
          timestamp: new Date().toISOString()
        };
      }

      const headers = {
        'Content-Type': 'application/json'
      };
      if (config.apiKey) {
        headers['apikey'] = config.apiKey;
        headers['Authorization'] = `Bearer ${config.apiKey}`;
      }

      const res = await fetch(targetEndpoint, {
        method: 'POST',
        headers,
        body: JSON.stringify(requestBody),
        signal: AbortSignal.timeout(6000)
      });

      if (!res.ok) {
        const errText = await res.text();
        return { ok: false, status: res.status, error: errText };
      }

      return { ok: true, sent: true };
    } catch (err) {
      return { ok: false, error: err.message };
    }
  });

  _whatsappQueuePromise = task.catch(() => {});
  return task;
}

/**
 * Dispatch alert directly to an individual user's personal WhatsApp phone number
 * (retrieved strictly from user profile custom_fields.phone — NEVER mocked or fabricated).
 */
export async function dispatchDirectNotificationAlert(supabase, userId, notificationData) {
  if (!userId || !supabase) return { ok: false, skipped: true };

  try {
    const config = await getWhatsAppConfig(supabase);
    if (!config || !config.enabled || !config.serverUrl) {
      return { ok: false, skipped: true };
    }

    // Strict: only fetch user's real phone from database
    const { data: userRec } = await supabase.from('users').select('id, name, custom_fields').eq('id', userId).maybeSingle();
    const rawPhone = userRec?.custom_fields?.phone;
    if (!rawPhone || typeof rawPhone !== 'string') {
      return { ok: false, skipped: true, reason: 'No phone number configured for this user' };
    }

    const cleanPhone = normalizeWhatsAppNumber(rawPhone);
    if (!cleanPhone || (!cleanPhone.includes('@g.us') && !/^[0-9]{8,16}$/.test(cleanPhone))) {
      return { ok: false, skipped: true, reason: 'Invalid user phone format' };
    }

    return await sendWhatsAppAlert({ ...config, recipient: cleanPhone }, 'direct_notification', notificationData, supabase);
  } catch (err) {
    console.warn('[WhatsApp] dispatchDirectNotificationAlert error:', err.message);
    return { ok: false, error: err.message };
  }
}
