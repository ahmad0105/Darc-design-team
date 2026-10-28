import { Hono } from 'hono';
import { getDB } from '../../core/db.js';
import { getDemoPayload } from '../demo/demo.service.js';
import { toCamelCase } from '../../utils/transformers.js';
import { getCachedUsers } from '../../core/cache.js';

const auditApp = new Hono();

// Helper to escape CSV cell contents and neutralize Spreadsheet Formula Injection (CWE-1236)
function escapeCSV(val) {
  if (val === null || val === undefined) return '""';
  let str = typeof val === 'object' ? JSON.stringify(val) : String(val);
  const trimmed = str.trimStart();
  if (/^[=+@\-]/.test(trimmed) || /^[\t\r]/.test(str)) {
    str = `'${str}`;
  }
  return `"${str.replace(/"/g, '""')}"`;
}

// GET /api/audit or /api/audit/logs - Fetch audit logs with rich filters
auditApp.get('/', async (c) => {
  const isDemo = c.get('isDemo');
  const userId = c.get('userId');
  const roleId = c.get('roleId');
  const isAhmad = userId === 'usr_ahmad';
  const isAdmin = roleId === 'admin' || isAhmad;

  const url = new URL(c.req.url);
  const limit = Math.min(Math.max(parseInt(url.searchParams.get('limit') || '50', 10), 1), 2000);
  const offset = Math.max(parseInt(url.searchParams.get('offset') || '0', 10), 0);
  const search = (url.searchParams.get('search') || '').trim().toLowerCase();
  const filterAction = url.searchParams.get('action');
  const filterEntityType = url.searchParams.get('entityType');
  const filterUserId = url.searchParams.get('userId');
  const startDate = url.searchParams.get('startDate');
  const endDate = url.searchParams.get('endDate');

  if (isDemo) {
    const demoData = getDemoPayload();
    let logs = (demoData.auditLogs || []).map(log => {
      const u = demoData.users.find(usr => usr.id === log.userId);
      return {
        ...log,
        user: u ? { id: u.id, name: u.name, nameEn: u.nameEn, roleId: u.roleId, avatarColor: u.avatarColor, avatarUrl: u.avatarUrl } : null
      };
    });

    if (search) {
      logs = logs.filter(l => 
        (l.action && l.action.toLowerCase().includes(search)) ||
        (l.entityType && l.entityType.toLowerCase().includes(search)) ||
        (l.entityId && l.entityId.toLowerCase().includes(search)) ||
        (l.user && ((l.user.name && l.user.name.toLowerCase().includes(search)) || (l.user.nameEn && l.user.nameEn.toLowerCase().includes(search)))) ||
        JSON.stringify(l.details || {}).toLowerCase().includes(search)
      );
    }
    if (filterAction && filterAction !== 'all') {
      logs = logs.filter(l => l.action === filterAction);
    }
    if (filterEntityType && filterEntityType !== 'all') {
      logs = logs.filter(l => l.entityType === filterEntityType);
    }
    if (filterUserId && filterUserId !== 'all') {
      logs = logs.filter(l => l.userId === filterUserId);
    }
    if (startDate) {
      const startMs = new Date(startDate).getTime();
      logs = logs.filter(l => new Date(l.createdAt).getTime() >= startMs);
    }
    if (endDate) {
      const endMs = new Date(endDate).getTime();
      logs = logs.filter(l => new Date(l.createdAt).getTime() <= endMs);
    }

    const total = logs.length;
    const paged = logs.slice(offset, offset + limit);

    return c.json({
      ok: true,
      logs: paged,
      total,
      limit,
      offset
    });
  }

  const supabase = getDB(c.env);

  // Check permissions: Non-admins without view_audit_logs permission only see their own logs
  let effectiveUserId = null;
  if (!isAdmin) {
    const { data: userRole } = await supabase.from('users').select('roles(permissions)').eq('id', userId).single();
    const permissions = userRole?.roles?.permissions || [];
    const hasAuditPerm = permissions.includes('*') || permissions.includes('view_audit_logs');
    if (!hasAuditPerm) {
      effectiveUserId = userId;
    }
  }

  // Fetch users for joining via in-memory cache (eliminates redundant DB query)
  const dbUsers = await getCachedUsers(supabase);
  const userMap = new Map((dbUsers || []).map(u => [u.id, {
    id: u.id,
    name: u.name,
    nameEn: u.nameEn || u.name_en || u.name,
    roleId: u.role_id,
    avatarColor: u.avatar_color,
    avatarUrl: u.avatar_url
  }]));

  let query = supabase.from('audit_logs').select('id, user_id, action, entity_type, entity_id, details, created_at', { count: 'exact' });

  if (effectiveUserId) {
    query = query.eq('user_id', effectiveUserId);
  } else if (filterUserId && filterUserId !== 'all') {
    query = query.eq('user_id', filterUserId);
  }

  if (filterAction && filterAction !== 'all') {
    query = query.eq('action', filterAction);
  }

  if (filterEntityType && filterEntityType !== 'all') {
    query = query.eq('entity_type', filterEntityType);
  }

  if (startDate) {
    query = query.gte('created_at', startDate);
  }

  if (endDate) {
    query = query.lte('created_at', endDate);
  }

  query = query.order('created_at', { ascending: false }).range(offset, offset + limit - 1);

  const { data: dbLogs, count, error } = await query;
  if (error) {
    console.error('[Audit Query Error]', error.message);
    return c.json({ error: 'فشل استرجاع سجل العمليات، يرجى المحاولة لاحقاً.' }, 500);
  }

  // Filter sensitive logs if not root admin
  const exposed = (isAhmad ? (dbLogs || []) : (dbLogs || []).filter(a => a.user_id !== 'usr_ahmad' && a.entity_id !== 'usr_ahmad')).map(log => ({
    ...toCamelCase(log),
    user: userMap.get(log.user_id) || null
  }));

  // Client-side search in details if search is present
  let finalLogs = exposed;
  if (search) {
    finalLogs = exposed.filter(l => 
      (l.action && l.action.toLowerCase().includes(search)) ||
      (l.entityType && l.entityType.toLowerCase().includes(search)) ||
      (l.entityId && l.entityId.toLowerCase().includes(search)) ||
      (l.user && ((l.user.name && l.user.name.toLowerCase().includes(search)) || (l.user.nameEn && l.user.nameEn.toLowerCase().includes(search)))) ||
      JSON.stringify(l.details || {}).toLowerCase().includes(search)
    );
  }

  return c.json({
    ok: true,
    logs: finalLogs,
    total: count || finalLogs.length,
    limit,
    offset
  });
});

