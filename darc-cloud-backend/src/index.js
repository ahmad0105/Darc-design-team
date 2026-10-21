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
import trashApp         from './features/trash/trash.routes.js';
import bootstrapApp     from './features/bootstrap/bootstrap.route.js';

// Core Security, Error Resilience & Performance
import { createErrorHandler } from './core/errors.js';
import { securityHeadersMiddleware, csrfGuardMiddleware, correlationIdMiddleware, payloadLimitMiddleware } from './core/security.js';
import { authRateLimiter, recordAuthFailure, clearAuthFailure, getClientIp, mutationRateLimiter } from './core/rate-limit.js';
import { getDB } from './core/db.js';
import { getUserTokenVersion } from './core/cache.js';

const app = new Hono();
const _lastActiveThrottles = new Map();

// 1. Correlation ID Tracing (Assigned to all requests & responses)
app.use('*', correlationIdMiddleware());

// 2. Security Headers (nosniff, SAMEORIGIN, HSTS)
app.use('*', securityHeadersMiddleware());

// 3. CORS Guard: Strictly allow only authorized domains
const ALLOWED_ORIGINS = [
  'http://localhost:4318',
  'http://127.0.0.1:4318',
  'http://localhost:8787',
  'http://127.0.0.1:8787',
  'https://darc-design-team.netlify.app',
  'https://darc-design-team.workers.dev',
  'https://darc-design.bond',
  'https://panel.darc-design.bond',
  'https://api.darc-design.bond'
];
app.use('*', cors({
  origin: (origin) => {
    if (!origin) return 'https://panel.darc-design.bond';
    if (
      ALLOWED_ORIGINS.includes(origin) || 
      origin.endsWith('.darc.local') || 
      origin.endsWith('.darc-design.bond') ||
      origin === 'https://darc-design.bond' ||
      origin === 'https://panel.darc-design.bond' ||
      origin === 'https://darc-design-team.netlify.app' ||
      origin.endsWith('.darc-design-team.netlify.app') ||
      origin.endsWith('.workers.dev') ||
      origin.endsWith('.pages.dev') ||
      origin.startsWith('http://localhost:') ||
      origin.startsWith('http://127.0.0.1:')
    ) return origin;
    return null; // Explicitly reject unauthorized third-party origins
  },
  credentials: true,
  allowMethods: ['GET', 'HEAD', 'PUT', 'POST', 'DELETE', 'PATCH', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization', 'Cookie', 'x-session-url', 'content-range', 'x-doc-meta', 'X-File-Name', 'If-None-Match', 'X-Request-Id', 'X-Offline-Replay', 'X-Offline-Id', 'X-Idempotency-Key'],
  exposeHeaders: ['Set-Cookie', 'ETag', 'X-Request-Id']
}));

// 4. Payload size limit guard (protects against memory exhaustion)
app.use('/api/*', payloadLimitMiddleware());

// 5. CSRF & Origin Guard for state-changing mutations
app.use('/api/*', csrfGuardMiddleware());

// 6. Mutation rate limiter to protect against spam / DoS
app.use('/api/*', mutationRateLimiter());

// Centralized Operational Error Handler (OWASP Error Shield)
app.onError(createErrorHandler());

// Shared utilities
const JSONB_PASSTHROUGH_KEYS = ['custom_fields', 'permissions', 'details'];

export function toCamelCase(obj) {
  if (Array.isArray(obj)) return obj.map(toCamelCase);
  if (obj === null || typeof obj !== 'object') return obj;
  return Object.fromEntries(
    Object.entries(obj).map(([key, value]) => {
      const camelKey = key.replace(/_([a-z])/g, (_, c) => c.toUpperCase());
      if (JSONB_PASSTHROUGH_KEYS.includes(key)) return [camelKey, value];
      return [camelKey, toCamelCase(value)];
    })
  );
}

function toSafeUser(row) {
  const { password_hash, invite_token, ...safe } = row;
  return toCamelCase(safe);
}

async function verifyPassword(password, stored) {
  if (!stored || !stored.includes(':')) return false;
  const [salt, digest] = stored.split(':');
  return new Promise((resolve) => {
    crypto.scrypt(password, salt, 64, (err, derivedKey) => {
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
app.use('/api/auth/forgot-password', authRateLimiter());
app.use('/api/auth/reset-password', authRateLimiter());
app.use('/api/auth/activate', authRateLimiter());
app.use('/api/auth/change-password', authRateLimiter());

app.post('/api/auth/login', async (c) => {
  const ip = getClientIp(c);
  const { email, password } = await c.req.json();
  const supabase = getDB(c.env);
  const { data: users, error } = await supabase
    .from('users')
    .select('id, name, name_en, email, password_hash, status, role_id, avatar_color, custom_fields')
    .eq('email', (email || '').trim().toLowerCase())
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

  try {
    const userUpdates = {
      updated_at: nowIso,
      custom_fields: updatedCustomFields
    };
    let upRes = await supabase.from('users').update({ ...userUpdates, last_login_at: nowIso, last_active_at: nowIso }).eq('id', user.id);
    if (upRes.error) {
      await supabase.from('users').update(userUpdates).eq('id', user.id);
    }
  } catch (e) {
    console.warn('[Auth] Could not update last_login_at:', e.message);
  }

  const payload = { userId: user.id, roleId: user.role_id, v: tokenVer, exp: Math.floor(Date.now() / 1000) + 7 * 24 * 60 * 60 };
  const token = await sign(payload, c.env.JWT_SECRET);
  setSessionCookie(c, token, 604800);
  try {
    await supabase.from('audit_logs').insert([{
      user_id: user.id, action: 'login', entity_type: 'user', entity_id: user.id
    }]);
  } catch(e) { /* silent */ }
  return c.json({ token, user: toSafeUser({ ...user, custom_fields: updatedCustomFields, last_login_at: nowIso, last_active_at: nowIso }) });
});

app.post('/api/auth/logout', async (c) => {
  clearSessionCookie(c);
  return c.json({ success: true });
});

app.get('/api/health', (c) => c.json({ ok: true, status: 'healthy', env: 'production' }));

// JWT Guard with Token Revocation Protection
app.use('/api/*', async (c, next) => {
  if (c.req.path.startsWith('/api/auth') || c.req.path === '/api/health') return next();
  const token = getSessionToken(c);
  if (!token) return c.json({ error: 'غير مصرح لك بالدخول' }, 401);
  let payload;
  try {
    payload = await verify(token, c.env.JWT_SECRET, 'HS256');
    if (payload.v) {
      const supabase = getDB(c.env);
      const currentVer = await getUserTokenVersion(supabase, payload.userId);
      if (payload.v < currentVer) {
        return c.json({ error: 'تم تسجيل الخروج من هذه الجلسة، يرجى تسجيل الدخول مجدداً' }, 401);
      }
    }
    c.set('userId', payload.userId);
    c.set('roleId', payload.roleId);
  } catch (err) {
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

import { invalidateBootstrapCache } from './core/cache.js';

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
      }
    }
  }
});

// Route mounting
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

export default app;
