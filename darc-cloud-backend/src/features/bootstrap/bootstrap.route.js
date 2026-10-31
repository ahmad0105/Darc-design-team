const DEFAULT_PERMISSIONS_CATALOG = [
  // 🏢 المشاريع والفرق (Projects & Teams)
  { id: 'view_projects', category: 'projects', categoryAr: 'المشاريع والفرق', categoryEn: 'Projects & Teams', nameAr: 'عرض المشاريع', nameEn: 'View Projects' },
  { id: 'create_projects', category: 'projects', categoryAr: 'المشاريع والفرق', categoryEn: 'Projects & Teams', nameAr: 'إنشاء المشاريع', nameEn: 'Create Projects' },
  { id: 'edit_projects', category: 'projects', categoryAr: 'المشاريع والفرق', categoryEn: 'Projects & Teams', nameAr: 'تعديل المشاريع', nameEn: 'Edit Projects' },
  { id: 'delete_projects', category: 'projects', categoryAr: 'المشاريع والفرق', categoryEn: 'Projects & Teams', nameAr: 'حذف المشاريع', nameEn: 'Delete Projects' },
  { id: 'manage_project_members', category: 'projects', categoryAr: 'المشاريع والفرق', categoryEn: 'Projects & Teams', nameAr: 'إدارة أعضاء المشروع', nameEn: 'Manage Project Members' },

  // 📋 المهام والتنفيذ (Tasks & Execution)
  { id: 'create_tasks', category: 'tasks', categoryAr: 'المهام والتنفيذ', categoryEn: 'Tasks & Execution', nameAr: 'إنشاء المهام', nameEn: 'Create Tasks' },
  { id: 'edit_tasks', category: 'tasks', categoryAr: 'المهام والتنفيذ', categoryEn: 'Tasks & Execution', nameAr: 'تعديل المهام', nameEn: 'Edit Tasks' },
  { id: 'delete_tasks', category: 'tasks', categoryAr: 'المهام والتنفيذ', categoryEn: 'Tasks & Execution', nameAr: 'حذف المهام', nameEn: 'Delete Tasks' },
  { id: 'assign_tasks', category: 'tasks', categoryAr: 'المهام والتنفيذ', categoryEn: 'Tasks & Execution', nameAr: 'إسناد المهام للمنفذين', nameEn: 'Assign Tasks' },
  { id: 'review_tasks', category: 'tasks', categoryAr: 'المهام والتنفيذ', categoryEn: 'Tasks & Execution', nameAr: 'مراجعة المخرجات الهندسية', nameEn: 'Review Deliverables' },
  { id: 'approve_tasks', category: 'tasks', categoryAr: 'المهام والتنفيذ', categoryEn: 'Tasks & Execution', nameAr: 'اعتماد المخرجات الهندسية', nameEn: 'Approve Deliverables' },
  { id: 'manage_reminders', category: 'tasks', categoryAr: 'المهام والتنفيذ', categoryEn: 'Tasks & Execution', nameAr: 'إدارة التذكيرات', nameEn: 'Manage Reminders' },

  // 📐 المخططات والمكتبة القياسية (Drawings & Deliverables Library)
  { id: 'upload_documents', category: 'documents', categoryAr: 'المخططات والمكتبة', categoryEn: 'Drawings & Library', nameAr: 'رفع المخططات والمستندات', nameEn: 'Upload Documents' },
  { id: 'delete_documents', category: 'documents', categoryAr: 'المخططات والمكتبة', categoryEn: 'Drawings & Library', nameAr: 'حذف المخططات والمستندات', nameEn: 'Delete Documents' },
  { id: 'manage_templates', category: 'documents', categoryAr: 'المخططات والمكتبة', categoryEn: 'Drawings & Library', nameAr: 'إدارة مكتبة القوالب والمخرجات', nameEn: 'Manage Templates Library' },

  // 📊 المؤشرات والتقارير (Analytics & Reports)
  { id: 'view_dashboard', category: 'reports', categoryAr: 'المؤشرات والتقارير', categoryEn: 'Analytics & Reports', nameAr: 'عرض لوحة التحكم والمؤشرات', nameEn: 'View Dashboard' },
  { id: 'view_reports', category: 'reports', categoryAr: 'المؤشرات والتقارير', categoryEn: 'Analytics & Reports', nameAr: 'عرض صفحة التقارير والمؤشرات', nameEn: 'View Reports & Analytics' },
  { id: 'export_reports', category: 'reports', categoryAr: 'المؤشرات والتقارير', categoryEn: 'Analytics & Reports', nameAr: 'تصدير التقارير (Excel)', nameEn: 'Export Reports (Excel)' },

  // 🛡️ النظام والأمان (Administration & Governance)
  { id: 'manage_users', category: 'admin', categoryAr: 'النظام والأمان', categoryEn: 'Administration & Governance', nameAr: 'إدارة حسابات المستخدمين', nameEn: 'Manage Users' },
  { id: 'manage_existing_account_permissions', category: 'admin', categoryAr: 'النظام والأمان', categoryEn: 'Administration & Governance', nameAr: 'تعديل صلاحيات الحسابات الموجودة', nameEn: 'Manage Existing Account Permissions' },
  { id: 'view_user_activity', category: 'admin', categoryAr: 'النظام والأمان', categoryEn: 'Administration & Governance', nameAr: 'متابعة أوقات دخول ونشاط المستخدمين', nameEn: 'View User Logins & Activity Timestamps' },
  { id: 'manage_roles', category: 'admin', categoryAr: 'النظام والأمان', categoryEn: 'Administration & Governance', nameAr: 'إدارة الأدوار والصلاحيات', nameEn: 'Manage Roles & Permissions' },
  { id: 'manage_settings', category: 'admin', categoryAr: 'النظام والأمان', categoryEn: 'Administration & Governance', nameAr: 'إدارة إعدادات النظام والشركة', nameEn: 'Manage Company & Settings' },
  { id: 'manage_trash', category: 'admin', categoryAr: 'النظام والأمان', categoryEn: 'Administration & Governance', nameAr: 'إدارة سلة المهملات', nameEn: 'Manage Trash' },
  { id: 'view_audit_logs', category: 'admin', categoryAr: 'النظام والأمان', categoryEn: 'Administration & Governance', nameAr: 'استعراض سجل الرقابة والعمليات', nameEn: 'View Audit Logs' }
];

