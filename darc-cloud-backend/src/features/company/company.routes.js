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
  const rawLogo = body.logoUrl !== undefined ? body.logoUrl : body.logo_url;
  if (rawLogo !== undefined) {
    if (typeof rawLogo !== 'string') {
      return c.json({ error: 'صيغة رابط شعار الشركة غير صالحة' }, 400);
    }
    if (rawLogo.length > 4 * 1024 * 1024) {
      return c.json({ error: 'حجم ملف الشعار يتجاوز الحد المسموح (3MB)' }, 400);
    }
    const isSafeRaster = /^data:image\/(png|jpeg|jpg|webp|gif);base64,/i.test(rawLogo);
    const isHttps = rawLogo.startsWith('https://');
    if (rawLogo && !isSafeRaster && !isHttps) {
      return c.json({ error: 'نوع ملف الشعار غير مدعوم. يرجى استخدام PNG أو JPEG أو WebP أو رابط آمن.' }, 400);
    }
    updates.logo_url = rawLogo;
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
