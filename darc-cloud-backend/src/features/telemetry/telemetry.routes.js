import { Hono } from 'hono';
import {
  recordTelemetryHeartbeat,
  getTelemetryAnalytics,
  triggerManualAnomalyTest,
  recordErrorIncident,
  getIncidentsPerUser,
  resolveIncident,
  triggerManualIncidentTest
} from './telemetry.service.js';
import { sendEmail } from '../email/email.service.js';
import { getDB } from '../../core/db.js';
import { hasPermission } from '../../utils/permissions.js';

const app = new Hono();

app.use('*', async (c, next) => {
  c.set('supabase', getDB(c.env));
  await next();
});

const canViewAnalytics = async (c) => {
  const roleId = c.get('roleId');
  const userId = c.get('userId');
  const supabase = c.get('supabase');
  if (roleId === 'admin') return true;
  return (await hasPermission(supabase, userId, roleId, 'manage_settings')) ||
         (await hasPermission(supabase, userId, roleId, 'view_audit_logs'));
};

const canManageDiagnostics = async (c) => {
  const roleId = c.get('roleId');
  const userId = c.get('userId');
  const supabase = c.get('supabase');
  if (roleId === 'admin') return true;
  return await hasPermission(supabase, userId, roleId, 'manage_settings');
};

// Helper to extract device and browser from User-Agent
function parseClientInfo(userAgent = '') {
  const ua = userAgent.toLowerCase();
  let deviceType = 'desktop';
  if (/mobile|android|iphone|ipod/i.test(ua)) deviceType = 'mobile';
  else if (/tablet|ipad/i.test(ua)) deviceType = 'tablet';

  let browser = 'Chrome';
  if (ua.includes('edg/')) browser = 'Edge';
  else if (ua.includes('safari') && !ua.includes('chrome')) browser = 'Safari';
  else if (ua.includes('firefox')) browser = 'Firefox';

  let os = 'macOS';
  if (ua.includes('win')) os = 'Windows';
  else if (ua.includes('android')) os = 'Android';
  else if (ua.includes('iphone') || ua.includes('ipad')) os = 'iOS';
  else if (ua.includes('linux')) os = 'Linux';

  return { deviceType, browser, os };
}

// 1. Analytics & Telemetry Overview for Admins & Performance Monitoring
app.get('/analytics', async (c) => {
  if (!(await canViewAnalytics(c))) {
    return c.json({ error: 'غير مصرح لك بعرض لوحة التحليلات والمراقبة' }, 403);
  }
  const analytics = getTelemetryAnalytics();
  return c.json({ ok: true, data: analytics });
});

// 2. Client Telemetry Heartbeat (Receives active session ping & resource stats)
app.post('/heartbeat', async (c) => {
  try {
    const body = await c.req.json().catch(() => ({}));
    const userId = c.get('userId') || body.userId || 'anonymous';
    
    // Cloudflare Edge Geolocation detection
    const country = c.req.header('cf-ipcountry') || c.req.raw?.cf?.country || body.country || 'AE';
    const city = c.req.header('cf-ipcity') || c.req.raw?.cf?.city || body.city || (country === 'AE' ? 'Dubai' : 'Riyadh');
    const ip = c.req.header('cf-connecting-ip') || c.req.header('x-forwarded-for') || '127.0.0.1';
    const userAgent = c.req.header('user-agent') || '';
    const parsedClient = parseClientInfo(userAgent);
    const deviceType = body.deviceType || parsedClient.deviceType;
    const browser = body.browser || parsedClient.browser;
    const os = body.os || parsedClient.os;

    const result = recordTelemetryHeartbeat(c.env, {
      userId,
      sessionId: body.sessionId,
      visitorId: body.visitorId,
      isNewVisit: Boolean(body.isNewVisit),
      country,
      city,
      ip,
      deviceType,
      browser,
      os,
      durationSeconds: body.durationSeconds || 45,
      memoryMb: body.memoryMb || 0,
      errorCount: body.errorCount || 0,
      longTaskCount: body.longTaskCount || 0,
      currentView: body.currentView || 'dashboard'
    });

    return c.json({ ok: true, ...result });
  } catch (err) {
    return c.json({ ok: false, error: err.message }, 500);
  }
});

