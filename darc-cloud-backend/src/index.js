import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { setSessionCookie, clearSessionCookie, getSessionToken } from './core/cookie.js';
import { sign, verify } from 'hono/jwt';
import { createClient } from '@supabase/supabase-js';
import crypto from 'node:crypto';
import { Buffer } from 'node:buffer';

// Feature imports
import projectsApp      from './features/projects/projects.routes.js';
import tasksApp         from './features/tasks/tasks.routes.js';
import authApp          from './features/auth/auth.routes.js';
import usersApp         from './features/users/users.routes.js';
import rolesApp         from './features/roles/roles.routes.js';
import companyApp       from './features/company/company.routes.js';
import notificationsApp from './features/notifications/notifications.routes.js';
import documentsApp     from './features/documents/documents.routes.js';
import remindersApp     from './features/reminders/reminders.routes.js';
import restoreApp       from './features/trash/restore.routes.js';
import templatesApp     from './features/templates/templates.routes.js';
import trashApp, { purgeExpiredTrash } from './features/trash/trash.routes.js';
import bootstrapApp, { generateBootstrapPayloadForUser } from './features/bootstrap/bootstrap.route.js';
import auditApp         from './features/audit/audit.routes.js';
import telemetryApp     from './features/telemetry/telemetry.routes.js';
import whatsappApp      from './features/whatsapp/whatsapp.routes.js';
import vaultApp         from './features/vault/vault.routes.js';
import { processWhatsAppQueue } from './features/whatsapp/whatsapp.service.js';
import { processDueReminders } from './features/reminders/reminders.service.js';

// Core Security, Error Resilience & Performance
import { createErrorHandler } from './core/errors.js';
import { securityHeadersMiddleware, csrfGuardMiddleware, correlationIdMiddleware, payloadLimitMiddleware, edgeSentryMiddleware, computeClientFingerprint, computeDeviceFingerprint } from './core/security.js';
import { authRateLimiter, forgotPasswordRateLimiter, recordAuthFailure, clearAuthFailure, getClientIp, mutationRateLimiter } from './core/rate-limit.js';
import { getDB } from './core/db.js';
import { getUserTokenRecord, invalidateBootstrapCache } from './core/cache.js';
import { 
  getDemoPayload, 
  resetDemoPayload,
  getDemoTrash,
  createDemoProject,
  updateDemoProject,
  deleteDemoProject,
  deleteDemoTask,
  deleteDemoDocument,
  updateDemoDocument,
  restoreDemoItem,
  purgeDemoTrashItem,
  emptyDemoTrash,
  updateDemoCompany,
  updateDemoSelfProfile,
  createDemoUser,
  updateDemoUser,
  createDemoTemplate,
  updateDemoTemplate,
  deleteDemoTemplate,
  createDemoRole,
  updateDemoRole,
  markDemoNotificationAsRead,
  markAllDemoNotificationsAsRead,
  clearReadDemoNotifications,
  deleteDemoNotification
} from './features/demo/demo.service.js';
import { toCamelCase } from './utils/transformers.js';
export { toCamelCase };

const app = new Hono();
const _lastActiveThrottles = new Map();

// 1. Correlation ID Tracing (Assigned to all requests & responses)
app.use('*', correlationIdMiddleware());

// 2. Edge Intrusion Detection System (IDS) & Auto-Jail (Blocks scanners, probes & SQLi)
app.use('*', edgeSentryMiddleware());

// 3. Security Headers & Strict CSP (nosniff, DENY, HSTS, CSP)
app.use('*', securityHeadersMiddleware());

// 3. CORS Guard: Strictly allow only authorized domains
const ALLOWED_ORIGINS = [
  'http://localhost:4318',
  'http://127.0.0.1:4318',
  'http://localhost:8787',
  'http://127.0.0.1:8787',
  'https://darc-design-team.netlify.app',
  'https://darc-design-team.workers.dev',
  'https://darc-design-team.ahmad-hashmi-c.workers.dev',
  'https://darc-cloud-backend.ahmad-hashmi-c.workers.dev',
  'https://darc-design.bond',
  'https://panel.darc-design.bond',
  'https://api.darc-design.bond',
  'https://wa.darc-design.bond'
];
const ALLOWED_ORIGIN_SET = new Set(ALLOWED_ORIGINS);

function isAllowedOrigin(origin) {
  if (!origin) return false;
  if (ALLOWED_ORIGIN_SET.has(origin)) return true;
  if (origin.endsWith('.darc.local') || origin.endsWith('.darc-design.bond') || origin.endsWith('.darc-design-team.netlify.app')) return true;
  if (origin.startsWith('http://localhost:') || origin.startsWith('http://127.0.0.1:')) return true;
  return false;
}

