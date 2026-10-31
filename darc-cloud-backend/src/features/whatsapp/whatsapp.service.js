// DARC Design Team — Low-Risk WhatsApp Notification Gateway Service
// Built on Evolution API / Baileys Multi-Device Protocol with Anti-Ban Hygiene

export function formatWhatsAppMessage(type, data) {
  const portalUrl = 'https://panel.darc-design.bond';
  switch (type) {
    case 'task_status': {
      const { taskTitle, projectName, statusAr, updatedBy, taskId } = data;
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
        `📋 *المهمة:* ${taskTitle}\n` +
        `🏢 *المشروع:* ${projectName}\n` +
        `🛑 *ملاحظة:* ${reason || 'بحاجة لتدخل وتوضيح هندسي'}\n` +
        `👤 *المبلغ:* ${blockedBy || 'مهندس الموقع'}\n` +
        `🔗 *فتح المهمة:* ${portalUrl}/#tasks\n` +
        `━━━━━━━━━━━━━━━━━━━━`
      );
    }
    default: {
      return (
        `🔔 *تنبيه من DARC Design Team*\n` +
        `━━━━━━━━━━━━━━━━━━━━\n` +
        `${data.text || 'تحديث جديد في مساحة العمل.'}\n` +
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
  const recipient = config.recipient.replace(/[^0-9@.-]/g, '');

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
