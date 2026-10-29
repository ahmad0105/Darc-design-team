
import { state } from '../../core/state.js';
import { api } from '../../core/api.js';
import { getTaskStatusStyle, esc, choose, avatar, icon, can, isAdmin, t, statusText, formatDateTime, getActiveCalendarSystem } from '../../core/utils.js';
import { showToast, modalShell, closeModal } from '../../shared/ui.js';

export function renderTaskAssignees(task) {
  const users = state.data?.users || [];
  const userMap = state._userMap || new Map(users.map(u => [u.id, u]));
  const primaryUser = task.assignee || userMap.get(task.assigneeId);
  const additionalIds = task.customFields?.additionalAssignees || task.customFields?.additional_assignees || [];
  const additionalUsers = additionalIds.map(id => userMap.get(id)).filter(Boolean);
  const externalNames = task.customFields?.externalAssignees || task.customFields?.external_assignees || [];

  let html = '<div class="task-assignees-wrap" style="display:flex;align-items:center;gap:6px;flex-wrap:wrap;">';

  if (primaryUser || additionalUsers.length) {
    html += '<div class="avatar-stack" style="display:flex;align-items:center;">';
    if (primaryUser) {
      html += `<span title="${esc(choose(primaryUser.name, primaryUser.nameEn || primaryUser.name))}">${avatar(primaryUser, 'mini-avatar')}</span>`;
    }
    additionalUsers.slice(0, 2).forEach(u => {
      html += `<span title="${esc(choose(u.name, u.nameEn || u.name))}" style="margin-inline-start:-8px;">${avatar(u, 'mini-avatar')}</span>`;
    });
    if (additionalUsers.length > 2) {
      html += `<span class="avatar-more" style="margin-inline-start:-8px;background:var(--surface-soft);border:1px solid var(--line);border-radius:50%;width:22px;height:22px;display:inline-grid;place-items:center;font-size:9px;font-weight:bold;color:var(--ink-soft);" title="${additionalUsers.slice(2).map(u => choose(u.name, u.nameEn || u.name)).join('، ')}">+${additionalUsers.length - 2}</span>`;
    }
    html += '</div>';
    if (primaryUser) {
      html += `<span class="task-primary-name" style="font-size:11px;color:var(--ink-soft);">${esc(choose(primaryUser.name, primaryUser.nameEn || primaryUser.name))}</span>`;
    }
  } else if (!externalNames.length) {
    html += `<span class="task-unassigned" style="font-size:11px;color:var(--muted);">—</span>`;
  }

  if (externalNames.length) {
    externalNames.slice(0, 2).forEach(name => {
      html += `<span class="external-assignee-badge" style="font-size:10px;padding:2px 6px;border-radius:6px;background:var(--amber-soft);color:var(--amber);border:1px solid rgba(199,131,52,0.25);display:inline-flex;align-items:center;gap:3px;" title="${esc(name)}">🌐 ${esc(name)} <small style="opacity:0.8">(${choose('خارجي', 'Ext')})</small></span>`;
    });
    if (externalNames.length > 2) {
      html += `<span style="font-size:10px;color:var(--amber);" title="${externalNames.slice(2).map(esc).join('، ')}">+${externalNames.length - 2}</span>`;
    }
  }

  html += '</div>';
  return html;
}

export function taskCard(task) {
  const overdue = isOverdue(task);
  const overdueBadge = overdue
    ? `<span class="overdue-tag" style="display:inline-flex;align-items:center;gap:3px;color:var(--red);background:var(--red-soft);padding:2px 6px;border-radius:4px;font-size:10px;font-weight:600;">${icon('alert', 11)} ${t('overdue')}</span>`
    : '';

  const commentCount = state._commentCounts ? (state._commentCounts[task.id] || 0) : (state.data?.comments || []).filter(c => c.taskId === task.id).length;
  const docCount = state._docCounts ? (state._docCounts[task.id] || 0) : (state.data?.documents || []).filter(d => d.taskId === task.id).length;

  const barColor = task.progress === 100
    ? 'var(--mint-strong)'
    : task.progress >= 80
      ? 'var(--amber)'
      : task.progress > 0
        ? 'var(--blue)'
        : 'var(--line)';

  const canEditTask = isAdmin() || can('edit_tasks') || (task.assigneeId === state.data?.user?.id);

  return `<article class="task-card ${overdue ? 'is-overdue' : ''} ${!canEditTask ? 'not-draggable' : ''}" draggable="${canEditTask ? 'true' : 'false'}" data-action="open-task" data-task-id="${esc(task.id)}">
    <div class="task-card-top">
      <span class="task-code">${esc(task.templateId ? task.templateId.replace('tpl-', '#') : '#CUSTOM')}</span>
      <div style="display:flex;align-items:center;gap:6px;">
        ${task._isOfflinePending ? `<span class="badge badge-amber" style="font-size:9px;padding:1px 5px;" title="${choose('بانتظار المزامنة مع السيرفر', 'Pending cloud sync')}">⏳ ${choose('معلقة', 'Pending')}</span>` : ''}
        ${commentCount > 0 ? `<span style="font-size:10px;color:var(--muted);display:inline-flex;align-items:center;gap:2px;" title="${commentCount} ${choose('تعليقات', 'comments')}">💬 ${commentCount}</span>` : ''}
        ${docCount > 0 ? `<span style="font-size:10px;color:var(--muted);display:inline-flex;align-items:center;gap:2px;" title="${docCount} ${choose('مرفقات', 'attachments')}">📎 ${docCount}</span>` : ''}
        ${overdueBadge}
        <span class="priority-badge ${esc(task.priority)}">${esc(priorityText(task.priority))}</span>
      </div>
    </div>
    <h4>${esc(choose(task.titleAr, task.titleEn))}</h4>
    ${(() => {
      const rawDesc = String(choose(task.descriptionAr || task.description, task.descriptionEn || task.description) || '').trim();
      if (!rawDesc) return '';
      const snippet = rawDesc.length > 50 ? rawDesc.substring(0, 50).trim() + '...' : rawDesc;
      return `<p class="task-card-desc" style="margin:3px 0 8px;font-size:11px;color:var(--ink-soft);line-height:1.45;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;word-break:break-word;" title="${esc(rawDesc)}">${esc(snippet)}</p>`;
    })()}
    <div class="task-meta-row" style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px;font-size:10px;color:var(--ink-soft);">
      <span class="task-category">${esc(choose(task.categoryAr, task.categoryEn) || '')}</span>
      ${task.dueDate ? `<span style="display:inline-flex;align-items:center;gap:3px;color:${overdue ? 'var(--red)' : 'var(--muted)'};">${icon('calendar', 11)} ${dateLabel(task.dueDate)}</span>` : ''}
    </div>
    <div class="task-card-foot">
      ${renderTaskAssignees(task)}
      <span class="task-progress" style="font-size:11px;font-weight:700;color:${task.progress === 100 ? 'var(--mint-strong)' : 'var(--teal)'};">${task.progress}%</span>
    </div>
    <!-- Mini progress bar -->
    <div class="task-card-mini-bar" style="height:3px;background:var(--line);border-radius:2px;overflow:hidden;margin-top:8px;">
      <div style="height:100%;width:${task.progress}%;background:${barColor};border-radius:2px;transition:width .3s;"></div>
    </div>
  </article>`;
}

export function getTaskSortOrder(task) {
  if (!task) return 999999;
  if (typeof task.sortOrder === 'number') return task.sortOrder;
  if (typeof task.sort_order === 'number') return task.sort_order;
  if (task.customFields) {
    if (typeof task.customFields.sortOrder === 'number') return task.customFields.sortOrder;
    if (typeof task.customFields.sort_order === 'number') return task.customFields.sort_order;
  }
  if (task.custom_fields) {
    if (typeof task.custom_fields.sortOrder === 'number') return task.custom_fields.sortOrder;
    if (typeof task.custom_fields.sort_order === 'number') return task.custom_fields.sort_order;
  }
  return 999999;
}

export function sortTasksByImportance(tasks = []) {
  const priorityRank = {
    urgent: 4,
    high: 3,
    medium: 2,
    low: 1
  };

  const now = Date.now();

  return [...tasks].sort((a, b) => {
    // 1. Blocked status (needs immediate attention)
    const aBlocked = a.status === 'blocked' ? 1 : 0;
    const bBlocked = b.status === 'blocked' ? 1 : 0;
    if (aBlocked !== bBlocked) return bBlocked - aBlocked;

    // 2. Overdue tasks (due date past and not done) - highest urgency
    const aDueTime = a.dueDate ? new Date(`${a.dueDate.split('T')[0]}T23:59:59`).getTime() : null;
    const bDueTime = b.dueDate ? new Date(`${b.dueDate.split('T')[0]}T23:59:59`).getTime() : null;

    const aOverdue = aDueTime && aDueTime < now && a.status !== 'done' ? 1 : 0;
    const bOverdue = bDueTime && bDueTime < now && b.status !== 'done' ? 1 : 0;
    if (aOverdue !== bOverdue) return bOverdue - aOverdue;

    // 3. Priority ranking (urgent > high > medium > low)
    const aPrio = priorityRank[a.priority] || 2;
    const bPrio = priorityRank[b.priority] || 2;
    if (aPrio !== bPrio) return bPrio - aPrio;

    // 4. Proximity of due date (earliest deadline first)
    if (aDueTime && bDueTime) {
      if (aDueTime !== bDueTime) return aDueTime - bDueTime;
    } else if (aDueTime && !bDueTime) {
      return -1; // scheduled tasks precede unscheduled tasks
    } else if (!aDueTime && bDueTime) {
      return 1;
    }

    // 5. Tie breaker: custom sort order then alphabetical
    const aOrder = getTaskSortOrder(a);
    const bOrder = getTaskSortOrder(b);
    if (aOrder !== bOrder) return aOrder - bOrder;
    return (a.titleAr || '').localeCompare(b.titleAr || '', 'ar');
  });
}

export function getSavedTaskSort() {
  return localStorage.getItem('darc_task_sort_pref') || 'importance';
}

