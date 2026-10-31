// DARC Design Team — Low-Risk WhatsApp Notification Gateway Service
// Built on Evolution API / Baileys Multi-Device Protocol with Anti-Ban Hygiene

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

export async function sendWhatsAppAlert(config, type, payload) {
  if (!config || !config.enabled || !config.serverUrl || !config.recipient) {
    return { ok: false, skipped: true, reason: 'WhatsApp alerts not configured or disabled' };
  }

  const messageText = formatWhatsAppMessage(type, payload);
  const cleanServerUrl = config.serverUrl.replace(/\/+$/, '');
  const instance = config.instanceName || 'darc-workspace';
  const recipient = normalizeWhatsAppNumber(config.recipient);
  if (!recipient) {
    return { ok: false, skipped: true, reason: 'Invalid recipient phone number format' };
  }

  try {
    // Anti-Ban Hygiene: Random Human-like Delay (800ms - 2200ms)
    const jitterMs = Math.floor(Math.random() * 1400) + 800;
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

    return await sendWhatsAppAlert({ ...config, recipient: cleanPhone }, 'direct_notification', notificationData);
  } catch (err) {
    console.warn('[WhatsApp] dispatchDirectNotificationAlert error:', err.message);
    return { ok: false, error: err.message };
  }
}
