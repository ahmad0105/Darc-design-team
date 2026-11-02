import { Hono } from 'hono';
import { getDB } from '../../core/db.js';
import { invalidateTemplatesCache, invalidateBootstrapCache } from '../../core/cache.js';
import { toCamelCase } from '../../utils/transformers.js';
import { hasPermission } from '../../utils/permissions.js';
import { generateSecureId } from '../../core/security.js';

const app = new Hono();

app.use('*', async (c, next) => {
  c.set('supabase', getDB(c.env));
  await next();
});

export function isTemplateCodeReserved(existingTemplates = [], codeToTest = '', excludeId = null) {
  if (!codeToTest || typeof codeToTest !== 'string') return false;
  const cleanLower = codeToTest.trim().toLowerCase();
  if (!cleanLower) return false;
  const cleanNum = /^\d+$/.test(codeToTest.trim()) ? parseInt(codeToTest.trim(), 10) : null;

  return existingTemplates.some(t => {
    if (!t || !t.code) return false;
    if (excludeId && t.id === excludeId) return false;
    const ex = String(t.code).trim().toLowerCase();
    if (ex === cleanLower) return true;
    if (cleanNum !== null && /^\d+$/.test(ex)) {
      if (parseInt(ex, 10) === cleanNum) return true;
    }
    return false;
  });
}

export function getLowestAvailableTemplateCode(existingTemplates = []) {
  const usedNums = new Set();
  for (const t of existingTemplates) {
    if (t?.code && /^\d+$/.test(String(t.code).trim())) {
      const n = parseInt(String(t.code).trim(), 10);
      if (n > 0) usedNums.add(n);
    }
  }
  let candidate = 1;
  while (usedNums.has(candidate)) {
    candidate++;
  }
  return candidate < 10 ? `0${candidate}` : `${candidate}`;
}

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

  const body = await c.req.json().catch(() => ({}));
  const rawNameAr = typeof body.nameAr === 'string' ? body.nameAr.replace(/<[^>]*>/g, '').trim() : '';
  if (!rawNameAr) {
    return c.json({ error: 'اسم القالب بالعربية مطلوب' }, 400);
  }
  const rawNameEn = typeof body.nameEn === 'string' ? body.nameEn.replace(/<[^>]*>/g, '').trim() : rawNameAr;

  const rawWeight = Number(body.defaultWeight);
  const defaultWeight = (!isNaN(rawWeight) && rawWeight >= 1) ? Math.min(100, Math.round(rawWeight)) : 1;

  const rawDuration = Number(body.defaultDuration);
  const defaultDuration = (!isNaN(rawDuration) && rawDuration >= 1) ? Math.min(365, Math.round(rawDuration)) : 5;

  // Retrieve existing active templates to enforce code uniqueness & lowest-available auto-numbering
  const { data: existingTemplates } = await supabase
    .from('templates')
    .select('id, code')
    .is('deleted_at', null);

  let finalCode = '';
  const providedCode = (typeof body.code === 'string') ? body.code.trim().slice(0, 50) : '';

  if (!providedCode) {
    finalCode = getLowestAvailableTemplateCode(existingTemplates || []);
  } else {
    if (isTemplateCodeReserved(existingTemplates || [], providedCode)) {
      return c.json({ error: 'الرمز / الكود محجوز من قبل' }, 400);
    }
    finalCode = providedCode;
  }

  const id = generateSecureId('tpl_');
  const { data, error } = await supabase.from('templates').insert([{
    id,
    name_ar: rawNameAr.slice(0, 100),
    name_en: rawNameEn.slice(0, 100),
    code: finalCode,
    type_ar: (typeof body.typeAr === 'string' && body.typeAr.trim()) ? body.typeAr.trim().slice(0, 50) : 'مخطط',
    type_en: (typeof body.typeEn === 'string' && body.typeEn.trim()) ? body.typeEn.trim().slice(0, 50) : 'Drawing',
    category_id: (typeof body.categoryId === 'string' && body.categoryId.trim()) ? body.categoryId.trim().slice(0, 50) : 'architectural',
    category_ar: (typeof body.categoryAr === 'string' && body.categoryAr.trim()) ? body.categoryAr.trim().slice(0, 50) : 'معماري',
    category_en: (typeof body.categoryEn === 'string' && body.categoryEn.trim()) ? body.categoryEn.trim().slice(0, 50) : 'Architectural',
    category_icon: (typeof body.categoryIcon === 'string' && body.categoryIcon.trim()) ? body.categoryIcon.trim().slice(0, 20) : '◌',
    default_weight: defaultWeight,
    default_duration: defaultDuration
  }]).select().single();
  if (error) throw error;
  invalidateTemplatesCache();
  invalidateBootstrapCache();
  return c.json({ ok: true, template: toCamelCase(data) }, 201);
});

