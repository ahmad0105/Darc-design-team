// Simple In-Memory Cache for Cloudflare Workers / Node.js
// Variables persist across requests on the same isolate until the worker restarts.

let _bootstrapCache = new Map();
let _rolesCache = null;
let _rolesCacheTime = 0;
let _templatesCache = null;
let _templatesCacheTime = 0;
let _usersCache = null;
let _usersCacheTime = 0;

// Dynamic entity bootstrap micro-cache: 3.5s in-memory TTL protects Supabase from polling floods
// and delivers instant sub-5ms responses. Invalided immediately on any state mutation.
const BOOTSTRAP_TTL = 3500; 
const STATIC_TTL = 600000;   // 10 minutes
const USERS_TTL = 120000;    // 2 minutes

// --- BOOTSTRAP CACHE & VERSIONING ---
let _cacheVersion = 1;
const _userTokenVersions = new Map();

export function getCacheVersion() {
  return _cacheVersion;
}

export async function getUserTokenRecord(supabase, userId) {
  const cached = _userTokenVersions.get(userId);
  const now = Date.now();
  // 30 seconds TTL: protects DB from polling floods while ensuring instant revocation
  if (cached && (now - cached.time < 30000)) {
    return cached;
  }
  return supabase.from('users').select('status, custom_fields').eq('id', userId).single().then(({ data }) => {
    const ver = Number(data?.custom_fields?.tokenVersion || 1);
    const status = data?.status || 'active';
    const record = { ver, status, time: now };
    _userTokenVersions.set(userId, record);
    return record;
  }).catch(() => ({ ver: 1, status: 'active', time: now }));
}

export async function getUserTokenVersion(supabase, userId) {
  const rec = await getUserTokenRecord(supabase, userId);
  return rec.ver;
}

export function setUserTokenVersion(userId, ver) {
  const cached = _userTokenVersions.get(userId) || { status: 'active' };
  _userTokenVersions.set(userId, { ...cached, ver, time: Date.now() });
}

export function setUserStatus(userId, status) {
  const cached = _userTokenVersions.get(userId) || { ver: 1 };
  _userTokenVersions.set(userId, { ...cached, status, time: Date.now() });
}

export function incrementCacheVersion() {
  _cacheVersion++;
  return _cacheVersion;
}

export function getBootstrapCache(key) {
  const item = _bootstrapCache.get(key);
  if (!item) return null;
  if (Date.now() - item.time > BOOTSTRAP_TTL) {
    _bootstrapCache.delete(key);
    return null;
  }
  return item;
}

export function setBootstrapCache(key, payload, etag) {
  if (_bootstrapCache.size > 150) _bootstrapCache.clear();
  _bootstrapCache.set(key, { payload, etag, time: Date.now() });
}

export function invalidateBootstrapCache() {
  _cacheVersion++;
  _bootstrapCache.clear();
}

// --- STAMPEDE / THUNDERING HERD GUARD (Request Coalescing) ---
const _inFlightBootstrapPromises = new Map();

export async function fetchBootstrapWithCoalescing(key, fetcher) {
  if (_inFlightBootstrapPromises.has(key)) {
    return _inFlightBootstrapPromises.get(key);
  }
  const promise = (async () => {
    try {
      return await fetcher();
    } finally {
      _inFlightBootstrapPromises.delete(key);
    }
  })();
  _inFlightBootstrapPromises.set(key, promise);
  return promise;
}

// --- STATIC CACHES (Roles, Templates, Users) ---

export async function getCachedRoles(supabase) {
  const now = Date.now();
  if (!_rolesCache || now - _rolesCacheTime > STATIC_TTL) {
    const { data } = await supabase.from('roles').select('*').is('deleted_at', null);
    _rolesCache = data || [];
    _rolesCacheTime = now;
  }
  return _rolesCache;
}

export function invalidateRolesCache() {
  _rolesCache = null;
  _rolesCacheTime = 0;
  invalidateBootstrapCache(); // Also invalidate bootstrap since it depends on roles
}

