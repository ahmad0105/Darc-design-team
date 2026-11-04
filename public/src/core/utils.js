import { state } from './state.js';
export { showToast } from '../shared/ui.js';

export const I18N = {
  ar: {
    dashboard: 'الرئيسية', projects: 'المشاريع', myTasks: 'مهامي', templates: 'قاعدة المخططات', team: 'فريق العمل', reports: 'التقارير', settings: 'الإعدادات', workspace: 'مساحة العمل', overview: 'نظرة عامة', welcome: 'صباح الخير', welcomeText: 'تابع أهم التحركات في مشاريع DARC واتخذ القرار التالي بثقة.', portfolioHealth: 'صحة المحفظة', activeProjects: 'مشاريع نشطة', openTasks: 'مهام مفتوحة', overdue: 'مهام متأخرة', dueThisWeek: 'تستحق هذا الأسبوع', projectProgress: 'تقدم المشاريع', projectProgressSub: 'نظرة سريعة على المشاريع التي تحتاج انتباهك.', seeAll: 'عرض الكل', attention: 'يحتاج انتباهك', attentionSub: 'أولويات اليوم والمواعيد القريبة.', teamProgress: 'إنجاز الفريق', teamProgressSub: 'الإنجاز حسب المهام المسندة.', recentPulse: 'نبض التنفيذ', recentPulseSub: 'حركة المهام خلال الأسابيع الأخيرة.', noProjects: 'لا توجد مشاريع حتى الآن', noTasks: 'لا توجد مهام في هذا العرض', noAttention: 'لا يوجد ما يحتاج انتباهًا الآن.', addProject: 'مشروع جديد', addTask: 'مهمة جديدة', addMember: 'إضافة عضو', addRole: 'دور جديد', search: 'بحث...', filter: 'تصفية', all: 'الكل', active: 'نشط', planning: 'تخطيط', atRisk: 'يحتاج انتباه', onTrack: 'على المسار', offTrack: 'متأخر', onHold: 'متوقف', completed: 'مكتمل', archived: 'مؤرشف', tasks: 'المهام', timeline: 'الجدول الزمني', drawings: 'المخططات', documents: 'المستندات', activity: 'النشاط', status: 'الحالة', owner: 'المسؤول', deadline: 'موعد التسليم', progress: 'الإنجاز', completedTasks: 'المهام المكتملة', weightedProgress: 'الإنجاز الموزون', simpleProgress: 'الإنجاز بالعدد', dueDate: 'تاريخ التسليم', startDate: 'تاريخ البداية', client: 'العميل', manager: 'مدير المشروع', health: 'صحة المشروع', create: 'إنشاء', save: 'حفظ التغييرات', cancel: 'إلغاء', edit: 'تعديل', delete: 'حذف', invite: 'إرسال دعوة', deactivate: 'تعطيل', close: 'إغلاق', nameAr: 'الاسم بالعربية', nameEn: 'الاسم بالإنجليزية', description: 'الوصف', role: 'الدور', email: 'البريد الإلكتروني', jobTitle: 'المسمى الوظيفي', accountStatus: 'حالة الحساب', activeAccount: 'مفعّل', pendingAccount: 'بانتظار الدعوة', inactiveAccount: 'معطّل', company: 'الشركة', roles: 'الأدوار والصلاحيات', accounts: 'حسابات الفريق', audit: 'سجل العمليات', permissions: 'الصلاحيات', roleDescription: 'وصف الدور', custom: 'مخصص', builtIn: 'أساسي', noEmail: 'لم يحدد البريد بعد', emailNotConfigured: 'مزود البريد غير مكوّن', emailConfigured: 'البريد مكوّن', notification: 'تنبيه', notifications: 'التنبيهات', unread: 'غير مقروء', markRead: 'تحديد كمقروء', signOut: 'تسجيل الخروج', login: 'تسجيل الدخول', emailAddress: 'البريد الإلكتروني', password: 'كلمة المرور', loginIntro: 'أدخل بياناتك للوصول إلى مساحة عمل DARC.', demoHint: 'حساب العرض: admin@darc.local / DARC-Admin-2026!', standardLibrary: 'مكتبة المخرجات القياسية', standardLibrarySub: '33 قالبًا جاهزًا لتبدأ كل مشروع بنفس المستوى.', useTemplate: 'استخدام القالب', templatesCount: 'قالب', weight: 'الوزن', taskTitle: 'اسم المهمة', taskType: 'نوع المخرج', assignee: 'المسند إليه', priority: 'الأولوية', low: 'منخفضة', medium: 'متوسطة', high: 'عالية', urgent: 'عاجلة', notStarted: 'غير مبدوءة', inProgress: 'قيد التنفيذ', review: 'للمراجعة', approval: 'بانتظار الاعتماد', done: 'مكتملة', blocked: 'متوقفة', canceled: 'ملغاة', reminder: 'تذكير', reminderDate: 'تاريخ التذكير', reminderNote: 'ملاحظة التذكير', saveReminder: 'حفظ التذكير', addFromLibrary: 'إضافة من المكتبة', projectCode: 'رمز المشروع', lifecycle: 'دورة المشروع', adminOnly: 'هذه المنطقة متاحة لمدير النظام فقط.', emailStatus: 'حالة البريد', emailInfo: 'عند ضبط RESEND_API_KEY و EMAIL_FROM سيبدأ النظام بإرسال الدعوات والتنبيهات فعليًا.', weightedExplanation: 'الإنجاز الموزون يعطي الأعمال الأكبر وزنًا أعلى، لذلك لا تساوي مهمة صغيرة مخططًا كاملًا. النسبة الرسمية للمشروع تحسب من أوزان المهام المكتملة والمعتمدة.', sampleData: 'بيانات تجريبية', projectOverview: 'ملخص المشروع', teamMembers: 'أعضاء المشروع', projectTasks: 'مهام المشروع', noMembers: 'لم تتم إضافة أعضاء بعد', permissionCount: 'صلاحيات', manageOnlyAdmin: 'إضافة وتعديل وحذف الأدوار والصلاحيات متاح لمدير النظام فقط.', confirmDeactivate: 'هل تريد تعطيل هذا الحساب؟', confirmDeleteRole: 'هل تريد حذف هذا الدور المخصص؟', accountReady: 'جاهز للدخول', noAccountAccess: 'بانتظار تفعيل الحساب', today: 'اليوم', days: 'يوم', ago: 'منذ', more: 'المزيد', viewDetails: 'التفاصيل', quickActions: 'إجراءات سريعة', total: 'الإجمالي', reviewed: 'تمت المراجعة', teamLoad: 'عبء الفريق', riskReason: 'سبب التنبيه', currentRevision: 'الإصدار الحالي', approved: 'معتمد', superseded: 'مستبدل', draft: 'مسودة', addReminder: 'إضافة تذكير', noReminder: 'لا يوجد تذكير'
  },
  en: {
    dashboard: 'Home', projects: 'Projects', myTasks: 'My tasks', templates: 'Drawing library', team: 'Team', reports: 'Reports', settings: 'Settings', workspace: 'Workspace', overview: 'Overview', welcome: 'Good morning', welcomeText: 'Stay close to the most important moves across DARC projects and make the next decision with confidence.', portfolioHealth: 'Portfolio health', activeProjects: 'Active projects', openTasks: 'Open tasks', overdue: 'Overdue tasks', dueThisWeek: 'Due this week', projectProgress: 'Project progress', projectProgressSub: 'A quick view of the projects that need your attention.', seeAll: 'View all', attention: 'Needs your attention', attentionSub: 'Today’s priorities and near-term deadlines.', teamProgress: 'Team progress', teamProgressSub: 'Progress by assigned work.', recentPulse: 'Execution pulse', recentPulseSub: 'Task movement over recent weeks.', noProjects: 'No projects yet', noTasks: 'No tasks in this view', noAttention: 'Nothing needs attention right now.', addProject: 'New project', addTask: 'New task', addMember: 'Add member', addRole: 'New role', search: 'Search...', filter: 'Filter', all: 'All', active: 'Active', planning: 'Planning', atRisk: 'Needs attention', onTrack: 'On track', offTrack: 'Off track', onHold: 'On hold', completed: 'Completed', archived: 'Archived', tasks: 'Tasks', timeline: 'Timeline', drawings: 'Drawings', documents: 'Documents', activity: 'Activity', status: 'Status', owner: 'Owner', deadline: 'Deadline', progress: 'Progress', completedTasks: 'Completed tasks', weightedProgress: 'Weighted progress', simpleProgress: 'Count progress', dueDate: 'Due date', startDate: 'Start date', client: 'Client', manager: 'Project manager', health: 'Project health', create: 'Create', save: 'Save changes', cancel: 'Cancel', edit: 'Edit', delete: 'Delete', invite: 'Send invite', deactivate: 'Deactivate', close: 'Close', nameAr: 'Arabic name', nameEn: 'English name', description: 'Description', role: 'Role', email: 'Email', jobTitle: 'Job title', accountStatus: 'Account status', activeAccount: 'Active', pendingAccount: 'Invite pending', inactiveAccount: 'Inactive', company: 'Company', roles: 'Roles & permissions', accounts: 'Team accounts', audit: 'Audit log', permissions: 'Permissions', roleDescription: 'Role description', custom: 'Custom', builtIn: 'Built-in', noEmail: 'Email not set', emailNotConfigured: 'Email provider not configured', emailConfigured: 'Email configured', notification: 'Notification', notifications: 'Notifications', unread: 'Unread', markRead: 'Mark as read', signOut: 'Sign out', login: 'Sign in', emailAddress: 'Email address', password: 'Password', loginIntro: 'Enter your details to access the DARC workspace.', demoHint: 'Demo account: admin@darc.local / DARC-Admin-2026!', standardLibrary: 'Standard deliverable library', standardLibrarySub: '33 ready-to-use templates so every project starts at the same level.', useTemplate: 'Use template', templatesCount: 'templates', weight: 'Weight', taskTitle: 'Task name', taskType: 'Deliverable type', assignee: 'Assignee', priority: 'Priority', low: 'Low', medium: 'Medium', high: 'High', urgent: 'Urgent', notStarted: 'Not started', inProgress: 'In progress', review: 'In review', approval: 'Awaiting approval', done: 'Complete', blocked: 'Blocked', canceled: 'Canceled', reminder: 'Reminder', reminderDate: 'Reminder date', reminderNote: 'Reminder note', saveReminder: 'Save reminder', addFromLibrary: 'Add from library', projectCode: 'Project code', lifecycle: 'Project lifecycle', adminOnly: 'This area is available to the system administrator only.', emailStatus: 'Email status', emailInfo: 'Once RESEND_API_KEY and EMAIL_FROM are configured, invitations and alerts will be sent for real.', weightedExplanation: 'Weighted progress gives larger work a larger share, so a small edit does not equal a complete drawing set. The official project percentage is calculated from completed and approved task weights.', sampleData: 'Demo data', projectOverview: 'Project overview', teamMembers: 'Project members', projectTasks: 'Project tasks', noMembers: 'No members have been added yet', permissionCount: 'permissions', manageOnlyAdmin: 'Adding, editing, and deleting roles and permissions is available to the system administrator only.', confirmDeactivate: 'Deactivate this account?', confirmDeleteRole: 'Delete this custom role?', accountReady: 'Ready to sign in', noAccountAccess: 'Account activation pending', today: 'Today', days: 'days', ago: 'ago', more: 'More', viewDetails: 'Details', quickActions: 'Quick actions', total: 'Total', reviewed: 'Reviewed', teamLoad: 'Team load', riskReason: 'Attention reason', currentRevision: 'Current revision', approved: 'Approved', superseded: 'Superseded', draft: 'Draft', addReminder: 'Add reminder', noReminder: 'No reminder'
  }
};