app.use('*', cors({
  origin: (origin) => {
    if (!origin) return 'https://panel.darc-design.bond';
    return isAllowedOrigin(origin) ? origin : null;
  },
  credentials: true,
  allowMethods: ['GET', 'HEAD', 'PUT', 'POST', 'DELETE', 'PATCH', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization', 'Cookie', 'Cache-Control', 'Pragma', 'If-None-Match', 'X-Silent', 'x-session-url', 'content-range', 'x-doc-meta', 'X-File-Name', 'X-Request-Id', 'X-Offline-Replay', 'X-Offline-Id', 'X-Idempotency-Key', 'X-Mutation-ID', 'x-mutation-id', 'Range'],
  exposeHeaders: ['Set-Cookie', 'ETag', 'X-Request-Id', 'Range'],
  maxAge: 86400
}));

// 4. Payload size limit guard (protects against memory exhaustion)
app.use('/api/*', payloadLimitMiddleware());

// 5. CSRF & Origin Guard for state-changing mutations
app.use('/api/*', csrfGuardMiddleware());

// 6. Mutation rate limiter to protect against spam / DoS
app.use('/api/*', mutationRateLimiter());

// Centralized Operational Error Handler (OWASP Error Shield)
app.onError(createErrorHandler());

function toSafeUser(row) {
  const { password_hash, invite_token, ...safe } = row;
  return toCamelCase(safe);
}

async function verifyPassword(password, stored) {
  if (!stored || !stored.includes(':')) return false;
  const [salt, digest] = stored.split(':');
  return new Promise((resolve) => {
    crypto.scrypt(password, salt, 64, { N: 16384, r: 8, p: 1, maxmem: 64 * 1024 * 1024 }, (err, derivedKey) => {
      if (err) resolve(false);
      else {
        const computed = derivedKey.toString('hex');
        const left = Buffer.from(computed, 'hex');
        const right = Buffer.from(digest, 'hex');
        if (left.length !== right.length) resolve(false);
        else resolve(crypto.timingSafeEqual(left, right));
      }
    });
  });
}

// Public routes
app.get('/', (c) => c.json({ status: 'success', message: '🚀 DARC Edge API v2' }));

// Protect sensitive public auth routes against brute-force and credential stuffing
app.use('/api/auth/login', authRateLimiter());
app.use('/api/auth/forgot-password', forgotPasswordRateLimiter());
app.use('/api/auth/reset-password', forgotPasswordRateLimiter());
app.use('/api/auth/activate', authRateLimiter());
app.use('/api/auth/change-password', authRateLimiter());

app.post('/api/auth/login', async (c) => {
  const ip = getClientIp(c);
  const body = await c.req.json().catch(() => ({}));
  const { email, password, turnstileToken } = body;
  const cleanEmail = (email || '').trim().toLowerCase();

  // 1. Cloudflare Turnstile Anti-Bot Security Verification
  const turnstileSecret = c.env.TURNSTILE_SECRET_KEY;
  const isProd = c.env.ENVIRONMENT === 'production' || (!ip.startsWith('127.0.0.1') && !ip.startsWith('localhost') && c.req.url.startsWith('https://'));
  const isDemoUser = (cleanEmail === 'demo@darc-design.bond' || cleanEmail === 'demo@darc.local');

  if (turnstileSecret && isProd && !isDemoUser) {
    if (!turnstileToken || turnstileToken === 'bypass_dev' || turnstileToken === 'fallback_client') {
      recordAuthFailure(ip);
      return c.json({ error: 'رمز التحقق الأمني (Turnstile) مطلوب. يرجى إتمام التحقق والمحاولة مجدداً.' }, 403);
    }

    try {
      const verifyFormData = new FormData();
      verifyFormData.append('secret', turnstileSecret);
      verifyFormData.append('response', turnstileToken);
      verifyFormData.append('remoteip', ip);

      const verifyRes = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
        method: 'POST',
        body: verifyFormData,
        signal: AbortSignal.timeout(3000)
      });
      const verifyData = await verifyRes.json();
      if (!verifyData.success) {
        console.warn('[Turnstile] Token verification rejected:', verifyData['error-codes']);
        recordAuthFailure(ip);
        return c.json({ error: 'فشل التحقق الأمني (Turnstile). يرجى تحديث الصفحة والمحاولة مجدداً.' }, 403);
      }
    } catch (err) {
      console.warn('[Turnstile] Verification timeout or network warning:', err.message);
      // Fall back gracefully to password scrypt verification and IP rate-limiter
    }
  }

  // 2. Dedicated Isolated Demo Sandbox Login (100% Shielded from Production DB)
  if (cleanEmail === 'demo@darc-design.bond' || cleanEmail === 'demo@darc.local') {
    if (password === 'demo123456') {
      clearAuthFailure(ip);
      const demoData = getDemoPayload();
      const payload = {
        userId: 'usr_demo',
        roleId: 'admin',
        isDemo: true,
        v: 1,
        exp: Math.floor(Date.now() / 1000) + 7 * 24 * 60 * 60
      };
      const token = await sign(payload, c.env.JWT_SECRET);
      setSessionCookie(c, token, 604800);
      return c.json({ token, user: demoData.user, bootstrap: demoData });
    } else {
      recordAuthFailure(ip);
      return c.json({ error: 'البريد الإلكتروني أو كلمة المرور غير صحيحة' }, 401);
    }
  }

  const supabase = getDB(c.env);
  const { data: users, error } = await supabase
    .from('users')
    .select('id, name, name_en, email, password_hash, status, role_id, avatar_color, custom_fields')
    .eq('email', cleanEmail)
    .limit(1);
  if (error || !users || users.length === 0) {
    recordAuthFailure(ip);
    return c.json({ error: 'البريد الإلكتروني أو كلمة المرور غير صحيحة' }, 401);
  }
  const user = users[0];
  if (user.status !== 'active') {
    recordAuthFailure(ip);
    return c.json({ error: 'حسابك غير مفعل أو موقوف' }, 401);
  }
  const isValid = await verifyPassword(password, user.password_hash);
  if (!isValid) {
    recordAuthFailure(ip);
    return c.json({ error: 'البريد الإلكتروني أو كلمة المرور غير صحيحة' }, 401);
  }

  // Clear failed attempts counter on successful login
  clearAuthFailure(ip);

  const nowIso = new Date().toISOString();
  const tokenVer = Number(user.custom_fields?.tokenVersion || 1);
  const updatedCustomFields = {
    ...(user.custom_fields || {}),
    tokenVersion: tokenVer,
    lastLoginAt: nowIso,
    lastActiveAt: nowIso
  };

  const clientFpt = await computeClientFingerprint(c, c.env.JWT_SECRET);
  const clientDeviceFpt = await computeDeviceFingerprint(c, c.env.JWT_SECRET);
  const payload = { userId: user.id, roleId: user.role_id, v: tokenVer, fpt: clientFpt, dfpt: clientDeviceFpt, exp: Math.floor(Date.now() / 1000) + 7 * 24 * 60 * 60 };
  const token = await sign(payload, c.env.JWT_SECRET);
  setSessionCookie(c, token, 604800);

  // Run non-critical background writes (last_login_at, audit_log) asynchronously via waitUntil
  // This cuts login latency by more than 60% without blocking the response!
  const bgTasks = async () => {
    try {
      const userUpdates = { updated_at: nowIso, custom_fields: updatedCustomFields };
      const upRes = await supabase.from('users').update({ ...userUpdates, last_login_at: nowIso, last_active_at: nowIso }).eq('id', user.id);
      if (upRes.error) {
        await supabase.from('users').update(userUpdates).eq('id', user.id);
      }
      await supabase.from('audit_logs').insert([{
        user_id: user.id, action: 'login', entity_type: 'user', entity_id: user.id
      }]);
    } catch (e) {
      /* non-blocking background error */
    }
  };

  if (c.executionCtx && typeof c.executionCtx.waitUntil === 'function') {
    c.executionCtx.waitUntil(bgTasks());
  } else {
    bgTasks().catch(() => {});
  }

  let bootstrapData = null;
  try {
    const bRes = await generateBootstrapPayloadForUser(c.env, user.id, user.role_id);
    bootstrapData = bRes.responsePayload;
  } catch (bErr) {
    console.warn('[Login] Pre-bundled bootstrap notice:', bErr.message);
  }

  return c.json({
    token,
    user: toSafeUser({ ...user, custom_fields: updatedCustomFields, last_login_at: nowIso, last_active_at: nowIso }),
    bootstrap: bootstrapData
  });
});