app.patch('/:id', async (c) => {
  const templateId = c.req.param('id');
  if (!/^[a-zA-Z0-9_-]{3,64}$/.test(templateId)) {
    return c.json({ error: 'معرف القالب غير صالح' }, 400);
  }
  const userId = c.get('userId');
  const roleId = c.get('roleId');
  const supabase = c.get('supabase');

  if (!(await hasPermission(supabase, userId, roleId, 'manage_templates'))) {
    return c.json({ error: 'لا تملك الصلاحية المطلوبة لإدارة القوالب' }, 403);
  }

  const body = await c.req.json().catch(() => ({}));
  const updates = {};
  if (body.nameAr !== undefined) {
    if (typeof body.nameAr !== 'string' || !body.nameAr.trim()) {
      return c.json({ error: 'اسم القالب بالعربية لا يمكن أن يكون فارغاً' }, 400);
    }
    updates.name_ar = body.nameAr.replace(/<[^>]*>/g, '').trim().slice(0, 100);
  }
  if (body.nameEn !== undefined) {
    updates.name_en = typeof body.nameEn === 'string' ? body.nameEn.replace(/<[^>]*>/g, '').trim().slice(0, 100) : '';
  }
  if (body.code !== undefined && typeof body.code === 'string') {
    const cleanCode = body.code.trim().slice(0, 50);
    if (!cleanCode) {
      return c.json({ error: 'الرمز / الكود لا يمكن أن يكون فارغاً' }, 400);
    }
    const { data: existingTemplates } = await supabase
      .from('templates')
      .select('id, code')
      .neq('id', templateId)
      .is('deleted_at', null);

    if (isTemplateCodeReserved(existingTemplates || [], cleanCode)) {
      return c.json({ error: 'الرمز / الكود محجوز من قبل' }, 400);
    }
    updates.code = cleanCode;
  }
  if (body.typeAr !== undefined && typeof body.typeAr === 'string') updates.type_ar = body.typeAr.trim().slice(0, 50);
  if (body.typeEn !== undefined && typeof body.typeEn === 'string') updates.type_en = body.typeEn.trim().slice(0, 50);
  if (body.categoryId !== undefined && typeof body.categoryId === 'string') updates.category_id = body.categoryId.trim().slice(0, 50);
  if (body.defaultWeight !== undefined) {
    const w = Number(body.defaultWeight);
    if (!isNaN(w) && w >= 1) updates.default_weight = Math.min(100, Math.round(w));
  }
  if (body.defaultDuration !== undefined) {
    const d = Number(body.defaultDuration);
    if (!isNaN(d) && d >= 1) updates.default_duration = Math.min(365, Math.round(d));
  }
  
  const { data, error } = await supabase.from('templates').update(updates).eq('id', templateId).select().single();
  if (error) throw error;
  invalidateTemplatesCache();
  invalidateBootstrapCache();
  return c.json({ ok: true, template: toCamelCase(data) });
});

app.delete('/:id', async (c) => {
  const templateId = c.req.param('id');
  if (!/^[a-zA-Z0-9_-]{3,64}$/.test(templateId)) {
    return c.json({ error: 'معرف القالب غير صالح' }, 400);
  }
  const userId = c.get('userId');
  const roleId = c.get('roleId');
  const supabase = c.get('supabase');

  if (!(await hasPermission(supabase, userId, roleId, 'manage_templates'))) {
    return c.json({ error: 'لا تملك الصلاحية المطلوبة لإدارة القوالب' }, 403);
  }

  const { error } = await supabase.from('templates').update({ deleted_at: new Date().toISOString() }).eq('id', templateId);
  if (error) throw error;
  invalidateTemplatesCache();
  invalidateBootstrapCache();
  return c.json({ ok: true });
});

export default app;
