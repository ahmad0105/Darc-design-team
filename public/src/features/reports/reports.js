import { state } from '../../core/state.js';
import { choose, esc, icon, avatar, statusText, t, can, isAdmin, roleName, sanitizeForSpreadsheet, formatReportDate, formatReportTime, dateLabel, isOverdue, parseEndOfDay, getDaysOverdue, getCompanyBranding, exportXLS } from '../../core/utils.js';
import { showToast } from '../../shared/ui.js';

export { getDaysOverdue } from '../../core/utils.js';

export function getDisciplineIcon(name = '', size = 15) {
  const n = String(name).toLowerCase();
  if (n.includes('معمار') || n.includes('arch')) return icon('building', size);
  if (n.includes('كهرب') || n.includes('elect')) return icon('zap', size);
  if (n.includes('سباك') || n.includes('صحي') || n.includes('plumb')) return icon('droplet', size);
  if (n.includes('تكييف') || n.includes('hvac') || n.includes('ميكانيك')) return icon('thermometer', size);
  if (n.includes('إنشائ') || n.includes('انشائ') || n.includes('struct')) return icon('layers', size);
  if (n.includes('ديكور') || n.includes('داخل') || n.includes('interior')) return icon('armchair', size);
  if (n.includes('3d') || n.includes('رندر') || n.includes('visual')) return icon('palette', size);
  if (n.includes('كميات') || n.includes('boq') || n.includes('quantity')) return icon('chart', size);
  if (n.includes('حريق') || n.includes('fire')) return icon('flame', size);
  return icon('compass', size);
}

export function getReportFilteredTasks(tasks = [], projectFilter = 'all', timeframeFilter = 'all') {
  let filtered = projectFilter === 'all'
    ? tasks
    : tasks.filter(t => t.projectId === projectFilter);

  const now = new Date();
  if (timeframeFilter === 'month') {
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    filtered = filtered.filter(t => {
      const d = t.dueDate ? new Date(t.dueDate) : t.updatedAt ? new Date(t.updatedAt) : null;
      return d && d >= startOfMonth;
    });
  } else if (timeframeFilter === 'quarter') {
    const qMonth = Math.floor(now.getMonth() / 3) * 3;
    const startOfQuarter = new Date(now.getFullYear(), qMonth, 1);
    filtered = filtered.filter(t => {
      const d = t.dueDate ? new Date(t.dueDate) : t.updatedAt ? new Date(t.updatedAt) : null;
      return d && d >= startOfQuarter;
    });
  } else if (timeframeFilter === 'critical') {
    filtered = filtered.filter(t => isOverdue(t) || t.priority === 'urgent' || t.status === 'blocked');
  }
  return filtered;
}

export function computeDisciplinesBreakdown(tasks = []) {
  const disciplineMap = new Map();
  tasks.forEach(task => {
    const rawCategory = (state.lang === 'ar' ? task.categoryAr : task.categoryEn) ||
      choose(task.typeAr || 'معماري', task.typeEn || 'Architectural');
    const key = rawCategory.trim();
    const cur = disciplineMap.get(key) || {
      name: key,
      weight: 0,
      progress: 0,
      total: 0,
      done: 0,
      overdue: 0
    };
    const w = Number(task.weight || 1);
    cur.weight += w;
    cur.progress += (task.progress || 0) * w;
    cur.total++;
    if (['done', 'completed'].includes(task.status)) cur.done++;
    if (isOverdue(task)) cur.overdue++;
    disciplineMap.set(key, cur);
  });

  return [...disciplineMap.values()].map(d => ({
    ...d,
    percentage: d.weight ? Math.round(d.progress / d.weight) : 0
  })).sort((a, b) => b.total - a.total);
}

export function computeTeamWorkload(tasks = [], users = []) {
  const tasksByAssignee = new Map();
  tasks.forEach(task => {
    const assignedUserIds = new Set();
    if (task.assigneeId) assignedUserIds.add(task.assigneeId);
    if (task.assignee_id) assignedUserIds.add(task.assignee_id);
    const additional = task.customFields?.additionalAssignees || 
                       task.customFields?.additional_assignees || 
                       task.custom_fields?.additionalAssignees || 
                       task.custom_fields?.additional_assignees;
    if (Array.isArray(additional)) {
      additional.forEach(uid => { if (uid) assignedUserIds.add(uid); });
    }
    assignedUserIds.forEach(uid => {
      const list = tasksByAssignee.get(uid);
      if (list) list.push(task);
      else tasksByAssignee.set(uid, [task]);
    });
  });

  const activeMembers = users.filter(u => u.status !== 'inactive');
  return activeMembers.map(u => {
    const mine = tasksByAssignee.get(u.id) || [];
    const done = mine.filter(t => ['done', 'completed'].includes(t.status)).length;
    const active = mine.filter(t => ['in_progress', 'review', 'approval'].includes(t.status)).length;
    const od = mine.filter(isOverdue).length;
    const weightSum = mine.reduce((s, t) => s + Number(t.weight || 1), 0);
    const progSum = mine.reduce((s, t) => s + (t.progress || 0) * Number(t.weight || 1), 0);
    const memberProgress = weightSum ? Math.round(progSum / weightSum) : 0;
    
    let capacity = 'optimal';
    let capacityLabel = choose('متزن', 'Optimal');
    if (active === 0 && mine.length === 0) {
      capacity = 'idle';
      capacityLabel = choose('متاح', 'Available');
    } else if (active > 7 || od >= 2) {
      capacity = 'critical';
      capacityLabel = choose('ضغط حرج', 'Critical Overload');
    } else if (active > 4) {
      capacity = 'high';
      capacityLabel = choose('حمولة مرتفعة', 'High Load');
    }

    return {
      user: u,
      total: mine.length,
      done,
      active,
      overdue: od,
      progress: memberProgress,
      capacity,
      capacityLabel
    };
  }).sort((a, b) => b.active - a.active || b.overdue - a.overdue);
}