// Anti-Abuse & Rate Limiting for Public Error Reporting
const _errorReportLimits = new Map(); // ip -> { count: number, resetAt: number }
const _errorDeduplication = new Map(); // hash -> timestamp

function isErrorReportRateLimited(ip) {
  const now = Date.now();
  let item = _errorReportLimits.get(ip);
  if (!item || now > item.resetAt) {
    item = { count: 1, resetAt: now + 10 * 60 * 1000 }; // 10 minutes window
    _errorReportLimits.set(ip, item);
    return false;
  }
  item.count += 1;
  return item.count > 6; // Max 6 incident reports per 10 minutes per IP
}

function isDuplicateErrorReport(ip, errorKey) {
  const now = Date.now();
  const hash = `${ip}:${errorKey}`;
  const lastTime = _errorDeduplication.get(hash);
  if (lastTime && now - lastTime < 5 * 60 * 1000) {
    return true; // Duplicate report within 5 minutes
  }
  _errorDeduplication.set(hash, now);
  // Auto-prune old entries
  if (_errorDeduplication.size > 200) {
    for (const [k, v] of _errorDeduplication.entries()) {
      if (now - v > 10 * 60 * 1000) _errorDeduplication.delete(k);
    }
  }
  return false;
}

// 3. Report Client Error / Incident (Captures rich details and triggers email & in-app alerts)
app.post('/report-error', async (c) => {
  try {
    const ip = c.req.header('cf-connecting-ip') || c.req.header('x-forwarded-for') || '127.0.0.1';

    // Anti-Abuse Guard: Prevent Denial-of-Service / Email Flood
    if (isErrorReportRateLimited(ip)) {
      return c.json({ ok: false, error: 'تم إرسال عدد كبير من البلاغات في فترة قصيرة، يرجى الانتظار.' }, 429);
    }

    const body = await c.req.json().catch(() => ({}));
    const rawErrMsg = String(body.errorMessage || body.message || '').slice(0, 500);

    // Deduplication: Suppress repeated email storm if identical error occurs repeatedly
    if (isDuplicateErrorReport(ip, rawErrMsg)) {
      return c.json({ ok: true, deduplicated: true, message: 'تم استلام وتوثيق هذا الخطأ مسبقاً.' });
    }

    // Anti-Spoofing: Unauthenticated clients cannot impersonate arbitrary registered users
    const authenticatedUserId = c.get('userId');
    const userId = authenticatedUserId || (body.userId === 'usr_demo' ? 'usr_demo' : 'anonymous');

    // Cloudflare Edge Geolocation detection
    const country = c.req.header('cf-ipcountry') || c.req.raw?.cf?.country || body.country || 'AE';
    const city = c.req.header('cf-ipcity') || c.req.raw?.cf?.city || body.city || (country === 'AE' ? 'Dubai' : 'Riyadh');
    const userAgent = c.req.header('user-agent') || '';
    const { deviceType, browser, os } = parseClientInfo(userAgent);

    const result = await recordErrorIncident(c.env, {
      ...body,
      userId,
      country,
      city,
      ip,
      deviceType: body.deviceType || deviceType,
      browser: body.browser || browser,
      os: body.os || os
    });

    return c.json({ ok: true, message: 'تم تسجيل تفاصيل المشكلة بنجاح وإرسال التنبيه البريدي للإدارة.', ...result });
  } catch (err) {
    return c.json({ ok: false, error: err.message }, 500);
  }
});

// 4. Get User Incidents & Diagnostics Breakdown
app.get('/incidents', async (c) => {
  if (!(await canManageDiagnostics(c))) {
    return c.json({ error: 'غير مصرح لك بعرض تشخيصات وسجلات الأعطال' }, 403);
  }
  const isDemo = c.get('isDemo') || c.get('userId') === 'usr_demo';
  const userIdFilter = c.req.query('userId') || null;
  const supabase = isDemo ? null : c.get('supabase');
  const result = await getIncidentsPerUser(supabase, userIdFilter, isDemo);
  return c.json(result);
});

