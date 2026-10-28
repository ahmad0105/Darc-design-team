
import { state } from '../../core/state.js';
import { getTimeBasedGreeting, can, isAdmin } from '../../core/utils.js';

export function metricCard(label, value, note, type, iconName, noteClass = '') {
  return `<article class="metric-card ${type}"><div class="metric-top"><span class="metric-label">${esc(label)}</span><span class="metric-icon">${icon(iconName, 15)}</span></div><div class="metric-value">${esc(value)}</div><span class="metric-note ${noteClass}">${esc(note)}</span></article>`;
}

export function projectProgress(project) {
  const fillClass = project.health === 'off_track' ? 'red' : project.health === 'at_risk' ? 'amber' : '';
  return `<div class="progress-cell"><div class="progress-meta"><span>${t('weightedProgress')}</span><strong>${project.progress}%</strong></div><div class="progress-track"><div class="progress-fill ${fillClass}" style="width:${Math.min(100, project.progress)}%"></div></div></div>`;
}

export function attentionItem(task) {
  const type = isOverdue(task) ? 'red' : task.status === 'blocked' ? 'red' : 'amber';
  const title = isOverdue(task) ? choose('متأخرة', 'Overdue') : task.status === 'blocked' ? choose('متوقفة', 'Blocked') : choose('تستحق قريبًا', 'Due soon');
  return `<button class="attention-item" data-action="open-task" data-task-id="${esc(task.id)}" style="border:0;text-align:inherit;width:100%"><span class="attention-icon ${type}">${icon(isOverdue(task) || task.status === 'blocked' ? 'alert' : 'clock', 14)}</span><span class="attention-copy"><strong style="color:var(--${type})">${esc(choose(task.titleAr, task.titleEn))}</strong><span>${esc(title)} · ${esc(dueLabel(task.dueDate))}</span></span></button>`;
}

export function teamMetrics(userId, tasks) {
  const mine = tasks.filter((task) => task.assigneeId === userId);
  const weight = mine.reduce((sum, task) => sum + Number(task.weight || 1), 0);
  const progress = weight ? Math.round(mine.reduce((sum, task) => sum + task.progress * Number(task.weight || 1), 0) / weight) : 0;
  return { tasks: mine.length, progress, overdue: mine.filter(isOverdue).length };
}

export function teamRow(user, tasks) {
  const metrics = teamMetrics(user.id, tasks);
  return `<div class="team-row"><div class="team-member">${avatar(user)}<div class="team-member-copy"><strong>${esc(choose(user.name, user.nameEn || user.name))}</strong><span>${esc(choose(user.jobTitleAr, user.jobTitleEn || user.jobTitleAr))}</span></div></div><div class="team-stat"><strong>${metrics.tasks}</strong> ${t('tasks')}</div><div class="team-progress"><div class="progress-meta"><span>${t('progress')}</span><strong>${metrics.progress}%</strong></div><div class="progress-track"><div class="progress-fill" style="width:${metrics.progress}%"></div></div></div><button class="team-menu" data-action="open-user" data-user-id="${esc(user.id)}">${icon('more', 15)}</button></div>`;
}

export function pulseChart() {
  const values = [38, 48, 45, 62, 55, 72, 68];
  const labels = state.lang === 'ar' ? ['أحد', 'اثن', 'ثلث', 'أربع', 'خمس', 'جمع', 'سبت'] : ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  return `<div class="pulse">${values.map((value, index) => `<div class="pulse-col"><div class="pulse-bars"><span class="pulse-bar" style="height:${Math.max(12, value - 22)}%"></span><span class="pulse-bar ${index === values.length - 1 ? 'current' : ''}" style="height:${value}%"></span></div><span>${labels[index]}</span></div>`).join('')}</div>`;
}