export function t(key) { return I18N[state.lang][key] || I18N.ar[key] || key; }
export function choose(ar, en) { return state.lang === 'ar' ? ar : en; }

export function getCookieVal(key) {
  if (typeof document === 'undefined' || !key) return null;
  const cookies = document.cookie ? document.cookie.split('; ') : [];
  for (const c of cookies) {
    const idx = c.indexOf('=');
    if (idx !== -1) {
      const k = c.slice(0, idx).trim();
      if (k === key) {
        return decodeURIComponent(c.slice(idx + 1));
      }
    }
  }
  return null;
}

export function savePreferencesCookies({ theme, lang } = {}) {
  if (typeof document === 'undefined') return;
  const maxAge = 31536000; // 1 year
  const secure = (typeof window !== 'undefined' && window.location.protocol === 'https:') ? '; Secure' : '';

  let domainPart = '';
  if (typeof window !== 'undefined') {
    const host = window.location.hostname;
    if (host === 'darc-design.bond' || host.endsWith('.darc-design.bond')) {
      domainPart = '; Domain=.darc-design.bond';
    }
  }

  // Strict whitelist sanitization against injection or malformed values
  const safeTheme = (theme === 'dark' || theme === 'light') ? theme : null;
  const safeLang = (lang === 'ar' || lang === 'en') ? lang : null;

  if (safeTheme) {
    document.cookie = `darc_theme=${encodeURIComponent(safeTheme)}; Path=/; Max-Age=${maxAge}; SameSite=Lax${secure}${domainPart}`;
    try { window.localStorage.setItem('darc-theme', safeTheme); } catch (e) {}
  }
  if (safeLang) {
    document.cookie = `darc_lang=${encodeURIComponent(safeLang)}; Path=/; Max-Age=${maxAge}; SameSite=Lax${secure}${domainPart}`;
    try { window.localStorage.setItem('darc-locale', safeLang); } catch (e) {}
  }

  const currentTheme = safeTheme || (state && state.theme === 'dark' ? 'dark' : 'light') || 'light';
  const currentLang = safeLang || (state && state.lang === 'en' ? 'en' : 'ar') || 'ar';
  const prefsJson = JSON.stringify({ theme: currentTheme, lang: currentLang });
  document.cookie = `darc_prefs=${encodeURIComponent(prefsJson)}; Path=/; Max-Age=${maxAge}; SameSite=Lax${secure}${domainPart}`;
}

