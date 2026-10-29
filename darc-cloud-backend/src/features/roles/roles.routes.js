import { Hono } from 'hono';
import { getDB } from '../../core/db.js';
import { invalidateRolesCache, hasPermission } from '../../utils/permissions.js';
import { invalidateRolesCache as invalidateCoreRolesCache } from '../../core/cache.js';
import { toCamelCase } from '../../utils/transformers.js';
import { generateSecureId } from '../../core/security.js';

const app = new Hono();

app.use('*', async (c, next) => {
  c.set('supabase', getDB(c.env));
  await next();
});

const requireManageRoles = async (c, next) => {
  const roleId = c.get('roleId');
  const userId = c.get('userId');
  const supabase = c.get('supabase');
  if (roleId === 'admin' || (await hasPermission(supabase, userId, roleId, 'manage_roles'))) {
    return await next();
  }
  return c.json({ error: 'غير مصرح لك بتنفيذ هذه العملية، هذه الصلاحية لمدراء الأدوار فقط' }, 403);
};

app.post('/', requireManageRoles, async (c) => {
  const body = await c.req.json();
  const supabase = c.get('supabase');
  const isSuperAdmin = c.get('roleId') === 'admin';

  if (!isSuperAdmin && body.permissions && body.permissions.includes('*')) {
    return c.json({ error: 'لا يمكن منح الصلاحية الكاملة (*) إلا من قِبل مدير النظام.' }, 403);
  }

  const id = generateSecureId('rol_');
  
  const roleData = {
    id,
    name_ar: body.nameAr,
    name_en: body.nameEn || body.nameAr,
    description_ar: body.descriptionAr,
    description_en: body.descriptionEn || body.descriptionAr,
    permissions: body.permissions || [],
    built_in: false
  };
  
  const { data, error } = await supabase.from('roles').insert([roleData]).select().single();
  if (error) throw error;
  
  invalidateRolesCache();
  invalidateCoreRolesCache();
  return c.json({ ok: true, role: toCamelCase(data) });
});

app.patch('/:id', requireManageRoles, async (c) => {
  const roleId = c.req.param('id');
  if (!/^[a-zA-Z0-9_-]{3,64}$/.test(roleId)) {
    return c.json({ error: 'معرف الدور غير صالح' }, 400);
  }
  const isSuperAdmin = c.get('roleId') === 'admin';
  if (roleId === 'admin' && !isSuperAdmin) {
    return c.json({ error: 'لا يمكن لغير مدير النظام تعديل دور المشرف العام.' }, 403);
  }

  const body = await c.req.json();
  const supabase = c.get('supabase');
  
  const updates = {};
  if (body.nameAr !== undefined) updates.name_ar = body.nameAr;
  if (body.nameEn !== undefined) updates.name_en = body.nameEn;
  if (body.descriptionAr !== undefined) updates.description_ar = body.descriptionAr;
  if (body.descriptionEn !== undefined) updates.description_en = body.descriptionEn;
  if (body.permissions !== undefined) {
    let perms = Array.isArray(body.permissions) ? [...body.permissions] : [];
    if (!isSuperAdmin && perms.includes('*')) {
      return c.json({ error: 'لا يمكن منح الصلاحية الكاملة (*) إلا من قِبل مدير النظام.' }, 403);
    }
    if (roleId === 'admin' && !perms.includes('*')) {
      perms.push('*');
    }
    updates.permissions = perms;
  }
  
  const { data, error } = await supabase.from('roles').update(updates).eq('id', roleId).select().single();
  if (error) throw error;
  
  invalidateRolesCache();
  invalidateCoreRolesCache();
  return c.json({ ok: true, role: toCamelCase(data) });
});

app.delete('/:id', requireManageRoles, async (c) => {
  const roleId = c.req.param('id');
  if (!/^[a-zA-Z0-9_-]{3,64}$/.test(roleId)) {
    return c.json({ error: 'معرف الدور غير صالح' }, 400);
  }
  const supabase = c.get('supabase');
  
  const BUILT_IN_ROLES = [
    'admin',
    'account_permissions_manager',
    'portfolio_manager',
    'project_manager',
    'discipline_lead',
    'reviewer',
    'team_member',
    'site_supervisor',
    'viewer'
  ];
  if (BUILT_IN_ROLES.includes(roleId)) {
    return c.json({ error: 'لا يمكن حذف الأدوار الأساسية المضمنة في النظام.' }, 400);
  }

  const { data: existingRole } = await supabase.from('roles').select('built_in').eq('id', roleId).single();
  if (existingRole?.built_in) {
    return c.json({ error: 'لا يمكن حذف الأدوار الأساسية المضمنة في النظام.' }, 400);
  }

  // Prevent leaving orphan accounts by verifying no active users are assigned to this role
  const { count } = await supabase.from('users').select('id', { count: 'exact', head: true }).eq('role_id', roleId);
  if (count && count > 0) {
    return c.json({ error: `لا يمكن حذف هذا الدور لوجود ${count} مستخدم(ين) مسندين له حالياً. يرجى نقل المستخدمين إلى دور آخر قبل الحذف.` }, 400);
  }

  const { error } = await supabase.from('roles').delete().eq('id', roleId);
  if (error) throw error;
  
  invalidateRolesCache();
  invalidateCoreRolesCache();
  return c.json({ ok: true });
});

export default app;
