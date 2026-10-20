import { state } from './state.js';

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
export function esc(value) {
  return String(value ?? '').replace(/[&<>'"]/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[character]));
}
export function icon(name, size = 18) {
  const paths = {
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
    link: '<path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>',
    globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/>',
    info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/>'
  };
  return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths[name] || paths.info}</svg>`;
}

export function initials(user) {
  if (!user) return 'D';
  const source = state.lang === 'ar' ? user.name : (user.nameEn || user.name);
  const words = source.replace(/^(م\.|م\s|ح\.|ع\.|Eng\.\s)/i, '').split(/\s+/).filter(Boolean);
  return (words.slice(0, 2).map((word) => word[0]).join('') || source.slice(0, 2)).toUpperCase();
}

export function avatar(user, extra = '') {
  const safe = user || { name: 'DARC', avatarColor: '#0d6269' };
  const color = /^#[0-9a-f]{6}$/i.test(safe.avatarColor || '') ? safe.avatarColor : '#0d6269';
  const title = esc(choose(safe.name, safe.nameEn || safe.name));
  if (safe.avatarUrl) {
    const safeInitials = esc(initials(safe)).replace(/['"\\]/g, '');
    return `<span class="avatar ${extra}" style="background:transparent;padding:0;overflow:hidden;border:1px solid rgba(255,255,255,0.15);display:inline-flex;align-items:center;justify-content:center;" title="${title}"><img src="${esc(safe.avatarUrl)}" alt="${title}" style="width:100%;height:100%;object-fit:cover;border-radius:inherit;" onerror="this.parentElement.style.background='${color}';this.parentElement.textContent='${safeInitials}';" /></span>`;
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

export function getActiveCalendarSystem() {
  return state.calendarSystem || state.data?.user?.customFields?.calendarSystem || localStorage.getItem('darc_calendar_system') || 'gregorian';
}

export function dateLabel(value, includeYear = true) {
  if (!value) return '—';
  const date = new Date(String(value).length === 10 ? `${value}T12:00:00` : value);
  if (Number.isNaN(date.getTime())) return '—';

  const calSystem = getActiveCalendarSystem();
  if (calSystem === 'hijri') {
    const locale = state.lang === 'ar' ? 'ar-SA-u-ca-islamic-umalqura' : 'en-u-ca-islamic-umalqura';
    return new Intl.DateTimeFormat(locale, {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    }).format(date);
  }

  // Unified Gregorian: Day / Month / Year
  const locale = state.lang === 'ar' ? 'ar-u-ca-gregory' : 'en-GB-u-ca-gregory';
  return new Intl.DateTimeFormat(locale, {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  }).format(date);
}

export function formatUnifiedDateNumeric(value) {
  if (!value) return '—';
  const date = new Date(String(value).length === 10 ? `${value}T12:00:00` : value);
  if (Number.isNaN(date.getTime())) return '—';
  const d = String(date.getDate()).padStart(2, '0');
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const y = date.getFullYear();
  return `${d}/${m}/${y}`;
}

export function getHijriDateEquivalent(value) {
  if (!value) return '';
  const date = new Date(String(value).length === 10 ? `${value}T12:00:00` : value);
  if (Number.isNaN(date.getTime())) return '';
  return new Intl.DateTimeFormat('ar-SA-u-ca-islamic-umalqura', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).format(date);
}

export function dueLabel(value) {
  if (!value) return '—';
  const due = new Date(`${value}T23:59:59`);
  const diff = Math.ceil((due - new Date()) / 86_400_000);
  if (diff < 0) return choose(`متأخرة ${Math.abs(diff)} ${t('days')}`, `${Math.abs(diff)} ${t('days')} ${t('ago')}`);
  if (diff === 0) return t('today');
  return choose(`بعد ${diff} ${t('days')}`, `in ${diff} ${t('days')}`);
}

export function isOverdue(task) {
  return task?.dueDate && !['done', 'completed', 'canceled'].includes(task.status) && new Date(`${task.dueDate}T23:59:59`) < new Date();
}

export function statusText(key) {
  return { not_started: t('notStarted'), in_progress: t('inProgress'), review: t('review'), approval: t('approval'), done: t('done'), blocked: t('blocked'), canceled: t('canceled'), planning: t('planning'), active: t('active'), on_hold: t('onHold'), completed: t('completed'), archived: t('archived'), on_track: t('onTrack'), at_risk: t('atRisk'), off_track: t('offTrack') }[key] || key;
}

export function statusBadge(status) {
  if (!status) return `<span style="color:var(--muted)">—</span>`;
  return `<span class="status-badge ${esc(status)}">${esc(statusText(status))}</span>`;
}

export function priorityText(key) { return { low: t('low'), medium: t('medium'), high: t('high'), urgent: t('urgent') }[key] || key; }

export function roleFor(userOrId) {
  const user = typeof userOrId === 'string' ? state.data?.users.find((item) => item.id === userOrId) : userOrId;
  if (!user) return null;
  return state.data?.roles.find((role) => role.id === user.roleId) || { id: user.roleId, nameAr: user.roleNameAr || '', nameEn: user.roleNameEn || '', permissions: [] };
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
  const permissions = state.data?.role?.permissions || [];
  if (permissions.includes('*') || permissions.includes(permission)) return true;
  const alias = PERMISSION_ALIASES[permission];
  return Boolean(alias && permissions.includes(alias));
}

export function isAdmin() {
  return state.data?.user?.roleId === 'admin';
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