export function renderDashboard() {
  const stats = state.data?.stats || {};
  const projects = state.data?.projects || [];
  const tasks = state.data?.tasks || [];
  const users = state.data?.users || [];
  const user = state.data?.user || {};
  const userName = user.name || user.email || choose('مستخدم', 'User');

  const totalWeight = projects.reduce((sum, project) => sum + (Number(project.totalWeight) || 0), 0);
  const portfolioProgress = totalWeight ? Math.round(projects.reduce((sum, project) => sum + (Number(project.progress) || 0) * (Number(project.totalWeight) || 0), 0) / totalWeight) : 0;
  const attention = [...tasks].filter((task) => isOverdue(task) || task.status === 'blocked' || (task.dueDate && (new Date(`${task.dueDate}T23:59:59`) - new Date()) / 86_400_000 <= 7)).sort((a, b) => new Date(a.dueDate || '9999-12-31') - new Date(b.dueDate || '9999-12-31')).slice(0, 5);
  const activeUsers = users.filter((member) => member.status !== 'inactive');
  const projectCount = stats.projectCount ?? projects.length;
  const myTasksCount = stats.myTasks ?? tasks.filter(t => t.assigneeId === user.id).length;
  const overdueTasksCount = stats.overdueTasks ?? tasks.filter(isOverdue).length;
  const dueSoonCount = stats.dueSoon ?? 0;
  const completedTasksCount = stats.completedTasks ?? tasks.filter(t => t.status === 'done').length;

  return `<div class="welcome-banner"><div class="welcome-copy"><p class="eyebrow">${choose('لوحة قيادة المشاريع', 'PROJECT COMMAND CENTER')}</p><h1>${getTimeBasedGreeting()}، ${esc(choose(userName.replace(/^م\.\s?/, ''), user.nameEn || userName))}</h1><p>${t('welcomeText')}</p></div><div class="welcome-status"><span>${t('portfolioHealth')}</span><strong>${portfolioProgress}%</strong><small>${choose('إنجاز المحفظة الموزون', 'Weighted portfolio progress')}</small></div></div>
    <div class="metrics-grid">${metricCard(t('activeProjects'), stats.activeProjects || 0, choose(`${projectCount} مشاريع إجمالًا`, `${projectCount} projects total`), 'teal', 'building', 'up')}${metricCard(t('openTasks'), stats.openTasks ?? tasks.length, choose(`${myTasksCount} مسندة لك`, `${myTasksCount} assigned to you`), 'blue', 'checklist')}${metricCard(t('overdue'), overdueTasksCount, choose('تحتاج تصعيدًا ومتابعة', 'Needs escalation and follow-up'), 'red', overdueTasksCount ? 'alert' : 'check', overdueTasksCount ? 'alert' : '')}${metricCard(t('dueThisWeek'), dueSoonCount, choose('موعد قريب', 'Near-term due dates'), 'amber', 'clock')}</div>
    <div class="content-grid"><div class="stack"><section class="panel"><div class="panel-head"><div><h2 class="panel-title">${t('projectProgress')}</h2><p class="panel-subtitle">${t('projectProgressSub')}</p></div>${can('view_projects') ? `<button class="text-link" data-view="projects">${t('seeAll')} ${icon(state.lang === 'ar' ? 'arrowLeft' : 'arrow', 12)}</button>` : ''}</div><div class="project-list">${projects.length ? projects.slice(0, 5).map(projectRow).join('') : `<div class="empty">${icon('building', 18)}<span>${t('noProjects')}</span></div>`}</div></section>${(isAdmin() || can('manage_users')) ? `<section class="panel"><div class="panel-head"><div><h2 class="panel-title">${t('teamProgress')}</h2><p class="panel-subtitle">${t('teamProgressSub')}</p></div><button class="text-link" data-view="team">${t('seeAll')} ${icon(state.lang === 'ar' ? 'arrowLeft' : 'arrow', 12)}</button></div><div class="team-table">${activeUsers.slice(0, 6).map((member) => teamRow(member, tasks)).join('')}</div></section>` : ''}</div><div class="stack"><section class="panel"><div class="panel-head"><div><h2 class="panel-title">${t('attention')}</h2><p class="panel-subtitle">${t('attentionSub')}</p></div><span class="mini-badge badge-attention" style="padding:6px 8px;">${attention.length}</span></div><div class="attention-list">${attention.length ? attention.map(attentionItem).join('') : `<div class="empty">${icon('check', 18)}<span>${t('noAttention')}</span></div>`}</div></section><section class="panel"><div class="panel-head"><div><h2 class="panel-title">${t('recentPulse')}</h2><p class="panel-subtitle">${t('recentPulseSub')}</p></div><span class="mini-badge badge-pulse" style="padding:6px 8px;">${completedTasksCount} ${t('done')}</span></div>${pulseChart()}</section></div></div>`;
}