const DEFAULT_33_TEMPLATES = [
  { id: "tpl-01", code: "01", category_id: "architectural", category_ar: "معماري", category_en: "Architectural", category_icon: "🏛️", name_ar: "مخططات معمارية كاملة", name_en: "Complete Architectural Drawings", type_ar: "مخطط", type_en: "Drawing", default_weight: 12, default_duration: 6 },
  { id: "tpl-02", code: "02", category_id: "architectural", category_ar: "معماري", category_en: "Architectural", category_icon: "🏛️", name_ar: "مخططات الجدران وأنواعها وتشطيبها", name_en: "Wall Types & Finishing Plans", type_ar: "مخطط", type_en: "Drawing", default_weight: 6, default_duration: 3 },
  { id: "tpl-03", code: "03", category_id: "architectural", category_ar: "معماري", category_en: "Architectural", category_icon: "🏛️", name_ar: "مخططات الأسقف (إنارة، غريلات، رشاشات)", name_en: "Ceiling Plans", type_ar: "مخطط", type_en: "Drawing", default_weight: 6, default_duration: 3 },
  { id: "tpl-04", code: "04", category_id: "architectural", category_ar: "معماري", category_en: "Architectural", category_icon: "🏛️", name_ar: "مخططات الأعمال الخشبية", name_en: "Carpentry & Woodwork Plans", type_ar: "مخطط", type_en: "Drawing", default_weight: 5, default_duration: 3 },
  { id: "tpl-05", code: "05", category_id: "architectural", category_ar: "معماري", category_en: "Architectural", category_icon: "🏛️", name_ar: "مخطط توزيع الأفياش على الفرش", name_en: "Furniture Layout – Power Outlets", type_ar: "مخطط", type_en: "Drawing", default_weight: 4, default_duration: 2 },
  { id: "tpl-06", code: "06", category_id: "architectural", category_ar: "معماري", category_en: "Architectural", category_icon: "🏛️", name_ar: "مخططات الأرضيات", name_en: "Flooring Plans", type_ar: "مخطط", type_en: "Drawing", default_weight: 5, default_duration: 3 },
  { id: "tpl-07", code: "07", category_id: "architectural", category_ar: "معماري", category_en: "Architectural", category_icon: "🏛️", name_ar: "رسومات ثلاثية الابعاد", name_en: "3D drawing", type_ar: "مخطط", type_en: "Drawing", default_weight: 8, default_duration: 4 },
  { id: "tpl-08", code: "08", category_id: "electrical", category_ar: "كهرباء — إلكتروميكانيك", category_en: "Electrical — Electromechanical", category_icon: "⚡", name_ar: "مخططات الإنارة الكهربائية", name_en: "Electrical Lighting Plans", type_ar: "مخطط", type_en: "Drawing", default_weight: 7, default_duration: 4 },
  { id: "tpl-09", code: "09", category_id: "electrical", category_ar: "كهرباء — إلكتروميكانيك", category_en: "Electrical — Electromechanical", category_icon: "⚡", name_ar: "مخططات الأفياش والمقابس", name_en: "Power Outlets Plans", type_ar: "مخطط", type_en: "Drawing", default_weight: 6, default_duration: 3 },
  { id: "tpl-10", code: "10", category_id: "electrical", category_ar: "كهرباء — إلكتروميكانيك", category_en: "Electrical — Electromechanical", category_icon: "⚡", name_ar: "مخططات الأحمال الميكانيكية", name_en: "Mechanical Loads Plans", type_ar: "مخطط", type_en: "Drawing", default_weight: 5, default_duration: 3 },
  { id: "tpl-11", code: "11", category_id: "electrical", category_ar: "كهرباء — إلكتروميكانيك", category_en: "Electrical — Electromechanical", category_icon: "⚡", name_ar: "مخططات التأريض", name_en: "Grounding Plans", type_ar: "مخطط", type_en: "Drawing", default_weight: 4, default_duration: 2 },
  { id: "tpl-12", code: "12", category_id: "electrical", category_ar: "كهرباء — إلكتروميكانيك", category_en: "Electrical — Electromechanical", category_icon: "⚡", name_ar: "مخططات اللوحات والكابلات", name_en: "Panels & Cables Plans", type_ar: "مخطط", type_en: "Drawing", default_weight: 6, default_duration: 3 },
  { id: "tpl-13", code: "13", category_id: "plumbing", category_ar: "سباكة — إلكتروميكانيك", category_en: "Plumbing — Electromechanical", category_icon: "💧", name_ar: "مخططات السباكة (مياه باردة وساخنة)", name_en: "Plumbing Plans", type_ar: "مخطط", type_en: "Drawing", default_weight: 7, default_duration: 4 },
  { id: "tpl-14", code: "14", category_id: "plumbing", category_ar: "سباكة — إلكتروميكانيك", category_en: "Plumbing — Electromechanical", category_icon: "💧", name_ar: "مخططات الصرف الصحي", name_en: "Drainage & Sanitary Plans", type_ar: "مخطط", type_en: "Drawing", default_weight: 6, default_duration: 3 },
  { id: "tpl-15", code: "15", category_id: "hvac", category_ar: "تكييف — إلكتروميكانيك", category_en: "HVAC — Electromechanical", category_icon: "🌡️", name_ar: "مخططات التكييف والتهوية", name_en: "HVAC & Ventilation Plans", type_ar: "مخطط", type_en: "Drawing", default_weight: 8, default_duration: 4 },
  { id: "tpl-16", code: "16", category_id: "hvac", category_ar: "تكييف — إلكتروميكانيك", category_en: "HVAC — Electromechanical", category_icon: "🌡️", name_ar: "مخططات مجاري الهواء (Ducting)", name_en: "Air Duct Plans", type_ar: "مخطط", type_en: "Drawing", default_weight: 7, default_duration: 4 },
  { id: "tpl-17", code: "17", category_id: "fire", category_ar: "حريق — إلكتروميكانيك", category_en: "Fire Protection — Electromechanical", category_icon: "🧯", name_ar: "مخططات رشاشات الحريق (Sprinklers)", name_en: "Fire Sprinkler Plans", type_ar: "مخطط", type_en: "Drawing", default_weight: 6, default_duration: 3 },
  { id: "tpl-18", code: "18", category_id: "fire", category_ar: "حريق — إلكتروميكانيك", category_en: "Fire Protection — Electromechanical", category_icon: "🧯", name_ar: "مخططات إنذار الحريق (Fire Alarm)", name_en: "Fire Alarm Plans", type_ar: "مخطط", type_en: "Drawing", default_weight: 6, default_duration: 3 },
  { id: "tpl-19", code: "19", category_id: "fire", category_ar: "حريق — إلكتروميكانيك", category_en: "Fire Protection — Electromechanical", category_icon: "🧯", name_ar: "مخططات طفايات الحريق", name_en: "Fire Extinguisher Layout", type_ar: "مخطط", type_en: "Drawing", default_weight: 4, default_duration: 2 },
  { id: "tpl-20", code: "20", category_id: "low_current", category_ar: "تيار خفيف", category_en: "Low Current", category_icon: "📡", name_ar: "مخططات شبكة الإنترنت (WiFi)", name_en: "WiFi Network Plans", type_ar: "مخطط", type_en: "Drawing", default_weight: 5, default_duration: 3 },
  { id: "tpl-21", code: "21", category_id: "low_current", category_ar: "تيار خفيف", category_en: "Low Current", category_icon: "📡", name_ar: "مخططات الكاميرات (CCTV)", name_en: "CCTV Camera Plans", type_ar: "مخطط", type_en: "Drawing", default_weight: 5, default_duration: 3 },
  { id: "tpl-22", code: "22", category_id: "low_current", category_ar: "تيار خفيف", category_en: "Low Current", category_icon: "📡", name_ar: "مخططات نظام الصوت والسماعات", name_en: "Sound System & Speaker Plans", type_ar: "مخطط", type_en: "Drawing", default_weight: 4, default_duration: 2 },
  { id: "tpl-23", code: "23", category_id: "low_current", category_ar: "تيار خفيف", category_en: "Low Current", category_icon: "📡", name_ar: "مخططات نظام التحكم بالدخول", name_en: "Access Control System Plans", type_ar: "مخطط", type_en: "Drawing", default_weight: 4, default_duration: 2 },
  { id: "tpl-24", code: "24", category_id: "sections", category_ar: "مقاطع", category_en: "Sections", category_icon: "✂️", name_ar: "مقاطع عرضية وطولية — معماري", name_en: "Cross & Long. Sections – Arch", type_ar: "مخطط", type_en: "Drawing", default_weight: 6, default_duration: 3 },
  { id: "tpl-25", code: "25", category_id: "sections", category_ar: "مقاطع", category_en: "Sections", category_icon: "✂️", name_ar: "مقاطع عرضية وطولية — إلكتروميكانيك", name_en: "Cross & Long. Sections – Electromech", type_ar: "مخطط", type_en: "Drawing", default_weight: 6, default_duration: 3 },
  { id: "tpl-26", code: "26", category_id: "detail", category_ar: "تفصيلي", category_en: "Detailed", category_icon: "🔍", name_ar: "مخططات تفصيلية لكل غرفة", name_en: "Detailed Room Plans", type_ar: "مخطط", type_en: "Drawing", default_weight: 8, default_duration: 4 },
  { id: "tpl-27", code: "27", category_id: "site", category_ar: "موقع عام", category_en: "Site Plan", category_icon: "🗺️", name_ar: "مخططات الموقع العام", name_en: "Site Plan", type_ar: "مخطط", type_en: "Drawing", default_weight: 6, default_duration: 3 },
  { id: "tpl-28", code: "28", category_id: "quantity", category_ar: "جداول كميات", category_en: "Quantity Tables", category_icon: "📊", name_ar: "جدول كميات — معماري", name_en: "Architectural Quantity Table", type_ar: "جدول", type_en: "Table", default_weight: 5, default_duration: 3 },
  { id: "tpl-29", code: "29", category_id: "quantity", category_ar: "جداول كميات", category_en: "Quantity Tables", category_icon: "📊", name_ar: "جدول كميات — كهرباء", name_en: "Electrical Quantity Table", type_ar: "جدول", type_en: "Table", default_weight: 5, default_duration: 3 },
  { id: "tpl-30", code: "30", category_id: "quantity", category_ar: "جداول كميات", category_en: "Quantity Tables", category_icon: "📊", name_ar: "جدول كميات — ميكانيك", name_en: "Mechanical Quantity Table", type_ar: "جدول", type_en: "Table", default_weight: 5, default_duration: 3 },
  { id: "tpl-31", code: "31", category_id: "documents", category_ar: "وثائق وخطابات", category_en: "Documents & Letters", category_icon: "📄", name_ar: "خطاب للعميل", name_en: "Client Letter", type_ar: "خطاب", type_en: "Letter", default_weight: 3, default_duration: 2 },
  { id: "tpl-32", code: "32", category_id: "documents", category_ar: "وثائق وخطابات", category_en: "Documents & Letters", category_icon: "📄", name_ar: "عرض سعر", name_en: "Price Offer", type_ar: "عرض سعر", type_en: "Quote", default_weight: 6, default_duration: 3 },
  { id: "tpl-33", code: "33", category_id: "documents", category_ar: "وثائق وخطابات", category_en: "Documents & Letters", category_icon: "📄", name_ar: "تقرير متابعة المشروع", name_en: "Project Follow-up Report", type_ar: "تقرير", type_en: "Report", default_weight: 4, default_duration: 2 }
];

