import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { setCookie, getCookie, deleteCookie } from 'hono/cookie';
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

// Core Security & Performance
import { securityHeadersMiddleware, csrfGuardMiddleware } from './core/security.js';
import { authRateLimiter, recordAuthFailure, clearAuthFailure, getClientIp, mutationRateLimiter } from './core/rate-limit.js';

const app = new Hono();

// Security Headers (Applied to all responses)
app.use('*', securityHeadersMiddleware());

// CORS
const ALLOWED_ORIGINS = ['http://localhost:4318', 'http://127.0.0.1:4318', 'http://localhost:8787', 'http://127.0.0.1:8787'];
app.use('*', cors({
  origin: (origin) => {
    if (!origin) return 'http://localhost:4318';
    if (
      ALLOWED_ORIGINS.includes(origin) || 
      origin.endsWith('.darc.local') || 
      origin.endsWith('.netlify.app') ||
      origin.includes('netlify.app') ||
      origin.startsWith('http://localhost:')
    ) return origin;
    return origin; // Allow configured frontend domain
  },
  credentials: true,
  allowMethods: ['GET', 'HEAD', 'PUT', 'POST', 'DELETE', 'PATCH', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization', 'Cookie', 'x-session-url', 'content-range', 'x-doc-meta', 'X-File-Name', 'If-None-Match'],
  exposeHeaders: ['Set-Cookie', 'ETag']
}));

// CSRF & Origin Guard for mutations
app.use('/api/*', csrfGuardMiddleware());

// Mutation rate limiter to protect against spam / DoS
app.use('/api/*', mutationRateLimiter());

// Global error handler
app.onError((err, c) => {
  console.error('[DARC] Global Error:', err.message);
  return c.json({ error: err.message || 'Internal Server Error' }, 500);
});

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

app.post('/api/auth/login', authRateLimiter(), async (c) => {
  const ip = getClientIp(c);
  const { email, password } = await c.req.json();
  const supabase = createClient(c.env.SUPABASE_URL, c.env.SUPABASE_SERVICE_ROLE_KEY);
  const { data: users, error } = await supabase
    .from('users')
    .select('id, name, name_en, email, password_hash, status, role_id, avatar_color')
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

  const payload = { userId: user.id, roleId: user.role_id, exp: Math.floor(Date.now() / 1000) + 7 * 24 * 60 * 60 };
  const token = await sign(payload, c.env.JWT_SECRET);
  setCookie(c, 'darc_session', token, { path: '/', secure: c.req.url.startsWith('https://'), httpOnly: true, sameSite: 'Lax', maxAge: 604800 });
  try {
    await supabase.from('audit_logs').insert([{
      user_id: user.id, action: 'login', entity_type: 'user', entity_id: user.id
    }]);
  } catch(e) { /* silent */ }
  return c.json({ user: toSafeUser(user) });
});

app.post('/api/auth/logout', async (c) => {
  deleteCookie(c, 'darc_session', { path: '/', secure: c.req.url.startsWith('https://'), sameSite: 'Lax' });
  return c.json({ success: true });
});

// JWT Guard
app.use('/api/*', async (c, next) => {
  if (c.req.path.startsWith('/api/auth')) return next();
  const token = getCookie(c, 'darc_session');
  if (!token) return c.json({ error: 'غير مصرح لك بالدخول' }, 401);
  try {
    const payload = await verify(token, c.env.JWT_SECRET, 'HS256');
    c.set('userId', payload.userId);
    c.set('roleId', payload.roleId);
  } catch (err) {
    return c.json({ error: 'الجلسة منتهية أو غير صالحة' }, 401);
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