export function setSavedTaskSort(mode) {
  localStorage.setItem('darc_task_sort_pref', mode);
  state.taskSortPref = mode;
  state.projectTaskSort = mode;
  state.myTaskSort = mode;
}

export function renderTaskSortSelect(currentSort, actionName = 'sort-project-tasks') {
  const activeSort = currentSort || getSavedTaskSort();
  return `
    <div class="sort-box">
      <span>${choose('الترتيب:', 'Sort:')}</span>
      <select class="filter-select select-compact" data-action="${actionName}">
        <option value="importance" ${activeSort === 'importance' ? 'selected' : ''}>${choose('حسب الأهمية والأولوية (افتراضي)', 'By Importance & Priority (Default)')}</option>
        <option value="deadline" ${activeSort === 'deadline' ? 'selected' : ''}>${choose('الأقرب استحقاقاً', 'Earliest Deadline')}</option>
        <option value="custom" ${activeSort === 'custom' ? 'selected' : ''}>${choose('ترتيب مخصص (السحب والإسقاط)', 'Custom (Drag & Drop)')}</option>
        <option value="alpha" ${activeSort === 'alpha' ? 'selected' : ''}>${choose('أبجدياً', 'Alphabetical')}</option>
      </select>
    </div>
  `;
}

export function sortTasks(tasks = [], mode = getSavedTaskSort()) {
  if (mode === 'deadline') {
    return [...tasks].sort((a, b) => {
      const aTime = a.dueDate ? new Date(`${a.dueDate.split('T')[0]}T23:59:59`).getTime() : Infinity;
      const bTime = b.dueDate ? new Date(`${b.dueDate.split('T')[0]}T23:59:59`).getTime() : Infinity;
      return aTime - bTime;
    });
  }
  if (mode === 'custom') {
    return [...tasks].sort((a, b) => getTaskSortOrder(a) - getTaskSortOrder(b));
  }
  if (mode === 'alpha') {
    return [...tasks].sort((a, b) => (a.titleAr || '').localeCompare(b.titleAr || '', 'ar'));
  }
  return sortTasksByImportance(tasks);
}

export function renderBoard(tasks, sortMode = getSavedTaskSort()) {
  // Pre-index users, comment counts, and document counts for fast O(1) card rendering
  const users = state.data?.users || [];
  state._userMap = new Map(users.map(u => [u.id, u]));
  const commentCounts = {};
  for (const c of (state.data?.comments || [])) {
    if (c.taskId) commentCounts[c.taskId] = (commentCounts[c.taskId] || 0) + 1;
  }
  const docCounts = {};
  for (const d of (state.data?.documents || [])) {
    if (d.taskId) docCounts[d.taskId] = (docCounts[d.taskId] || 0) + 1;
  }
  state._commentCounts = commentCounts;
  state._docCounts = docCounts;

  const columns = [
    { key: 'not_started', dot: '', label: t('notStarted') },
    { key: 'in_progress', dot: 'blue', label: t('inProgress') },
    { key: 'review', dot: 'amber', label: choose('مراجعة / اعتماد', 'Review / approval'), statuses: ['review', 'approval', 'blocked'] },
    { key: 'done', dot: 'green', label: t('done') }
  ];
  return `<div class="board">${columns.map((column) => {
    const rawMatches = tasks.filter((task) => (column.statuses || [column.key]).includes(task.status));
    const sortedMatches = sortTasks(rawMatches, sortMode);
    return `<section class="board-column" data-status="${column.key}"><div class="board-column-head"><div class="board-column-title"><span class="column-dot ${column.dot}"></span>${column.label}</div><span class="board-count">${sortedMatches.length}</span></div><div class="board-cards">${sortedMatches.length ? sortedMatches.map(taskCard).join('') : `<div class="empty" style="min-height:150px;pointer-events:none;">${t('noTasks')}</div>`}</div></section>`;
  }).join('')}</div>`;
}