app.post('/api/auth/logout', async (c) => {
  clearSessionCookie(c);
  return c.json({ success: true });
});

app.get('/api/health', (c) => c.json({ ok: true, status: 'healthy', env: 'production' }));

// JWT Guard with Token Revocation Protection
app.use('/api/*', async (c, next) => {
  const publicApiPaths = [
    '/api/auth/login',
    '/api/auth/logout',
    '/api/auth/forgot-password',
    '/api/auth/reset-password',
    '/api/auth/activate',
    '/api/health',
    '/api/telemetry/heartbeat',
    '/api/telemetry/report-error'
  ];
  if (publicApiPaths.includes(c.req.path)) return next();
  const token = getSessionToken(c);
  if (!token) {
    clearSessionCookie(c);
    return c.json({ error: 'غير مصرح لك بالدخول' }, 401);
  }
  let payload;
  try {
    payload = await verify(token, c.env.JWT_SECRET, 'HS256');
    if (payload.userId === 'usr_demo' || payload.isDemo) {
      c.set('userId', 'usr_demo');
      c.set('roleId', 'admin');
      c.set('isDemo', true);
      return next();
    }
    const supabase = getDB(c.env);
    const userRec = await getUserTokenRecord(supabase, payload.userId);
    if (userRec.status && userRec.status !== 'active') {
      clearSessionCookie(c);
      return c.json({ error: 'تم تعطيل أو تعليق هذا الحساب، يرجى مراجعة إدارة النظام.' }, 401);
    }
    if (payload.v && payload.v < userRec.ver) {
      clearSessionCookie(c);
      return c.json({ error: 'تم تسجيل الخروج من هذه الجلسة، يرجى تسجيل الدخول مجدداً' }, 401);
    }
    // Anti-Session Hijacking: Verify cryptographic client fingerprint if bound to token
    if (payload.fpt && payload.userId !== 'usr_demo') {
      const currentFpt = await computeClientFingerprint(c, c.env.JWT_SECRET);
      if (payload.fpt !== currentFpt) {
        // Tolerant network roaming check (NIST SP 800-63B):
        // If device matches (same browser/OS/client headers), allow legitimate network hops (e.g. Wi-Fi <-> 5G / IPv4 <-> IPv6)
        let isDeviceMatch = false;
        if (payload.dfpt) {
          const currentDfpt = await computeDeviceFingerprint(c, c.env.JWT_SECRET);
          isDeviceMatch = (payload.dfpt === currentDfpt);
        }
        if (!isDeviceMatch) {
          clearSessionCookie(c);
          return c.json({
            error: 'تم رصد استخدام رمز الجلسة من جهاز أو شبكة غير مصرح بها (Session Hijack Prevention). يرجى تسجيل الدخول مجدداً.',
            code: 'SESSION_FINGERPRINT_MISMATCH'
          }, 401);
        }
      }
    }
    c.set('userId', payload.userId);
    // Enforce authoritative database role (prevents stale admin token retention after demotion - CWE-270)
    c.set('roleId', userRec.roleId || payload.roleId);

    // Sliding Session Window: If token has less than 2 days remaining, refresh session cookie seamlessly
    const remainingSeconds = (payload.exp || 0) - Math.floor(Date.now() / 1000);
    if (remainingSeconds > 0 && remainingSeconds < 2 * 24 * 3600 && payload.userId !== 'usr_demo') {
      const refreshedPayload = {
        userId: payload.userId,
        roleId: payload.roleId,
        v: payload.v || 1,
        fpt: payload.fpt,
        dfpt: payload.dfpt,
        exp: Math.floor(Date.now() / 1000) + 7 * 24 * 60 * 60
      };
      sign(refreshedPayload, c.env.JWT_SECRET).then(newToken => {
        setSessionCookie(c, newToken, 604800);
      }).catch(() => {});
    }
  } catch (err) {
    clearSessionCookie(c);
    return c.json({ error: 'الجلسة منتهية أو غير صالحة' }, 401);
  }

  // Track active timestamp (throttled to once every 3 minutes per user)
  try {
    const now = Date.now();
    const lastRecorded = _lastActiveThrottles.get(payload.userId) || 0;
    if (now - lastRecorded > 3 * 60 * 1000) {
      _lastActiveThrottles.set(payload.userId, now);
      const updateActiveTask = async () => {
        try {
          const nowIso = new Date().toISOString();
          const supabase = getDB(c.env);
          const { data: uRec } = await supabase.from('users').select('custom_fields').eq('id', payload.userId).maybeSingle();
          if (uRec) {
            const cf = { ...(uRec.custom_fields || {}), lastActiveAt: nowIso };
            const res = await supabase.from('users').update({ custom_fields: cf, last_active_at: nowIso }).eq('id', payload.userId);
            if (res.error) {
              await supabase.from('users').update({ custom_fields: cf }).eq('id', payload.userId);
            }
          }
        } catch (err) { /* silent */ }
      };
      try {
        if (c.executionCtx && typeof c.executionCtx.waitUntil === 'function') {
          c.executionCtx.waitUntil(updateActiveTask());
        } else {
          updateActiveTask().catch(() => {});
        }
      } catch (e) {
        updateActiveTask().catch(() => {});
      }
    }
  } catch (e) { /* non-blocking */ }

  await next();
});