export function renderReports() {
  const { projects = [], tasks = [], users = [], documents = [] } = state.data || {};
  const canExport = can('export_reports') || isAdmin();

  // Active filters and tab from state
  const projectFilter = state.reportProjectFilter || 'all';
  const timeframeFilter = state.reportTimeframe || 'all';
  const activeTab = state.reportsTab || 'overview';

  // 1. Filter Projects & Tasks
  const filteredProjects = projectFilter === 'all'
    ? projects
    : projects.filter(p => p.id === projectFilter);

  const filteredTasks = getReportFilteredTasks(tasks, projectFilter, timeframeFilter);

  // 2. Compute Executive KPIs
  const totalWeight = filteredTasks.reduce((sum, task) => sum + Number(task.weight || 1), 0);
  const weightedProgress = totalWeight
    ? Math.round(filteredTasks.reduce((sum, task) => sum + (task.progress || 0) * Number(task.weight || 1), 0) / totalWeight)
    : 0;

  const completedTasksCount = filteredTasks.filter(t => ['done', 'completed'].includes(t.status)).length;
  const inProgressTasksCount = filteredTasks.filter(t => t.status === 'in_progress').length;
  const inReviewTasksCount = filteredTasks.filter(t => ['review', 'approval'].includes(t.status)).length;
  const overdueTasks = filteredTasks.filter(isOverdue);
  const overdueTasksCount = overdueTasks.length;
  const blockedTasksCount = filteredTasks.filter(t => t.status === 'blocked').length;

  const onTrackProjectsCount = filteredProjects.filter(p => p.health === 'on_track').length;
  const atRiskProjectsCount = filteredProjects.filter(p => p.health === 'at_risk').length;
  const offTrackProjectsCount = filteredProjects.filter(p => p.health === 'off_track').length;
  const completedProjectsCount = filteredProjects.filter(p => p.lifecycle === 'completed' || p.progress === 100).length;

  const onTimeRate = filteredTasks.length
    ? Math.max(0, Math.min(100, Math.round(((filteredTasks.length - overdueTasksCount) / filteredTasks.length) * 100)))
    : 100;

  const filteredDocs = projectFilter === 'all'
    ? (documents || []).filter(d => !d.deletedAt)
    : (documents || []).filter(d => d.projectId === projectFilter && !d.deletedAt);
  const approvedDocsCount = filteredDocs.filter(d => d.status === 'approved').length;

  // 3. Disciplines and Team Workload via unified functions
  const disciplines = computeDisciplinesBreakdown(filteredTasks);
  const teamWorkload = computeTeamWorkload(filteredTasks, users);

  // 4. Smart Executive Insights text
  const highestDiscipline = disciplines[0]?.name || choose('معماري', 'Architectural');
  const highestProject = [...filteredProjects].sort((a, b) => (b.progress || 0) - (a.progress || 0))[0];
  const lowestProject = [...filteredProjects].filter(p => p.lifecycle === 'active').sort((a, b) => (a.progress || 0) - (b.progress || 0))[0];

  return `
    <!-- Page Header with Actions -->
    <div class="page-head report-page-head">
      <div>
        <p class="eyebrow">${choose('الرقابة والذكاء التنفيذي', 'EXECUTIVE INTELLIGENCE & AUDIT')}</p>
        <h1>${t('reports')}</h1>
        <p>${choose('تحليلات شاملة للمحفظة الهندسية: الإنجاز الموزون، كفاءة الأقسام، ضغط الفريق، ومؤشرات المخاطر.', 'Comprehensive engineering portfolio readout: weighted progress, discipline efficiency, team capacity, and risk indicators.')}</p>
      </div>
      <div class="page-actions report-actions">
        ${canExport ? `
          <div class="report-action-buttons">
            <button class="btn btn-primary btn-report-action" data-action="print-portfolio-pdf">
              ${icon('printer', 15)} <span>${choose('تقرير المحفظة الرسمي (PDF)', 'Official Portfolio Report (PDF)')}</span>
            </button>
            <button class="btn btn-soft btn-report-action" data-action="export-csv">
              ${icon('document', 15)} <span>${choose('تصدير بيانات Excel', 'Export Excel Data')}</span>
            </button>
          </div>
        ` : ''}
      </div>
    </div>

    <!-- Filter Toolbar & Horizon Selector -->
    <div class="view-toolbar report-toolbar">
      <div class="view-toolbar-start report-toolbar-start">
        <!-- Project Scope Dropdown -->
        <div class="report-filter-item">
          <span class="report-filter-label">
            ${icon('building', 13)} ${choose('المشروع:', 'Project:')}
          </span>
          <select class="select-compact report-select" data-action="filter-report-project">
            <option value="all" ${projectFilter === 'all' ? 'selected' : ''}>${choose('— كافة مشاريع المحفظة —', '— All Portfolio Projects —')}</option>
            ${projects.map(p => `
              <option value="${esc(p.id)}" ${projectFilter === p.id ? 'selected' : ''}>
                ${esc(p.code)} · ${esc(choose(p.nameAr, p.nameEn))}
              </option>
            `).join('')}
          </select>
        </div>

        <!-- Timeframe / Horizon Dropdown -->
        <div class="report-filter-item">
          <span class="report-filter-label">
            ${icon('calendar', 13)} ${choose('الفترة:', 'Period:')}
          </span>
          <select class="select-compact report-select" data-action="filter-report-timeframe">
            <option value="all" ${timeframeFilter === 'all' ? 'selected' : ''}>${choose('كافة الفترات والمراحل', 'All Milestones & Time')}</option>
            <option value="month" ${timeframeFilter === 'month' ? 'selected' : ''}>${choose('الشهر الحالي', 'Current Month')}</option>
            <option value="quarter" ${timeframeFilter === 'quarter' ? 'selected' : ''}>${choose('الربع السنوي الحالي (Q)', 'Current Quarter')}</option>
            <option value="critical" ${timeframeFilter === 'critical' ? 'selected' : ''}>${choose('المهام والمشاريع الحرجة فقط', 'Critical Focus Only')}</option>
          </select>
        </div>
      </div>

      <div class="view-toolbar-end report-toolbar-end">
        <span class="mini-badge report-badge-count">
          ${icon('target', 12)} ${filteredProjects.length} ${choose('مشاريع مشمولة', 'projects analyzed')} · ${filteredTasks.length} ${choose('مهمة', 'tasks')}
        </span>
      </div>
    </div>

    <!-- Report Perspectives Navigation Tabs -->
    <div class="detail-tabs report-tabs" style="margin-bottom:20px;">
      <button class="detail-tab ${activeTab === 'overview' ? 'active' : ''}" data-action="report-tab" data-tab="overview">
        ${icon('chart', 15)} <span>${choose('النظرة التنفيذية ومؤشرات الأداء', 'Executive KPI Overview')}</span>
      </button>
      <button class="detail-tab ${activeTab === 'disciplines' ? 'active' : ''}" data-action="report-tab" data-tab="disciplines">
        ${icon('layers', 15)} <span>${choose('تحليل الأقسام والتخصصات', 'Disciplines & Deliverables')}</span>
      </button>
      <button class="detail-tab ${activeTab === 'team' ? 'active' : ''}" data-action="report-tab" data-tab="team">
        ${icon('users', 15)} <span>${choose('أداء وحمولة فريق العمل', 'Team Workload & Capacity')}</span>
      </button>
      <button class="detail-tab ${activeTab === 'risks' ? 'active' : ''}" data-action="report-tab" data-tab="risks">
        ${icon('alert', 15)} <span>${choose('مصفوفة المخاطر والانحراف', 'Risk & Delay Matrix')}</span>
        ${overdueTasksCount > 0 ? `<span class="badge badge-red" style="padding:1px 5px;font-size:10px;margin-inline-start:4px;">${overdueTasksCount}</span>` : ''}
      </button>
      <button class="detail-tab ${activeTab === 'drawings' ? 'active' : ''}" data-action="report-tab" data-tab="drawings">
        ${icon('document', 15)} <span>${choose('المخططات والاعتمادات', 'Drawings & Submittals')}</span>
      </button>
    </div>

    <!-- Tab Content Body -->
    ${activeTab === 'overview' ? renderOverviewTab({
      filteredProjects,
      filteredTasks,
      totalWeight,
      weightedProgress,
      completedTasksCount,
      inProgressTasksCount,
      inReviewTasksCount,
      overdueTasksCount,
      blockedTasksCount,
      onTrackProjectsCount,
      atRiskProjectsCount,
      offTrackProjectsCount,
      completedProjectsCount,
      onTimeRate,
      approvedDocsCount,
      filteredDocs,
      disciplines,
      highestDiscipline,
      highestProject,
      lowestProject
    }) : ''}

    ${activeTab === 'disciplines' ? renderDisciplinesTab(disciplines, filteredTasks.length) : ''}
    ${activeTab === 'team' ? renderTeamWorkloadTab(teamWorkload, filteredTasks.length) : ''}
    ${activeTab === 'risks' ? renderRisksTab(overdueTasks, filteredProjects, blockedTasksCount) : ''}
    ${activeTab === 'drawings' ? renderDrawingsSubmittalsTab(filteredDocs, filteredProjects) : ''}
  `;
}