const ESC_MAP = { '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' };
const ESC_TEST = /[&<>'"]/;
const ESC_REGEX = /[&<>'"]/g;

export function esc(value) {
  if (value === null || value === undefined) return '';
  const str = String(value);
  if (!ESC_TEST.test(str)) return str;
  return str.replace(ESC_REGEX, (character) => ESC_MAP[character]);
}
/**
 * Neutralize CSV / Spreadsheet Formula Injection (CWE-1236)
 * Prepends a single quote to any value starting with formula trigger chars (=, +, -, @, tab, CR)
 */
export function sanitizeForSpreadsheet(val) {
  if (val === null || val === undefined) return '';
  const str = String(val);
  const trimmedLeading = str.trimStart();
  if (/^[=+@\-]/.test(trimmedLeading) || /^[\t\r]/.test(str)) {
    return `'${str}`;
  }
  return str;
}

const ICON_PATHS = {
  grid: '<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>',
  building: '<path d="M3 21h18M5 21V5l7-2 7 2v16M9 8h1M14 8h1M9 12h1M14 12h1M9 16h1M14 16h1"/>',
  checklist: '<path d="M9 6h11M9 12h11M9 18h11M4 6.5l1.3 1.3L7.5 5.6M4 12.5l1.3 1.3 2.2-2.2M4 18.5l1.3 1.3 2.2-2.2"/>',
  layers: '<path d="m12 3 9 5-9 5-9-5 9-5Z"/><path d="m3 12 9 5 9-5M3 16l9 5 9-5"/>',
  users: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>',
  chart: '<path d="M4 19V5M4 19h17M8 16v-4M12 16V8M16 16v-6M20 16v-9"/>',
  settings: '<path d="M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z"/><path d="m19.4 15 .1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-2.9 1.2v.2a2 2 0 1 1-4 0V19a1.7 1.7 0 0 0-2.9-1.2l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1A1.7 1.7 0 0 0 2.8 12a1.7 1.7 0 0 0 1.2-2.9l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1A1.7 1.7 0 0 0 9.7 5.1V5a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 2.9 1.2l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1A1.7 1.7 0 0 0 20.6 12a1.7 1.7 0 0 0-1.2 3Z"/>',
  bell: '<path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/>',
  arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  arrowRight: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  arrowLeft: '<path d="M19 12H5M11 18l-6-6 6-6"/>',
  calendar: '<rect x="3" y="4" width="18" height="17" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  alert: '<path d="M10.3 3.9 2.2 18a2 2 0 0 0 1.7 3h16.2a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z"/><path d="M12 9v4M12 17h.01"/>',
  check: '<path d="m5 12 4 4L19 6"/>',
  chevron: '<path d="m9 18 6-6-6-6"/>',
  chevronDown: '<path d="m6 9 6 6 6-6"/>',
  logout: '<path d="M10 17l5-5-5-5M15 12H3M21 19V5a2 2 0 0 0-2-2h-6"/>',
  menu: '<path d="M4 6h16M4 12h16M4 18h16"/>',
  close: '<path d="m6 6 12 12M18 6 6 18"/>',
  shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"/><path d="m9 12 2 2 4-4"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',
  edit: '<path d="M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L8 18l-4 1 1-4Z"/>',
  trash: '<path d="M3 6h18M8 6V4h8v2M19 6l-1 15H6L5 6M10 11v6M14 11v6"/>',
  more: '<circle cx="5" cy="12" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/>',
  document: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z"/><path d="M14 2v6h6M8 13h8M8 17h6"/>',
  filter: '<path d="M4 6h16M7 12h10M10 18h4"/>',
  briefcase: '<rect x="3" y="6" width="18" height="14" rx="2"/><path d="M8 6V4h8v2M3 11h18M10 11v2h4v-2"/>',
  eye: '<path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12Z"/><circle cx="12" cy="12" r="2.5"/>',
  lock: '<rect x="4" y="10" width="16" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/>',
  send: '<path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/>',
  user: '<circle cx="12" cy="7" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',
  target: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/>',
  sparkles: '<path d="m12 3-1.3 4.7L6 9l4.7 1.3L12 15l1.3-4.7L18 9l-4.7-1.3L12 3ZM19 15l-.7 2.3L16 18l2.3.7L19 21l.7-2.3L22 18l-2.3-.7L19 15ZM5 14l-.7 2.3L2 17l2.3.7L5 20l.7-2.3L8 17l-2.3-.7L5 14Z"/>',
  folder: '<path d="M3 6a2 2 0 0 1 2-2h5l2 2h7a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z"/>',
  upload: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12"/>',
  download: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/>',
  printer: '<polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/>',
  refresh: '<path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"/><path d="M16 21h5v-5"/>',
  link: '<path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>',
  globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/>',
  info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/>'
};

export function icon(name, size = 18) {
  return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICON_PATHS[name] || ICON_PATHS.info}</svg>`;
}

export function initials(user) {
  if (!user || typeof user !== 'object') return 'D';
  const source = (state.lang === 'ar' ? user.name : (user.nameEn || user.name)) || user.email || 'DARC';
  const words = String(source).replace(/^(م\.|م\s|ح\.|ع\.|Eng\.\s)/i, '').split(/\s+/).filter(Boolean);
  return (words.slice(0, 2).map((word) => word[0]).join('') || String(source).slice(0, 2)).toUpperCase();
}

export function avatar(user, extra = '') {
  const safe = user || { name: 'DARC', avatarColor: '#0d6269' };
  const color = /^#[0-9a-f]{6}$/i.test(safe.avatarColor || '') ? safe.avatarColor : '#0d6269';
  const title = esc(choose(safe.name, safe.nameEn || safe.name));
  if (safe.avatarUrl) {
    const safeInitials = esc(initials(safe)).replace(/['"\\]/g, '');
    return `<span class="avatar ${extra}" style="background:transparent;padding:0;overflow:hidden;border:1px solid rgba(255,255,255,0.15);display:inline-flex;align-items:center;justify-content:center;" title="${title}"><img src="${esc(safe.avatarUrl)}" alt="${title}" loading="lazy" decoding="async" style="width:100%;height:100%;object-fit:cover;border-radius:inherit;" onerror="this.parentElement.style.background='${color}';this.parentElement.textContent='${safeInitials}';" /></span>`;
  }
  return `<span class="avatar ${extra}" style="background:${color}" title="${title}">${esc(initials(safe))}</span>`;
}

export function getTimeBasedGreeting() {
  const hour = new Date().getHours();
  if (state.lang === 'ar') {
    if (hour >= 5 && hour < 12) return 'صباح الخير';
    if (hour >= 12 && hour < 17) return 'مساء الخير';
    if (hour >= 17 && hour < 22) return 'مساء الخير';
    return 'طابت ليلتك';
  } else {
    if (hour >= 5 && hour < 12) return 'Good morning';
    if (hour >= 12 && hour < 17) return 'Good afternoon';
    if (hour >= 17 && hour < 22) return 'Good evening';
    return 'Good night';
  }
}

export function getTaskStatusStyle(task) {
  const status = task?.status;
  const overdue = isOverdue(task);

  if (status === 'done' || status === 'completed') {
    return {
      color: '#10b981',
      bgColor: '#ecfdf5',
      borderColor: '#059669',
      textColor: '#065f46',
      label: choose('مكتملة', 'Completed')
    };
  }
  if (status === 'review' || status === 'approval') {
    return {
      color: '#8b5cf6',
      bgColor: '#f5f3ff',
      borderColor: '#7c3aed',
      textColor: '#5b21b6',
      label: choose('للمراجعة والاعتماد', 'In Review')
    };
  }
  if (status === 'blocked' || overdue) {
    return {
      color: '#ef4444',
      bgColor: '#fef2f2',
      borderColor: '#dc2626',
      textColor: '#991b1b',
      label: overdue ? choose('متأخرة', 'Overdue') : choose('متوقفة', 'Blocked')
    };
  }
  if (status === 'in_progress' || status === 'progress') {
    return {
      color: '#2563eb',
      bgColor: '#eff6ff',
      borderColor: '#3b82f6',
      textColor: '#1e40af',
      label: choose('قيد التنفيذ', 'In Progress')
    };
  }
  // not_started / draft / default
  return {
    color: '#64748b',
    bgColor: '#f8fafc',
    borderColor: '#94a3b8',
    textColor: '#334155',
    label: choose('غير مبدوءة', 'Not Started')
  };
}

export function getFileFormatInfo(filename, mimeType = '') {
  const ext = (filename || '').split('.').pop()?.toLowerCase() || '';
  if (['dwg', 'dxf'].includes(ext)) {
    return { ext: ext.toUpperCase(), label: 'AutoCAD', color: '#0284c7', bg: 'rgba(2,132,199,0.12)', border: 'rgba(2,132,199,0.3)', isCad: true };
  }
  if (['rvt', 'rfa', 'ifc', 'skp', 'pln', '3ds'].includes(ext)) {
    return { ext: ext.toUpperCase(), label: 'BIM / 3D', color: '#7c3aed', bg: 'rgba(124,58,237,0.12)', border: 'rgba(124,58,237,0.3)', isBim: true };
  }
  if (ext === 'pdf') {
    return { ext: 'PDF', label: 'PDF Blueprint', color: '#dc2626', bg: 'rgba(220,38,38,0.12)', border: 'rgba(220,38,38,0.3)', isPdf: true };
  }
  if (['xlsx', 'xls', 'csv'].includes(ext)) {
    return { ext: ext.toUpperCase(), label: 'Excel Sheet', color: '#107c41', bg: 'rgba(16,124,65,0.12)', border: 'rgba(16,124,65,0.3)', isExcel: true };
  }
  if (['docx', 'doc', 'rtf', 'odt'].includes(ext)) {
    return { ext: ext.toUpperCase(), label: 'Word Document', color: '#2b579a', bg: 'rgba(43,87,154,0.12)', border: 'rgba(43,87,154,0.3)', isWord: true };
  }
  if (['pptx', 'ppt', 'key'].includes(ext)) {
    return { ext: ext.toUpperCase(), label: 'PowerPoint Deck', color: '#d24726', bg: 'rgba(210,71,38,0.12)', border: 'rgba(210,71,38,0.3)', isPpt: true };
  }
  if (['png', 'jpg', 'jpeg', 'webp', 'heic'].includes(ext)) {
    return { ext: ext.toUpperCase(), label: 'Image', color: '#059669', bg: 'rgba(5,150,105,0.12)', border: 'rgba(5,150,105,0.3)', isImg: true };
  }
  if (['mp4', 'webm', 'mov', 'm4v', 'ogv'].includes(ext)) {
    return { ext: ext.toUpperCase(), label: 'Video', color: '#8b5cf6', bg: 'rgba(139,92,246,0.12)', border: 'rgba(139,92,246,0.3)', isVideo: true };
  }
  if (['zip', 'rar', '7z', 'tar'].includes(ext)) {
    return { ext: ext.toUpperCase(), label: 'Archive', color: '#d97706', bg: 'rgba(217,119,6,0.12)', border: 'rgba(217,119,6,0.3)', isZip: true };
  }
  return { ext: ext.toUpperCase() || 'DOC', label: 'Document', color: '#0d6269', bg: 'rgba(13,98,105,0.12)', border: 'rgba(13,98,105,0.3)', isDoc: true };
}

export function extractDrawingVersion(filename) {
  if (!filename) return null;
  const match = filename.match(/[_-\s](?:rev|r|v)(\d+)([_.\s]|$)/i) || filename.match(/\b(?:rev|r|v)(\d+)\b/i);
  if (match) {
    return `V${parseInt(match[1], 10)}`;
  }
  return null;
}

export function getActiveCalendarSystem() {
  let stored = null;
  try {
    stored = localStorage.getItem('darc_calendar_system');
  } catch (e) {}
  return state.calendarSystem || state.data?.user?.customFields?.calendarSystem || stored || 'gregorian';
}

// High-Performance Cached DateTimeFormatter pool (Eliminates ICU instantiation overhead)
const _dtFormatterCache = new Map();
function getDTFormatter(locale, options = {}) {
  const key = locale + '|' + JSON.stringify(options);
  let fmt = _dtFormatterCache.get(key);
  if (!fmt) {
    fmt = new Intl.DateTimeFormat(locale, options);
    _dtFormatterCache.set(key, fmt);
  }
  return fmt;
}

export function dateLabel(value, includeYear = true) {
  if (!value) return '—';
  const date = new Date(String(value).length === 10 ? `${value}T12:00:00` : value);
  if (Number.isNaN(date.getTime())) return '—';

  const calSystem = getActiveCalendarSystem();
  if (calSystem === 'hijri') {
    const locale = state.lang === 'ar' ? 'ar-SA-u-ca-islamic-umalqura' : 'en-u-ca-islamic-umalqura';
    return getDTFormatter(locale, {
      day: 'numeric',
      month: 'short',
      ...(includeYear ? { year: 'numeric' } : {})
    }).format(date);
  }

  // Unified Gregorian: Day / Month / Year
  const locale = state.lang === 'ar' ? 'ar-u-ca-gregory' : 'en-GB-u-ca-gregory';
  return getDTFormatter(locale, {
    day: 'numeric',
    month: 'short',
    ...(includeYear ? { year: 'numeric' } : {})
  }).format(date);
}

export function formatUnifiedDateNumeric(value) {
  if (!value) return '—';
  const date = new Date(String(value).length === 10 ? `${value}T12:00:00` : value);
  if (Number.isNaN(date.getTime())) return '—';
  const calSystem = getActiveCalendarSystem();
  if (calSystem === 'hijri') {
    const locale = state.lang === 'ar' ? 'ar-SA-u-ca-islamic-umalqura' : 'en-u-ca-islamic-umalqura';
    return getDTFormatter(locale, {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }).format(date);
  }
  const d = String(date.getDate()).padStart(2, '0');
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const y = date.getFullYear();
  return `${d}/${m}/${y}`;
}

export function formatDateTime(value, options = {}) {
  if (!value) return { date: '—', time: '—', full: '—' };
  try {
    const d = new Date(value);
    if (Number.isNaN(d.getTime())) return { date: String(value), time: '—', full: String(value) };

    const calSystem = getActiveCalendarSystem();
    const isAr = state.lang === 'ar';

    const dateLocale = calSystem === 'hijri'
      ? (isAr ? 'ar-SA-u-ca-islamic-umalqura' : 'en-u-ca-islamic-umalqura')
      : (isAr ? 'ar-u-ca-gregory' : 'en-GB-u-ca-gregory');

    const date = getDTFormatter(dateLocale, {
      year: 'numeric',
      month: options.monthStyle || 'short',
      day: 'numeric'
    }).format(d);

    const timeLocale = isAr ? 'ar-SA' : 'en-US';
    const time = getDTFormatter(timeLocale, {
      hour: '2-digit',
      minute: '2-digit',
      ...(options.includeSeconds !== false ? { second: '2-digit' } : {}),
      hour12: true
    }).format(d);

    return { date, time, full: `${date} ${time}` };
  } catch (e) {
    return { date: String(value), time: '—', full: String(value) };
  }
}

export function formatReportDate(value = new Date()) {
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return '—';
  const calSystem = getActiveCalendarSystem();
  const isAr = state.lang === 'ar';
  const locale = calSystem === 'hijri'
    ? (isAr ? 'ar-SA-u-ca-islamic-umalqura' : 'en-u-ca-islamic-umalqura')
    : (isAr ? 'ar-u-ca-gregory' : 'en-GB-u-ca-gregory');

  return getDTFormatter(locale, {
    dateStyle: 'full'
  }).format(d);
}

export function formatReportTime(value = new Date()) {
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return '—';
  const isAr = state.lang === 'ar';
  return getDTFormatter(isAr ? 'ar-SA' : 'en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  }).format(d);
}

export function getHijriDateEquivalent(value) {
  if (!value) return '';
  const date = new Date(String(value).length === 10 ? `${value}T12:00:00` : value);
  if (Number.isNaN(date.getTime())) return '';
  return getDTFormatter('ar-SA-u-ca-islamic-umalqura', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).format(date);
}

export function parseEndOfDay(value) {
  if (!value) return null;
  if (value instanceof Date) {
    if (isNaN(value.getTime())) return null;
    const d = new Date(value.getTime());
    d.setHours(23, 59, 59, 999);
    return d;
  }
  if (typeof value === 'number') {
    const d = new Date(value);
    if (isNaN(d.getTime())) return null;
    d.setHours(23, 59, 59, 999);
    return d;
  }
  if (typeof value === 'string') {
    const trimmed = value.trim();
    if (!trimmed) return null;
    const datePart = trimmed.split('T')[0].split(' ')[0];
    if (/^\d{4}-\d{2}-\d{2}$/.test(datePart)) {
      const [y, m, d] = datePart.split('-').map(Number);
      return new Date(y, m - 1, d, 23, 59, 59, 999);
    }
    const parsed = new Date(trimmed);
    if (!isNaN(parsed.getTime())) {
      parsed.setHours(23, 59, 59, 999);
      return parsed;
    }
  }
  return null;
}

export function dueLabel(value) {
  if (!value) return '—';
  const due = parseEndOfDay(value);
  if (!due || isNaN(due.getTime())) return '—';
  const diff = Math.ceil((due - new Date()) / 86_400_000);
  if (isNaN(diff)) return '—';
  if (diff < 0) return choose(`متأخرة ${Math.abs(diff)} ${t('days')}`, `${Math.abs(diff)} ${t('days')} ${t('ago')}`);
  if (diff === 0) return t('today');
  return choose(`بعد ${diff} ${t('days')}`, `in ${diff} ${t('days')}`);
}

export function isOverdue(task) {
  if (!task?.dueDate || ['done', 'completed', 'canceled'].includes(task.status)) return false;
  const due = parseEndOfDay(task.dueDate);
  return due ? due < new Date() : false;
}

/**
 * Evaluates the 3-Tier SLA deadline urgency of a task:
 * - 'overdue': due date has passed (< 0 hours) -> Red
 * - 'due_24h': 0 to 24 hours remaining -> Critical (Coral Orange #ea580c)
 * - 'due_48h': 24 to 48 hours remaining -> Moderate (Warm Amber #d97706)
 * - 'due_72h': 48 to 72 hours remaining -> Early notice (Sky Blue #0284c7)
 * - null: > 72 hours, completed, or no due date
 */
export function getTaskDueTier(task) {
  if (!task?.dueDate || ['done', 'completed', 'canceled'].includes(task.status)) return null;
  const due = parseEndOfDay(task.dueDate);
  if (!due) return null;
  const now = new Date();
  const diffHours = (due.getTime() - now.getTime()) / (1000 * 60 * 60);

  if (diffHours < 0) return 'overdue';
  if (diffHours <= 24) return 'due_24h';
  if (diffHours <= 48) return 'due_48h';
  if (diffHours <= 72) return 'due_72h';
  return null;
}

export function isDueSoon(task, withinDays = 3) {
  const tier = getTaskDueTier(task);
  return tier === 'due_24h' || tier === 'due_48h' || tier === 'due_72h';
}

export function statusText(key) {
  switch (key) {
    case 'not_started': return t('notStarted');
    case 'in_progress': return t('inProgress');
    case 'review': return t('review');
    case 'approval': return t('approval');
    case 'done': return t('done');
    case 'blocked': return t('blocked');
    case 'canceled': return t('canceled');
    case 'planning': return t('planning');
    case 'active': return t('active');
    case 'on_hold': return t('onHold');
    case 'completed': return t('completed');
    case 'archived': return t('archived');
    case 'on_track': return t('onTrack');
    case 'at_risk': return t('atRisk');
    case 'off_track': return t('offTrack');
    default: return key || '';
  }
}

export function statusBadge(status) {
  if (!status) return `<span style="color:var(--muted)">—</span>`;
  return `<span class="status-badge ${esc(status)}">${esc(statusText(status))}</span>`;
}

export function priorityText(key) {
  switch (key) {
    case 'low': return t('low');
    case 'medium': return t('medium');
    case 'high': return t('high');
    case 'urgent': return t('urgent');
    default: return key || '';
  }
}

export function roleFor(userOrId) {
  const user = typeof userOrId === 'string' ? state.data?.users?.find((item) => item.id === userOrId) : userOrId;
  if (!user) return null;
  return state.data?.roles?.find((role) => role.id === user.roleId) || { id: user.roleId, nameAr: user.roleNameAr || '', nameEn: user.roleNameEn || '', permissions: [] };
}

export function roleName(userOrId) {
  const role = roleFor(userOrId);
  return role ? choose(role.nameAr, role.nameEn) : '—';
}

export const PERMISSION_ALIASES = {
  create_project: 'create_projects',
  create_projects: 'create_project',
  edit_project: 'edit_projects',
  edit_projects: 'edit_project',
  delete_project: 'delete_projects',
  delete_projects: 'delete_project',
  view_project: 'view_projects',
  view_projects: 'view_project',
  create_task: 'create_tasks',
  create_tasks: 'create_task',
  edit_task: 'edit_tasks',
  edit_tasks: 'edit_task',
  delete_task: 'delete_tasks',
  delete_tasks: 'delete_task',
  manage_tasks: 'edit_tasks',
  manage_roles: 'manage_role',
  manage_role: 'manage_roles',
  manage_template: 'manage_templates',
  manage_templates: 'manage_template',
  manage_company: 'manage_settings',
  manage_settings: 'manage_company'
};

export function can(permission) {
  if (isAdmin()) return true;
  const permissions = state.data?.role?.permissions;
  if (!permissions || !permissions.length) return false;
  if (permissions.includes('*') || permissions.includes(permission)) return true;
  const alias = PERMISSION_ALIASES[permission];
  return Boolean(alias && permissions.includes(alias));
}

export function isAdmin() {
  return state.data?.user?.roleId === 'admin' || state.data?.user?.role_id === 'admin';
}

/**
 * Checks if a task is assigned to a specific user (either as primary assignee or additional collaborator)
 */
export function isTaskAssignedToUser(task, userId) {
  if (!task || !userId) return false;
  const primaryId = task.assigneeId || task.assignee_id;
  if (primaryId === userId) return true;
  const additional = task.customFields?.additionalAssignees ||
                     task.customFields?.additional_assignees ||
                     task.custom_fields?.additionalAssignees ||
                     task.custom_fields?.additional_assignees;
  if (Array.isArray(additional) && additional.includes(userId)) return true;
  return false;
}

export function canManageAccountPermissions() {
  return isAdmin() || state.data?.user?.roleId === 'account_permissions_manager' || state.data?.role?.permissions?.includes('manage_existing_account_permissions');
}

export function currentViewTitle() {
  if (state.view === 'project-detail') return choose('تفاصيل المشروع', 'Project details');
  return ({ dashboard: t('dashboard'), projects: t('projects'), tasks: t('myTasks'), documents: t('documents'), templates: t('templates'), team: t('team'), reports: t('reports'), settings: t('settings') }[state.view] || t('dashboard'));
}

/**
 * Plays a soft, luxury 2-tone audio chime (Web Audio API) when an upload completes.
 * Pure native browser audio, 0 external assets, 0ms latency.
 */
export function playSuccessChime() {
  try {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();

    const now = ctx.currentTime;
    
    // Tone 1 (D5 ~ 587.33 Hz)
    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(587.33, now);
    gain1.gain.setValueAtTime(0.08, now);
    gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
    osc1.connect(gain1);
    gain1.connect(ctx.destination);
    osc1.start(now);
    osc1.stop(now + 0.35);

    // Tone 2 (A5 ~ 880 Hz - harmonious higher fifth)
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(880, now + 0.12);
    gain2.gain.setValueAtTime(0.001, now);
    gain2.gain.setValueAtTime(0.09, now + 0.12);
    gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.65);
    osc2.connect(gain2);
    gain2.connect(ctx.destination);
    osc2.start(now + 0.12);
    osc2.stop(now + 0.65);
  } catch (e) {
    // Audio autoplay restrictions or unsupported
  }
}

/**
 * Executes a heavy computation off the main UI thread inside an ephemeral Web Worker.
 * Preserves 60 FPS fluidity during large report generation and exports.
 */
export function runInWorker(taskFn, data) {
  if (typeof window === 'undefined' || typeof Worker === 'undefined' || typeof Blob === 'undefined') {
    return Promise.resolve(taskFn(data));
  }
  return new Promise((resolve, reject) => {
    try {
      const workerBlob = new Blob([`
        self.onmessage = function(e) {
          try {
            var fn = ${taskFn.toString()};
            var res = fn(e.data);
            self.postMessage({ ok: true, result: res });
          } catch (err) {
            self.postMessage({ ok: false, error: err.message });
          }
        };
      `], { type: 'application/javascript' });
      const url = URL.createObjectURL(workerBlob);
      const worker = new Worker(url);
      worker.onmessage = (e) => {
        URL.revokeObjectURL(url);
        worker.terminate();
        if (e.data.ok) resolve(e.data.result);
        else reject(new Error(e.data.error));
      };
      worker.onerror = (err) => {
        URL.revokeObjectURL(url);
        worker.terminate();
        reject(err);
      };
      worker.postMessage(data);
    } catch (e) {
      try {
        resolve(taskFn(data));
      } catch (err) {
        reject(err);
      }
    }
  });
}

export function getDaysOverdue(dueDate) {
  if (!dueDate) return 0;
  const end = parseEndOfDay(dueDate);
  if (!end || isNaN(end.getTime())) return 0;
  const diff = Date.now() - end.getTime();
  return diff > 0 ? Math.ceil(diff / 86400000) : 0;
}

export function getCompanyBranding() {
  const comp = state.data?.company || {};
  const nameAr = comp.nameAr || comp.name || 'فريق دارك للتصميم';
  const nameEn = comp.nameEn || comp.name || 'DARC Design Team';
  const displayName = choose(nameAr, nameEn);

  const rawLogo = comp.logoUrl || '';
  const isSafeLogo = /^(https?:\/\/|data:image\/|\/)/i.test(rawLogo) && !rawLogo.toLowerCase().includes('javascript:');
  let logoUrl = isSafeLogo ? rawLogo : '';

  if (logoUrl.startsWith('/') && typeof window !== 'undefined' && window.location?.origin) {
    logoUrl = `${window.location.origin}${logoUrl}`;
  }

  return {
    nameAr,
    nameEn,
    displayName,
    logoUrl,
    emailFrom: comp.emailFrom || '',
    emailTo: comp.emailTo || '',
    phone: comp.phone || '',
    website: comp.website || '',
    address: comp.address || ''
  };
}

export function exportXLS(filename, htmlTable) {
  const html = `
    <html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">
    <head>
      <meta charset="utf-8" />
      <style>
        table { border-collapse: collapse; font-family: 'Segoe UI', Tahoma, Arial, sans-serif; }
        td, th { border: 1px solid #333; padding: 7px 10px; text-align: right; vertical-align: middle; }
        .title { font-size: 18px; font-weight: bold; background: #0d6269; color: #fff; text-align: center; }
        .subtitle { font-size: 14px; font-weight: bold; background: #eef2f2; text-align: center; }
        .meta { font-size: 12px; text-align: center; background: #f9fafa; color: #475569; }
        .header { font-weight: bold; background: #d4e0e0; text-align: center; }
      </style>
    </head>
    <body dir="${state.lang === 'ar' ? 'rtl' : 'ltr'}">
      ${htmlTable}
    </body>
    </html>
  `;
  const blob = new Blob(['\uFEFF' + html], { type: 'application/vnd.ms-excel;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = (filename.endsWith('.xls') ? filename : `${filename}.xls`);
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function canUserMoveTask(task) {
  if (!task) return false;
  if (isAdmin()) return true;
  if (!can('edit_tasks')) return false;
  const userId = state.data?.user?.id;
  if (!userId) return false;
  const assignee = task.assigneeId || task.assignee_id;
  if (assignee === userId) return true;
  const creator = task.creatorId || task.createdById || task.created_by_id || task.created_by;
  if (creator === userId) return true;
  const reviewer = task.reviewerId || task.reviewer_id;
  const approver = task.approverId || task.approver_id;
  if (reviewer === userId || approver === userId) return true;

  const additional = task.customFields?.additionalAssignees || task.customFields?.additional_assignees || task.custom_fields?.additionalAssignees || task.custom_fields?.additional_assignees;
  if (Array.isArray(additional) && additional.includes(userId)) return true;

  const projectId = task.projectId || task.project_id;
  if (projectId && state.data?.projects) {
    const proj = state.data?.projects?.find(p => p.id === projectId);
    if (proj) {
      const pm = proj.managerId || proj.manager_id;
      const owner = proj.ownerId || proj.owner_id || proj.leadId || proj.lead_id || proj.createdById || proj.created_by;
      if (pm === userId || owner === userId) return true;
      if (Array.isArray(proj.members) && proj.members.some(m => (m.userId || m.id || m) === userId)) return true;
      if (Array.isArray(proj.memberIds) && proj.memberIds.includes(userId)) return true;
    }
  }
  return false;
}

export function setSavedTaskSort(mode) {
  try {
    localStorage.setItem('darc_task_sort_pref', mode);
  } catch (e) {}
  state.taskSortPref = mode;
  state.projectTaskSort = mode;
  state.myTaskSort = mode;
}

// Enterprise Bounded LRU Document Blob Cache (OWASP Client Memory Exhaustion Guard)
const MAX_BLOB_CACHE_SIZE = 8;
const BLOB_TTL_MS = 15 * 60 * 1000; // 15 minutes TTL

class DocumentBlobManager {
  constructor(maxSize = MAX_BLOB_CACHE_SIZE) {
    this.maxSize = maxSize;
    this.cache = new Map();
  }

  set(key, blobUrl, size = 0) {
    if (!key || !blobUrl) return;
    if (this.cache.has(key)) {
      const existing = this.cache.get(key);
      if (existing?.url && existing.url !== blobUrl) {
        try { URL.revokeObjectURL(existing.url); } catch (_) {}
      }
      this.cache.delete(key);
    }

    while (this.cache.size >= this.maxSize) {
      const oldestKey = this.cache.keys().next().value;
      if (!oldestKey) break;
      const entry = this.cache.get(oldestKey);
      if (entry?.url) {
        try { URL.revokeObjectURL(entry.url); } catch (_) {}
      }
      this.cache.delete(oldestKey);
    }

    this.cache.set(key, { url: blobUrl, size, timestamp: Date.now() });
  }

  get(key) {
    if (!key || !this.cache.has(key)) return null;
    const entry = this.cache.get(key);
    if (!entry) return null;
    if (Date.now() - entry.timestamp > BLOB_TTL_MS) {
      if (entry.url) {
        try { URL.revokeObjectURL(entry.url); } catch (_) {}
      }
      this.cache.delete(key);
      return null;
    }
    this.cache.delete(key);
    this.cache.set(key, entry);
    return entry.url;
  }

  has(key) {
    return Boolean(this.get(key));
  }

  revoke(key) {
    if (!key || !this.cache.has(key)) return;
    const entry = this.cache.get(key);
    if (entry?.url) {
      try { URL.revokeObjectURL(entry.url); } catch (_) {}
    }
    this.cache.delete(key);
  }

  clear() {
    for (const [, entry] of this.cache.entries()) {
      if (entry?.url) {
        try { URL.revokeObjectURL(entry.url); } catch (_) {}
      }
    }
    this.cache.clear();
  }
}

export const docBlobManager = new DocumentBlobManager();
if (typeof window !== 'undefined') {
  window.__docBlobCache = docBlobManager;
}