// 5. Resolve an Incident
app.patch('/incidents/:id/resolve', async (c) => {
  if (!(await canManageDiagnostics(c))) {
    return c.json({ error: 'غير مصرح لك بمعالجة بلاغات الأعطال' }, 403);
  }
  const incidentId = c.req.param('id');
  const userId = c.get('userId') || 'Admin';
  const result = resolveIncident(incidentId, userId);
  return c.json(result);
});

// 6. Trigger Test Incident (Simulates a deep error report + email alert)
app.post('/test-error', async (c) => {
  if (!(await canManageDiagnostics(c))) {
    return c.json({ error: 'غير مصرح لك بإجراء محاكاة للأعطال' }, 403);
  }
  const isDemo = c.get('isDemo') || c.get('userId') === 'usr_demo';
  const body = await c.req.json().catch(() => ({}));
  const userId = isDemo ? 'usr_demo_arch' : (body.userId || c.get('userId') || 'usr_demo_arch');
  const result = await triggerManualIncidentTest(c.env, userId);
  return c.json({ ok: true, message: 'تم إطلاق فحص تجريبي للأخطاء وإرسال تنبيه بالبريد الإلكتروني للإدارة.', ...result });
});

// 7. Test Alert Email Dispatch directly
app.post('/test-email', async (c) => {
  if (!(await canManageDiagnostics(c))) {
    return c.json({ error: 'غير مصرح لك باختبار التنبيهات البريدية' }, 403);
  }
  const isDemo = c.get('isDemo') || c.get('userId') === 'usr_demo';
  if (isDemo) {
    return c.json({ ok: true, isDemo: true, message: 'تمت محاكاة إرسال البريد التجريبي بنجاح في بيئة العرض (لن يتم إرسال بريد فعلي).' });
  }
  try {
    const body = await c.req.json().catch(() => ({}));
    let recipient = c.env?.ALERT_EMAIL || 'admin@darc-design.bond';
    if (body.to) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const cleanEmail = String(body.to).trim().toLowerCase();
      if (!emailRegex.test(cleanEmail)) {
        return c.json({ error: 'صيغة البريد الإلكتروني المدخلة غير صالحة.' }, 400);
      }
      recipient = cleanEmail;
    }
    const subject = '🔔 [تجربة البريد] اختبار نظام تنبيهات الأخطاء والحماية لمنصة DARC';
    const html = `
      <div style="font-family:sans-serif;direction:rtl;text-align:right;padding:20px;background:#0f172a;color:#f8fafc;border-radius:10px;">
        <h2 style="color:#38bdf8;margin:0 0 10px;">✅ اختبار وصول التنبيهات البريدية بنجاح</h2>
        <p style="color:#94a3b8;font-size:14px;line-height:1.6;">تم التحقق من جاهزية خادم التنبيهات لإرسال تفاصيل أي أخطاء أو أعطال تواجه المهندسين والمستخدمين في منصة DARC Design Team.</p>
        <div style="background:#1e293b;padding:12px 16px;border-radius:6px;font-size:12px;margin:15px 0;">
          <strong>تاريخ الفحص:</strong> ${new Date().toLocaleString('ar-AE')}<br>
          <strong>المستلم:</strong> ${recipient}
        </div>
      </div>
    `;
    const result = await sendEmail(c.env, { to: recipient, subject, html });
    return c.json({ ok: true, message: 'تم اختبار نظام الإرسال البريدي بنجاح.', ...result });
  } catch (err) {
    return c.json({ ok: false, error: err.message }, 500);
  }
});

// 8. Trigger Test Anomaly Alert (For testing anomaly detection)
app.post('/test-anomaly', async (c) => {
  if (!(await canManageDiagnostics(c))) {
    return c.json({ error: 'غير مصرح لك بإجراء محاكاة التنبيهات' }, 403);
  }
  const userId = c.get('userId') || 'usr_demo';
  const result = triggerManualAnomalyTest(c.env, userId);
  return c.json({ ok: true, message: 'تم إطلاق فحص استهلاك الموارد بنجاح وإرسال التنبيه للإشعارات والبريد.', ...result });
});

export default app;