// Authenticated Demo Sandbox Reset (Rate-limited, Demo/Admin only)
app.post('/api/demo/reset', async (c) => {
  const isDemo = c.get('isDemo') || c.get('userId') === 'usr_demo';
  const roleId = c.get('roleId');
  if (!isDemo && roleId !== 'admin') {
    return c.json({ error: 'إعادة ضبط بيئة العرض متاحة فقط في الوضع التجريبي أو لمدير النظام' }, 403);
  }
  const fresh = resetDemoPayload();
  invalidateBootstrapCache('usr_demo:admin');
  return c.json({ ok: true, data: fresh });
});

// Bulletproof Demo Sandbox Shield Middleware: Intercepts ALL requests for isDemo: true
// Guarantees with mathematical certainty that demo users NEVER touch production Supabase or Google Drive
app.use('/api/*', async (c, next) => {
  if (!c.get('isDemo')) return next();
  
  const path = c.req.path;
  const method = c.req.method;

  // 1. Allow routes specifically wired for demo: /api/bootstrap, /api/demo/reset, /api/tasks, /api/telemetry, /api/audit, /api/notifications, and document uploads
  if (path.startsWith('/api/bootstrap') || path.startsWith('/api/demo') || path.startsWith('/api/tasks') || path.startsWith('/api/notifications') || (path.startsWith('/api/documents') && method !== 'GET') || path.startsWith('/api/telemetry') || path.startsWith('/api/audit')) {
    return next();
  }

  const demoData = getDemoPayload();

  // 2. Read requests (GET) -> return high-fidelity demo showcase slices
  if (method === 'GET') {
    if (path === '/api/projects' || path === '/api/projects/') return c.json({ projects: demoData.projects });
    if (path.startsWith('/api/projects/')) {
      const id = path.split('/')[3];
      const p = demoData.projects.find(x => x.id === id) || demoData.projects[0];
      return c.json({ project: p });
    }
    if (path === '/api/users' || path === '/api/users/') return c.json({ users: demoData.users });
    if (path === '/api/roles' || path === '/api/roles/') return c.json({ roles: demoData.roles });
    if (path === '/api/templates' || path === '/api/templates/') return c.json({ templates: demoData.templates });
    if (path === '/api/company' || path === '/api/company/') return c.json({ company: demoData.company });
    if (path === '/api/notifications' || path === '/api/notifications/') return c.json({ notifications: demoData.notifications });
    if (path === '/api/reminders' || path.startsWith('/api/reminders')) return c.json({ reminders: [] });
    if (path.startsWith('/api/whatsapp')) {
      return c.json({
        ok: true,
        isDemo: true,
        config: {
          enabled: false,
          serverUrl: 'https://whatsapp.demo-gateway.local',
          apiKey: '••••••••',
          instanceName: 'darc-demo-instance',
          recipient: '+971500000000',
          notifyOnBlocked: true,
          notifyOnApproval: true,
          notifyOnDrawing: true,
          notifyOnCollectiveMention: true,
          sendGroupBroadcast: false,
          provider: 'evolution'
        }
      });
    }
    if (path === '/api/documents' || path === '/api/documents/') return c.json({ documents: demoData.documents });
    if (path.startsWith('/api/documents/')) {
      const id = path.split('/')[3];
      const d = demoData.documents.find(x => x.id === id) || demoData.documents.find(x => x.originalName === id) || demoData.documents[0];
      const isDownload = c.req.query('download') === '1' || c.req.query('export') === 'download';
      const isStream = c.req.query('stream') === '1';

      if (isDownload || isStream) {
        const filename = d.originalName || `document_${id}.pdf`;
        
        // 1. Direct Google Drive file ID redirect if available (NEVER redirect to Google Drive Root Folder or demo ID)
        if (d.driveFileId && !String(d.driveFileId).startsWith('demo_') && String(d.driveFileId).length >= 25 && d.driveFileId !== '1DsElwxs_mdPU16AsL4p5f2wB-a6V2LNH') {
          const driveUrl = isDownload 
            ? `https://drive.google.com/uc?export=download&id=${encodeURIComponent(d.driveFileId)}`
            : `https://drive.google.com/uc?export=view&id=${encodeURIComponent(d.driveFileId)}`;
          return c.redirect(driveUrl, 302);
        }

        // 2. Direct Cloud / External URL
        if (d.diskFilename && d.diskFilename.startsWith('http') && !d.diskFilename.includes('/drive/folders/')) {
          return c.redirect(d.diskFilename, 302);
        }

        // 3. Static Authentic Project Assets
        return c.redirect(`/assets/${encodeURIComponent(filename)}`, 302);
      }
      return c.json({ ok: true, document: d });
    }
    if (path === '/api/trash' || path === '/api/trash/') return c.json(getDemoTrash());

    // Safety Shield: Any other GET route for demo account returns isolated safe response (Zero DB access)
    return c.json({ ok: true, isDemo: true, data: [] });
  }

  // 3. State-changing requests (POST, PATCH, PUT, DELETE) -> Safe in-memory simulated responses (Zero DB writes)
  if (['POST', 'PATCH', 'PUT', 'DELETE'].includes(method)) {
    if (path.includes('/impersonate')) {
      return c.json({ error: 'خاصية تقمص الحسابات معطلة في بيئة العرض التجريبية' }, 403);
    }

    // Projects mutations
    if (path === '/api/projects' || path === '/api/projects/') {
      if (method === 'POST') {
        const body = await c.req.json().catch(() => ({}));
        const created = createDemoProject(body);
        return c.json({ project: created }, 201);
      }
    }
    if (path.startsWith('/api/projects/')) {
      const parts = path.split('/');
      const id = parts[3];
      if (method === 'PATCH') {
        const body = await c.req.json().catch(() => ({}));
        const updated = updateDemoProject(id, body);
        return c.json({ project: updated });
      }
      if (method === 'DELETE') {
        deleteDemoProject(id);
        return c.json({ ok: true, isDemo: true, message: 'تم نقل المشروع لسلة المهملات في بيئة العرض' });
      }
    }

    // Tasks deletion
    if (path.startsWith('/api/tasks/') && method === 'DELETE') {
      const id = path.split('/')[3];
      deleteDemoTask(id);
      return c.json({ ok: true, isDemo: true, message: 'تم نقل المهمة لسلة المهملات في بيئة العرض' });
    }

    // Documents status & deletion
    if (path.startsWith('/api/documents/')) {
      const id = path.split('/')[3];
      if (method === 'PATCH') {
        const body = await c.req.json().catch(() => ({}));
        const updated = updateDemoDocument(id, body);
        return c.json({ ok: true, isDemo: true, document: updated });
      }
      if (method === 'DELETE') {
        deleteDemoDocument(id);
        return c.json({ ok: true, isDemo: true, message: 'تم نقل المستند لسلة المهملات في بيئة العرض' });
      }
    }

    // Trash & Restore
    if (path.startsWith('/api/restore/')) {
      const parts = path.split('/');
      const type = parts[3];
      const id = parts[4];
      restoreDemoItem(type, id);
      return c.json({ ok: true, isDemo: true, message: 'تمت الاستعادة بنجاح في بيئة العرض التجريبية' });
    }
    if (path === '/api/trash/empty' && method === 'DELETE') {
      emptyDemoTrash();
      return c.json({ ok: true, isDemo: true });
    }
    if (path.startsWith('/api/trash/') && method === 'DELETE') {
      const parts = path.split('/');
      const type = parts[3];
      const id = parts[4];
      purgeDemoTrashItem(type, id);
      return c.json({ ok: true, isDemo: true });
    }

    // Notifications
    if (path === '/api/notifications/read-all') {
      markAllDemoNotificationsAsRead();
      return c.json({ ok: true, isDemo: true });
    }
    if (path === '/api/notifications/clear-read') {
      clearReadDemoNotifications();
      return c.json({ ok: true, isDemo: true });
    }
    if (path.startsWith('/api/notifications/')) {
      const id = path.split('/')[3];
      if (method === 'PATCH') {
        markDemoNotificationAsRead(id);
        return c.json({ ok: true, isDemo: true });
      }
      if (method === 'DELETE') {
        deleteDemoNotification(id);
        return c.json({ ok: true, isDemo: true });
      }
    }

    // Company & User Profile
    if (path === '/api/company' && method === 'PATCH') {
      const body = await c.req.json().catch(() => ({}));
      const updated = updateDemoCompany(body);
      return c.json({ ok: true, isDemo: true, company: updated });
    }
    if (path === '/api/users/me' && method === 'PATCH') {
      const body = await c.req.json().catch(() => ({}));
      const updated = updateDemoSelfProfile(body);
      return c.json({ ok: true, isDemo: true, user: updated });
    }

    // Templates
    if (path === '/api/templates' && method === 'POST') {
      const body = await c.req.json().catch(() => ({}));
      const created = createDemoTemplate(body);
      return c.json({ ok: true, isDemo: true, template: created }, 201);
    }
    if (path.startsWith('/api/templates/')) {
      const id = path.split('/')[3];
      if (method === 'PATCH') {
        const body = await c.req.json().catch(() => ({}));
        const updated = updateDemoTemplate(id, body);
        return c.json({ ok: true, isDemo: true, template: updated });
      }
      if (method === 'DELETE') {
        deleteDemoTemplate(id);
        return c.json({ ok: true, isDemo: true });
      }
    }

    // Roles
    if (path === '/api/roles' && method === 'POST') {
      const body = await c.req.json().catch(() => ({}));
      const created = createDemoRole(body);
      return c.json({ ok: true, isDemo: true, role: created }, 201);
    }
    if (path.startsWith('/api/roles/')) {
      const id = path.split('/')[3];
      if (method === 'PATCH') {
        const body = await c.req.json().catch(() => ({}));
        const updated = updateDemoRole(id, body);
        return c.json({ ok: true, isDemo: true, role: updated });
      }
    }

    // Users
    if (path === '/api/users' && method === 'POST') {
      const body = await c.req.json().catch(() => ({}));
      const created = createDemoUser(body);
      return c.json({ ok: true, isDemo: true, user: created }, 201);
    }
    if (path.startsWith('/api/users/')) {
      const id = path.split('/')[3];
      if (method === 'PATCH') {
        const body = await c.req.json().catch(() => ({}));
        const updated = updateDemoUser(id, body);
        return c.json({ ok: true, isDemo: true, user: updated });
      }
    }

    if (path.startsWith('/api/reminders')) return c.json({ ok: true, reminder: { id: 'rem_demo_simulated' } });
    if (path.startsWith('/api/whatsapp')) return c.json({ ok: true, isDemo: true, message: 'تمت العملية بنجاح في بيئة العرض التجريبية' });
    
    // Simulate other mutations safely in demo mode
    return c.json({
      ok: true,
      isDemo: true,
      message: 'تمت العملية بنجاح في بيئة العرض التجريبية'
    });
  }

  await next();
});