export async function getCachedTemplates(supabase) {
  const now = Date.now();
  if (!_templatesCache || now - _templatesCacheTime > STATIC_TTL) {
    const { data } = await supabase.from('templates').select('*').is('deleted_at', null);
    let items = (data && data.length) ? data : DEFAULT_33_TEMPLATES;
    // Map missing category_id
    items = items.map(t => {
      if (t.category_id) return t;
      const match = DEFAULT_33_TEMPLATES.find(d => d.code === t.code || d.id === t.id);
      return match ? { ...t, category_id: match.category_id, category_ar: match.category_ar, category_en: match.category_en, category_icon: match.category_icon } : t;
    });
    _templatesCache = items;
    _templatesCacheTime = now;
  }
  return _templatesCache;
}

export function invalidateTemplatesCache() {
  _templatesCache = null;
  _templatesCacheTime = 0;
  invalidateBootstrapCache();
}

export async function getCachedUsers(supabase) {
  const now = Date.now();
  if (!_usersCache || now - _usersCacheTime > USERS_TTL) {
    try {
      const { data } = await supabase.from('active_users').select('*');
      _usersCache = (data || []).map(u => ({
        id: u.id,
        name: u.name,
        name_en: u.name_en,
        email: u.email,
        status: u.status,
        role_id: u.role_id,
        avatar_color: u.avatar_color,
        job_title_ar: u.job_title_ar || '',
        job_title_en: u.job_title_en || '',
        specialty: u.specialty || u.custom_fields?.specialty || '',
        avatar_url: u.avatar_url || u.custom_fields?.avatarUrl || null,
        last_login_at: u.last_login_at || u.custom_fields?.lastLoginAt || null,
        last_active_at: u.last_active_at || u.custom_fields?.lastActiveAt || null
      }));
    } catch (e) {
      console.warn('[Cache] getCachedUsers error:', e.message);
      _usersCache = _usersCache || [];
    }
    _usersCacheTime = now;
  }
  return _usersCache;
}

export function invalidateUsersCache() {
  _usersCache = null;
  _usersCacheTime = 0;
  invalidateBootstrapCache();
}

let _companyCache = null;
let _companyCacheTime = 0;

export async function getCachedCompany(supabase) {
  const now = Date.now();
  if (!_companyCache || now - _companyCacheTime > STATIC_TTL) {
    try {
      const { data } = await supabase.from('company').select('*').eq('id', 'default').maybeSingle();
      if (data) _companyCache = data;
    } catch (e) {
      // company table might not exist yet
    }
    if (!_companyCache) {
      _companyCache = { id: 'default', name: 'DARC Design Team', name_ar: 'فريق دارك للتصميم', name_en: 'DARC Design Team', logo_url: null };
    }
    _companyCacheTime = now;
  }
  return _companyCache;
}

export function setCompanyCacheDirect(data) {
  _companyCache = data;
  _companyCacheTime = Date.now();
  invalidateBootstrapCache();
}

export function invalidateCompanyCache() {
  _companyCache = null;
  _companyCacheTime = 0;
  invalidateBootstrapCache();
}
