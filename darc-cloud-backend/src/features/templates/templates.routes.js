import { Hono } from 'hono';
import { getDB } from '../../core/db.js';
import { invalidateTemplatesCache } from '../../core/cache.js';
import { toCamelCase } from '../../utils/transformers.js';
import { hasPermission } from '../../utils/permissions.js';

const app = new Hono();

app.use('*', async (c, next) => {
  c.set('supabase', getDB(c.env));
  await next();
});

app.get('/', async (c) => {
  const supabase = c.get('supabase');
  const { data, error } = await supabase.from('templates').select('*').is('deleted_at', null).order('id', { ascending: true });
  if (error) {
    return c.json({ templates: [] });
  }
  return c.json({ templates: toCamelCase(data || []) });
});

app.post('/', async (c) => {
  const userId = c.get('userId');
  const roleId = c.get('roleId');
  const supabase = c.get('supabase');

  if (!(await hasPermission(supabase, userId, roleId, 'manage_templates'))) {
    return c.json({ error: 'لا تملك الصلاحية المطلوبة لإدارة القوالب' }, 403);
  }

  const body = await c.req.json();
  const id = 'tpl_' + Math.random().toString(36).substr(2, 9);
  const { data, error } = await supabase.from('templates').insert([{
    id,
    name_ar: body.nameAr,
    name_en: body.nameEn,
    code: body.code || id,
    type_ar: body.typeAr || 'مخطط',
    type_en: body.typeEn || 'Drawing',
    category_id: body.categoryId || 'architectural',
    category_ar: body.categoryAr || 'معماري',
    category_en: body.categoryEn || 'Architectural',
    category_icon: body.categoryIcon || '◌',
    default_weight: Number(body.defaultWeight) || 1,
    default_duration: Number(body.defaultDuration) || 5
  }]).select().single();
  if (error) throw error;
  invalidateTemplatesCache();
  return c.json({ ok: true, template: toCamelCase(data) }, 201);
});

app.patch('/:id', async (c) => {
  const templateId = c.req.param('id');
  const userId = c.get('userId');
  const roleId = c.get('roleId');
  const supabase = c.get('supabase');

  if (!(await hasPermission(supabase, userId, roleId, 'manage_templates'))) {
    return c.json({ error: 'لا تملك الصلاحية المطلوبة لإدارة القوالب' }, 403);
  }

  const body = await c.req.json();
  const updates = {};
  if (body.nameAr !== undefined) updates.name_ar = body.nameAr;
  if (body.nameEn !== undefined) updates.name_en = body.nameEn;
  if (body.code !== undefined) updates.code = body.code;
  if (body.typeAr !== undefined) updates.type_ar = body.typeAr;
  if (body.typeEn !== undefined) updates.type_en = body.typeEn;
  if (body.categoryId !== undefined) updates.category_id = body.categoryId;
  if (body.defaultWeight !== undefined) updates.default_weight = Number(body.defaultWeight);
  if (body.defaultDuration !== undefined) updates.default_duration = Number(body.defaultDuration);
  
  const { data, error } = await supabase.from('templates').update(updates).eq('id', templateId).select().single();
  if (error) throw error;
  invalidateTemplatesCache();
  return c.json({ ok: true, template: toCamelCase(data) });
});

app.delete('/:id', async (c) => {
  const templateId = c.req.param('id');
  const userId = c.get('userId');
  const roleId = c.get('roleId');
  const supabase = c.get('supabase');

  if (!(await hasPermission(supabase, userId, roleId, 'manage_templates'))) {
    return c.json({ error: 'لا تملك الصلاحية المطلوبة لإدارة القوالب' }, 403);
  }

  const { error } = await supabase.from('templates').update({ deleted_at: new Date().toISOString() }).eq('id', templateId);
  if (error) throw error;
  invalidateTemplatesCache();
  return c.json({ ok: true });
});

export default app;