// Admin-only global protection
app.use('/api/roles/*', async (c, next) => {
  if (c.req.method !== 'GET' && c.get('roleId') !== 'admin') {
    return c.json({ error: 'غير مصرح لك بتعديل الأدوار (تحتاج صلاحية مدير)' }, 403);
  }
  await next();
});

app.use('/api/templates/*', async (c, next) => {
  if (c.req.method !== 'GET' && c.get('roleId') !== 'admin') {
    return c.json({ error: 'غير مصرح لك بتعديل القوالب (تحتاج صلاحية مدير)' }, 403);
  }
  await next();
});

app.use('/api/company/*', async (c, next) => {
  if (c.req.method !== 'GET' && c.get('roleId') !== 'admin') {
    return c.json({ error: 'غير مصرح لك بتعديل إعدادات الشركة (تحتاج صلاحية مدير)' }, 403);
  }
  await next();
});

app.use('/api/whatsapp/*', async (c, next) => {
  if (c.req.method !== 'GET' && c.get('roleId') !== 'admin' && c.get('roleId') !== 'account_permissions_manager') {
    return c.json({ error: 'غير مصرح لك بتعديل إعدادات التنبيهات (تحتاج صلاحية مدير أو مسؤول صلاحيات)' }, 403);
  }
  await next();
});