export function renderReports() {
  const { projects, tasks, users } = state.data;
  const canExport = can('export_reports') || isAdmin();
  const totalWeight = tasks.reduce((sum, task) => sum + Number(task.weight || 1), 0);
  const totalProgress = totalWeight ? Math.round(tasks.reduce((sum, task) => sum + task.progress * Number(task.weight || 1), 0) / totalWeight) : 0;
  const categoryMap = new Map(); tasks.forEach((task) => { const key = (state.lang === 'ar' ? task.categoryAr : task.categoryEn) || choose(task.typeAr || 'عام', task.typeEn || 'General'); const current = categoryMap.get(key) || { weight: 0, progress: 0 }; current.weight += Number(task.weight || 1); current.progress += task.progress * Number(task.weight || 1); categoryMap.set(key, current); });
  const categories = [...categoryMap.entries()].map(([label, value]) => ({ label, progress: value.weight ? Math.round(value.progress / value.weight) : 0 })).sort((a, b) => b.progress - a.progress);
  return `<div class="page-head"><div><p class="eyebrow">${choose('قراءة الأداء', 'PERFORMANCE READOUT')}</p><h1>${t('reports')}</h1><p>${choose('مؤشرات بسيطة تساعد الإدارة على رؤية الانحراف قبل أن يصبح تأخيرًا.', 'Simple signals that help management see drift before it becomes delay.')}</p></div><div class="page-actions">${canExport ? `
    <div style="display:flex;gap:8px;flex-wrap:wrap;">
      <button class="btn btn-primary" data-action="print-portfolio-pdf">${icon('printer', 15)} ${choose('طباعة تقرير المحفظة (PDF)', 'Print Portfolio (PDF)')}</button>
      <button class="btn btn-soft" data-action="export-csv">${icon('document', 15)} ${choose('تصدير الإكسل (Excel)', 'Export Excel')}</button>
    </div>
  ` : ''}</div></div><div class="report-grid"><section class="panel"><div class="panel-head"><div><h2 class="panel-title">${choose('الإنجاز حسب التخصص', 'Progress by discipline')}</h2><p class="panel-subtitle">${t('weightedProgress')}</p></div><span class="status-badge on_track">${totalProgress}%</span></div><div class="report-bars">${categories.length ? categories.map((item) => `<div class="report-bar-row"><span>${esc(item.label)}</span><div class="report-bar-track"><div class="report-bar-fill" style="width:${item.progress}%"></div></div><strong>${item.progress}%</strong></div>`).join('') : `<div class="empty">${t('noTasks')}</div>`}</div></section><div class="stack"><section class="panel"><div class="panel-head"><div><h2 class="panel-title">${choose('صحة المحفظة', 'Portfolio health')}</h2><p class="panel-subtitle">${choose('توزيع حالات المشاريع الحالية.', 'Current project status distribution.')}</p></div></div><div class="report-stat-list"><div class="report-stat"><span>${t('onTrack')}</span><strong style="color:var(--mint-strong)">${projects.filter((project) => project.health === 'on_track').length}</strong></div><div class="report-stat"><span>${t('atRisk')}</span><strong style="color:var(--amber)">${projects.filter((project) => project.health === 'at_risk').length}</strong></div><div class="report-stat"><span>${t('offTrack')}</span><strong style="color:var(--red)">${projects.filter((project) => project.health === 'off_track').length}</strong></div></div></section><section class="panel"><div class="panel-head"><div><h2 class="panel-title">${t('teamLoad')}</h2><p class="panel-subtitle">${choose('المهام المفتوحة لكل عضو.', 'Open tasks per member.')}</p></div></div><div class="report-stat-list">${users.slice(0, 5).map((user) => { const metrics = teamMetrics(user.id, tasks); return `<div class="report-stat"><span>${esc(choose(user.name, user.nameEn || user.name))}</span><strong>${metrics.tasks}</strong></div>`; }).join('')}</div></section></div></div>`;
}