import { Hono } from 'hono';
import { getDB } from '../../core/db.js';
import { getBootstrapCache, setBootstrapCache, fetchBootstrapWithCoalescing, getCachedRoles, getCachedTemplates, getCachedUsers, getCachedCompany, getCacheVersion } from '../../core/cache.js';
import { getDemoPayload } from '../demo/demo.service.js';

const app = new Hono();

const JSONB_PASSTHROUGH_KEYS = new Set(['custom_fields', 'permissions', 'details']);

function toCamelCase(obj) {
  if (obj === null || typeof obj !== 'object') return obj;
  if (Array.isArray(obj)) {
    const len = obj.length;
    const res = new Array(len);
    for (let i = 0; i < len; i++) res[i] = toCamelCase(obj[i]);
    return res;
  }
  const result = {};
  for (const key of Object.keys(obj)) {
    const camelKey = key.indexOf('_') === -1 ? key : key.replace(/_([a-z])/g, (_, c) => c.toUpperCase());
    const val = obj[key];
    if (JSONB_PASSTHROUGH_KEYS.has(key)) {
      result[camelKey] = val;
    } else {
      result[camelKey] = (val !== null && typeof val === 'object') ? toCamelCase(val) : val;
    }
  }
  return result;
}

export async function generateBootstrapPayloadForUser(env, userId, roleId) {
  // Isolated Showcase Demo Sandbox (100% Shielded from Production DB)
  if (userId === 'usr_demo') {
    const demoPayload = getDemoPayload();
    const demoEtag = 'W/"demo-bootstrap-v2"';
    return { responsePayload: demoPayload, etag: demoEtag };
  }

  const cacheKey = `${userId}:${roleId}`;

  // 1. High-Performance In-Memory Micro-Cache: Serves sub-5ms responses during active sessions
  const cached = getBootstrapCache(cacheKey);
  if (cached) {
    return { responsePayload: cached.payload, etag: cached.etag };
  }

  const supabase = getDB(env);

  return await fetchBootstrapWithCoalescing(cacheKey, async () => {
    const isGlobalAdmin = roleId === 'admin';

    let roles, templates, activeUsers, company, projectsRes, tasksRes, docsRes, membersRes, commentsRes, auditRes, notifRes;

    const PROJECT_COLUMNS = 'id, code, name_ar, name_en, client_ar, client_en, description_ar, description_en, lifecycle, health, start_date, due_date, manager_id, progress, progress_mode, demo, custom_fields, created_at, updated_at';
    const TASK_COLUMNS = 'id, project_id, title_ar, title_en, description_ar, description_en, status, priority, category_ar, category_en, type_ar, type_en, weight, progress, assignee_id, reviewer_id, approver_id, parent_task_id, start_date, due_date, template_id, custom_fields, created_at, updated_at';
    const MEMBER_COLUMNS = 'project_id, user_id, role_id';
    const NOTIFICATION_COLUMNS = 'id, user_id, type, title_ar, title_en, message_ar, message_en, body_ar, body_en, content, task_id, project_id, read, read_at, created_at';
    const DOCUMENT_COLUMNS = 'id, project_id, task_id, uploader_id, original_name, disk_filename, mime_type, size, status, superseded_by, created_at, deleted_at';
    const COMMENT_COLUMNS = 'id, task_id, user_id, content, created_at, updated_at, deleted_at';

    // Single-batch parallel execution (eliminates sequential round-trips & lean projections)
    if (isGlobalAdmin) {
      [roles, templates, activeUsers, company, projectsRes, tasksRes, docsRes, membersRes, commentsRes, auditRes, notifRes] = await Promise.all([
        getCachedRoles(supabase),
        getCachedTemplates(supabase),
        getCachedUsers(supabase),
        getCachedCompany(supabase),
        supabase.from('active_projects').select(PROJECT_COLUMNS),
        supabase.from('active_tasks').select(TASK_COLUMNS),
        supabase.from('documents').select(DOCUMENT_COLUMNS).is('deleted_at', null),
        supabase.from('project_members').select(MEMBER_COLUMNS),
        supabase.from('comments').select(COMMENT_COLUMNS).is('deleted_at', null).order('created_at', { ascending: false }).limit(35),
        supabase.from('audit_logs').select('id, user_id, action, entity_type, entity_id, details, created_at').order('created_at', { ascending: false }).limit(35),
        supabase.from('notifications').select(NOTIFICATION_COLUMNS).eq('user_id', userId).order('created_at', { ascending: false }).limit(20)
      ]);
    } else {
      const initialProjReq = supabase.from('active_projects').select(`${PROJECT_COLUMNS}, project_members!inner(user_id)`).eq('project_members.user_id', userId);
      const auditLogsReq = supabase.from('audit_logs').select('id, user_id, action, entity_type, entity_id, details, created_at').eq('user_id', userId).order('created_at', { ascending: false }).limit(35);
      const notifReq = supabase.from('notifications').select(NOTIFICATION_COLUMNS).eq('user_id', userId).order('created_at', { ascending: false }).limit(20);

      const [r, t, u, comp, userProjRes, auditLogsRes, nr] = await Promise.all([
        getCachedRoles(supabase),
        getCachedTemplates(supabase),
        getCachedUsers(supabase),
        getCachedCompany(supabase),
        initialProjReq,
        auditLogsReq,
        notifReq
      ]);

      roles = r;
      templates = t;
      activeUsers = u;
      company = comp;
      auditRes = auditLogsRes;
      notifRes = nr;

      const userRole = roles.find(role => role.id === roleId);
      const canViewAll = userRole?.permissions?.includes('view_all_projects');

      let userProjects = (userProjRes.data || []).map(p => { const copy = { ...p }; delete copy.project_members; return copy; });
      
      if (canViewAll) {
        const { data: allProj } = await supabase.from('active_projects').select(PROJECT_COLUMNS);
        if (allProj) userProjects = allProj;
      }
      
      projectsRes = { data: userProjects };
      const visibleIds = userProjects.map(p => p.id);

      if (visibleIds.length > 0) {
        [tasksRes, docsRes, membersRes] = await Promise.all([
          supabase.from('active_tasks').select(TASK_COLUMNS).in('project_id', visibleIds),
          supabase.from('documents').select(DOCUMENT_COLUMNS).in('project_id', visibleIds).is('deleted_at', null),
          supabase.from('project_members').select(MEMBER_COLUMNS).in('project_id', visibleIds)
        ]);
        const visibleTaskIds = (tasksRes?.data || []).map(t => t.id);
        if (visibleTaskIds.length > 0) {
          commentsRes = await supabase.from('comments').select(COMMENT_COLUMNS).in('task_id', visibleTaskIds).is('deleted_at', null).order('created_at', { ascending: false }).limit(35);
        } else {
          commentsRes = { data: [] };
        }
      } else {
        tasksRes = { data: [] }; docsRes = { data: [] }; membersRes = { data: [] }; commentsRes = { data: [] };
      }
    }

    let projects = projectsRes?.data || [];
    const tasks = tasksRes?.data || [];
    const documents = docsRes?.data || [];
    const members = membersRes?.data || [];
    const comments = commentsRes?.data || [];
    const auditLogs = auditRes?.data || [];
    const notifications = notifRes?.data || [];

    const userRole = roles.find(r => r.id === roleId);

    // Fast O(N) indexing for project enrichment
    const userMap = new Map();
    for (const u of activeUsers) userMap.set(u.id, u);

    const memberCountMap = new Map();
    for (const m of members) {
      memberCountMap.set(m.project_id, (memberCountMap.get(m.project_id) || 0) + 1);
    }

    const projectTasksMap = new Map();
    for (const t of tasks) {
      if (t.deleted_at) continue;
      let list = projectTasksMap.get(t.project_id);
      if (!list) { list = []; projectTasksMap.set(t.project_id, list); }
      list.push(t);
    }

    const isAhmad = (userId === 'usr_ahmad');

    // Single-pass project enrichment
    projects = projects.map(p => {
      const pTasks = projectTasksMap.get(p.id) || [];
      let totalWeight = 0;
      let completedWeight = 0;
      for (const t of pTasks) {
        const w = Number(t.weight) || 1;
        totalWeight += w;
        if (t.status === 'done') completedWeight += w;
      }
      const progress = totalWeight > 0 ? Math.round((completedWeight / totalWeight) * 100) : (Number(p.progress) || 0);
      const mgr = userMap.get(p.manager_id);
      let managerInfo = null;
      let managerId = p.manager_id;
      if (mgr) {
        if (!isAhmad && mgr.id === 'usr_ahmad') {
          managerInfo = null;
          managerId = null;
        } else {
          managerInfo = { id: mgr.id, name: mgr.name, nameEn: mgr.name_en };
        }
      }
      const hasTasks = pTasks.length > 0;
      const allDone = hasTasks && pTasks.every(t => t.status === 'done');
      let lifecycle = p.lifecycle || 'active';
      if (hasTasks && allDone && progress === 100) {
        lifecycle = 'completed';
      } else if (lifecycle === 'completed' && (!allDone || progress < 100)) {
        lifecycle = 'active';
      }

      return {
        ...p,
        lifecycle,
        manager_id: managerId,
        progress,
        totalWeight,
        memberCount: memberCountMap.get(p.id) || 0,
        manager: managerInfo
      };
    });

    // Single-pass stats calculation
    const now = new Date();
    let activeProjects = 0, delayedProjects = 0, completedProjects = 0;
    for (const p of projects) {
      if (p.lifecycle === 'active') activeProjects++;
      if (p.health === 'delayed') delayedProjects++;
      if (p.lifecycle === 'completed') completedProjects++;
    }

    const in7Days = new Date(Date.now() + 7 * 86400000);
    let tasksInProgress = 0, overdueTasks = 0, unassignedTasks = 0, completedTasks = 0, activeTasks = 0, pendingApprovals = 0;
    let dueSoon = 0, myTasks = 0;
    for (const t of tasks) {
      const isDone = t.status === 'done';
      const isCanceled = t.status === 'canceled';
      if (t.status === 'in_progress') tasksInProgress++;
      if (!isDone && t.due_date && new Date(t.due_date) < now) overdueTasks++;
      if (!isDone && t.due_date && new Date(t.due_date) >= now && new Date(t.due_date) <= in7Days) dueSoon++;
      if (!isDone && !isCanceled && t.assignee_id === userId) myTasks++;
      if (!isDone && !t.assignee_id) unassignedTasks++;
      if (isDone) completedTasks++;
      if (!isDone && !isCanceled) activeTasks++;
      if (t.status === 'review' || t.status === 'approval') pendingApprovals++;
    }

    const currentUser = { ...(userMap.get(userId) || {}) };
    currentUser.phone = currentUser.phone || currentUser.custom_fields?.phone || null;

    // Activity Permission Guard: only users with view_user_activity or admin can see login/active times
    const canViewActivity = isGlobalAdmin || userRole?.permissions?.includes('view_user_activity') || userRole?.permissions?.includes('*');

    // Stealth Super Admin: Ahmad is completely invisible to any other user across the entire system
    const exposedUsers = (isAhmad ? activeUsers : activeUsers.filter(u => u.id !== 'usr_ahmad')).map(u => {
      const copy = { ...u };
      copy.phone = copy.phone || copy.custom_fields?.phone || null;
      if (!canViewActivity) {
        delete copy.last_login_at;
        delete copy.last_active_at;
      }
      return toCamelCase(copy);
    });
    const exposedTasks = (isAhmad ? tasks : tasks.map(t => (t.assignee_id === 'usr_ahmad' ? { ...t, assignee_id: null } : t))).map(t => {
      const sortOrder = typeof t.sort_order === 'number' ? t.sort_order : (typeof t.sortOrder === 'number' ? t.sortOrder : (t.custom_fields?.sortOrder ?? t.custom_fields?.sort_order ?? 0));
      return { ...t, sort_order: sortOrder, sortOrder };
    });
    const exposedAuditLogs = (isAhmad ? auditLogs : auditLogs.filter(a => a.user_id !== 'usr_ahmad' && a.entity_id !== 'usr_ahmad')).map(log => {
      const author = userMap.get(log.user_id);
      return {
        ...log,
        user: author ? {
          id: author.id,
          name: author.name,
          name_ar: author.name,
          name_en: author.name_en || author.name,
          role_id: author.role_id,
          avatar_url: author.avatar_url || author.custom_fields?.avatar_url || null
        } : null
      };
    });

    const activeTaskIdSet = new Set(tasks.map(t => t.id));
    const activeProjectIdSet = new Set(projects.map(p => p.id));
    const activeDocuments = documents.filter(d => {
      if (d.deleted_at) return false;
      if (d.project_id && !activeProjectIdSet.has(d.project_id)) return false;
      if (d.task_id && !activeTaskIdSet.has(d.task_id)) return false;
      return true;
    });

    let maxUpdatedAt = 0;
    for (const t of tasks) {
      if (t.updated_at) {
        const time = new Date(t.updated_at).getTime();
        if (time > maxUpdatedAt) maxUpdatedAt = time;
      }
    }
    for (const p of projects) {
      if (p.updated_at) {
        const time = new Date(p.updated_at).getTime();
        if (time > maxUpdatedAt) maxUpdatedAt = time;
      }
    }
    for (const d of documents) {
      if (d.updated_at) {
        const time = new Date(d.updated_at).getTime();
        if (time > maxUpdatedAt) maxUpdatedAt = time;
      }
    }
    const computedUpdatedAt = maxUpdatedAt ? new Date(maxUpdatedAt).toISOString() : new Date().toISOString();

    const responsePayload = {
      updatedAt: computedUpdatedAt,
      company: toCamelCase(company || { name: 'DARC Design Team', nameAr: 'فريق دارك للتصميم', nameEn: 'DARC Design Team' }),
      user: toCamelCase(currentUser),
      role: toCamelCase(userRole || {}),
      projects: toCamelCase(projects),
      tasks: toCamelCase(exposedTasks),
      documents: toCamelCase(activeDocuments),
      comments: toCamelCase(comments),
      templates: toCamelCase(templates),
      users: exposedUsers,
      roles: toCamelCase(roles),
      permissionsCatalog: DEFAULT_PERMISSIONS_CATALOG,
      notifications: toCamelCase(notifications),
      emailConfigured: Boolean(env?.RESEND_API_KEY && env?.EMAIL_FROM),
      stats: {
        activeProjects,
        delayedProjects,
        completedProjects,
        projectCount: projects.length,
        openTasks: activeTasks,
        activeTasks,
        tasksInProgress,
        tasksDueSoon: dueSoon,
        dueSoon,
        myTasks,
        overdueTasks,
        unassignedTasks,
        completedTasks,
        pendingApprovals
      },
      auditLogs: toCamelCase(exposedAuditLogs)
    };

    const etag = `W/"${computedUpdatedAt}-${projects.length}-${tasks.length}-${comments.length}-${auditLogs.length}-${getCacheVersion()}"`;
    setBootstrapCache(cacheKey, responsePayload, etag);

    return { responsePayload, etag };
  });
}

app.get('/', async (c) => {
  const userId = c.get('userId');
  const roleId = c.get('roleId');

  const clientEtag = c.req.header('if-none-match');
  const cacheControl = (c.req.header('cache-control') || '').toLowerCase();
  const bypassEtag = cacheControl.includes('no-cache') || cacheControl.includes('no-store');

  try {
    const { responsePayload, etag } = await generateBootstrapPayloadForUser(c.env, userId, roleId);

    c.header('ETag', etag);
    c.header('Cache-Control', 'private, no-cache');

    if (!bypassEtag && clientEtag && clientEtag === etag) {
      return c.body(null, 304);
    }

    return c.json(responsePayload);
  } catch (error) {
    console.error('[Bootstrap] Error:', error.message);
    return c.json({ error: 'Internal Server Error' }, 500);
  }
});

export default app;