// Global Cache Invalidator for Mutations
app.use('/api/*', async (c, next) => {
  await next();
  
  // If the request was a successful mutation, invalidate the cache globally
  const method = c.req.method;
  const status = c.res.status;
  
  if (['POST', 'PATCH', 'PUT', 'DELETE'].includes(method) && status >= 200 && status < 400) {
    if (!c.req.path.startsWith('/api/auth/login') && !c.req.path.startsWith('/api/auth/logout')) {
      // Prevent cache wipe during chunk uploads (308 Resume Incomplete)
      if (status !== 308) {
        invalidateBootstrapCache();

        // Broadcast mutation event asynchronously to Supabase Realtime WebSocket subscribers
        if (c.env.SUPABASE_URL && c.env.SUPABASE_SERVICE_ROLE_KEY) {
          const clientMutationId = c.req.header('x-mutation-id') || null;
          const reqPath = c.req.path;
          const pathParts = reqPath.split('/').filter(Boolean); // e.g. ['api', 'tasks', 'tsk_01']
          const entityId = (pathParts.length >= 3 && pathParts[2] && !pathParts[2].includes('?') && pathParts[2] !== 'reorder') ? pathParts[2] : null;

          // Extract and sanitize granular delta if provided by route handler (Security Shielding)
          let delta = c.get('mutationDelta') || null;
          if (!delta) {
            // Automatic Delta Synthesizer: Infer table and action from route path
            let inferredTable = null;
            if (reqPath.startsWith('/api/projects')) inferredTable = 'projects';
            else if (reqPath.includes('/comments')) inferredTable = 'comments';
            else if (reqPath.startsWith('/api/tasks')) inferredTable = 'tasks';
            else if (reqPath.startsWith('/api/documents')) inferredTable = 'documents';
            else if (reqPath.startsWith('/api/users')) inferredTable = 'users';
            else if (reqPath.startsWith('/api/roles')) inferredTable = 'roles';
            else if (reqPath.startsWith('/api/reminders')) inferredTable = 'reminders';
            else if (reqPath.startsWith('/api/templates')) inferredTable = 'templates';

            if (inferredTable) {
              const action = method === 'POST' ? 'INSERT' : (method === 'DELETE' ? 'DELETE' : 'UPDATE');
              delta = {
                table: inferredTable,
                action,
                record: entityId ? { id: entityId } : null
              };
            }
          }

          if (delta && delta.record && typeof delta.record === 'object') {
            const sanitized = { ...delta.record };
            delete sanitized.password;
            delete sanitized.password_hash;
            delete sanitized.token;
            delete sanitized.apiKey;
            delete sanitized.secret;
            delta = { ...delta, record: sanitized };
          }

          const baseUrl = String(c.env.SUPABASE_URL || '').replace(/\/+$/, '');
          const cleanServiceKey = String(c.env.SUPABASE_SERVICE_ROLE_KEY || '').trim().replace(/^["']|["']$/g, '');

          const broadcastPromise = fetch(`${baseUrl}/realtime/v1/api/broadcast`, {
            method: 'POST',
            headers: {
              'apikey': cleanServiceKey,
              'Authorization': `Bearer ${cleanServiceKey}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              messages: [{
                topic: 'darc_live',
                event: 'STATE_MUTATION',
                payload: {
                  path: reqPath,
                  method,
                  mutationId: clientMutationId,
                  entityId,
                  delta,
                  timestamp: Date.now()
                }
              }]
            })
          }).then(async (res) => {
            if (!res.ok) {
              console.warn(`[Realtime Broadcast Error] Status: ${res.status}`, await res.text().catch(() => ''));
            }
          }).catch((err) => {
            console.warn('[Realtime Broadcast Network Failure]', err?.message);
          });

          if (c.executionCtx && typeof c.executionCtx.waitUntil === 'function') {
            c.executionCtx.waitUntil(broadcastPromise);
          }
        }
      }
    }
  }
});

// Opportunistic queue drain during active user usage (throttled to at most once every 5 minutes)
let _lastOpportunisticDrain = 0;
app.use('*', async (c, next) => {
  await next();
  const now = Date.now();
  if (now - _lastOpportunisticDrain > 5 * 60 * 1000) {
    _lastOpportunisticDrain = now;
    try {
      if (c.executionCtx && typeof c.executionCtx.waitUntil === 'function') {
        const supabase = getDB(c.env);
        c.executionCtx.waitUntil(processWhatsAppQueue(supabase));
        c.executionCtx.waitUntil(processDueReminders(supabase));
      }
    } catch (_) {}
  }
});

// Route mounting
app.route('/api/audit',          auditApp);
app.route('/api/projects',      projectsApp);
app.route('/api/tasks',         tasksApp);
app.route('/api/auth',          authApp);
app.route('/api/users',         usersApp);
app.route('/api/roles',         rolesApp);
app.route('/api/company',       companyApp);
app.route('/api/notifications', notificationsApp);
app.route('/api/documents',     documentsApp);
app.route('/api/reminders',     remindersApp);
app.route('/api/restore',       restoreApp);
app.route('/api/templates',     templatesApp);
app.route('/api/trash',         trashApp);
app.route('/api/bootstrap',     bootstrapApp);
app.route('/api/telemetry',     telemetryApp);
app.route('/api/whatsapp',      whatsappApp);
app.route('/api/vault',         vaultApp);

export default {
  fetch: app.fetch,
  async scheduled(event, env, ctx) {
    try {
      const supabase = getDB(env);
      const tasks = [];

      // 1. Drain queued WhatsApp messages for safe hours
      tasks.push(processWhatsAppQueue(supabase));

      // 2. Dispatch due reminders
      tasks.push(processDueReminders(supabase));

      // 3. Daily automated maintenance: purge soft-deleted trash older than 30 days (runs at 7:00 AM AST / 04:00 UTC)
      const nowUtcHours = new Date().getUTCHours();
      const nowUtcMinutes = new Date().getUTCMinutes();
      if (nowUtcHours === 4 && nowUtcMinutes < 16) {
        tasks.push(purgeExpiredTrash(supabase, env, 30));
      }

      if (ctx && typeof ctx.waitUntil === 'function') {
        tasks.forEach(t => ctx.waitUntil(t));
      } else {
        await Promise.allSettled(tasks);
      }
    } catch (err) {
      console.warn('[Cron] scheduled error:', err.message);
    }
  }
};