export function renderCalendar(tasks, project) {
  const currentDate = state.calendarDate ? new Date(state.calendarDate) : new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const monthNamesAr = ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'];
  const monthNamesEn = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const monthLabel = `${state.lang === 'ar' ? monthNamesAr[month] : monthNamesEn[month]} ${year}`;

  const weekdaysAr = ['الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'];
  const weekdaysEn = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const weekdays = state.lang === 'ar' ? weekdaysAr : weekdaysEn;

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const today = new Date();
  const isCurrentMonth = today.getFullYear() === year && today.getMonth() === month;

  let daysHtml = '';
  for (let i = 0; i < firstDay; i++) {
    daysHtml += `<div class="calendar-day empty" style="min-height:85px;background:var(--surface-soft);opacity:0.25;border:1px solid var(--line);border-radius:6px;"></div>`;
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const isToday = isCurrentMonth && today.getDate() === day;
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

    const dayTasks = tasks.filter(t => {
      if (!t.dueDate && !t.startDate) return false;
      const due = t.dueDate ? t.dueDate.split('T')[0] : null;
      const start = t.startDate ? t.startDate.split('T')[0] : null;
      return due === dateStr || start === dateStr;
    });

    daysHtml += `
      <div class="calendar-day ${isToday ? 'is-today' : ''}" style="min-height:95px;min-width:0;overflow:hidden;background:${isToday ? 'var(--mint)' : 'var(--surface)'};border:1px solid ${isToday ? 'var(--teal)' : 'var(--line)'};border-radius:8px;padding:6px;display:flex;flex-direction:column;gap:4px;position:relative;">
        <div style="display:flex;align-items:center;justify-content:space-between;font-size:11px;font-weight:${isToday ? 'bold' : '600'};color:${isToday ? 'var(--teal)' : 'var(--ink)'};">
          <span>${day}</span>
          ${isToday ? `<span style="font-size:9px;background:var(--teal);color:#fff;border-radius:4px;padding:1px 4px;">${choose('اليوم', 'Today')}</span>` : ''}
        </div>
        <div style="display:flex;flex-direction:column;gap:3px;overflow-y:auto;max-height:85px;">
          ${dayTasks.map(t => {
      const style = getTaskStatusStyle(t);
      return `
              <div data-action="open-task" data-task-id="${esc(t.id)}" style="background:${style.bgColor};border:1px solid ${style.borderColor};border-inline-start:3px solid ${style.color};border-radius:4px;padding:3px 5px;font-size:10px;color:${style.textColor};cursor:pointer;line-height:1.25;max-height:36px;overflow:hidden;word-break:break-word;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;" title="${esc(choose(t.titleAr, t.titleEn))} — ${style.label}">
                <span style="font-weight:700;">${esc(choose(t.titleAr, t.titleEn))}</span>
              </div>
            `;
    }).join('')}
        </div>
      </div>
    `;
  }

  return `
    <div class="calendar-wrapper" style="background:var(--surface);border:1px solid var(--line);border-radius:12px;padding:16px;">
      <div class="calendar-header" style="display:flex;align-items:center;justify-content:space-between;margin-bottom:14px;flex-wrap:wrap;gap:10px;">
        <h3 style="margin:0;font-size:15px;color:var(--ink);display:flex;align-items:center;gap:8px;">
          ${icon('calendar', 16)} ${monthLabel}
        </h3>
        <div style="display:flex;align-items:center;gap:6px;">
          <button class="btn btn-ghost btn-sm" data-action="prev-calendar-month" style="font-size:11px;">${icon(state.lang === 'ar' ? 'arrow' : 'arrowLeft', 12)} ${choose('السابق', 'Prev')}</button>
          <button class="btn btn-soft btn-sm" data-action="today-calendar-month" style="font-size:11px;">${choose('اليوم', 'Today')}</button>
          <button class="btn btn-ghost btn-sm" data-action="next-calendar-month" style="font-size:11px;">${choose('التالي', 'Next')} ${icon(state.lang === 'ar' ? 'arrowLeft' : 'arrow', 12)}</button>
        </div>
      </div>

      <div style="display:grid;grid-template-columns:repeat(7, minmax(0, 1fr));gap:6px;text-align:center;margin-bottom:6px;font-size:11px;font-weight:700;color:var(--ink-soft);">
        ${weekdays.map(d => `<div style="padding:6px 0;background:var(--surface-soft);border-radius:6px;border:1px solid var(--line);overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${d}</div>`).join('')}
      </div>

      <div style="display:grid;grid-template-columns:repeat(7, minmax(0, 1fr));gap:6px;">
        ${daysHtml}
      </div>
    </div>
  `;
}

export function renderTimeline(tasks) {
  const scheduledTasks = tasks.filter(t => t.startDate && t.dueDate).sort((a, b) => new Date(a.startDate) - new Date(b.startDate));
  if (!scheduledTasks.length) return `<div class="empty" style="min-height:300px">${icon('calendar', 24)}<span>${choose('لا توجد مهام مجدولة زمنياً في هذا المشروع.', 'No scheduled tasks in this project.')}</span></div>`;

  let minTime = Math.min(...scheduledTasks.map(t => new Date(t.startDate).getTime()));
  let maxTime = Math.max(...scheduledTasks.map(t => new Date(t.dueDate).getTime()));

  // Add 3 days padding on each side
  const padding = 3 * 86400000;
  minTime -= padding;
  maxTime += padding;

  const totalDays = Math.max(7, Math.ceil((maxTime - minTime) / 86400000));

  let headerHtml = '';
  for (let i = 0; i < totalDays; i++) {
    const d = new Date(minTime + i * 86400000);
    const isWeekend = d.getDay() === 5 || d.getDay() === 6; // Friday/Saturday in Arab world
    const calSystem = getActiveCalendarSystem();
    const monthLocale = calSystem === 'hijri'
      ? (state.lang === 'ar' ? 'ar-SA-u-ca-islamic-umalqura' : 'en-u-ca-islamic-umalqura')
      : (state.lang === 'ar' ? 'ar-u-ca-gregory' : 'en-GB-u-ca-gregory');
    const monthShort = new Intl.DateTimeFormat(monthLocale, { month: 'short' }).format(d);
    headerHtml += `<div style="padding:10px 5px;text-align:center;font-size:10px;color:var(--ink-soft);border-right:1px solid var(--line);background:${isWeekend ? 'var(--surface-soft)' : 'transparent'};border-bottom:1px solid var(--line)">${d.getDate()}<br>${monthShort}</div>`;
  }

  const rowsHtml = scheduledTasks.map((task, index) => {
    const startDay = Math.floor((new Date(task.startDate).getTime() - minTime) / 86400000) + 1;
    const duration = Math.max(1, Math.ceil((new Date(task.dueDate).getTime() - new Date(task.startDate).getTime()) / 86400000) + 1);
    const endDay = startDay + duration;

    // Status colors synchronized with Calendar view
    const style = getTaskStatusStyle(task);

    return `<div style="display:contents" class="timeline-row" data-task-id="${task.id}" data-row="${index}">
      <div style="grid-column: 1 / -1; border-bottom: 1px solid var(--line); pointer-events:none;"></div>
      <div class="timeline-bar" data-action="open-task" data-task-id="${task.id}" style="grid-column: ${startDay} / ${endDay}; margin: 8px 4px; background: ${style.color}; border: 1px solid ${style.borderColor}; border-radius: 6px; padding: 6px 10px; color: #fff; font-size: 11px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; cursor: pointer; box-shadow: 0 2px 4px rgba(0,0,0,0.12); position:relative; z-index: 2; transition: transform 0.2s, opacity 0.2s" title="${esc(choose(task.titleAr, task.titleEn))} — ${style.label}">
        <span style="font-weight:600;opacity:0.9">${esc(task.templateId ? task.templateId.replace('tpl-', '#') : '#')}</span> ${esc(choose(task.titleAr, task.titleEn))}
        ${task.dependencies && task.dependencies.length ? `<span style="float:${state.lang === 'ar' ? 'left' : 'right'};opacity:0.8">${icon('link', 10)}</span>` : ''}
      </div>
    </div>`;
  }).join('');

  return `<div class="timeline-container" style="overflow-x:auto; background:var(--surface); border-radius:12px; border:1px solid var(--line);">
    <div style="display:grid; grid-template-columns: repeat(${totalDays}, minmax(40px, 1fr)); min-width: ${totalDays * 40}px; position: relative;">
      ${headerHtml}
      ${rowsHtml}
      <svg class="timeline-svg" style="position:absolute; inset:0; width:100%; height:100%; pointer-events:none; z-index:1"></svg>
    </div>
  </div>`;
}

export function renderTimelinePanel(tasks, project) {
  const currentMode = state.timelineView || 'gantt';

  return `
    <div class="panel">
      <div class="panel-head" style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:10px;">
        <div>
          <h2 class="panel-title">${choose('المخطط الزمني والتقويم', 'Timeline & Calendar')}</h2>
          <p class="panel-subtitle">${choose('متابعة تسلسل المهام ومواعيد التسليم بالصيغة الأنسب لك.', 'Track task flow and milestone deadlines in your preferred format.')}</p>
        </div>
        <div class="segmented-control" style="display:inline-flex;background:var(--surface-soft);border:1px solid var(--line);border-radius:8px;padding:3px;gap:3px;">
          <button class="btn btn-sm ${currentMode === 'gantt' ? 'btn-primary' : 'btn-ghost'}" data-action="toggle-timeline-view" data-view-mode="gantt" style="font-size:11px;padding:4px 10px;">
            ${icon('clock', 12)} ${choose('مخطط جانت', 'Gantt Chart')}
          </button>
          <button class="btn btn-sm ${currentMode === 'calendar' ? 'btn-primary' : 'btn-ghost'}" data-action="toggle-timeline-view" data-view-mode="calendar" style="font-size:11px;padding:4px 10px;">
            ${icon('calendar', 12)} ${choose('عرض التقويم', 'Calendar View')}
          </button>
        </div>
      </div>
      
      ${currentMode === 'calendar' ? renderCalendar(tasks, project) : renderTimeline(tasks)}
    </div>
  `;
}
if (typeof window !== 'undefined') {
  window.__timelineExports = { renderTimelinePanel, renderCalendar, renderTimeline };
}

export function filterTasks(tasks) {
  const query = state.searches.tasks.trim().toLowerCase();
  return tasks.filter((task) => {
    const matchesQuery = `${task.titleAr} ${task.titleEn} ${task.categoryAr} ${task.categoryEn}`.toLowerCase().includes(query);
    const matchesFilter = state.taskFilter === 'all' || (state.taskFilter === 'mine' && task.assigneeId === state.data.user.id) || (state.taskFilter === 'overdue' && isOverdue(task)) || (state.taskFilter === 'blocked' && task.status === 'blocked');
    const matchesProject = state.taskProjectFilter === 'all' || task.projectId === state.taskProjectFilter;
    const matchesPriority = !state.taskPriorityFilter || state.taskPriorityFilter === 'all' || task.priority === state.taskPriorityFilter;
    return matchesQuery && matchesFilter && matchesProject && matchesPriority;
  });
}

export function renderTasks() {
  const tasks = filterTasks(state.data.tasks);
  const tabs = [['all', t('all')], ['mine', choose('مسندة لي', 'Assigned to me')], ['overdue', t('overdue')], ['blocked', t('blocked')]];
  const currentSort = state.myTaskSort || getSavedTaskSort();
  return `
    <div class="page-head">
      <div>
        <p class="eyebrow">${choose('حركة التنفيذ', 'EXECUTION')}</p>
        <h1>${t('myTasks')}</h1>
        <p>${choose('نظّم العمل حسب الحالة، الموعد، والمسؤولية.', 'Organize work by status, deadline, and ownership.')}</p>
      </div>
      <div class="page-actions">
        ${can('create_tasks') ? `<button class="btn btn-primary" data-action="new-task">${icon('plus', 15)} ${t('addTask')}</button>` : ''}
      </div>
    </div>

    <div class="tasks-toolbar">
      <div class="tasks-toolbar-row tasks-toolbar-row-top">
        <div class="segmented-control" role="tablist">
          ${tabs.map(([key, label]) => `
            <button class="segmented-tab ${state.taskFilter === key ? 'active' : ''}" data-action="task-filter" data-filter="${key}" role="tab">
              ${label}
            </button>
          `).join('')}
        </div>
        <div class="search-box tasks-search-box">
          ${icon('search', 15)}
          <input data-search="tasks" value="${esc(state.searches.tasks)}" placeholder="${choose('بحث في المهام...', 'Search tasks...')}" />
        </div>
      </div>
      <div class="tasks-toolbar-row tasks-toolbar-row-bottom">
        <div class="tasks-toolbar-filters">
          <select class="filter-select select-compact" data-action="task-project-filter" style="min-width:180px;">
            <option value="all">${choose('📁 كل المشاريع', '📁 All Projects')}</option>
            ${state.data.projects.map((project) => `<option value="${esc(project.id)}" ${state.taskProjectFilter === project.id ? 'selected' : ''}>${esc(choose(project.nameAr, project.nameEn))}</option>`).join('')}
          </select>
          <select class="filter-select select-compact" data-action="task-priority-filter" style="min-width:140px;">
            <option value="all">${choose('⚡ كل الأولويات', '⚡ All Priorities')}</option>
            <option value="urgent" ${state.taskPriorityFilter === 'urgent' ? 'selected' : ''}>🔥 ${choose('عاجلة', 'Urgent')}</option>
            <option value="high" ${state.taskPriorityFilter === 'high' ? 'selected' : ''}>⚡ ${choose('عالية', 'High')}</option>
            <option value="medium" ${state.taskPriorityFilter === 'medium' ? 'selected' : ''}>🔹 ${choose('متوسطة', 'Medium')}</option>
            <option value="low" ${state.taskPriorityFilter === 'low' ? 'selected' : ''}>☕ ${choose('منخفضة', 'Low')}</option>
          </select>
        </div>
        <div class="tasks-toolbar-sort">
          ${renderTaskSortSelect(currentSort, 'sort-my-tasks')}
        </div>
      </div>
    </div>

    ${tasks.length ? renderBoard(tasks, currentSort) : `<section class="panel"><div class="empty">${icon('checklist', 18)}<span>${t('noTasks')}</span></div></section>`}
  `;
}

export function formatRemindAtDate(isoStr) {
  return formatDateTime(isoStr, { includeSeconds: false }).full;
}

export function buildAssigneeChipsHtml(selectedUserIds = [], selectedExternals = []) {
  const users = state.data?.users || [];
  let html = '';

  selectedUserIds.forEach(uid => {
    const u = users.find(x => x.id === uid) || { name: uid, id: uid };
    html += `
      <span class="chip-item" style="display:inline-flex;align-items:center;gap:5px;background:var(--surface);border:1px solid var(--border);border-radius:16px;padding:2px 8px 2px 6px;font-size:11px;color:var(--ink);">
        ${avatar(u, 'mini-avatar')}
        <span style="font-weight:500;">${esc(choose(u.name, u.nameEn || u.name))}</span>
        <button type="button" class="btn-remove-chip-user" data-uid="${esc(uid)}" style="border:none;background:none;cursor:pointer;color:var(--muted);padding:0 2px;font-size:13px;line-height:1;" title="${choose('إزالة', 'Remove')}">×</button>
      </span>
    `;
  });

  selectedExternals.forEach(ext => {
    html += `
      <span class="chip-item" style="display:inline-flex;align-items:center;gap:5px;background:var(--teal-soft);border:1px solid var(--teal);border-radius:16px;padding:2px 8px 2px 6px;font-size:11px;color:var(--teal);">
        <span>🌐</span>
        <span style="font-weight:600;">${esc(ext)}</span>
        <span style="font-size:9px;background:var(--teal);color:#fff;border-radius:8px;padding:1px 4px;">${choose('خارجي', 'Ext')}</span>
        <button type="button" class="btn-remove-chip-ext" data-ext="${esc(ext)}" style="border:none;background:none;cursor:pointer;color:var(--teal);padding:0 2px;font-size:13px;line-height:1;" title="${choose('إزالة', 'Remove')}">×</button>
      </span>
    `;
  });

  return html;
}

export function buildRemindersListHtml(activeReminders = []) {
  if (!activeReminders.length) {
    return `<div style="font-size:11px;color:var(--muted);padding:6px;text-align:center;">${choose('لا توجد مواعيد تذكير مجدولة لهذه المهمة', 'No scheduled reminders for this task')}</div>`;
  }
  return activeReminders.map((r, idx) => `
    <div class="reminder-card-row" data-idx="${idx}" style="display:flex;align-items:center;justify-content:space-between;padding:6px 10px;background:var(--surface);border:1px solid var(--border);border-radius:8px;font-size:12px;">
      <div style="display:flex;align-items:center;gap:8px;overflow:hidden;">
        <span style="color:var(--teal);font-size:14px;">⏰</span>
        <strong style="color:var(--ink);">${esc(formatRemindAtDate(r.remindAt))}</strong>
        ${r.noteAr ? `<span style="color:var(--muted);font-size:11px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;" title="${esc(r.noteAr)}">(${esc(r.noteAr)})</span>` : ''}
      </div>
      <button type="button" class="btn-delete-reminder" data-idx="${idx}" data-rem-id="${esc(r.id || '')}" style="border:none;background:none;cursor:pointer;color:var(--red);padding:2px 6px;border-radius:4px;display:flex;align-items:center;transition:opacity 0.15s;" title="${choose('حذف التذكير', 'Delete reminder')}">
        ${icon('trash', 13)}
      </button>
    </div>
  `).join('');
}

export function openTaskModal(task = null, presetTemplateId = null, presetProjectId = null) {
  const template = state.data.templates.find((item) => item.id === (presetTemplateId || task?.templateId));
  const projectId = task?.projectId || presetProjectId || state.activeProjectId || state.data.projects[0]?.id || '';

  const additionalAssigneeIds = Array.isArray(task?.customFields?.additionalAssignees)
    ? task.customFields.additionalAssignees
    : (Array.isArray(task?.customFields?.additional_assignees) ? task.customFields.additional_assignees : []);

  const externalAssigneesList = Array.isArray(task?.customFields?.externalAssignees)
    ? task.customFields.externalAssignees
    : (Array.isArray(task?.customFields?.external_assignees) ? task.customFields.external_assignees : []);

  let taskReminders = [];
  if (Array.isArray(task?.customFields?.reminders)) {
    taskReminders = task.customFields.reminders;
  } else if (task?.remindAt) {
    taskReminders = [{ id: 'rem_' + Math.random().toString(36).substr(2, 9), remindAt: task.remindAt, noteAr: '' }];
  } else if (Array.isArray(state.data?.reminders) && task?.id) {
    taskReminders = state.data.reminders.filter(r => r.taskId === task.id);
  }

  const currentProgress = task?.progress !== undefined ? task.progress : (task?.status === 'done' ? 100 : (task?.status === 'review' || task?.status === 'approval' ? 80 : (task?.status === 'in_progress' ? 50 : 0)));

  const hasChips = additionalAssigneeIds.length > 0 || externalAssigneesList.length > 0;
  const initialChipsHtml = hasChips ? buildAssigneeChipsHtml(additionalAssigneeIds, externalAssigneesList) : '';
  const initialRemindersHtml = buildRemindersListHtml(taskReminders);

  const taskForm = `<form id="task-form" data-task-id="${esc(task?.id || '')}">
    <input type="hidden" name="typeAr" id="task-type-ar" value="${esc(task?.typeAr || template?.typeAr || (template ? 'مخطط' : ''))}" />
    <input type="hidden" name="typeEn" id="task-type-en" value="${esc(task?.typeEn || template?.typeEn || (template ? 'Drawing' : ''))}" />
    <input type="hidden" name="additionalAssignees" id="task-additional-assignees-input" value="${esc(JSON.stringify(additionalAssigneeIds))}" />
    <input type="hidden" name="externalAssignees" id="task-external-assignees-input" value="${esc(JSON.stringify(externalAssigneesList))}" />
    <input type="hidden" name="remindersJson" id="task-reminders-input" value="${esc(JSON.stringify(taskReminders))}" />

    <div class="form-grid">
      <!-- 📋 القسم 1: البيانات الأساسية والمكتبة القياسية -->
      <div style="font-size:12px;font-weight:700;color:var(--teal);margin:4px 0 2px;grid-column:1/-1;border-bottom:1px solid var(--line);padding-bottom:4px;display:flex;align-items:center;gap:6px;">
        <span>📋</span> <span>${choose('البيانات الأساسية والمكتبة القياسية', 'Basic Details & Standard Library')}</span>
      </div>

      <div class="field full">
        <label>${choose('المشروع التابع له', 'Project')} *</label>
        <select name="projectId" id="task-project-select" required>
          ${state.data.projects.map((p) => `<option value="${esc(p.id)}" ${(p.id === projectId) ? 'selected' : ''}>${esc(choose(p.nameAr, p.nameEn))} (${esc(p.code)})</option>`).join('')}
        </select>
      </div>

      <div class="field full">
        <label>${t('taskTitle')} *</label>
        <input name="titleAr" id="task-title-ar" value="${esc(task?.titleAr || template?.nameAr || '')}" placeholder="${choose('اسم المخرج أو المهمة', 'Deliverable or task name')}" required />
      </div>
      <div class="field">
        <label>${t('nameEn')}</label>
        <input name="titleEn" id="task-title-en" value="${esc(task?.titleEn || template?.nameEn || '')}" placeholder="${choose('Task / Deliverable Name (EN)', 'Task / Deliverable Name (EN)')}" />
      </div>
      <div class="field">
        <label>${t('addFromLibrary')}</label>
        <select name="templateId" id="task-template-select">
          <option value="">${choose('مهمة مخصصة', 'Custom task')}</option>
          ${state.data.templates.map((item) => `<option value="${esc(item.id)}" ${(task?.templateId || presetTemplateId) === item.id ? 'selected' : ''}>${esc(item.code)} — ${esc(choose(item.nameAr, item.nameEn))}</option>`).join('')}
        </select>
      </div>

      <!-- 👥 القسم 2: المسؤوليات وفريق العمل -->
      <div style="font-size:12px;font-weight:700;color:var(--teal);margin:12px 0 4px;grid-column:1/-1;border-bottom:1px solid var(--line);padding-bottom:4px;display:flex;align-items:center;gap:6px;">
        <span>👥</span> <span>${choose('المسؤوليات وفريق العمل', 'Ownership & Team')}</span>
      </div>

      <div class="field full">
        <label>${choose('المسؤول الرئيسي', 'Primary Assignee')}</label>
        <select name="assigneeId" id="task-primary-assignee">
          <option value="">${choose('— بدون تحديد —', '— Unassigned —')}</option>
          ${state.data.users.map((user) => `<option value="${esc(user.id)}" ${(task ? task.assigneeId === user.id : state.data.user.id === user.id) ? 'selected' : ''}>${esc(choose(user.name, user.nameEn || user.name))}</option>`).join('')}
        </select>
      </div>

      <!-- قائمة منسدلة موحدة وسريعة للبحث والتحديد للأعضاء والمسؤولين الخارجيين -->
      <div class="field full" style="position:relative;">
        <label style="display:flex;align-items:center;justify-content:space-between;">
          <span>${choose('فريق العمل والمسؤولون المشاركون (داخلي وخارجي)', 'Collaborators & Assignees (Team & External)')}</span>
          <span style="font-size:10px;color:var(--muted);font-weight:normal;">${choose('اختر من الفريق أو اكتب اسماً خارجياً واضغط إضافة', 'Pick team members or type external name')}</span>
        </label>

        <!-- الشارات المحددة حالياً (Pre-rendered for zero layout shift) -->
        <div id="assignees-chips-container" style="display:${hasChips ? 'flex' : 'none'};flex-wrap:wrap;gap:6px;min-height:36px;padding:6px;background:var(--surface-soft);border:1px solid var(--line);border-radius:8px;margin-bottom:6px;align-items:center;">
          ${initialChipsHtml}
        </div>

        <!-- حقل البحث والإضافة السريعة -->
        <div style="position:relative;display:flex;gap:6px;">
          <input type="text" id="assignee-combobox-search" placeholder="${choose('ابحث عن عضو بالفريق أو اكتب اسماً خارجياً...', 'Search team member or type external name...')}" autocomplete="off" style="flex:1;padding:8px 12px;font-size:12px;" />
          <button type="button" id="btn-add-external-quick" class="btn btn-soft btn-sm" style="display:none;padding:0 12px;white-space:nowrap;font-size:11px;">
            ➕ ${choose('إضافة كمسؤول خارجي', 'Add external')}
          </button>
        </div>

        <!-- القائمة المنسدلة للبحث والاختيار -->
        <div id="assignee-combobox-dropdown" style="display:none;position:absolute;top:100%;left:0;right:0;max-height:220px;overflow-y:auto;background:var(--surface);border:1px solid var(--line);border-radius:8px;box-shadow:0 8px 24px rgba(0,0,0,0.14);z-index:100;margin-top:4px;padding:4px;">
        </div>
      </div>

      <!-- ⏱️ القسم 3: الحالة والجدولة والتذكيرات (بدون تبعيات نهائياً) -->
      <div style="font-size:12px;font-weight:700;color:var(--teal);margin:12px 0 4px;grid-column:1/-1;border-bottom:1px solid var(--line);padding-bottom:4px;display:flex;align-items:center;gap:6px;">
        <span>⏱️</span> <span>${choose('الحالة والجدولة والتذكيرات', 'Status, Scheduling & Reminders')}</span>
      </div>

      <div class="field">
        <label style="display:flex;align-items:center;justify-content:space-between;">
          <span>${t('status')}</span>
          <span id="task-auto-progress-badge" style="font-size:11px;font-weight:600;color:var(--teal);">(${currentProgress}%)</span>
        </label>
        <select name="status" id="task-status-select">${STATUS_OPTIONS().map(([key, label]) => `<option value="${key}" ${task?.status === key ? 'selected' : ''}>${label}</option>`).join('')}</select>
      </div>
      <div class="field">
        <label>${t('priority')}</label>
        <select name="priority">${['low', 'medium', 'high', 'urgent'].map((key) => `<option value="${key}" ${(task?.priority || 'medium') === key ? 'selected' : ''}>${priorityText(key)}</option>`).join('')}</select>
      </div>
      <div class="field">
        <label>${t('startDate')}</label>
        <input type="date" name="startDate" id="task-start-date" value="${esc((task?.startDate || '').split('T')[0])}" onchange="const due = document.getElementById('task-due-date'); if (due && due.value && this.value > due.value) due.value = this.value; if (due) due.min = this.value;" />
      </div>
      <div class="field">
        <label>${t('dueDate')}</label>
        <input type="date" name="dueDate" id="task-due-date" value="${esc((task?.dueDate || '').split('T')[0])}" min="${esc((task?.startDate || '').split('T')[0])}" onchange="const st = document.getElementById('task-start-date'); if (st && st.value && this.value < st.value) this.value = st.value;" />
      </div>

      <!-- أداة التذكيرات المتعددة التفاعلية -->
      <div class="field full" style="background:var(--surface-soft);border:1px solid var(--line);border-radius:10px;padding:12px;">
        <label style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px;">
          <span style="font-weight:600;display:flex;align-items:center;gap:6px;">
            <span>⏰</span> ${choose('تذكيرات المهمة (إشعار نظام + بريد إلكتروني للمسؤول)', 'Task Reminders (System Notification + Email to Assignee)')}
          </span>
          <span style="font-size:10px;color:var(--muted);font-weight:normal;">${choose('يمكنك إضافة أكثر من موعد تذكير وحذف ما تشاء', 'Add multiple reminders and delete any')}</span>
        </label>

        <!-- قائمة التذكيرات المضافة (Pre-rendered for zero layout shift) -->
        <div id="task-reminders-list" style="display:flex;flex-direction:column;gap:6px;margin-bottom:10px;">
          ${initialRemindersHtml}
        </div>

        <!-- صف إضافة تذكير جديد -->
        <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap;">
          <input type="datetime-local" id="new-reminder-datetime" style="flex:1;min-width:180px;font-size:12px;padding:6px 10px;" />
          <input type="text" id="new-reminder-note" placeholder="${choose('ملاحظة التذكير (اختياري)...', 'Reminder note (optional)...')}" style="flex:1;min-width:150px;font-size:12px;padding:6px 10px;" />
          <button type="button" id="btn-add-reminder" class="btn btn-soft btn-sm" style="white-space:nowrap;padding:7px 12px;font-weight:600;display:inline-flex;align-items:center;gap:4px;">
            ➕ ${choose('إضافة تذكير', 'Add Reminder')}
          </button>
        </div>
      </div>

      <!-- 📝 القسم 4: تفاصيل ومخرجات المهمة -->
      <div style="font-size:12px;font-weight:700;color:var(--teal);margin:12px 0 4px;grid-column:1/-1;border-bottom:1px solid var(--line);padding-bottom:4px;display:flex;align-items:center;gap:6px;">
        <span>📝</span> <span>${choose('تفاصيل ومخرجات المهمة', 'Task Details & Deliverables')}</span>
      </div>

      <div class="field full">
        <label>${t('description')}</label>
        <textarea name="descriptionAr" placeholder="${choose('ما المطلوب؟ وما معيار الإغلاق؟', 'What is required and what defines completion?')}">${esc(task?.descriptionAr || '')}</textarea>
      </div>
    </div>
    <div class="modal-actions" style="display:flex;align-items:center;justify-content:space-between;width:100%;flex-wrap:wrap;gap:10px;">
      <div>
        ${task && (can('delete_tasks') || isAdmin()) ? `
          <button type="button" class="btn btn-ghost" data-action="delete-task" data-task-id="${esc(task.id)}" style="color:var(--red);display:inline-flex;align-items:center;gap:6px;" title="${choose('حذف المهمة ونقلها لسلة المهملات', 'Delete task and move to trash')}">
            ${icon('trash', 14)} ${choose('حذف المهمة', 'Delete Task')}
          </button>
        ` : ''}
      </div>
      <div style="display:flex;align-items:center;gap:8px;">
        <button type="button" class="btn btn-ghost" data-action="close-modal">${t('cancel')}</button>
        <button type="submit" class="btn btn-primary">${icon('check', 14)} ${task ? t('save') : t('create')}</button>
      </div>
    </div>
  </form>`;

  let modalBody = taskForm;
  let extraClass = '';
  if (task) {
    extraClass = 'modal-lg';
    modalBody = `
      <div class="task-modal-layout">
        <div class="task-modal-col task-modal-main">
          <h3 style="margin:0 0 15px;font-size:14px;">${choose('تفاصيل المهمة', 'Task Details')}</h3>
          ${taskForm}
        </div>
        <div class="task-modal-col task-modal-side">
          <div class="task-documents-section">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;">
              <h3 style="margin:0;font-size:14px;display:flex;align-items:center;gap:6px;">
                ${choose('المخططات والملفات', 'Documents & Files')}
              </h3>
              <label class="btn btn-soft btn-sm" style="cursor:pointer;margin:0;" id="task-upload-btn">
                ${icon('plus', 12)} ${choose('اختيار ملفات', 'Choose Files')}
                <input type="file" multiple id="task-upload-input" data-task-id="${task.id}" style="display:none;" />
              </label>
            </div>
            <div id="task-dropzone" data-action="trigger-upload" data-task-id="${task.id}" style="border:2px dashed var(--border);border-radius:10px;padding:16px 12px;text-align:center;background:var(--surface-soft);cursor:pointer;transition:all 0.2s ease;margin-bottom:12px;">
              <div style="display:flex;flex-direction:column;align-items:center;gap:4px;pointer-events:none;">
                <span style="color:var(--brand-teal);">${icon('upload', 22)}</span>
                <div style="font-size:12px;font-weight:600;color:var(--ink);">${choose('اسحب المخططات والملفات وأفلتها هنا، أو اضغط للتصفح', 'Drag & drop files here, or click to browse')}</div>
                <div style="font-size:10px;color:var(--muted);">${choose('دعم كامل لملفات CAD و PDF و 3D و الصور حتى 5GB', 'Full support for CAD, PDF, 3D & images up to 5GB')}</div>
              </div>
              <div id="upload-progress-container" style="display:none;margin-top:12px;padding:10px 12px;background:var(--surface);border:1px solid var(--border);border-radius:8px;box-shadow:0 2px 6px rgba(0,0,0,0.04);text-align:start;">
                <div style="display:flex;justify-content:space-between;align-items:center;font-size:11px;color:var(--ink);margin-bottom:6px;gap:8px;">
                  <span id="upload-progress-text" style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap;flex:1;">${choose('جاري الرفع...', 'Uploading...')}</span>
                  <strong id="upload-progress-percent" style="color:var(--brand-teal);font-variant-numeric:tabular-nums;flex-shrink:0;">0%</strong>
                </div>
                <div style="height:6px;background:var(--line);border-radius:3px;overflow:hidden;position:relative;">
                  <div id="upload-progress-bar" style="width:0%;height:100%;background:linear-gradient(90deg, var(--brand-teal), #00c2cb);border-radius:3px;transition:width 0.15s ease;"></div>
                </div>
              </div>
            </div>
            <div id="task-documents-list">${renderTaskDocuments(task)}</div>
          </div>
          <div class="task-comments-section" style="flex:1;display:flex;flex-direction:column;">
            <h3 style="margin:0 0 15px;font-size:14px;">${choose('النقاشات والتعليقات', 'Discussion & Comments')}</h3>
            <div id="task-comments-list" style="flex:1;min-height:200px;max-height:300px;overflow-y:auto;background:var(--surface-soft);border:1px solid var(--line);border-radius:12px;padding:15px;margin-bottom:15px;">${renderTaskComments(task)}</div>
            <form id="task-comment-form" data-task-id="${task.id}" style="display:flex;gap:8px;position:relative;">
              <input type="text" name="content" autocomplete="off" placeholder="${choose('اكتب تعليقاً... (استخدم @ للإشارة)', 'Write a comment... (use @ to mention)')}" style="flex:1;padding:10px 15px;border-radius:20px;border:1px solid var(--border);font-size:13px;" required />
              <button type="submit" class="btn btn-primary" style="border-radius:20px;padding:0 20px;">${choose('إرسال', 'Send')}</button>
              <div id="mention-dropdown" style="display:none;position:absolute;bottom:45px;left:0;right:0;background:var(--surface);border:1px solid var(--line);border-radius:12px;box-shadow:0 10px 30px rgba(0,0,0,0.1);max-height:150px;overflow-y:auto;z-index:10;padding:5px;"></div>
            </form>
          </div>
        </div>
      </div>
    `;
  }
  document.getElementById('modal-root').innerHTML = modalShell(task ? choose('تعديل المهمة', 'Edit task') : t('addTask'), choose('المهمة هي وحدة التنفيذ؛ يمكن ربطها بمخرج قياسي وإضافة تذكير.', 'A task is the unit of execution; link a standard deliverable and add a reminder.'), modalBody, 'task', extraClass);

  initTaskModalWidgets(task);
}

export function initTaskModalWidgets(task) {
  const modalRoot = document.getElementById('modal-root');
  if (!modalRoot) return;

  // 1. مزامنة الحالة مع نسبة الإنجاز التلقائية
  const statusSelect = modalRoot.querySelector('#task-status-select');
  const progressBadge = modalRoot.querySelector('#task-auto-progress-badge');
  if (statusSelect && progressBadge) {
    statusSelect.addEventListener('change', () => {
      const val = statusSelect.value;
      const progressMap = { not_started: 0, in_progress: 50, review: 80, approval: 80, done: 100 };
      const autoP = progressMap[val] ?? 0;
      progressBadge.textContent = `(${autoP}%)`;
    });
  }

  // 2. مزامنة اختيار القالب من المكتبة لملء الحقول آلياً
  const templateSelect = modalRoot.querySelector('#task-template-select');
  if (templateSelect) {
    templateSelect.addEventListener('change', () => {
      const tplId = templateSelect.value;
      const tpl = (state.data?.templates || []).find(t => t.id === tplId);
      if (tpl) {
        const titleAr = modalRoot.querySelector('#task-title-ar');
        const titleEn = modalRoot.querySelector('#task-title-en');
        const typeAr = modalRoot.querySelector('#task-type-ar');
        const typeEn = modalRoot.querySelector('#task-type-en');
        if (titleAr && !titleAr.value) titleAr.value = tpl.nameAr || '';
        if (titleEn && !titleEn.value) titleEn.value = tpl.nameEn || '';
        if (typeAr) typeAr.value = tpl.typeAr || 'مخطط';
        if (typeEn) typeEn.value = tpl.typeEn || 'Drawing';
      }
    });
  }

  // 3. القائمة المنسدلة الموحدة والسريعة لفريق العمل والمسؤولين الخارجيين
  const addAssigneesInput = modalRoot.querySelector('#task-additional-assignees-input');
  const extAssigneesInput = modalRoot.querySelector('#task-external-assignees-input');
  const chipsContainer = modalRoot.querySelector('#assignees-chips-container');
  const searchInput = modalRoot.querySelector('#assignee-combobox-search');
  const dropdown = modalRoot.querySelector('#assignee-combobox-dropdown');
  const addExternalBtn = modalRoot.querySelector('#btn-add-external-quick');

  let selectedUserIds = [];
  try {
    selectedUserIds = JSON.parse(addAssigneesInput?.value || '[]');
  } catch (e) {
    selectedUserIds = [];
  }
  let selectedExternals = [];
  try {
    selectedExternals = JSON.parse(extAssigneesInput?.value || '[]');
  } catch (e) {
    selectedExternals = [];
  }

  function syncAssigneeInputs() {
    if (addAssigneesInput) addAssigneesInput.value = JSON.stringify(selectedUserIds);
    if (extAssigneesInput) extAssigneesInput.value = JSON.stringify(selectedExternals);
  }

  function renderChips() {
    if (!chipsContainer) return;
    if (selectedUserIds.length === 0 && selectedExternals.length === 0) {
      chipsContainer.style.display = 'none';
      chipsContainer.innerHTML = '';
      syncAssigneeInputs();
      return;
    }
    chipsContainer.style.display = 'flex';
    chipsContainer.innerHTML = buildAssigneeChipsHtml(selectedUserIds, selectedExternals);
    syncAssigneeInputs();
  }

  function renderDropdown(searchTerm = '') {
    if (!dropdown) return;
    const term = searchTerm.trim().toLowerCase();
    const users = state.data?.users || [];
    const primaryAssigneeId = modalRoot.querySelector('#task-primary-assignee')?.value;

    const filteredUsers = users.filter(u => {
      if (u.id === primaryAssigneeId) return false;
      if (!term) return true;
      const n1 = (u.name || '').toLowerCase();
      const n2 = (u.nameEn || '').toLowerCase();
      const email = (u.email || '').toLowerCase();
      return n1.includes(term) || n2.includes(term) || email.includes(term);
    });

    let itemsHtml = '';

    // Quick add external assignee option if user typed something
    if (term) {
      itemsHtml += `
        <div class="dropdown-ext-action" style="display:flex;align-items:center;justify-content:space-between;padding:8px 10px;background:var(--teal-soft);color:var(--teal);border-radius:6px;cursor:pointer;font-size:12px;font-weight:600;margin-bottom:4px;">
          <span>➕ ${choose('إضافة مسؤول خارجي:', 'Add external assignee:')} "${esc(searchTerm.trim())}"</span>
          <span style="font-size:10px;background:var(--teal);color:#fff;border-radius:4px;padding:2px 6px;">${choose('إضافة سريعة', 'Quick Add')}</span>
        </div>
      `;
    }

    if (filteredUsers.length === 0 && !term) {
      itemsHtml += `<div style="padding:10px;font-size:11px;color:var(--muted);text-align:center;">${choose('لا يوجد مستخدمين آخرين', 'No other users')}</div>`;
    } else {
      filteredUsers.forEach(u => {
        const isChecked = selectedUserIds.includes(u.id);
        itemsHtml += `
          <div class="combobox-user-row" data-uid="${esc(u.id)}" style="display:flex;align-items:center;justify-content:space-between;padding:6px 10px;border-radius:6px;cursor:pointer;transition:background 0.1s;font-size:12px;margin-bottom:2px;">
            <div style="display:-webkit-inline-box;align-items:center;gap:8px;">
              <input type="checkbox" class="user-chk" data-uid="${esc(u.id)}" ${isChecked ? 'checked' : ''} style="margin:0;cursor:pointer;pointer-events:none;" />
              ${avatar(u, 'mini-avatar')}
              <div>
                <strong style="color:var(--ink);">${esc(choose(u.name, u.nameEn || u.name))}</strong>
                <span style="font-size:10px;color:var(--muted);display:block;">${esc(choose(u.jobTitleAr, u.jobTitleEn) || u.email || '')}</span>
              </div>
            </div>
            ${isChecked ? `<span style="font-size:11px;color:var(--teal);font-weight:bold;">✓</span>` : ''}
          </div>
        `;
      });
    }

    dropdown.innerHTML = itemsHtml;
    dropdown.style.display = 'block';
  }

  // Pre-rendered chips already present; sync inputs
  syncAssigneeInputs();

  if (searchInput) {
    searchInput.addEventListener('focus', () => {
      renderDropdown(searchInput.value);
    });

    searchInput.addEventListener('input', () => {
      const val = searchInput.value.trim();
      renderDropdown(val);
      if (addExternalBtn) {
        addExternalBtn.style.display = val.length > 1 ? 'inline-flex' : 'none';
      }
    });

    searchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        const val = searchInput.value.trim();
        if (val) {
          if (!selectedExternals.includes(val)) {
            selectedExternals.push(val);
            renderChips();
          }
          searchInput.value = '';
          if (addExternalBtn) addExternalBtn.style.display = 'none';
          if (dropdown) dropdown.style.display = 'none';
        }
      }
    });
  }

  if (addExternalBtn) {
    addExternalBtn.addEventListener('click', () => {
      const val = searchInput?.value.trim();
      if (val) {
        if (!selectedExternals.includes(val)) {
          selectedExternals.push(val);
          renderChips();
        }
        searchInput.value = '';
        addExternalBtn.style.display = 'none';
        if (dropdown) dropdown.style.display = 'none';
      }
    });
  }

  if (dropdown) {
    dropdown.addEventListener('click', (e) => {
      const extAction = e.target.closest('.dropdown-ext-action');
      if (extAction) {
        const val = searchInput?.value.trim();
        if (val && !selectedExternals.includes(val)) {
          selectedExternals.push(val);
          renderChips();
        }
        if (searchInput) searchInput.value = '';
        if (addExternalBtn) addExternalBtn.style.display = 'none';
        dropdown.style.display = 'none';
        return;
      }

      const row = e.target.closest('.combobox-user-row');
      if (row) {
        const uid = row.dataset.uid;
        if (selectedUserIds.includes(uid)) {
          selectedUserIds = selectedUserIds.filter(x => x !== uid);
        } else {
          selectedUserIds.push(uid);
        }
        renderChips();
        renderDropdown(searchInput?.value || '');
      }
    });
  }

  if (chipsContainer) {
    chipsContainer.addEventListener('click', (e) => {
      const btnRemoveUser = e.target.closest('.btn-remove-chip-user');
      if (btnRemoveUser) {
        const uid = btnRemoveUser.dataset.uid;
        selectedUserIds = selectedUserIds.filter(x => x !== uid);
        renderChips();
        if (dropdown && dropdown.style.display === 'block') {
          renderDropdown(searchInput?.value || '');
        }
        return;
      }

      const btnRemoveExt = e.target.closest('.btn-remove-chip-ext');
      if (btnRemoveExt) {
        const ext = btnRemoveExt.dataset.ext;
        selectedExternals = selectedExternals.filter(x => x !== ext);
        renderChips();
      }
    });
  }

  // 4. أداة التذكيرات المتعددة التفاعلية
  const remindersInput = modalRoot.querySelector('#task-reminders-input');
  const remindersListEl = modalRoot.querySelector('#task-reminders-list');
  const newReminderDatetime = modalRoot.querySelector('#new-reminder-datetime');
  const newReminderNote = modalRoot.querySelector('#new-reminder-note');
  const btnAddReminder = modalRoot.querySelector('#btn-add-reminder');

  let activeReminders = [];
  try {
    activeReminders = JSON.parse(remindersInput?.value || '[]');
  } catch (e) {
    activeReminders = [];
  }
  if (!Array.isArray(activeReminders)) activeReminders = [];

  function renderReminders() {
    if (!remindersListEl) return;
    if (remindersInput) remindersInput.value = JSON.stringify(activeReminders);
    remindersListEl.innerHTML = buildRemindersListHtml(activeReminders);
  }

  if (btnAddReminder) {
    btnAddReminder.addEventListener('click', () => {
      const dtVal = newReminderDatetime?.value;
      if (!dtVal) {
        showToast(choose('يرجى اختيار تاريخ ووقت التذكير.', 'Please pick a reminder date & time.'), true);
        return;
      }
      const noteVal = newReminderNote?.value.trim() || '';
      const newRem = {
        id: 'rem_temp_' + Math.random().toString(36).substr(2, 9),
        remindAt: new Date(dtVal).toISOString(),
        noteAr: noteVal
      };
      activeReminders.push(newRem);
      if (newReminderDatetime) newReminderDatetime.value = '';
      if (newReminderNote) newReminderNote.value = '';
      renderReminders();
      showToast(choose('تمت إضافة موعد التذكير للقائمة.', 'Reminder added to list.'));
    });
  }

  if (remindersListEl) {
    remindersListEl.addEventListener('click', async (e) => {
      const delBtn = e.target.closest('.btn-delete-reminder');
      if (delBtn) {
        const idx = Number(delBtn.dataset.idx);
        const remId = delBtn.dataset.remId;
        if (!isNaN(idx) && idx >= 0 && idx < activeReminders.length) {
          activeReminders.splice(idx, 1);
          renderReminders();
          if (remId && !remId.startsWith('rem_temp_')) {
            api(`/api/reminders/${remId}`, { method: 'DELETE' }).catch(() => { });
          }
          showToast(choose('تم حذف موعد التذكير.', 'Reminder deleted.'));
        }
      }
    });
  }

  modalRoot.addEventListener('mousedown', (e) => {
    if (
      dropdown?.contains(e.target) ||
      searchInput?.contains(e.target) ||
      addExternalBtn?.contains(e.target)
    ) return;
    if (dropdown) dropdown.style.display = 'none';
    if (addExternalBtn) addExternalBtn.style.display = 'none';
  });

  // 6. Intelligent Background Lazy Loading: Fetch full thread for this specific task on demand
  if (task && task.id && !task.id.startsWith('demo_')) {
    api(`/api/tasks/${encodeURIComponent(task.id)}/comments`, { silent: true }).then((res) => {
      if (res && Array.isArray(res.comments)) {
        if (!state.data.comments) state.data.comments = [];
        // Non-destructive idempotent merge: preserve any local optimistic or concurrent comments
        const commentMap = new Map(state.data.comments.map(c => [c.id, c]));
        for (const c of res.comments) {
          commentMap.set(c.id, c);
        }
        state.data.comments = Array.from(commentMap.values());
        const commentsListEl = document.getElementById('task-comments-list');
        if (commentsListEl && document.getElementById('task-comment-form')?.dataset?.taskId === task.id) {
          commentsListEl.innerHTML = renderTaskComments(task);
        }
      }
    }).catch(() => {});
  }
}

export function renderTaskComments(task) {
  const comments = (state.data.comments || []).filter(c => c.taskId === task.id).sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
  if (!comments.length) return `<div class="empty" style="padding:40px 10px;min-height:auto;">${icon('message', 18)}<span style="font-size:12px;">${choose('لا توجد تعليقات', 'No comments yet')}</span></div>`;
  return `<div style="display:flex;flex-direction:column;gap:12px;">${comments.map(c => {
    const user = c.user || (state.data?.users || []).find(u => u.id === c.userId) || state.data?.user || { name: 'DARC Member', id: '' };
    const isMe = Boolean(user.id && state.data?.user?.id && user.id === state.data.user.id);
    const canManage = isMe || (typeof isAdmin === 'function' && isAdmin());
    const content = esc(c.content).replace(/@([\p{L}\p{N}_.\-]+)/gu, '<strong style="color:var(--blue)">@$1</strong>');
    return `
      <div class="task-comment-item" data-comment-id="${esc(c.id)}" style="display:flex;gap:10px;flex-direction:${isMe ? 'row-reverse' : 'row'};">
        ${avatar(user)}
        <div style="display:flex;flex-direction:column;align-items:${isMe ? 'flex-end' : 'flex-start'};max-width:85%;">
          <div style="display:flex;align-items:center;gap:6px;margin-bottom:4px;">
            <strong style="font-size:12px;color:var(--ink);">${esc(choose(user.name, user.nameEn || user.name))}</strong>
            <span style="font-size:10px;color:var(--muted);">${dateLabel(c.createdAt, true)}</span>
            ${canManage ? `
              <div class="comment-item-actions" style="display:inline-flex;align-items:center;gap:3px;margin-inline-start:6px;">
                <button type="button" class="btn-comment-action" data-action="edit-task-comment" data-comment-id="${esc(c.id)}" data-task-id="${esc(task.id)}" title="${choose('تعديل التعليق', 'Edit comment')}" style="background:transparent;border:none;cursor:pointer;padding:2px;color:var(--muted);border-radius:4px;display:flex;align-items:center;transition:color 0.15s;" onmouseover="this.style.color='var(--blue)'" onmouseout="this.style.color='var(--muted)'">
                  ${icon('edit', 12)}
                </button>
                <button type="button" class="btn-comment-action" data-action="delete-task-comment" data-comment-id="${esc(c.id)}" data-task-id="${esc(task.id)}" title="${choose('حذف التعليق', 'Delete comment')}" style="background:transparent;border:none;cursor:pointer;padding:2px;color:var(--muted);border-radius:4px;display:flex;align-items:center;transition:color 0.15s;" onmouseover="this.style.color='var(--red)'" onmouseout="this.style.color='var(--muted)'">
                  ${icon('trash', 12)}
                </button>
              </div>
            ` : ''}
          </div>
          <div id="comment-bubble-${esc(c.id)}" style="background:${isMe ? 'var(--blue)' : 'var(--surface)'};color:${isMe ? '#fff' : 'var(--ink)'};padding:8px 12px;border-radius:12px;font-size:13px;border:${isMe ? 'none' : '1px solid var(--border)'};border-top-${isMe ? 'right' : 'left'}-radius:0;word-break:break-word;white-space:pre-wrap;line-height:1.4;">${content}</div>
        </div>
      </div>
    `;
  }).join('')}</div>`;
}

export function renderTaskDocuments(task) {
  const docs = state.data.documents.filter(d => d.taskId === task.id).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  if (!docs.length) return `<div class="empty" style="padding:20px 10px;min-height:auto;">${icon('document', 18)}<span style="font-size:12px;">${choose('لا توجد ملفات مرفوعة', 'No documents uploaded')}</span></div>`;
  return `<div class="doc-list" style="display:flex;flex-direction:column;gap:8px;">${docs.map(doc => `
    <div class="doc-item" style="display:flex;align-items:center;justify-content:space-between;padding:10px;background:var(--surface-soft);border:1px solid var(--line);border-radius:8px;transition:background 0.15s ease;">
      <div style="display:flex;align-items:center;gap:10px;overflow:hidden;flex:1;cursor:pointer;" data-action="preview-doc" data-doc-id="${doc.id}">
        <span style="color:var(--brand-teal);background:var(--teal-soft);padding:6px;border-radius:6px;display:flex;">${icon('document', 14)}</span>
        <div style="display:flex;flex-direction:column;overflow:hidden;flex:1;">
          <strong style="font-size:13px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;display:block;color:var(--ink);" title="${esc(doc.originalName)}">${esc(doc.originalName)}</strong>
          <span style="font-size:11px;color:var(--muted);">${dateLabel(doc.createdAt, true)} · ${esc(doc.user ? choose(doc.user.name, doc.user.nameEn || doc.user.name) : 'Team Member')} · ${doc.size > 1024 * 1024 ? (doc.size / (1024 * 1024)).toFixed(1) + 'MB' : Math.round(doc.size / 1024) + 'KB'}</span>
        </div>
      </div>
      <div style="display:flex;align-items:center;gap:4px;">
        <button class="btn btn-ghost btn-sm" data-action="copy-doc-link" data-doc-id="${doc.id}" style="padding:4px;min-width:0;height:auto;color:var(--brand-teal);" title="${choose('نسخ رابط المشاركة', 'Copy share link')}">${icon('link', 14)}</button>
        <button class="btn btn-ghost btn-sm" data-action="preview-doc" data-doc-id="${doc.id}" style="padding:4px;min-width:0;height:auto;color:var(--brand-teal);" title="${choose('معاينة المخطط في نافذة منبثقة', 'Preview in popup modal')}">${icon('eye', 14)}</button>
        ${(can('review_tasks') || can('approve_tasks') || can('upload_documents') || isAdmin()) ? `
          <select class="doc-status-select" data-doc-id="${doc.id}" style="font-size:11px;padding:2px 4px;border-radius:4px;border:1px solid var(--line);background:var(--surface);color:var(--ink);">
            <option value="draft" ${doc.status === 'draft' ? 'selected' : ''}>${choose('مسودة', 'Draft')}</option>
            ${(can('review_tasks') || isAdmin()) ? `<option value="review" ${doc.status === 'review' ? 'selected' : ''}>${choose('مراجعة', 'Review')}</option>` : ''}
            ${(can('approve_tasks') || isAdmin()) ? `<option value="approved" ${doc.status === 'approved' ? 'selected' : ''}>${choose('معتمد', 'Approved')}</option>` : ''}
            <option value="superseded" ${doc.status === 'superseded' ? 'selected' : ''}>${choose('ملغى', 'Superseded')}</option>
          </select>
        ` : ''}
        ${(can('upload_documents') || isAdmin()) ? `<button class="btn btn-ghost btn-sm" data-action="rename-doc" data-doc-id="${doc.id}" style="padding:4px;min-width:0;height:auto;" title="${choose('إعادة تسمية', 'Rename')}">${icon('edit', 14)}</button>` : ''}
        ${(can('delete_documents') || isAdmin()) ? `<button class="btn btn-ghost btn-sm" data-action="delete-doc" data-doc-id="${doc.id}" style="padding:4px;min-width:0;height:auto;color:var(--red);" title="${choose('حذف', 'Delete')}">${icon('trash', 14)}</button>` : ''}
      </div>
    </div>
  `).join('')}</div>`;
}

export async function openDocumentPreviewModal(docId) {
  if (!docId) return;
  let doc = (state.data?.documents || []).find(d => d.id === docId);
  if (!doc) {
    try {
      const fetched = await api(`/api/documents/${docId}`);
      if (fetched && fetched.id) {
        doc = fetched;
        if (!state.data.documents) state.data.documents = [];
        state.data.documents.push(doc);
      }
    } catch (err) {
      console.warn('[Documents] Failed to fetch doc preview on demand:', err);
    }
  }
  if (!doc) {
    showToast(choose('المستند غير موجود أو تم نقله لسلة المهملات.', 'Document not found or moved to trash.'), true);
    return;
  }

  let url = doc.diskFilename || `/api/documents/${doc.id}`;
  if (url.startsWith('file://') || url.startsWith('/') || !url.startsWith('http')) {
    url = `/api/documents/${doc.id}`;
  }
  let driveId = '';
  if (url.includes('drive.google.com')) {
    const match = url.match(/\/d\/([a-zA-Z0-9_-]+)/);
    if (match && match[1]) driveId = match[1];
  }

  const rawEmbed = driveId ? `https://drive.google.com/file/d/${encodeURIComponent(driveId)}/preview` : url;
  const isSafeProtocol = /^(https?:\/\/|\/)/i.test(rawEmbed);
  const embedUrl = isSafeProtocol ? rawEmbed : 'about:blank';
  const rawExternal = driveId ? `https://drive.google.com/file/d/${encodeURIComponent(driveId)}/view?usp=drivesdk` : (url.startsWith('http') ? url : `${window.location.origin}${url}`);
  const externalViewUrl = /^(https?:\/\/|\/)/i.test(rawExternal) ? rawExternal : '#';
  const downloadUrl = `/api/documents/${encodeURIComponent(doc.id)}`;

  const isImage = /\.(jpe?g|png|gif|webp|svg|heic)$/i.test(doc.originalName) || (doc.mimeType && doc.mimeType.startsWith('image/'));
  const fileSize = doc.size > 1024 * 1024 ? (doc.size / (1024 * 1024)).toFixed(1) + ' MB' : Math.round((doc.size || 0) / 1024) + ' KB';

  const isDemoDoc = (doc.id && String(doc.id).includes('demo')) || (driveId && driveId.startsWith('demo_sample_')) || Boolean(state.data?.isDemo);

  let overlay = document.getElementById('preview-modal-overlay');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.id = 'preview-modal-overlay';
    overlay.style.position = 'fixed';
    overlay.style.inset = '0';
    overlay.style.zIndex = '1300';
    overlay.style.background = 'rgba(0, 0, 0, 0.75)';
    overlay.style.backdropFilter = 'blur(4px)';
    overlay.style.display = 'flex';
    overlay.style.alignItems = 'center';
    overlay.style.justifyContent = 'center';
    overlay.style.padding = '20px';
    document.body.appendChild(overlay);
  }

  overlay.innerHTML = `
    <div style="background:var(--surface);width:95%;max-width:1100px;height:88vh;border-radius:12px;box-shadow:0 25px 50px rgba(0,0,0,0.3);overflow:hidden;display:flex;flex-direction:column;border:1px solid var(--border);">
      <div style="display:flex;justify-content:space-between;align-items:center;padding:14px 20px;border-bottom:1px solid var(--line);background:var(--surface);">
        <div style="display:flex;align-items:center;gap:10px;overflow:hidden;">
          <span style="color:var(--brand-teal);background:var(--teal-soft);padding:6px;border-radius:6px;display:flex;">${icon('document', 16)}</span>
          <div style="overflow:hidden;">
            <h2 style="margin:0;font-size:15px;color:var(--ink);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;" title="${esc(doc.originalName)}">${esc(doc.originalName)}</h2>
          </div>
        </div>
        <div style="display:flex;align-items:center;gap:8px;flex-shrink:0;">
          <button type="button" class="btn btn-soft btn-sm" data-action="copy-doc-link" data-doc-id="${esc(doc.id)}" style="display:flex;align-items:center;gap:6px;" title="${choose('نسخ رابط المشاركة', 'Copy share link')}">
            ${icon('link', 13)} <span class="hide-mobile">${choose('نسخ الرابط', 'Copy Link')}</span>
          </button>
          ${!isDemoDoc ? `
          <a href="${esc(externalViewUrl)}" target="_blank" rel="noopener noreferrer" class="btn btn-soft btn-sm" style="text-decoration:none;display:flex;align-items:center;gap:6px;" title="${choose('فتح في Google Drive', 'Open in Google Drive')}">
            ${icon('globe', 13)} <span class="hide-mobile">${choose('فتح في Drive', 'Open in Drive')}</span>
          </a>
          <a href="${esc(downloadUrl)}" target="_blank" rel="noopener noreferrer" download class="btn btn-primary btn-sm" style="text-decoration:none;display:flex;align-items:center;gap:6px;" title="${choose('تحميل المخطط', 'Download')}">
            ${icon('download', 13)} <span class="hide-mobile">${choose('تحميل', 'Download')}</span>
          </a>
          ` : ''}
          <button type="button" class="btn btn-ghost btn-sm" id="close-preview-modal-btn" data-action="close-modal" style="padding:6px;min-width:0;margin-inline-start:4px;" title="${choose('إغلاق', 'Close')}">${icon('close', 18)}</button>
        </div>
      </div>
      <div style="flex:1;position:relative;background:#1a1a1a;overflow:hidden;display:flex;align-items:center;justify-content:center;">
        ${isDemoDoc ? `
          <div style="width:100%;height:100%;background:#0f172a;position:relative;display:flex;flex-direction:column;align-items:center;justify-content:center;color:#e2e8f0;padding:24px;text-align:center;">
            <div style="position:absolute;inset:0;background-image:radial-gradient(rgba(20,184,166,0.15) 1px, transparent 1px);background-size:24px 24px;opacity:0.6;pointer-events:none;"></div>
            <div style="background:rgba(15,23,42,0.85);backdrop-filter:blur(8px);border:1px solid rgba(20,184,166,0.3);border-radius:12px;padding:32px 40px;max-width:540px;box-shadow:0 20px 40px rgba(0,0,0,0.5);z-index:2;">
              <div style="font-size:48px;margin-bottom:16px;">📐</div>
              <h3 style="font-size:18px;font-weight:700;color:#fff;margin:0 0 8px 0;">${esc(doc.originalName)}</h3>
              <p style="font-size:13px;color:#94a3b8;margin:0 0 20px 0;line-height:1.6;">
                ${choose('مخطط معماري هندسي تفصيلي (بيئة عرض تجريبية). عند العمل على مشروع حقيقي يمكنك رفع ملفات PDF ومخططات DWG بدقة كاملة.', 'Detailed architectural CAD drawing (Demo showcase). In production projects, uploaded PDF and DWG drawings render directly here.')}
              </p>
              <div style="display:flex;justify-content:center;gap:12px;font-size:12px;color:#38bdf8;">
                <span style="background:rgba(56,189,248,0.1);padding:4px 10px;border-radius:6px;border:1px solid rgba(56,189,248,0.2);">${choose('الحجم المقدر', 'Size')}: ${fileSize}</span>
                <span style="background:rgba(20,184,166,0.1);padding:4px 10px;border-radius:6px;border:1px solid rgba(20,184,166,0.2);color:#2dd4bf;">${choose('مخطط معتمد', 'Approved Drawing')}</span>
              </div>
            </div>
          </div>
        ` : (!driveId && isImage ? `
          <div style="width:100%;height:100%;overflow:auto;display:flex;align-items:center;justify-content:center;padding:15px;">
            <img src="${esc(embedUrl)}" alt="${esc(doc.originalName)}" style="max-width:100%;max-height:100%;object-fit:contain;border-radius:4px;box-shadow:0 4px 20px rgba(0,0,0,0.5);" onerror="this.onerror=null;this.src='${esc(downloadUrl)}';" />
          </div>
        ` : `
          <iframe src="${esc(embedUrl)}" sandbox="allow-scripts allow-same-origin allow-popups" style="width:100%;height:100%;border:none;background:#fff;" allow="autoplay" loading="lazy"></iframe>
        `)}
      </div>
    </div>
  `;
  overlay.style.display = 'flex';

  document.getElementById('close-preview-modal-btn')?.addEventListener('click', () => {
    overlay.style.display = 'none';
    overlay.innerHTML = '';
  });

  overlay.onclick = (e) => {
    if (e.target === overlay) {
      overlay.style.display = 'none';
      overlay.innerHTML = '';
    }
  };
}

