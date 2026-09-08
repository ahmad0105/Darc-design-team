import { Hono } from 'hono';
import { getDB } from '../../core/db.js';
import { invalidateCompanyCache, setCompanyCacheDirect, getCachedCompany } from '../../core/cache.js';
import { toCamelCase } from '../../utils/transformers.js';

const app = new Hono();

app.use('*', async (c, next) => {
  c.set('supabase', getDB(c.env));
  await next();
});

app.patch('/', async (c) => {
  const roleId = c.get('roleId');
  if (roleId !== 'admin') {
    return c.json({ error: 'غير مصرح لك بتعديل بيانات الشركة، هذه الصلاحية للمشرف فقط' }, 403);
  }
  const body = await c.req.json();
  const supabase = c.get('supabase');
  
  const current = await getCachedCompany(supabase);
  const updates = {
    ...current,
    name: body.nameAr || body.name || current.name || 'DARC Design Team',
    name_ar: body.nameAr !== undefined ? body.nameAr : (body.name_ar !== undefined ? body.name_ar : current.name_ar),
    name_en: body.nameEn !== undefined ? body.nameEn : (body.name_en !== undefined ? body.name_en : current.name_en),
    updated_at: new Date().toISOString()
  };
  if (body.logoUrl !== undefined || body.logo_url !== undefined) {
    updates.logo_url = body.logoUrl !== undefined ? body.logoUrl : body.logo_url;
  }

  try {
    const { data, error } = await supabase.from('company').upsert([{ id: 'default', ...updates }]).select().single();
    if (error) throw error;
    invalidateCompanyCache();
    return c.json({ ok: true, company: toCamelCase(data) });
  } catch(e) {
    console.warn('[Company] DB upsert fallback:', e.message);
    setCompanyCacheDirect(updates);
    return c.json({ ok: true, company: toCamelCase(updates), fallback: true });
  }
});

export default app;
