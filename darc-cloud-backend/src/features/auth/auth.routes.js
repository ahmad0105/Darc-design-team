import { Hono } from 'hono';
import { getDB } from '../../core/db.js';
import { setSessionCookie, clearSessionCookie, getSessionToken } from '../../core/cookie.js';
import { verify, sign } from 'hono/jwt';
import crypto from 'node:crypto';
import { Buffer } from 'node:buffer';
import { toCamelCase } from '../../utils/transformers.js';
import { invalidateUsersCache, setUserTokenVersion } from '../../core/cache.js';
import { authRateLimiter } from '../../core/rate-limit.js';
import { computeClientFingerprint } from '../../core/security.js';

const app = new Hono();

app.use('*', async (c, next) => {
  c.set('supabase', getDB(c.env));
  await next();
});

const SCRYPT_OPTIONS = { N: 16384, r: 8, p: 1, maxmem: 64 * 1024 * 1024 };

async function verifyPassword(password, stored) {
  if (!stored || !stored.includes(':')) return false;
  const [salt, digest] = stored.split(':');
  return new Promise((resolve) => {
    crypto.scrypt(password, salt, 64, SCRYPT_OPTIONS, (err, derivedKey) => {
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

async function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString('hex');
  return new Promise((resolve, reject) => {
    crypto.scrypt(password, salt, 64, SCRYPT_OPTIONS, (err, derivedKey) => {
      if (err) reject(err);
      else resolve(`${salt}:${derivedKey.toString('hex')}`);
    });
  });
}

// Helper: get userId from JWT cookie or auth header (for routes that bypass global auth middleware)
async function getUserIdFromCookie(c) {
  const token = getSessionToken(c);
  if (!token) return null;
  try {
    const payload = await verify(token, c.env.JWT_SECRET, 'HS256');
    return payload.userId;
  } catch (e) {
    return null;
  }
}

app.post('/forgot-password', authRateLimiter(), async (c) => {
  const body = await c.req.json();
  const supabase = c.get('supabase');
  const email = String(body.email || '').trim().toLowerCase();
  if (!email) return c.json({ error: 'البريد الإلكتروني مطلوب' }, 400);

  const { data: user } = await supabase.from('users').select('id, custom_fields').eq('email', email).eq('status', 'active').single();
  
  if (user) {
    const resetToken = crypto.randomBytes(24).toString('hex');
    const resetExpiresAt = new Date(Date.now() + 3600000).toISOString();
    const newFields = { ...(user.custom_fields || {}), resetToken, resetExpiresAt };
    await supabase.from('users').update({ custom_fields: newFields }).eq('id', user.id);
  }
  return c.json({ ok: true, message: 'إذا كان البريد مسجلاً لدينا، ستصلك رسالة قريباً.' });
});

app.post('/reset-password', authRateLimiter(), async (c) => {
  const body = await c.req.json();
  const supabase = c.get('supabase');
  const token = String(body.token || '').trim();
  const newPassword = String(body.newPassword || '');
  if (!token || token.length < 24) {
    return c.json({ error: 'الرابط غير صالح أو منتهي الصلاحية.' }, 400);
  }
  if (newPassword.length < 10) return c.json({ error: 'كلمة المرور يجب أن تكون 10 أحرف على الأقل.' }, 400);

  const { data: user } = await supabase.from('users').select('id, role_id, custom_fields').eq('custom_fields->>resetToken', token).single();
  if (!user || new Date(user.custom_fields.resetExpiresAt) < new Date()) {
    return c.json({ error: 'الرابط منتهي الصلاحية أو غير صحيح.' }, 400);
  }

  const currentVer = Number(user.custom_fields?.tokenVersion || 1);
  const nextVer = currentVer + 1;
  const newFields = { ...user.custom_fields, tokenVersion: nextVer };
  delete newFields.resetToken;
  delete newFields.resetExpiresAt;

  const hashedNew = await hashPassword(newPassword);
  await supabase.from('users').update({ password_hash: hashedNew, custom_fields: newFields }).eq('id', user.id);
  setUserTokenVersion(user.id, nextVer);
  invalidateUsersCache();

  // Issue session cookie with new tokenVersion & client device fingerprint
  const clientFpt = await computeClientFingerprint(c, c.env.JWT_SECRET);
  const payload = { userId: user.id, roleId: user.role_id, v: nextVer, fpt: clientFpt, exp: Math.floor(Date.now() / 1000) + 7 * 24 * 60 * 60 };
  const sessionToken = await sign(payload, c.env.JWT_SECRET);
  setSessionCookie(c, sessionToken, 604800);

  return c.json({ ok: true, token: sessionToken });
});

app.post('/logout-all', async (c) => {
  const userId = c.get('userId') || await getUserIdFromCookie(c);
  if (userId) {
    const supabase = c.get('supabase');
    const { data: user } = await supabase.from('users').select('custom_fields').eq('id', userId).single();
    const currentVer = Number(user?.custom_fields?.tokenVersion || 1);
    const nextVer = currentVer + 1;
    const newFields = { ...(user?.custom_fields || {}), tokenVersion: nextVer };
    await supabase.from('users').update({ custom_fields: newFields }).eq('id', userId);
    setUserTokenVersion(userId, nextVer);
    invalidateUsersCache();
  }
  clearSessionCookie(c);
  return c.json({ ok: true });
});

app.post('/change-password', async (c) => {
  // /api/auth/* bypasses global JWT middleware, so we read JWT manually
  const userId = c.get('userId') || await getUserIdFromCookie(c);
  if (!userId) return c.json({ error: 'غير مصرح.' }, 401);

  const supabase = c.get('supabase');
  const body = await c.req.json();
  const oldPassword = String(body.oldPassword || '');
  const newPassword = String(body.newPassword || '');
  if (newPassword.length < 10) return c.json({ error: 'كلمة المرور يجب أن تكون 10 أحرف على الأقل.' }, 400);

  const { data: user } = await supabase.from('users').select('id, role_id, password_hash, custom_fields').eq('id', userId).single();
  if (!user) return c.json({ error: 'المستخدم غير موجود.' }, 404);

  const isValid = await verifyPassword(oldPassword, user.password_hash);
  if (!isValid) return c.json({ error: 'كلمة المرور الحالية غير صحيحة.' }, 400);

  const currentVer = Number(user.custom_fields?.tokenVersion || 1);
  const nextVer = currentVer + 1;
  const newFields = { ...(user.custom_fields || {}), tokenVersion: nextVer };

  const hashedNew = await hashPassword(newPassword);
  const { error } = await supabase.from('users').update({
    password_hash: hashedNew,
    custom_fields: newFields,
    updated_at: new Date().toISOString()
  }).eq('id', userId);
  if (error) throw error;

  setUserTokenVersion(userId, nextVer);
  invalidateUsersCache();

  // Re-issue fresh cookie for current session with incremented version & client device fingerprint
  const clientFpt = await computeClientFingerprint(c, c.env.JWT_SECRET);
  const payload = { userId: user.id, roleId: user.role_id, v: nextVer, fpt: clientFpt, exp: Math.floor(Date.now() / 1000) + 7 * 24 * 60 * 60 };
  const sessionToken = await sign(payload, c.env.JWT_SECRET);
  setSessionCookie(c, sessionToken, 604800);

  return c.json({ ok: true, token: sessionToken });
});

app.post('/activate', authRateLimiter(), async (c) => {
  const body = await c.req.json();
  const token = String(body.token || '').trim();
  const password = String(body.password || '');
  const supabase = c.get('supabase');

  if (!token || token.length < 24) {
    return c.json({ error: 'رمز التفعيل غير صالح.' }, 400);
  }
  if (password.length < 10) {
    return c.json({ error: 'كلمة المرور يجب ألا تقل عن 10 أحرف' }, 400);
  }

  // Strictly verify token & expiration
  const { data: user, error: findErr } = await supabase
    .from('users')
    .select('id, name, name_en, email, role_id, status, invite_token, invite_expires_at, custom_fields')
    .eq('invite_token', token)
    .single();

  if (findErr || !user) {
    return c.json({ error: 'رمز التفعيل غير صالح أو تم استخدامه مسبقاً.' }, 400);
  }

  if (user.invite_expires_at && new Date(user.invite_expires_at) < new Date()) {
    return c.json({ error: 'انتهت صلاحية رابط التفعيل. يرجى طلب دعوة جديدة.' }, 400);
  }

  const hashedNew = await hashPassword(password);
  const userFields = { ...(user.custom_fields || {}), tokenVersion: 1 };
  const { data: updatedUser, error: updateErr } = await supabase
    .from('users')
    .update({
      password_hash: hashedNew,
      status: 'active',
      invite_token: null,
      invite_expires_at: null,
      custom_fields: userFields,
      updated_at: new Date().toISOString()
    })
    .eq('id', user.id)
    .select('id, name, name_en, email, role_id, status, avatar_color')
    .single();

  if (updateErr) {
    console.error('[Activate Error]', updateErr.message);
    return c.json({ error: 'فشل تفعيل الحساب، يرجى المحاولة لاحقاً.' }, 500);
  }

  setUserTokenVersion(user.id, 1);
  invalidateUsersCache();

  // Issue session cookie so user is logged in with client device fingerprint
  const clientFpt = await computeClientFingerprint(c, c.env.JWT_SECRET);
  const payload = { userId: updatedUser.id, roleId: updatedUser.role_id, v: 1, fpt: clientFpt, exp: Math.floor(Date.now() / 1000) + 7 * 24 * 60 * 60 };
  const sessionToken = await sign(payload, c.env.JWT_SECRET);
  setSessionCookie(c, sessionToken, 604800);

  return c.json({ ok: true, token: sessionToken, user: toCamelCase(updatedUser) });
});

export default app;