// GET /api/audit/export - Stream CSV with UTF-8 BOM
auditApp.get('/export', async (c) => {
  const isDemo = c.get('isDemo');
  const userId = c.get('userId');
  const roleId = c.get('roleId');
  const isAhmad = userId === 'usr_ahmad';
  const isAdmin = roleId === 'admin' || isAhmad;

  if (!isAdmin && !isDemo) {
    const supabase = getDB(c.env);
    const { data: userRole } = await supabase.from('users').select('roles(permissions)').eq('id', userId).single();
    const permissions = userRole?.roles?.permissions || [];
    if (!permissions.includes('*') && !permissions.includes('view_audit_logs') && !permissions.includes('export_reports')) {
      return c.json({ error: 'غير مصرح لك بتصدير سجل الرقابة' }, 403);
    }
  }

  let logs = [];
  if (isDemo) {
    const demoData = getDemoPayload();
    logs = (demoData.auditLogs || []).map(log => {
      const u = demoData.users.find(usr => usr.id === log.userId);
      return {
        ...log,
        user: u ? { name: u.name, nameEn: u.nameEn, roleId: u.roleId } : null
      };
    });
  } else {
    const supabase = getDB(c.env);
    const { data: dbUsers } = await supabase.from('users').select('id, name, name_ar, name_en, role_id');
    const userMap = new Map((dbUsers || []).map(u => [u.id, {
      name: u.name || u.name_ar,
      nameEn: u.name_en || u.name,
      roleId: u.role_id
    }]));

    const { data: rawLogs } = await supabase.from('audit_logs')
      .select('id, user_id, action, entity_type, entity_id, details, created_at')
      .order('created_at', { ascending: false })
      .limit(3000);

    const safeLogs = isAhmad ? (rawLogs || []) : (rawLogs || []).filter(a => a.user_id !== 'usr_ahmad' && a.entity_id !== 'usr_ahmad');
    logs = safeLogs.map(l => ({
      ...toCamelCase(l),
      user: userMap.get(l.user_id) || null
    }));
  }

  const csvRows = [];
  // UTF-8 BOM
  csvRows.push('\uFEFF');
  // Header row
  csvRows.push([
    escapeCSV('المعرف (ID)'),
    escapeCSV('التاريخ والوقت (Date & Time)'),
    escapeCSV('اسم المستخدم (User / Actor)'),
    escapeCSV('الدور الوظيفي (Role)'),
    escapeCSV('نوع الإجراء (Action)'),
    escapeCSV('نوع العنصر (Entity Type)'),
    escapeCSV('معرف العنصر (Entity ID)'),
    escapeCSV('التفاصيل والتغييرات (Details)')
  ].join(','));

  logs.forEach(log => {
    const userName = log.user ? `${log.user.name || ''} (${log.user.nameEn || ''})`.trim() : 'النظام / System';
    const userRole = log.user ? log.user.roleId : '—';
    const dt = new Date(log.createdAt).toLocaleString('ar-SA', { dateStyle: 'short', timeStyle: 'medium' });
    const detailText = typeof log.details === 'object' ? JSON.stringify(log.details) : String(log.details || '');

    csvRows.push([
      escapeCSV(log.id),
      escapeCSV(dt),
      escapeCSV(userName),
      escapeCSV(userRole),
      escapeCSV(log.action),
      escapeCSV(log.entityType),
      escapeCSV(log.entityId || '—'),
      escapeCSV(detailText)
    ].join(','));
  });

  const csvContent = csvRows.join('\r\n');
  const dateStr = new Date().toISOString().split('T')[0];

  return new Response(csvContent, {
    status: 200,
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': `attachment; filename="DARC_Audit_Logs_${dateStr}.csv"`,
      'Cache-Control': 'no-store'
    }
  });
});

// POST /api/audit - Insert an audit entry
auditApp.post('/', async (c) => {
  const userId = c.get('userId');
  if (!userId) return c.json({ error: 'غير مصرح' }, 401);
  const isDemo = c.get('isDemo');

  if (isDemo) {
    return c.json({ ok: true, isDemo: true });
  }

  const body = await c.req.json();
  const supabase = getDB(c.env);
  const nowIso = new Date().toISOString();

  const action = String(body.action || 'activity').trim().slice(0, 100);
  const entityType = String(body.entityType || 'system').trim().slice(0, 100);
  const entityId = body.entityId ? String(body.entityId).trim().slice(0, 100) : null;
  const rawDetails = (body.details && typeof body.details === 'object') ? body.details : {};
  const detailsStr = JSON.stringify(rawDetails);
  const safeDetails = detailsStr.length > 50000 ? { summary: 'Payload exceeded size limit' } : rawDetails;

  await supabase.from('audit_logs').insert([{
    user_id: userId,
    action,
    entity_type: entityType,
    entity_id: entityId,
    details: safeDetails,
    created_at: nowIso
  }]);

  return c.json({ ok: true });
});

export default auditApp;
