import { Hono } from 'hono';
import { recordTelemetryHeartbeat, getTelemetryAnalytics, triggerManualAnomalyTest } from './telemetry.service.js';

const app = new Hono();

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

  return { deviceType, browser };
}

// 1. Analytics & Telemetry Overview for Admins & Performance Monitoring
app.get('/analytics', (c) => {
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
    const { deviceType, browser } = parseClientInfo(userAgent);

    const result = recordTelemetryHeartbeat(c.env, {
      userId,
      country,
      city,
      ip,
      deviceType,
      browser,
      durationSeconds: body.durationSeconds || 60,
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

// 3. Trigger Test Anomaly Alert (For testing the alerting system and push notification)
app.post('/test-anomaly', async (c) => {
  const userId = c.get('userId') || 'usr_demo';
  const result = triggerManualAnomalyTest(c.env, userId);
  return c.json({ ok: true, message: 'تم إطلاق فحص استهلاك الموارد بنجاح وإرسال التنبيه للإشعارات.', ...result });
});

export default app;
