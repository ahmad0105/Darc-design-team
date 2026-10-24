import { Hono } from 'hono';
import { getDB } from '../../core/db.js';
import { invalidateRolesCache } from '../../utils/permissions.js';
import { invalidateRolesCache as invalidateCoreRolesCache } from '../../core/cache.js';
import { toCamelCase } from '../../utils/transformers.js';
import { generateSecureId } from '../../core/security.js';

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

app.post('/', requireAdmin, async (c) => {
  const body = await c.req.json();
  const supabase = c.get('supabase');
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

app.patch('/:id', requireAdmin, async (c) => {
  const roleId = c.req.param('id');
  const body = await c.req.json();
  const supabase = c.get('supabase');
  
  const updates = {};
  if (body.nameAr !== undefined) updates.name_ar = body.nameAr;
  if (body.nameEn !== undefined) updates.name_en = body.nameEn;
  if (body.descriptionAr !== undefined) updates.description_ar = body.descriptionAr;
  if (body.descriptionEn !== undefined) updates.description_en = body.descriptionEn;
  if (body.permissions !== undefined) {
    let perms = Array.isArray(body.permissions) ? [...body.permissions] : [];
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

app.delete('/:id', requireAdmin, async (c) => {
  const roleId = c.req.param('id');
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