function renderOverviewTab(data) {
  const {
    filteredProjects,
    filteredTasks,
    weightedProgress,
    completedTasksCount,
    inProgressTasksCount,
    inReviewTasksCount,
    overdueTasksCount,
    blockedTasksCount,
    onTrackProjectsCount,
    atRiskProjectsCount,
    offTrackProjectsCount,
    completedProjectsCount,
    onTimeRate,
    approvedDocsCount,
    filteredDocs,
    disciplines,
    highestDiscipline,
    highestProject,
    lowestProject
  } = data;

  const totalProj = filteredProjects.length || 1;
  const onTrackPercent = Math.round((onTrackProjectsCount / totalProj) * 100);
  const atRiskPercent = Math.round((atRiskProjectsCount / totalProj) * 100);
  const offTrackPercent = Math.round((offTrackProjectsCount / totalProj) * 100);
  const completedPercent = Math.round((completedProjectsCount / totalProj) * 100);

  return `
    <div style="display:flex;flex-direction:column;gap:20px;">
      <!-- 1. Executive KPIs Grid -->
      <div class="metrics-grid" style="margin-bottom:0;">
        <article class="metric-card teal">
          <div class="metric-top">
            <span class="metric-label">${choose('الإنجاز الموزون العام', 'Weighted Portfolio Progress')}</span>
            <span class="metric-icon">${icon('chart', 16)}</span>
          </div>
          <div class="metric-value">${weightedProgress}%</div>
          <span class="metric-note up" style="display:inline-flex;align-items:center;gap:4px;">${icon('check', 12)} ${completedTasksCount} ${choose('مهام مكتملة', 'tasks done')} (${filteredTasks.length} ${choose('إجمالي', 'total')})</span>
        </article>

        <article class="metric-card blue">
          <div class="metric-top">
            <span class="metric-label">${choose('معدل الالتزام الزمني', 'On-Time Schedule Adherence')}</span>
            <span class="metric-icon">${icon('clock', 16)}</span>
          </div>
          <div class="metric-value">${onTimeRate}%</div>
          <span class="metric-note ${onTimeRate >= 80 ? 'up' : 'alert'}">${onTimeRate >= 80 ? choose('وتيرة تسليم مستقرة', 'Healthy delivery pace') : choose('تراجع في وتيرة التسليم', 'Pace needs correction')}</span>
        </article>

        <article class="metric-card ${overdueTasksCount > 0 ? 'red' : 'teal'}">
          <div class="metric-top">
            <span class="metric-label">${choose('المهام المتأخرة والحرجة', 'Critical & Overdue Tasks')}</span>
            <span class="metric-icon">${icon(overdueTasksCount > 0 ? 'alert' : 'check', 16)}</span>
          </div>
          <div class="metric-value">${overdueTasksCount}</div>
          <span class="metric-note ${overdueTasksCount > 0 ? 'alert' : 'up'}">${overdueTasksCount > 0 ? choose('تتطلب تدخلاً ومتابعة', 'Immediate escalation needed') : choose('لا يوجد تأخير حرج', 'Zero critical delays')}</span>
        </article>

        <article class="metric-card amber">
          <div class="metric-top">
            <span class="metric-label">${choose('المخططات المعتمدة', 'Approved Deliverables')}</span>
            <span class="metric-icon">${icon('document', 16)}</span>
          </div>
          <div class="metric-value">${approvedDocsCount}</div>
          <span class="metric-note" style="display:inline-flex;align-items:center;gap:4px;">${icon('document', 12)} ${filteredDocs.length} ${choose('ملف ومخطط مرفوع', 'total uploaded documents')}</span>
        </article>
      </div>

      <!-- 2. Smart Executive Summary & Highlights -->
      <section class="panel" style="background:linear-gradient(135deg, var(--surface) 0%, var(--surface-soft) 100%);padding:20px;border:1px solid var(--line);">
        <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:16px;flex-wrap:wrap;">
          <div style="display:flex;align-items:center;gap:10px;">
            <span class="report-kpi-icon-pill" style="width:36px;height:36px;border-radius:10px;background:var(--mint);color:var(--teal);display:grid;place-items:center;flex-shrink:0;">${icon('sparkles', 18)}</span>
            <div>
              <h3 style="margin:0;font-size:15px;color:var(--ink);">${choose('الملخص التحليلي التنفيذي', 'Executive Operations & Health Summary')}</h3>
              <p style="margin:2px 0 0;font-size:12px;color:var(--ink-soft);">${choose('قراءة ذكية لحركة المحفظة وجاهزية المخرجات ومكامن التباطؤ.', 'Automated synthesis of deliverable flow, velocity, and bottlenecks.')}</p>
            </div>
          </div>
          <div style="display:flex;align-items:center;gap:8px;">
            <span class="badge ${weightedProgress >= 70 ? 'badge-teal' : weightedProgress >= 40 ? 'badge-amber' : 'badge-red'}" style="font-size:12px;font-weight:700;padding:4px 10px;display:inline-flex;align-items:center;gap:5px;">
              <span class="report-status-dot" style="width:7px;height:7px;border-radius:50%;background:currentColor;"></span>
              ${weightedProgress >= 70 ? choose('حالة المحفظة: ممتازة', 'Status: Excellent') : weightedProgress >= 40 ? choose('حالة المحفظة: تحتاج متابعة', 'Status: Needs Attention') : choose('حالة المحفظة: حرجة', 'Status: Critical')}
            </span>
          </div>
        </div>

        <div style="margin-top:16px;display:grid;grid-template-columns:repeat(auto-fit, minmax(min(100%, 250px), 1fr));gap:14px;">
          <div style="background:var(--surface);padding:12px 14px;border-radius:10px;border:1px solid var(--line);">
            <span style="font-size:11px;color:var(--muted);font-weight:700;display:flex;align-items:center;gap:5px;margin-bottom:4px;">${icon('trendingUp', 12)} ${choose('المشروع الأكثر تقدماً', 'Top Progressing Project')}</span>
            <strong style="font-size:13px;color:var(--ink);display:block;">${esc(highestProject ? choose(highestProject.nameAr, highestProject.nameEn) : '—')}</strong>
            <span style="font-size:11px;color:var(--brand-teal);font-weight:bold;">${highestProject ? `${highestProject.progress}% ${choose('إنجاز', 'completed')}` : ''}</span>
          </div>

          <div style="background:var(--surface);padding:12px 14px;border-radius:10px;border:1px solid var(--line);">
            <span style="font-size:11px;color:var(--muted);font-weight:700;display:flex;align-items:center;gap:5px;margin-bottom:4px;">${icon('building', 12)} ${choose('التخصص الأكبر حجماً', 'Largest Active Discipline')}</span>
            <strong style="font-size:13px;color:var(--ink);display:block;">${esc(highestDiscipline)}</strong>
            <span style="font-size:11px;color:var(--ink-soft);">${disciplines[0] ? `${disciplines[0].total} ${choose('مهمة ومخرج مسجل', 'deliverables registered')}` : ''}</span>
          </div>

          <div style="background:var(--surface);padding:12px 14px;border-radius:10px;border:1px solid var(--line);">
            <span style="font-size:11px;color:var(--muted);font-weight:700;display:flex;align-items:center;gap:5px;margin-bottom:4px;">${icon('alert', 12)} ${choose('أولويات تحتاج انتباهك', 'Critical Attention Need')}</span>
            <strong style="font-size:13px;color:${overdueTasksCount > 0 ? 'var(--red)' : 'var(--teal)'};display:block;">
              ${overdueTasksCount > 0 ? `${overdueTasksCount} ${choose('مهام تجاوزت موعد التسليم', 'tasks overdue')}` : choose('جميع المواعيد منتظمة ومستقرة', 'All schedules on track')}
            </strong>
            <span style="font-size:11px;color:var(--ink-soft);">${blockedTasksCount > 0 ? `${blockedTasksCount} ${choose('مهام بانتظار فك الحجب', 'blocked tasks')}` : choose('لا توجد مهام محجوبة', 'Zero blockers')}</span>
          </div>
        </div>
      </section>

      <!-- 3. Portfolio Distribution & Discipline Breakdown Panels -->
      <div class="report-grid">
        <!-- Left: Disciplines Progress Bars -->
        <section class="panel">
          <div class="panel-head">
            <div>
              <h2 class="panel-title">${choose('الإنجاز الموزون حسب التخصص الهندسي', 'Progress by Engineering Discipline')}</h2>
              <p class="panel-subtitle">${choose('نسبة الإنجاز الموزونة لكل تخصص ومخرجاته الهندسية.', 'Weighted completion for each engineering discipline.')}</p>
            </div>
            <span class="status-badge on_track">${weightedProgress}%</span>
          </div>
          <div class="report-bars">
            ${disciplines.length ? disciplines.map(d => `
              <div class="report-bar-row">
                <span title="${esc(d.name)}" style="display:flex;align-items:center;gap:6px;min-width:0;">
                  <span style="flex-shrink:0;">${getDisciplineIcon(d.name)}</span>
                  <span style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${esc(d.name)}</span>
                </span>
                <div class="report-bar-track" title="${d.percentage}%">
                  <div class="report-bar-fill" style="width:${d.percentage}%;"></div>
                </div>
                <strong>${d.percentage}%</strong>
              </div>
            `).join('') : `<div class="empty">${t('noTasks')}</div>`}
          </div>
        </section>

        <!-- Right: Portfolio Health & Workload Pulse -->
        <div class="stack">
          <!-- Portfolio Health Distribution -->
          <section class="panel">
            <div class="panel-head">
              <div>
                <h2 class="panel-title">${choose('صحة وتوزيع المحفظة', 'Portfolio Health Breakdown')}</h2>
                <p class="panel-subtitle">${choose('توزيع المشاريع حسب مسار التنفيذ والمخاطر.', 'Project health status breakdown.')}</p>
              </div>
              <span class="mini-badge" style="font-size:10px;">${filteredProjects.length} ${choose('مشاريع', 'projects')}</span>
            </div>

            <!-- Visual Multi-segment Distribution Bar -->
            <div style="margin:8px 0 16px;">
              <div style="display:flex;height:10px;border-radius:6px;overflow:hidden;background:var(--line);">
                <div style="width:${onTrackPercent}%;background:var(--mint-strong);" title="${choose('على المسار', 'On Track')}: ${onTrackProjectsCount}"></div>
                <div style="width:${atRiskPercent}%;background:var(--amber);" title="${choose('يحتاج انتباه', 'At Risk')}: ${atRiskProjectsCount}"></div>
                <div style="width:${offTrackPercent}%;background:var(--red);" title="${choose('متأخر', 'Off Track')}: ${offTrackProjectsCount}"></div>
                <div style="width:${completedPercent}%;background:var(--teal);" title="${choose('مكتمل', 'Completed')}: ${completedProjectsCount}"></div>
              </div>
            </div>

            <div class="report-stat-list">
              <div class="report-stat">
                <span style="display:flex;align-items:center;gap:6px;">
                  <span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:var(--mint-strong);"></span>
                  ${t('onTrack')}
                </span>
                <strong style="color:var(--mint-strong)">${onTrackProjectsCount}</strong>
              </div>
              <div class="report-stat">
                <span style="display:flex;align-items:center;gap:6px;">
                  <span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:var(--amber);"></span>
                  ${t('atRisk')}
                </span>
                <strong style="color:var(--amber)">${atRiskProjectsCount}</strong>
              </div>
              <div class="report-stat">
                <span style="display:flex;align-items:center;gap:6px;">
                  <span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:var(--red);"></span>
                  ${t('offTrack')}
                </span>
                <strong style="color:var(--red)">${offTrackProjectsCount}</strong>
              </div>
              <div class="report-stat">
                <span style="display:flex;align-items:center;gap:6px;">
                  <span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:var(--teal);"></span>
                  ${t('completed')}
                </span>
                <strong style="color:var(--teal)">${completedProjectsCount}</strong>
              </div>
            </div>
          </section>

          <!-- Task Workflow Phases Pulse -->
          <section class="panel">
            <div class="panel-head">
              <div>
                <h2 class="panel-title">${choose('مراحل دورة عمل المهام', 'Task Workflow Stages')}</h2>
                <p class="panel-subtitle">${choose('توزيع المهام النشطة حسب الحالة التشغيلية.', 'Active task distribution by stage.')}</p>
              </div>
            </div>
            <div class="report-stat-list">
              <div class="report-stat">
                <span style="display:flex;align-items:center;gap:7px;"><span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:var(--blue);flex-shrink:0;"></span>${choose('قيد التنفيذ النشط', 'In Progress')}</span>
                <strong style="color:var(--blue)">${inProgressTasksCount}</strong>
              </div>
              <div class="report-stat">
                <span style="display:flex;align-items:center;gap:7px;"><span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:var(--amber);flex-shrink:0;"></span>${choose('قيد المراجعة والاعتماد', 'Under Review & Approval')}</span>
                <strong style="color:var(--amber)">${inReviewTasksCount}</strong>
              </div>
              <div class="report-stat">
                <span style="display:flex;align-items:center;gap:7px;"><span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:var(--mint-strong);flex-shrink:0;"></span>${choose('مهام مكتملة', 'Completed')}</span>
                <strong style="color:var(--mint-strong)">${completedTasksCount}</strong>
              </div>
              ${blockedTasksCount > 0 ? `
                <div class="report-stat">
                  <span style="display:flex;align-items:center;gap:7px;"><span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:var(--red);flex-shrink:0;"></span>${choose('مهام متوقفة / محجوبة', 'Blocked Tasks')}</span>
                  <strong style="color:var(--red)">${blockedTasksCount}</strong>
                </div>
              ` : ''}
            </div>
          </section>
        </div>
      </div>
    </div>
  `;
}