export function STATUS_OPTIONS() { return [['not_started', t('notStarted')], ['in_progress', t('inProgress')], ['review', t('review')], ['approval', t('approval')], ['done', t('done')], ['blocked', t('blocked')], ['canceled', t('canceled')]]; }


export function drawTimelineArrows() {
  const container = document.querySelector('.timeline-container > div');
  const svg = document.querySelector('.timeline-svg');
  if (!container || !svg) return;

  // Clear existing lines
  svg.innerHTML = '';

  const bars = Array.from(document.querySelectorAll('.timeline-bar'));
  const taskRects = {};

  // Cache rects relative to container
  const containerRect = container.getBoundingClientRect();
  bars.forEach(bar => {
    const rect = bar.getBoundingClientRect();
    taskRects[bar.dataset.taskId] = {
      left: rect.left - containerRect.left,
      right: rect.right - containerRect.left,
      top: rect.top - containerRect.top,
      bottom: rect.bottom - containerRect.top,
      width: rect.width,
      height: rect.height,
      center: (rect.top - containerRect.top) + (rect.height / 2)
    };
  });

  let paths = '';
  const isRtl = state.lang === 'ar';

  bars.forEach(bar => {
    const taskId = bar.dataset.taskId;
    const task = (state.data?.tasks || []).find(t => t.id === taskId);
    const deps = task?.dependencies || task?.customFields?.dependencies || [];
    if (!task || !deps.length) return;

    const dest = taskRects[taskId];
    if (!dest) return;

    deps.forEach(depId => {
      const source = taskRects[depId];
      if (!source) return; // Maybe dependency isn't scheduled

      // Draw from source end to dest start
      const startX = isRtl ? source.left : source.right;
      const startY = source.center;
      const endX = isRtl ? dest.right : dest.left;
      const endY = dest.center;

      // SVG Path (curve)
      const cpX = startX + (isRtl ? -20 : 20); // Control point x

      paths += `<path d="M ${startX} ${startY} C ${cpX} ${startY}, ${cpX} ${endY}, ${endX} ${endY}" fill="none" stroke="var(--ink-soft)" stroke-width="1.5" stroke-dasharray="3,3" marker-end="url(#arrowhead)" opacity="0.6"/>`;
    });
  });

  svg.innerHTML = `
    <defs>
      <marker id="arrowhead" markerWidth="6" markerHeight="4" refX="5" refY="2" orient="auto">
        <polygon points="0 0, 6 2, 0 4" fill="var(--ink-soft)" />
      </marker>
    </defs>
    ${paths}
  `;
}