function renderDisciplinesTab(disciplines, totalTasksCount) {
  return `
    <div class="panel">
      <div class="panel-head">
        <div>
          <h2 class="panel-title">${choose('التحليل التفصيلي للأقسام والتخصصات الهندسية', 'Engineering Disciplines & Deliverables Breakdown')}</h2>
          <p class="panel-subtitle">${choose('إحصائيات الإنجاز والوزن التراكمي ومخرجات كل قسم تخصصي في المحفظة.', 'Detailed progress, weighted impact, and deliverable health for every discipline.')}</p>
        </div>
        <button class="btn btn-soft btn-sm" data-action="export-disciplines-excel">
          ${icon('document', 14)} ${choose('تصدير التخصصات (Excel)', 'Export Disciplines (Excel)')}
        </button>
      </div>

      <div class="table-wrap">
        <table class="data-table">
          <thead>
            <tr>
              <th>${choose('التخصص الهندسي', 'Engineering Discipline')}</th>
              <th>${choose('إجمالي المخرجات', 'Total Deliverables')}</th>
              <th>${choose('المكتمل', 'Done')}</th>
              <th>${choose('نسبة الإنجاز', 'Completion Rate')}</th>
              <th>${choose('الوزن النسبي', 'Weight Share')}</th>
              <th>${choose('الحالة', 'Discipline Health')}</th>
            </tr>
          </thead>
          <tbody>
            ${disciplines.length ? disciplines.map(d => {
              const weightPercent = totalTasksCount ? Math.round((d.total / totalTasksCount) * 100) : 0;
              const isHealthy = d.overdue === 0 && d.percentage >= 50;
              const hasAlert = d.overdue > 0;

              return `
                <tr>
                  <td>
                    <div style="display:flex;align-items:center;gap:10px;">
                      <span class="discipline-icon-badge" style="width:32px;height:32px;border-radius:8px;background:var(--mint);color:var(--teal);display:grid;place-items:center;flex-shrink:0;">
                        ${getDisciplineIcon(d.name, 16)}
                      </span>
                      <div>
                        <strong style="font-size:13px;color:var(--ink);display:block;">${esc(d.name)}</strong>
                        <span style="font-size:11px;color:var(--muted);">${d.total} ${choose('مخرج مسجل', 'deliverables')}</span>
                      </div>
                    </div>
                  </td>
                  <td style="font-weight:700;font-size:13px;">${d.total}</td>
                  <td style="color:var(--mint-strong);font-weight:700;">${d.done}</td>
                  <td>
                    <div style="display:flex;align-items:center;gap:8px;min-width:140px;">
                      <div style="flex:1;height:6px;background:var(--line);border-radius:3px;overflow:hidden;">
                        <div style="height:100%;width:${d.percentage}%;background:${d.percentage === 100 ? 'var(--mint-strong)' : 'var(--brand-teal)'};"></div>
                      </div>
                      <strong style="font-size:12px;">${d.percentage}%</strong>
                    </div>
                  </td>
                  <td style="font-size:12px;color:var(--ink-soft);">${weightPercent}%</td>
                  <td>
                    <span class="badge ${hasAlert ? 'badge-red' : isHealthy ? 'badge-teal' : 'badge-amber'}" style="font-size:11px;font-weight:700;display:inline-flex;align-items:center;gap:4px;">
                      ${hasAlert ? `${icon('alert', 12)} ${d.overdue} ${choose('متأخرة', 'overdue')}` : isHealthy ? `${icon('check', 12)} ${choose('ممتاز', 'On Track')}` : `${icon('clock', 12)} ${choose('جارٍ التنفيذ', 'Active')}`}
                    </span>
                  </td>
                </tr>
              `;
            }).join('') : `
              <tr>
                <td colspan="6"><div class="empty">${t('noTasks')}</div></td>
              </tr>
            `}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

function renderTeamWorkloadTab(teamWorkload, totalTasksCount) {
  return `
    <div class="panel">
      <div class="panel-head">
        <div>
          <h2 class="panel-title">${choose('مصفوفة كفاءة وضغط فريق العمل', 'Team Capacity & Workload Matrix')}</h2>
          <p class="panel-subtitle">${choose('توزيع المهام النشطة، المكتملة، والمتأخرة ومعدل الضغط لكل عضو في الفريق.', 'Active tasks, completion rate, and workload pressure indicator for each team member.')}</p>
        </div>
        <button class="btn btn-soft btn-sm" data-action="export-team-workload-excel">
          ${icon('document', 14)} ${choose('تصدير حمولة الفريق (Excel)', 'Export Team Load (Excel)')}
        </button>
      </div>

      <div class="table-wrap">
        <table class="data-table">
          <thead>
            <tr>
              <th>${choose('عضو الفريق', 'Team Member')}</th>
              <th>${choose('المسمى / الدور', 'Role')}</th>
              <th>${choose('المهام النشطة', 'Active Load')}</th>
              <th>${choose('المكتملة', 'Completed')}</th>
              <th>${choose('المتأخرة', 'Overdue')}</th>
              <th>${choose('نسبة الإنجاز', 'Progress %')}</th>
              <th>${choose('مستوى الحمولة', 'Capacity Status')}</th>
            </tr>
          </thead>
          <tbody>
            ${teamWorkload.length ? teamWorkload.map(item => {
              const u = item.user;
              const capTag = item.capacity === 'idle'
                ? `<span class="badge" style="background:var(--surface-soft);color:var(--ink-soft);border:1px solid var(--line);display:inline-flex;align-items:center;gap:5px;"><span class="report-status-dot" style="width:6px;height:6px;border-radius:50%;background:var(--mint-strong);"></span>${choose('متاح للمهام', 'Available')}</span>`
                : item.capacity === 'optimal'
                ? `<span class="badge badge-teal" style="display:inline-flex;align-items:center;gap:5px;"><span class="report-status-dot" style="width:6px;height:6px;border-radius:50%;background:var(--teal);"></span>${choose('حمولة متزنة', 'Balanced')}</span>`
                : item.capacity === 'high'
                ? `<span class="badge badge-amber" style="display:inline-flex;align-items:center;gap:5px;"><span class="report-status-dot" style="width:6px;height:6px;border-radius:50%;background:var(--amber);"></span>${choose('حمولة مرتفعة', 'High Load')}</span>`
                : `<span class="badge badge-red" style="display:inline-flex;align-items:center;gap:5px;"><span class="report-status-dot" style="width:6px;height:6px;border-radius:50%;background:var(--red);"></span>${choose('عبء حرج / تأخير', 'Overloaded')}</span>`;

              return `
                <tr>
                  <td>
                    <div style="display:flex;align-items:center;gap:10px;">
                      ${avatar(u, 'mini-avatar')}
                      <div>
                        <strong style="font-size:13px;color:var(--ink);display:block;">${esc(choose(u.name, u.nameEn || u.name))}</strong>
                        <span style="font-size:11px;color:var(--muted);">${esc(u.email || '')}</span>
                      </div>
                    </div>
                  </td>
                  <td style="font-size:12px;color:var(--ink-soft);">${esc(roleName(u))}</td>
                  <td style="font-weight:700;font-size:13px;color:var(--blue);">${item.active}</td>
                  <td style="font-weight:700;font-size:13px;color:var(--mint-strong);">${item.done}</td>
                  <td style="font-weight:700;font-size:13px;color:${item.overdue > 0 ? 'var(--red)' : 'var(--muted)'};">${item.overdue}</td>
                  <td>
                    <div style="display:flex;align-items:center;gap:6px;min-width:100px;">
                      <div style="flex:1;height:5px;background:var(--line);border-radius:3px;overflow:hidden;">
                        <div style="height:100%;width:${item.progress}%;background:var(--teal);"></div>
                      </div>
                      <span style="font-size:11px;font-weight:700;">${item.progress}%</span>
                    </div>
                  </td>
                  <td>${capTag}</td>
                </tr>
              `;
            }).join('') : `
              <tr>
                <td colspan="7"><div class="empty">${choose('لا يوجد أعضاء مسجلون', 'No members found')}</div></td>
              </tr>
            `}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

function renderRisksTab(overdueTasks, filteredProjects, blockedTasksCount) {
  const atRiskProjects = filteredProjects.filter(p => p.health === 'at_risk' || p.health === 'off_track');

  return `
    <div style="display:flex;flex-direction:column;gap:20px;">
      <!-- Overdue Tasks Register -->
      <div class="panel">
        <div class="panel-head" style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:10px;">
          <div>
            <h2 class="panel-title" style="color:var(--red);display:flex;align-items:center;gap:6px;">
              ${icon('alert', 16)} ${choose('سجل المهام المتأخرة والحرجة', 'Overdue & Critical Tasks Register')} (${overdueTasks.length})
            </h2>
            <p class="panel-subtitle">${choose('قائمة بالمهام التي تجاوزت تاريخ التسليم المعتمد وتتطلب اتخاذ إجراء إداري فوري.', 'List of tasks past approved deadline requiring immediate managerial intervention.')}</p>
          </div>
          <button class="btn btn-soft btn-sm" data-action="export-risks-excel">
            ${icon('document', 14)} ${choose('تصدير قائمة المخاطر (Excel)', 'Export Risks (Excel)')}
          </button>
        </div>

        <div class="table-wrap">
          <table class="data-table">
            <thead>
              <tr>
                <th>${choose('اسم المهمة / المخرج', 'Task / Deliverable')}</th>
                <th>${choose('المشروع', 'Project')}</th>
                <th>${choose('المسؤول / المكلف', 'Assignee')}</th>
                <th>${choose('الأولوية', 'Priority')}</th>
                <th>${choose('تاريخ الاستحقاق', 'Due Date')}</th>
                <th>${choose('مدة التأخير', 'Days Overdue')}</th>
                <th style="text-align:end;">${choose('الإجراء', 'Action')}</th>
              </tr>
            </thead>
            <tbody>
              ${overdueTasks.length ? overdueTasks.map(t => {
                const days = getDaysOverdue(t.dueDate);
                const proj = (state.data?.projects || []).find(p => p.id === t.projectId);
                const assigneeName = t.assignee ? choose(t.assignee.name, t.assignee.nameEn || t.assignee.name) : '—';

                return `
                  <tr>
                    <td>
                      <strong style="display:block;font-size:13px;color:var(--ink);">${esc(choose(t.titleAr, t.titleEn))}</strong>
                      <span style="font-size:10.5px;color:var(--muted);">${esc(t.templateId || choose('مخرج مخصص', 'Custom Deliverable'))}</span>
                    </td>
                    <td>
                      <span class="badge badge-teal" style="font-size:10.5px;">${esc(proj ? proj.code : '—')}</span>
                      <span style="font-size:11px;color:var(--ink);margin-inline-start:4px;">${esc(proj ? choose(proj.nameAr, proj.nameEn) : '—')}</span>
                    </td>
                    <td>${esc(assigneeName)}</td>
                    <td>
                      <span class="badge ${t.priority === 'urgent' ? 'badge-red' : t.priority === 'high' ? 'badge-amber' : 'badge-blue'}" style="font-size:10.5px;">
                        ${esc(statusText(t.priority || 'medium'))}
                      </span>
                    </td>
                    <td style="font-size:12px;color:var(--ink);">${dateLabel(t.dueDate, true)}</td>
                    <td>
                      <span class="badge badge-red" style="font-weight:700;font-size:11px;display:inline-flex;align-items:center;gap:4px;">
                        ${icon('clock', 12)} ${days} ${choose('يوم تأخير', 'days late')}
                      </span>
                    </td>
                    <td style="text-align:end;">
                      <button class="btn btn-soft btn-xs" data-action="open-task" data-task-id="${esc(t.id)}">
                        ${icon('edit', 12)} ${choose('متابعة', 'Review')}
                      </button>
                    </td>
                  </tr>
                `;
              }).join('') : `
                <tr>
                  <td colspan="7">
                    <div class="empty" style="padding:28px 10px;">
                      <span style="width:44px;height:44px;border-radius:12px;background:var(--mint);color:var(--teal);display:grid;place-items:center;margin:0 auto 10px;">${icon('check', 22)}</span>
                      <strong style="color:var(--mint-strong);font-size:14px;margin-top:4px;">${choose('ممتاز! لا توجد أي مهام متأخرة في المحفظة حالياً.', 'Excellent! Zero overdue tasks in portfolio.')}</strong>
                      <span style="font-size:11px;color:var(--muted);">${choose('كافة مخرجات ومواعيد التسليم على المسار الصحيح.', 'All schedules and milestones are currently on track.')}</span>
                    </div>
                  </td>
                </tr>
              `}
            </tbody>
          </table>
        </div>
      </div>

      <!-- At Risk Projects Overview -->
      <div class="panel">
        <div class="panel-head">
          <div>
            <h2 class="panel-title">${choose('المشاريع ذات المخاطر والانحراف', 'Projects Requiring Escalation')} (${atRiskProjects.length})</h2>
            <p class="panel-subtitle">${choose('مشاريع بحاجة لدعم إداري لتلافي تفاقم التأخير.', 'Projects needing attention to prevent deadline slippage.')}</p>
          </div>
        </div>
        <div class="table-wrap">
          <table class="data-table">
            <thead>
              <tr>
                <th>${choose('رمز المشروع', 'Code')}</th>
                <th>${choose('اسم المشروع', 'Project Name')}</th>
                <th>${choose('العميل', 'Client')}</th>
                <th>${choose('مدير المشروع', 'Manager')}</th>
                <th>${choose('الحالة', 'Status')}</th>
                <th>${choose('نسبة الإنجاز', 'Progress')}</th>
                <th>${choose('تاريخ التسليم', 'Due Date')}</th>
                <th style="text-align:end;">${choose('فتح المشروع', 'Open')}</th>
              </tr>
            </thead>
            <tbody>
              ${atRiskProjects.length ? atRiskProjects.map(p => `
                <tr>
                  <td><strong style="color:var(--brand-teal);">${esc(p.code)}</strong></td>
                  <td><strong>${esc(choose(p.nameAr, p.nameEn))}</strong></td>
                  <td>${esc(choose(p.clientAr, p.clientEn)) || '—'}</td>
                  <td>${esc(p.manager ? choose(p.manager.name, p.manager.nameEn || p.manager.name) : '—')}</td>
                  <td><span class="status-badge ${esc(p.health)}">${esc(statusText(p.health))}</span></td>
                  <td><strong>${p.progress || 0}%</strong></td>
                  <td>${dateLabel(p.dueDate, true)}</td>
                  <td style="text-align:end;">
                    <button class="btn btn-soft btn-xs" data-action="open-project" data-project-id="${esc(p.id)}" style="display:inline-flex;align-items:center;gap:4px;">
                      <span>${choose('عرض', 'View')}</span> ${icon('chevron', 12)}
                    </button>
                  </td>
                </tr>
              `).join('') : `
                <tr>
                  <td colspan="8"><div class="empty">${choose('كافة المشاريع تسير على المسار المعتمد دون تعثر.', 'All projects are proceeding on track.')}</div></td>
                </tr>
              `}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;
}

function renderDrawingsSubmittalsTab(filteredDocs, filteredProjects) {
  const approved = filteredDocs.filter(d => d.status === 'approved');
  const review = filteredDocs.filter(d => d.status === 'review' || d.status === 'approval');
  const drafts = filteredDocs.filter(d => !d.status || d.status === 'draft');
  const superseded = filteredDocs.filter(d => d.status === 'superseded');

  return `
    <div style="display:flex;flex-direction:column;gap:20px;">
      <!-- Document Status Cards -->
      <div class="metrics-grid">
        <article class="metric-card teal">
          <div class="metric-top"><span class="metric-label">${choose('مخططات معتمدة', 'Approved Drawings')}</span><span style="color:var(--teal);">${icon('check', 16)}</span></div>
          <div class="metric-value">${approved.length}</div>
          <span class="metric-note up">${choose('جاهزة للتنفيذ', 'Ready for construction')}</span>
        </article>
        <article class="metric-card amber">
          <div class="metric-top"><span class="metric-label">${choose('قيد المراجعة الفنية', 'Under Review')}</span><span style="color:var(--amber);">${icon('eye', 16)}</span></div>
          <div class="metric-value">${review.length}</div>
          <span class="metric-note alert">${choose('بانتظار موافقة المهندس', 'Awaiting engineer approval')}</span>
        </article>
        <article class="metric-card blue">
          <div class="metric-top"><span class="metric-label">${choose('مسودات وتعديلات', 'Drafts / Revisions')}</span><span style="color:var(--blue);">${icon('edit', 16)}</span></div>
          <div class="metric-value">${drafts.length}</div>
          <span class="metric-note">${choose('عمل جارٍ', 'Work in progress')}</span>
        </article>
        <article class="metric-card red">
          <div class="metric-top"><span class="metric-label">${choose('مخططات ملغاة / مستبدلة', 'Superseded')}</span><span style="color:var(--red);">${icon('archive', 16)}</span></div>
          <div class="metric-value">${superseded.length}</div>
          <span class="metric-note">${choose('إصدارات سابقة مؤرشفة', 'Archived previous revisions')}</span>
        </article>
      </div>

      <!-- Drawings Register Table -->
      <div class="panel">
        <div class="panel-head">
          <div>
            <h2 class="panel-title">${choose('سجل المخططات والمستندات الهندسية (Drawings Register)', 'Drawings & Blueprints Submittals Register')} (${filteredDocs.length})</h2>
            <p class="panel-subtitle">${choose('قائمة المخططات الهندسية المعتمدة والمرفوعة مع الحجم، الحالة، وإمكانية المعاينة.', 'Registered engineering blueprints, upload status, revisions, and direct preview.')}</p>
          </div>
          <button class="btn btn-soft btn-sm" data-action="export-drawings-excel">
            ${icon('document', 14)} ${choose('تصدير السجل (Excel)', 'Export Register (Excel)')}
          </button>
        </div>

        <div class="table-wrap">
          <table class="data-table">
            <thead>
              <tr>
                <th>${choose('اسم المخطط / الملف', 'File / Blueprint Name')}</th>
                <th>${choose('المشروع', 'Project')}</th>
                <th>${choose('الحالة', 'Status')}</th>
                <th>${choose('الحجم', 'Size')}</th>
                <th>${choose('تاريخ الرفع', 'Date')}</th>
                <th style="text-align:end;">${choose('المعاينة والتحميل', 'Actions')}</th>
              </tr>
            </thead>
            <tbody>
              ${filteredDocs.length ? filteredDocs.map(doc => {
                const proj = filteredProjects.find(p => p.id === doc.projectId);
                const sizeMB = doc.size > 1024 * 1024
                  ? (doc.size / (1024 * 1024)).toFixed(1) + ' MB'
                  : Math.round((doc.size || 0) / 1024) + ' KB';

                return `
                  <tr>
                    <td>
                      <div style="display:flex;align-items:center;gap:8px;cursor:pointer;" data-action="preview-doc" data-doc-id="${esc(doc.id)}">
                        <span style="color:var(--brand-teal);">${icon('document', 16)}</span>
                        <div>
                          <strong style="display:block;font-size:13px;color:var(--ink);">${esc(doc.originalName || doc.name || 'Drawing.pdf')}</strong>
                          <span style="font-size:10.5px;color:var(--muted);">${esc(doc.mimeType || 'application/pdf')}</span>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span class="badge badge-teal" style="font-size:10.5px;">${esc(proj ? proj.code : '—')}</span>
                      <span style="font-size:11px;color:var(--ink);margin-inline-start:4px;">${esc(proj ? choose(proj.nameAr, proj.nameEn) : '—')}</span>
                    </td>
                    <td>
                      <span class="status-badge ${esc(doc.status || 'draft')}">
                        ${esc(statusText(doc.status || 'draft'))}
                      </span>
                    </td>
                    <td style="font-size:12px;color:var(--ink-soft);">${sizeMB}</td>
                    <td style="font-size:12px;color:var(--ink-soft);">${dateLabel(doc.createdAt, true)}</td>
                    <td style="text-align:end;">
                      <div style="display:inline-flex;gap:4px;">
                        <button class="btn btn-ghost btn-sm" data-action="preview-doc" data-doc-id="${esc(doc.id)}" title="${choose('معاينة', 'Preview')}">
                          ${icon('eye', 14)}
                        </button>
                        <button class="btn btn-ghost btn-sm" data-action="download-doc" data-doc-id="${esc(doc.id)}" style="color:var(--blue);" title="${choose('تحميل', 'Download')}">
                          ${icon('download', 14)}
                        </button>
                      </div>
                    </td>
                  </tr>
                `;
              }).join('') : `
                <tr>
                  <td colspan="6"><div class="empty">${choose('لا توجد مخططات مرفوعة مطابقة للفلتر المحدد.', 'No uploaded drawings matching current filter.')}</div></td>
                </tr>
              `}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;
}

export function exportDisciplinesExcel() {
  if (!can('export_reports') && !isAdmin()) {
    showToast(t('permissionDenied'), true);
    return;
  }
  const { projects = [], tasks = [] } = state.data || {};
  const projectFilter = state.reportProjectFilter || 'all';
  const timeframeFilter = state.reportTimeframe || 'all';

  const filteredTasks = getReportFilteredTasks(tasks, projectFilter, timeframeFilter);
  const disciplines = computeDisciplinesBreakdown(filteredTasks);

  if (!disciplines.length) {
    showToast(choose('لا توجد بيانات تخصصات لتصديرها.', 'No discipline data to export.'), true);
    return;
  }

  const branding = getCompanyBranding();
  const projectName = projectFilter === 'all'
    ? choose('كافة مشاريع المحفظة', 'All Portfolio Projects')
    : projects.find(p => p.id === projectFilter)?.nameAr || projectFilter;

  const html = `
    <table>
      <tr><th colspan="6" class="title">${sanitizeForSpreadsheet(branding.displayName)} - ${choose('تقرير تحليل التخصصات الهندسية والمخرجات', 'Engineering Disciplines & Deliverables Report')}</th></tr>
      <tr><td colspan="6" class="subtitle">${choose('نطاق المشروع:', 'Project Scope:')} ${sanitizeForSpreadsheet(projectName)} | ${choose('الفترة:', 'Timeframe:')} ${sanitizeForSpreadsheet(timeframeFilter)}</td></tr>
      <tr><td colspan="6" class="meta">${choose('تاريخ التصدير:', 'Export Date:')} ${formatReportDate(new Date())} ${formatReportTime(new Date())}</td></tr>
      <tr>
        <th class="header">${choose('التخصص الهندسي', 'Engineering Discipline')}</th>
        <th class="header">${choose('إجمالي المخرجات', 'Total Deliverables')}</th>
        <th class="header">${choose('المكتمل', 'Done')}</th>
        <th class="header">${choose('نسبة الإنجاز', 'Completion Rate')}</th>
        <th class="header">${choose('الحصة من المهام', 'Share')}</th>
        <th class="header">${choose('المهام المتأخرة', 'Overdue Tasks')}</th>
      </tr>
      ${disciplines.map(d => {
        const share = filteredTasks.length ? Math.round((d.total / filteredTasks.length) * 100) : 0;
        return `
          <tr>
            <td>${sanitizeForSpreadsheet(d.name)}</td>
            <td style="text-align:center;">${d.total}</td>
            <td style="text-align:center;">${d.done}</td>
            <td style="text-align:center;">${d.percentage}%</td>
            <td style="text-align:center;">${share}%</td>
            <td style="text-align:center;color:${d.overdue > 0 ? '#dc2626' : '#16a34a'};">${d.overdue}</td>
          </tr>
        `;
      }).join('')}
    </table>
  `;

  exportXLS(`DARC_Disciplines_${Date.now()}`, html);
  showToast(choose('تم تصدير تقرير التخصصات بنجاح.', 'Disciplines report exported successfully.'));
}

export function exportTeamWorkloadExcel() {
  if (!can('export_reports') && !isAdmin()) {
    showToast(t('permissionDenied'), true);
    return;
  }
  const { tasks = [], users = [] } = state.data || {};
  const projectFilter = state.reportProjectFilter || 'all';
  const timeframeFilter = state.reportTimeframe || 'all';

  const filteredTasks = getReportFilteredTasks(tasks, projectFilter, timeframeFilter);
  const teamWorkload = computeTeamWorkload(filteredTasks, users);

  if (!teamWorkload.length) {
    showToast(choose('لا توجد بيانات فريق لتصديرها.', 'No team data to export.'), true);
    return;
  }

  const branding = getCompanyBranding();

  const html = `
    <table>
      <tr><th colspan="7" class="title">${sanitizeForSpreadsheet(branding.displayName)} - ${choose('تقرير أداء وحمولة فريق العمل الهندسي', 'Engineering Team Workload & Capacity Report')}</th></tr>
      <tr><td colspan="7" class="subtitle">${choose('إجمالي أعضاء الفريق:', 'Total Members:')} ${teamWorkload.length} | ${choose('المهام الإجمالية:', 'Total Tasks:')} ${filteredTasks.length}</td></tr>
      <tr><td colspan="7" class="meta">${choose('تاريخ التصدير:', 'Export Date:')} ${formatReportDate(new Date())} ${formatReportTime(new Date())}</td></tr>
      <tr>
        <th class="header">${choose('عضو الفريق', 'Member Name')}</th>
        <th class="header">${choose('المسمى الوظيفي', 'Job Title')}</th>
        <th class="header">${choose('إجمالي المهام', 'Total Tasks')}</th>
        <th class="header">${choose('المهام النشطة', 'Active')}</th>
        <th class="header">${choose('المكتملة', 'Completed')}</th>
        <th class="header">${choose('المتأخرة', 'Overdue')}</th>
        <th class="header">${choose('حالة الحمولة', 'Capacity')}</th>
      </tr>
      ${teamWorkload.map(row => `
        <tr>
          <td>${sanitizeForSpreadsheet(choose(row.user.name, row.user.nameEn || row.user.name))}</td>
          <td>${sanitizeForSpreadsheet(choose(row.user.jobTitleAr, row.user.jobTitleEn || row.user.jobTitleAr) || '—')}</td>
          <td style="text-align:center;">${row.total}</td>
          <td style="text-align:center;">${row.active}</td>
          <td style="text-align:center;color:#16a34a;">${row.done}</td>
          <td style="text-align:center;color:${row.overdue > 0 ? '#dc2626' : '#16a34a'};">${row.overdue}</td>
          <td style="text-align:center;">${sanitizeForSpreadsheet(row.capacityLabel)}</td>
        </tr>
      `).join('')}
    </table>
  `;

  exportXLS(`DARC_Team_Workload_${Date.now()}`, html);
  showToast(choose('تم تصدير تقرير حمولة الفريق بنجاح.', 'Team workload report exported successfully.'));
}

export function exportRisksExcel() {
  if (!can('export_reports') && !isAdmin()) {
    showToast(t('permissionDenied'), true);
    return;
  }
  const { projects = [], tasks = [] } = state.data || {};
  const projectFilter = state.reportProjectFilter || 'all';

  const filteredTasks = getReportFilteredTasks(tasks, projectFilter, 'all');

  const overdueTasks = filteredTasks.filter(isOverdue);
  const atRiskProjects = (projectFilter === 'all' ? projects : projects.filter(p => p.id === projectFilter))
    .filter(p => p.health === 'at_risk' || p.health === 'off_track');

  if (!overdueTasks.length && !atRiskProjects.length) {
    showToast(choose('لا توجد مهام أو مشاريع متأخرة حالياً لتصديرها.', 'No overdue tasks or at-risk projects to export.'));
    return;
  }

  const branding = getCompanyBranding();

  const html = `
    <table>
      <tr><th colspan="7" class="title">${sanitizeForSpreadsheet(branding.displayName)} - ${choose('سجل المخاطر والتأخيرات الهندسية (Risk & Delay Register)', 'Engineering Risk & Delay Register')}</th></tr>
      <tr><td colspan="7" class="meta">${choose('تاريخ التصدير:', 'Export Date:')} ${formatReportDate(new Date())} ${formatReportTime(new Date())}</td></tr>
      
      <!-- Section 1: Overdue Tasks -->
      <tr><th colspan="7" class="header" style="background:#fecaca;color:#991b1b;font-size:14px;">${choose('المهام والمخرجات المتأخرة عن موعدها', 'Overdue Deliverables & Tasks')} (${overdueTasks.length})</th></tr>
      <tr>
        <th class="header">${choose('المهمة / المخرج', 'Deliverable')}</th>
        <th class="header">${choose('رمز المشروع', 'Project Code')}</th>
        <th class="header">${choose('المشروع', 'Project Name')}</th>
        <th class="header">${choose('المسؤول', 'Assignee')}</th>
        <th class="header">${choose('الأولوية', 'Priority')}</th>
        <th class="header">${choose('تاريخ الاستحقاق', 'Due Date')}</th>
        <th class="header">${choose('أيام التأخير', 'Days Overdue')}</th>
      </tr>
      ${overdueTasks.map(t => {
        const proj = projects.find(p => p.id === t.projectId);
        const days = getDaysOverdue(t.dueDate);
        const assignee = t.assignee ? choose(t.assignee.name, t.assignee.nameEn || t.assignee.name) : '—';
        return `
          <tr>
            <td>${sanitizeForSpreadsheet(choose(t.titleAr, t.titleEn))}</td>
            <td style="text-align:center;">${sanitizeForSpreadsheet(proj?.code || '—')}</td>
            <td>${sanitizeForSpreadsheet(proj ? choose(proj.nameAr, proj.nameEn) : '—')}</td>
            <td>${sanitizeForSpreadsheet(assignee)}</td>
            <td style="text-align:center;">${sanitizeForSpreadsheet(statusText(t.priority || 'medium'))}</td>
            <td style="text-align:center;">${dateLabel(t.dueDate, true)}</td>
            <td style="text-align:center;color:#dc2626;font-weight:bold;">${days}</td>
          </tr>
        `;
      }).join('')}

      <!-- Section 2: At-Risk Projects -->
      <tr><td colspan="7" style="height:16px;"></td></tr>
      <tr><th colspan="7" class="header" style="background:#fed7aa;color:#9a3412;font-size:14px;">${choose('المشاريع ذات المخاطر والانحراف', 'Projects Requiring Management Escalation')} (${atRiskProjects.length})</th></tr>
      <tr>
        <th class="header">${choose('رمز المشروع', 'Project Code')}</th>
        <th class="header" colspan="2">${choose('اسم المشروع', 'Project Name')}</th>
        <th class="header">${choose('العميل', 'Client')}</th>
        <th class="header">${choose('مدير المشروع', 'Manager')}</th>
        <th class="header">${choose('الحالة', 'Status')}</th>
        <th class="header">${choose('الإنجاز', 'Progress')}</th>
      </tr>
      ${atRiskProjects.map(p => `
        <tr>
          <td style="text-align:center;font-weight:bold;">${sanitizeForSpreadsheet(p.code)}</td>
          <td colspan="2">${sanitizeForSpreadsheet(choose(p.nameAr, p.nameEn))}</td>
          <td>${sanitizeForSpreadsheet(choose(p.clientAr, p.clientEn) || '—')}</td>
          <td>${sanitizeForSpreadsheet(p.manager ? choose(p.manager.name, p.manager.nameEn || p.manager.name) : '—')}</td>
          <td style="text-align:center;color:${p.health === 'off_track' ? '#dc2626' : '#d97706'};">${sanitizeForSpreadsheet(statusText(p.health))}</td>
          <td style="text-align:center;">${p.progress}%</td>
        </tr>
      `).join('')}
    </table>
  `;

  exportXLS(`DARC_Risks_Register_${Date.now()}`, html);
  showToast(choose('تم تصدير سجل المخاطر بنجاح.', 'Risk register exported successfully.'));
}

export function exportDrawingsExcel() {
  if (!can('export_reports') && !isAdmin()) {
    showToast(t('permissionDenied'), true);
    return;
  }
  const { projects = [], documents = [] } = state.data || {};
  const projectFilter = state.reportProjectFilter || 'all';

  const filteredDocs = projectFilter === 'all'
    ? (documents || []).filter(d => !d.deletedAt)
    : (documents || []).filter(d => d.projectId === projectFilter && !d.deletedAt);

  if (!filteredDocs.length) {
    showToast(choose('لا توجد مخططات مرفوعة لتصديرها.', 'No drawings to export.'), true);
    return;
  }

  const branding = getCompanyBranding();
  const projectName = projectFilter === 'all'
    ? choose('كافة مشاريع المحفظة', 'All Portfolio Projects')
    : projects.find(p => p.id === projectFilter)?.nameAr || projectFilter;

  const html = `
    <table>
      <tr><th colspan="6" class="title">${sanitizeForSpreadsheet(branding.displayName)} - ${choose('سجل المخططات والمستندات الهندسية (Drawings Register)', 'Drawings & Blueprints Submittals Register')}</th></tr>
      <tr><td colspan="6" class="subtitle">${choose('نطاق المشروع:', 'Project Scope:')} ${sanitizeForSpreadsheet(projectName)} | ${choose('إجمالي المخططات:', 'Total Blueprints:')} ${filteredDocs.length}</td></tr>
      <tr><td colspan="6" class="meta">${choose('تاريخ التصدير:', 'Export Date:')} ${formatReportDate(new Date())} ${formatReportTime(new Date())}</td></tr>
      <tr>
        <th class="header">${choose('اسم المخطط / الملف', 'File / Blueprint Name')}</th>
        <th class="header">${choose('رمز المشروع', 'Project Code')}</th>
        <th class="header">${choose('اسم المشروع', 'Project Name')}</th>
        <th class="header">${choose('الحالة', 'Status')}</th>
        <th class="header">${choose('حجم الملف', 'Size')}</th>
        <th class="header">${choose('تاريخ الرفع', 'Upload Date')}</th>
      </tr>
      ${filteredDocs.map(doc => {
        const proj = projects.find(p => p.id === doc.projectId);
        const sizeMB = doc.size > 1024 * 1024
          ? (doc.size / (1024 * 1024)).toFixed(1) + ' MB'
          : Math.round((doc.size || 0) / 1024) + ' KB';

        return `
          <tr>
            <td>${sanitizeForSpreadsheet(doc.originalName || doc.name || 'Drawing.pdf')}</td>
            <td style="text-align:center;">${sanitizeForSpreadsheet(proj?.code || '—')}</td>
            <td>${sanitizeForSpreadsheet(proj ? choose(proj.nameAr, proj.nameEn) : '—')}</td>
            <td style="text-align:center;">${sanitizeForSpreadsheet(statusText(doc.status || 'draft'))}</td>
            <td style="text-align:center;">${sizeMB}</td>
            <td style="text-align:center;">${dateLabel(doc.createdAt, true)}</td>
          </tr>
        `;
      }).join('')}
    </table>
  `;

  exportXLS(`DARC_Drawings_Register_${Date.now()}`, html);
  showToast(choose('تم تصدير سجل المخططات بنجاح.', 'Drawings register exported successfully.'));
}
