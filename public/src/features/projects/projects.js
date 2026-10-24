
import { state } from '../../core/state.js';
import { api } from '../../core/api.js';
import { renderTaskSortSelect, getSavedTaskSort } from '../tasks/tasks.js';

export function projectRow(project) {
  return `<div class="project-row"><div class="project-main"><span class="project-symbol">${icon('building', 17)}</span><div class="project-name"><strong>${esc(choose(project.nameAr, project.nameEn))}</strong><span>${esc(project.code)} · ${esc(choose(project.clientAr, project.clientEn))}</span></div></div>${projectProgress(project)}<div class="project-owner">${avatar(project.manager)}<span>${esc(project.manager ? choose(project.manager.name, project.manager.nameEn || project.manager.name) : '—')}</span></div><button class="project-arrow" data-action="open-project" data-project-id="${esc(project.id)}" aria-label="${t('viewDetails')}">${icon(state.lang === 'ar' ? 'arrowLeft' : 'arrow', 14)}</button></div>`;
}

export function getDaysLeftBadge(dueDate) {
  if (!dueDate) return '';
  const due = new Date(`${dueDate}T23:59:59`);
  const diff = Math.ceil((due - new Date()) / 86_400_000);

  let color = 'var(--mint-strong)';
  let bg = 'var(--mint)';
  let label = '';

  if (diff < 0) {
    color = 'var(--red)';
    bg = 'var(--red-soft)';
    label = choose(`متأخر ${Math.abs(diff)} يوم`, `${Math.abs(diff)}d overdue`);
  } else if (diff === 0) {
    color = 'var(--red)';
    bg = 'var(--red-soft)';
    label = choose('يستحق اليوم', 'Due today');
  } else if (diff <= 2) {
    color = 'var(--red)';
    bg = 'var(--red-soft)';
    label = choose(`باقي ${diff} يوم`, `${diff}d left`);
  } else if (diff <= 7) {
    color = 'var(--amber)';
    bg = 'var(--amber-soft)';
    label = choose(`باقي ${diff} أيام`, `${diff}d left`);
  } else {
    color = 'var(--mint-strong)';
    bg = 'var(--mint)';
    label = choose(`باقي ${diff} يوم`, `${diff}d left`);
  }

  return `<span class="days-left-badge" style="display:inline-flex;align-items:center;gap:3px;padding:2px 8px;border-radius:12px;font-size:10px;font-weight:700;color:${color};background:${bg};border:1px solid currentColor;">${icon('clock', 11)} ${label}</span>`;
}

export function getProjectTeamData(project) {
  const users = state.data?.users || [];
  const projectTasks = (state.data?.tasks || []).filter(t => t.projectId === project.id);
  const memberIdSet = new Set();
  const externalNamesSet = new Set();

  if (project.managerId) memberIdSet.add(project.managerId);
  projectTasks.forEach(t => {
    if (t.assigneeId) memberIdSet.add(t.assigneeId);
    const addAssignees = t.customFields?.additionalAssignees || t.customFields?.additional_assignees || [];
    addAssignees.forEach(id => memberIdSet.add(id));

    const ext = t.customFields?.externalAssignees || t.customFields?.external_assignees || [];
    ext.forEach(name => {
      if (name && typeof name === 'string' && name.trim()) externalNamesSet.add(name.trim());
    });
  });

  const internalMembers = Array.from(memberIdSet).map(id => users.find(u => u.id === id)).filter(Boolean);
  const externalMembers = Array.from(externalNamesSet);

  return { internalMembers, externalMembers };
}

export function getProjectTeam(project) {
  return getProjectTeamData(project).internalMembers;
}

export function renderProjectTeamAvatars(members, maxVisible = 4, clickable = true, externalMembers = []) {
  if ((!members || !members.length) && (!externalMembers || !externalMembers.length)) {
    return `<span style="font-size:11px;color:var(--muted);">${choose('لا يوجد فريق محدد', 'No team assigned')}</span>`;
  }

  const visible = (members || []).slice(0, maxVisible);
  const remaining = (members || []).length - maxVisible;
  const allNames = (members || []).map(m => choose(m.name, m.nameEn || m.name)).join('، ');

  let html = `<div class="project-team-stack" style="display:inline-flex;align-items:center;flex-wrap:wrap;gap:6px;position:relative;vertical-align:middle;">`;

  visible.forEach((m) => {
    const memberName = choose(m.name, m.nameEn || m.name);
    const clickAttr = clickable
      ? `data-action="filter-by-member" data-member-id="${esc(m.id)}" style="cursor:pointer;display:inline-flex;align-items:center;gap:5px;background:var(--surface-soft);padding:2px 8px 2px 3px;border-radius:999px;border:1px solid var(--line);transition:all .15s ease;" onmouseover="this.style.borderColor='var(--brand-teal)';this.style.background='var(--mint)'" onmouseout="this.style.borderColor='var(--line)';this.style.background='var(--surface-soft)'"`
      : `style="display:inline-flex;align-items:center;gap:5px;background:var(--surface-soft);padding:2px 8px 2px 3px;border-radius:999px;border:1px solid var(--line);"`;
    html += `
      <span class="team-member-chip" ${clickAttr} title="${esc(memberName)} (${esc(roleName(m))})">
        ${avatar(m, 'mini-avatar')}
        <span style="font-size:11px;font-weight:600;color:var(--ink);">${esc(memberName)}</span>
      </span>
    `;
  });

  if (remaining > 0) {
    html += `<span class="team-count-chip" style="background:var(--surface-soft);border:1px solid var(--line);border-radius:999px;padding:2px 7px;display:inline-flex;align-items:center;font-size:10.5px;font-weight:700;color:var(--ink-soft);box-shadow:var(--shadow-sm);" title="${esc(allNames)}">+${remaining} ${choose('آخرين', 'more')}</span>`;
  }

  if (externalMembers && externalMembers.length > 0) {
    html += `<span class="mini-badge" style="font-size:10px;padding:2px 6px;background:var(--surface-soft);color:var(--teal);border:1px solid var(--line);border-radius:999px;" title="${esc(externalMembers.join('، '))}">🌐 +${externalMembers.length} ${choose('خارجي', 'ext')}</span>`;
  }

  // Hover Tooltip: fixed width, single horizontal row with smooth horizontal scrollbar
  html += `<div class="team-hover-tooltip" style="display:none;position:absolute;top:calc(100% + 4px);inset-inline-start:0;background:var(--surface);border:1px solid var(--line);border-radius:10px;box-shadow:0 8px 24px rgba(0,0,0,0.14);padding:10px 14px;z-index:90;width:330px;max-width:330px;pointer-events:auto;">
    <strong style="display:block;font-size:12px;color:var(--ink);margin-bottom:8px;border-bottom:1px solid var(--line);padding-bottom:4px;">${choose('فريق العمل الداخلي', 'Internal Team')} (${(members || []).length})</strong>
    <div style="display:flex;flex-wrap:nowrap;align-items:center;gap:8px;overflow-x:auto;padding-bottom:6px;scrollbar-width:thin;">

      ${(members || []).map(m => `
        <div ${clickable ? `data-action="filter-by-member" data-member-id="${esc(m.id)}" title="${esc(choose('فلترة مهام ' + (m.name || ''), 'Filter tasks of ' + (m.nameEn || m.name || '')))}"` : ''} style="display:flex;align-items:center;gap:6px;background:var(--surface-soft);border:1px solid var(--line);border-radius:8px;padding:4px 8px;flex-shrink:0;${clickable ? 'cursor:pointer;transition:all 0.15s;' : ''}" ${clickable ? `onmouseover="this.style.borderColor='var(--teal)';this.style.background='var(--teal-subtle)'" onmouseout="this.style.borderColor='var(--line)';this.style.background='var(--surface-soft)'"` : ''}>
          ${avatar(m, 'micro-avatar')}
          <div style="display:flex;flex-direction:column;line-height:1.1;white-space:nowrap;">
            <span style="font-size:11px;color:var(--ink);font-weight:600;">${esc(choose(m.name, m.nameEn || m.name))}</span>
            <span style="font-size:9px;color:var(--muted);">${esc(roleName(m))}</span>
          </div>
        </div>
      `).join('')}
    </div>
    
    ${externalMembers && externalMembers.length > 0 ? `
      <hr style="border:0;border-top:1px dashed var(--line);margin:8px 0 6px;" />
      <strong style="display:block;font-size:11px;color:var(--teal);margin-bottom:6px;">🌐 ${choose('الشركاء والمتعاونون الخارجيون', 'External Partners')} (${externalMembers.length})</strong>
      <div style="display:flex;flex-wrap:nowrap;align-items:center;gap:8px;overflow-x:auto;padding-bottom:4px;scrollbar-width:thin;">
        ${externalMembers.map(ext => `
          <div style="display:flex;align-items:center;gap:5px;font-size:11px;color:var(--ink);background:var(--surface-soft);border:1px solid var(--line);border-radius:8px;padding:4px 8px;flex-shrink:0;white-space:nowrap;">
            <span style="font-size:11px;color:var(--teal);">🌐</span>
            <span style="font-weight:500;">${esc(ext)}</span>
          </div>
        `).join('')}
      </div>
    ` : ''}

    ${clickable ? `<div style="margin-top:6px;padding-top:4px;border-top:1px dashed var(--line);font-size:9px;color:var(--teal);">${choose('💡 اضغط على أي عضو لفلترة مهامه', '💡 Click member to filter tasks')}</div>` : ''}
  </div>`;

  html += `</div>`;
  return html;
}

export function renderProjectTimelineBar(project) {
  if (!project.dueDate) return '';
  const start = new Date(project.startDate || project.createdAt || (Date.now() - 30 * 86400000));
  const end = new Date(`${project.dueDate}T23:59:59`);
  const now = new Date();

  const total = end.getTime() - start.getTime();
  let elapsedPercent = 0;
  if (total > 0) {
    elapsedPercent = Math.min(100, Math.max(0, Math.round(((now.getTime() - start.getTime()) / total) * 100)));
  }

  const isTimeOverdue = now > end;
  const isTimeTight = elapsedPercent >= 80 && !isTimeOverdue;
  const barColor = isTimeOverdue ? 'var(--red)' : isTimeTight ? 'var(--amber)' : 'var(--blue)';

  return `
    <div class="project-timeline-indicator" style="background:var(--surface-soft);border:1px solid var(--line);border-radius:12px;padding:12px 16px;margin:14px 0;">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:6px;font-size:11px;">
        <span style="color:var(--ink-soft);display:flex;align-items:center;gap:4px;">
          ${icon('clock', 12)}
          <strong>${choose('المؤشر الزمني للمشروع', 'Project Schedule Elapsed')}</strong>: 
          <span style="color:${barColor};font-weight:bold;">${isTimeOverdue ? choose('انتهى موعد التسليم!', 'Deadline passed!') : choose(`مضى ${elapsedPercent}% من الوقت`, `${elapsedPercent}% time elapsed`)}</span>
        </span>
        <span style="color:var(--muted);font-size:10px;">${dateLabel(project.startDate)} ➔ ${dateLabel(project.dueDate)}</span>
      </div>
      <div class="progress-track" style="height:6px;background:var(--line);border-radius:6px;overflow:hidden;position:relative;">
        <div class="progress-fill" style="width:${elapsedPercent}%;background:${barColor};height:100%;border-radius:6px;transition:width 0.4s ease;"></div>
      </div>
    </div>
  `;
}

export function renderProjectCardTeamAvatars(members = [], externalMembers = [], maxVisible = 3) {
  const total = members.length + externalMembers.length;
  if (total === 0) {
    return `<span style="font-size:11px;color:var(--muted);">—</span>`;
  }

  const visible = members.slice(0, maxVisible);
  const remaining = total - visible.length;
  const allNames = [
    ...members.map(m => choose(m.name, m.nameEn || m.name)),
    ...externalMembers
  ].join('، ');

  let html = `<div class="project-card-team-stack" tabindex="0" role="button" aria-haspopup="true" aria-label="${choose('عرض فريق العمل', 'View Team')}">`;

  // Avatar circles row
  html += `<div class="project-card-avatar-stack" style="display:inline-flex;align-items:center;">`;
  visible.forEach((m, idx) => {
    html += `
      <div style="margin-inline-start:${idx === 0 ? '0' : '-8px'};position:relative;z-index:${10 - idx};border:2px solid var(--surface);border-radius:50%;overflow:hidden;flex-shrink:0;">
        ${avatar(m, 'mini-avatar')}
      </div>
    `;
  });

  if (remaining > 0) {
    html += `
      <div style="margin-inline-start:-8px;position:relative;z-index:0;width:24px;height:24px;border-radius:50%;background:var(--surface-soft);border:2px solid var(--surface);display:flex;align-items:center;justify-content:center;font-size:9.5px;font-weight:700;color:var(--ink-soft);flex-shrink:0;">
        +${remaining}
      </div>
    `;
  }

  if (externalMembers && externalMembers.length > 0 && remaining <= 0) {
    html += `<span style="margin-inline-start:4px;font-size:9.5px;color:var(--teal);background:var(--mint);padding:1px 5px;border-radius:999px;font-weight:700;">🌐</span>`;
  }
  html += `</div>`;

  // Small popup menu displaying all members
  html += `
    <div class="project-card-team-popup" onclick="event.stopPropagation();">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px;padding-bottom:5px;border-bottom:1px solid var(--line);">
        <strong style="font-size:11px;color:var(--ink);">${choose('فريق العمل', 'Team Members')}</strong>
        <span class="mini-badge" style="font-size:9.5px;padding:1px 6px;">${total}</span>
      </div>
      <div style="display:flex;flex-direction:column;gap:6px;">
        ${members.map(m => `
          <div style="display:flex;align-items:center;gap:8px;padding:3px 4px;border-radius:6px;transition:background 0.15s ease;" onmouseover="this.style.background='var(--surface-soft)'" onmouseout="this.style.background='transparent'">
            ${avatar(m, 'micro-avatar')}
            <div style="display:flex;flex-direction:column;line-height:1.2;min-width:0;flex:1;">
              <span style="font-size:11px;font-weight:600;color:var(--ink);overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${esc(choose(m.name, m.nameEn || m.name))}</span>
              <span style="font-size:9px;color:var(--muted);">${esc(roleName(m))}</span>
            </div>
          </div>
        `).join('')}
      </div>
      ${externalMembers && externalMembers.length > 0 ? `
        <div style="margin-top:8px;padding-top:6px;border-top:1px dashed var(--line);">
          <span style="font-size:9.5px;font-weight:700;color:var(--teal);display:block;margin-bottom:4px;">🌐 ${choose('الشركاء الخارجيون', 'External Partners')} (${externalMembers.length})</span>
          <div style="display:flex;flex-direction:column;gap:3px;">
            ${externalMembers.map(ext => `
              <div style="font-size:10.5px;color:var(--ink-soft);padding:2px 4px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">
                • ${esc(ext)}
              </div>
            `).join('')}
          </div>
        </div>
      ` : ''}
    </div>
  `;

  html += `</div>`;
  return html;
}

export function projectCard(project) {
  const { internalMembers, externalMembers } = getProjectTeamData(project);
  const manager = project.manager || (state.data?.users || []).find(u => u.id === project.managerId);
  const daysLeftBadge = getDaysLeftBadge(project.dueDate);
  const descText = choose(project.descriptionAr || project.clientAr, project.descriptionEn || project.clientEn);

  return `<article class="project-card">
    <div class="project-card-top">
      <div style="display:flex;align-items:center;gap:10px;min-width:0;flex:1;">
        <span class="project-card-symbol">${icon('building', 19)}</span>
        <div style="min-width:0;flex:1;">
          <span class="eyebrow" style="font-size:10px;margin-bottom:2px;display:block;">${esc(project.code)}</span>
          <h3 class="project-card-title" title="${esc(choose(project.nameAr, project.nameEn))}">${esc(choose(project.nameAr, project.nameEn))}</h3>
        </div>
      </div>
      <div style="display:flex;align-items:center;gap:6px;flex-shrink:0;align-self:flex-start;">
        ${project._isOfflinePending ? `<span class="badge badge-amber" style="font-size:9px;padding:1px 5px;" title="${choose('بانتظار المزامنة مع السيرفر', 'Pending cloud sync')}">⏳ ${choose('معلقة', 'Pending')}</span>` : ''}
        <span class="status-badge ${esc(project.health)}">${esc(statusText(project.health))}</span>
      </div>
    </div>
    
    <p class="project-card-desc" title="${esc(descText || '')}">
      ${descText ? esc(descText) : `<span style="color:var(--muted);font-style:italic;">${choose('لا يوجد وصف مسجل لهذا المشروع', 'No description registered')}</span>`}
    </p>
    
    <div class="project-card-meta-row">
      <div class="project-card-manager" style="display:flex;align-items:center;gap:6px;min-width:0;flex:1;">
        ${avatar(manager, 'mini-avatar')}
        <div style="display:flex;flex-direction:column;line-height:1.2;min-width:0;">
          <span style="font-size:9px;color:var(--muted);">${t('manager')}</span>
          <strong style="font-size:11px;color:var(--ink);overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${esc(manager ? choose(manager.name, manager.nameEn || manager.name) : '—')}</strong>
        </div>
      </div>
      <div class="project-card-team" style="display:flex;flex-direction:column;align-items:flex-end;line-height:1.2;flex-shrink:0;">
        <span style="font-size:9px;color:var(--muted);margin-bottom:3px;">${t('team')} (${internalMembers.length + externalMembers.length})</span>
        ${renderProjectCardTeamAvatars(internalMembers, externalMembers, 3)}
      </div>
    </div>

    <div class="project-card-bottom">
      <div class="project-card-date">
        <span style="display:block;margin-bottom:3px;">${t('deadline')}</span>
        <div style="display:flex;align-items:center;gap:6px;flex-wrap:nowrap;">
          <strong>${project.dueDate ? dateLabel(project.dueDate, true) : '—'}</strong>
          ${daysLeftBadge}
        </div>
      </div>
      <div class="project-card-progress">
        <span>${project.progress}%</span>
        <div class="progress-track"><div class="progress-fill ${project.health === 'off_track' ? 'red' : project.health === 'at_risk' ? 'amber' : ''}" style="width:${project.progress}%"></div></div>
      </div>
    </div>

    <button class="btn btn-soft btn-sm" style="width:100%;" data-action="open-project" data-project-id="${esc(project.id)}">
      ${t('viewDetails')} ${icon(state.lang === 'ar' ? 'arrowLeft' : 'arrow', 13)}
    </button>
  </article>`;
}

export function renderProjectOverviewTab(project, tasks, members, externalMembers = []) {
  const manager = project.manager || (state.data?.users || []).find(u => u.id === project.managerId);
  const completedTasks = tasks.filter(t => t.status === 'done').length;
  const inProgressTasks = tasks.filter(t => t.status === 'in_progress').length;
  const overdueTasks = tasks.filter(isOverdue).length;

  return `
    <div class="project-overview-panel" style="display:flex;flex-direction:column;gap:20px;">
      <!-- Stats Row -->
      <div class="metrics-grid" style="grid-template-columns:repeat(auto-fit, minmax(180px, 1fr));gap:12px;">
        <div class="metric-card teal" style="padding:14px 18px;">
          <span class="metric-label">${choose('إجمالي المهام', 'Total Tasks')}</span>
          <div class="metric-value">${tasks.length}</div>
          <span class="metric-note up">${completedTasks} ${t('done')}</span>
        </div>
        <div class="metric-card blue" style="padding:14px 18px;">
          <span class="metric-label">${choose('قيد التنفيذ', 'In Progress')}</span>
          <div class="metric-value">${inProgressTasks}</div>
          <span class="metric-note">${choose('عمل جارٍ', 'Active work')}</span>
        </div>
        <div class="metric-card ${overdueTasks ? 'red' : 'teal'}" style="padding:14px 18px;">
          <span class="metric-label">${t('overdue')}</span>
          <div class="metric-value">${overdueTasks}</div>
          <span class="metric-note ${overdueTasks ? 'alert' : 'up'}">${overdueTasks ? choose('تحتاج تدخلاً عاجلاً', 'Needs urgent action') : choose('لا يوجد تأخير', 'On track')}</span>
        </div>
        <div class="metric-card amber" style="padding:14px 18px;">
          <span class="metric-label">${choose('فريق العمل', 'Team Size')}</span>
          <div class="metric-value">${members.length + (externalMembers?.length || 0)}</div>
          <span class="metric-note">${choose('أعضاء مساهمون', 'Active contributors')}</span>
        </div>
      </div>

      <!-- Schedule Timeline Bar -->
      ${renderProjectTimelineBar(project)}

      <!-- Details Grid -->
      <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(300px, 1fr));gap:20px;">
        <!-- Left: Project Scope & Client -->
        <div class="panel" style="padding:20px;">
          <h3 style="margin:0 0 14px;font-size:14px;display:flex;align-items:center;gap:8px;">
            ${icon('document', 16)}
            ${choose('نطاق وتفاصيل المشروع', 'Project Scope & Details')}
          </h3>
          <p style="color:var(--ink-soft);font-size:13px;line-height:1.7;margin-bottom:18px;">
            ${esc(project.descriptionAr || project.descriptionEn || choose('لا يوجد وصف مسجل لهذا المشروع حالياً.', 'No description available for this project.'))}
          </p>

          <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;background:var(--surface-soft);padding:14px;border-radius:10px;border:1px solid var(--line);">
            <div>
              <span style="font-size:10px;color:var(--muted);display:block;">${t('client')}</span>
              <strong style="font-size:13px;color:var(--ink);">${esc(choose(project.clientAr, project.clientEn) || '—')}</strong>
            </div>
            <div>
              <span style="font-size:10px;color:var(--muted);display:block;">${t('lifecycle')}</span>
              <strong style="font-size:13px;color:var(--ink);">${esc(statusText(project.lifecycle))}</strong>
            </div>
            <div>
              <span style="font-size:10px;color:var(--muted);display:block;">${t('startDate')}</span>
              <strong style="font-size:12px;color:var(--ink);">${dateLabel(project.startDate, true)}</strong>
            </div>
            <div>
              <span style="font-size:10px;color:var(--muted);display:block;">${t('dueDate')}</span>
              <strong style="font-size:12px;color:var(--ink);">${dateLabel(project.dueDate, true)}</strong>
            </div>
          </div>
        </div>

        <!-- Right: Team & Leadership -->
        <div class="panel" style="padding:20px;">
          <h3 style="margin:0 0 14px;font-size:14px;display:flex;align-items:center;gap:8px;">
            ${icon('users', 16)}
            ${choose('القيادة وفريق العمل', 'Leadership & Team')}
          </h3>

          <!-- Manager card -->
          <div style="display:flex;align-items:center;gap:12px;padding:12px;border:1px solid var(--line);border-radius:10px;margin-bottom:16px;background:var(--surface);">
            ${avatar(manager)}
            <div style="flex:1;">
              <span style="font-size:10px;color:var(--teal);font-weight:700;text-transform:uppercase;">${t('manager')}</span>
              <strong style="font-size:13px;color:var(--ink);display:block;">${esc(manager ? choose(manager.name, manager.nameEn || manager.name) : '—')}</strong>
              <span style="font-size:11px;color:var(--muted);">${esc(manager?.email || '')}</span>
            </div>
          </div>

          <!-- Members list -->
          <span style="font-size:11px;color:var(--muted);margin-bottom:8px;display:block;">${choose('أعضاء الفريق الداخلي:', 'Internal Team Members:')}</span>
          <div style="display:flex;flex-direction:column;gap:8px;max-height:220px;overflow-y:auto;">
            ${members.map(m => {
    const count = tasks.filter(t => t.assigneeId === m.id).length;
    return `
                <div style="display:flex;align-items:center;justify-content:space-between;padding:8px 10px;background:var(--surface-soft);border-radius:8px;font-size:12px;">
                  <div style="display:flex;align-items:center;gap:8px;">
                    ${avatar(m, 'mini-avatar')}
                    <div>
                      <strong style="display:block;font-size:12px;color:var(--ink);">${esc(choose(m.name, m.nameEn || m.name))}</strong>
                      <span style="font-size:10px;color:var(--muted);">${esc(roleName(m))}</span>
                    </div>
                  </div>
                  <span class="mini-badge" style="font-size:10px;padding:2px 6px;">${count} ${t('tasks')}</span>
                </div>
              `;
  }).join('')}
          </div>

          ${externalMembers && externalMembers.length > 0 ? `
            <hr style="border:0;border-top:1px dashed var(--line);margin:14px 0 10px;" />
            <span style="font-size:11px;color:var(--teal);font-weight:bold;margin-bottom:8px;display:flex;align-items:center;gap:6px;">
              🌐 ${choose('الشركاء والمتعاونون الخارجيون:', 'External Partners & Collaborators:')}
            </span>
            <div style="display:flex;flex-direction:column;gap:8px;max-height:180px;overflow-y:auto;">
              ${externalMembers.map(extName => {
    const extCount = tasks.filter(t => {
      const list = t.customFields?.externalAssignees || t.customFields?.external_assignees || [];
      return list.includes(extName);
    }).length;
    return `
                  <div style="display:flex;align-items:center;justify-content:space-between;padding:8px 10px;background:var(--surface-soft);border-radius:8px;font-size:12px;">
                    <div style="display:flex;align-items:center;gap:8px;">
                      <span style="font-size:14px;">🌐</span>
                      <div>
                        <strong style="display:block;font-size:12px;color:var(--ink);">${esc(extName)}</strong>
                        <span style="font-size:10px;color:var(--muted);">${choose('شريك / جهة خارجية', 'External Partner')}</span>
                      </div>
                    </div>
                    <span class="mini-badge" style="font-size:10px;padding:2px 6px;">${extCount} ${t('tasks')}</span>
                  </div>
                `;
  }).join('')}
            </div>
          ` : ''}
        </div>
      </div>
    </div>
  `;
}

export function renderProjects() {
  const query = state.searches.projects.trim().toLowerCase();
  let projects = state.data.projects.filter((project) => `${project.nameAr} ${project.nameEn} ${project.code} ${project.clientAr}`.toLowerCase().includes(query));

  // User-defined sorting
  const sort = state.projectSort || 'default';
  if (sort === 'alpha-asc') {
    projects.sort((a, b) => (choose(a.nameAr, a.nameEn) || '').localeCompare(choose(b.nameAr, b.nameEn) || '', state.lang === 'ar' ? 'ar' : 'en'));
  } else if (sort === 'alpha-desc') {
    projects.sort((a, b) => (choose(b.nameAr, b.nameEn) || '').localeCompare(choose(a.nameAr, a.nameEn) || '', state.lang === 'ar' ? 'ar' : 'en'));
  } else if (sort === 'progress-asc') {
    projects.sort((a, b) => (Number(a.progress) || 0) - (Number(b.progress) || 0));
  } else if (sort === 'progress-desc') {
    projects.sort((a, b) => (Number(b.progress) || 0) - (Number(a.progress) || 0));
  }

  return `<div class="page-head"><div><p class="eyebrow">${choose('المحفظة', 'PORTFOLIO')}</p><h1>${t('projects')}</h1><p>${choose('كل مشروع في صورة واحدة: الحالة، الإنجاز، الفريق، والموعد التالي.', 'One view for every project: health, progress, team, and next deadline.')}</p></div><div class="page-actions">${can('create_projects') ? `<button class="btn btn-primary" data-action="new-project">${icon('plus', 15)} ${t('addProject')}</button>` : ''}</div></div><div class="view-toolbar"><div class="view-toolbar-start"><div class="search-box">${icon('search', 15)}<input data-search="projects" value="${esc(state.searches.projects)}" placeholder="${t('search')}" /></div><div class="sort-box" style="display:flex;align-items:center;gap:6px;"><span style="font-size:11px;color:var(--muted);">${choose('الترتيب:', 'Sort:')}</span><select id="sort-projects" class="select-compact" data-action="sort-projects" style="font-size:11px;padding:6px 10px;border-radius:8px;border:1px solid var(--line);background:var(--surface);color:var(--ink);cursor:pointer;"><option value="default" ${sort === 'default' ? 'selected' : ''}>${choose('الافتراضي', 'Default')}</option><option value="alpha-asc" ${sort === 'alpha-asc' ? 'selected' : ''}>${choose('أبجدياً (أ - ي)', 'Alphabetical (A - Z)')}</option><option value="alpha-desc" ${sort === 'alpha-desc' ? 'selected' : ''}>${choose('أبجدياً (ي - أ)', 'Alphabetical (Z - A)')}</option><option value="progress-asc" ${sort === 'progress-asc' ? 'selected' : ''}>${choose('نسبة الإنجاز (تصاعدي 0% ← 100%)', 'Progress (Low to High)')}</option><option value="progress-desc" ${sort === 'progress-desc' ? 'selected' : ''}>${choose('نسبة الإنجاز (تنازلي 100% ← 0%)', 'Progress (High to Low)')}</option></select></div></div><div class="view-toolbar-end"><span class="mini-badge" style="padding:8px 10px;color:var(--ink-soft);background:var(--surface-soft)">${projects.length} ${choose('مشاريع', 'projects')}</span></div></div>${projects.length ? `<div class="project-cards">${projects.map(projectCard).join('')}</div>` : `<section class="panel"><div class="empty">${icon('building', 18)}<span>${t('noProjects')}</span></div></section>`}`;
}

export function renderProjectDetail() {
  const project = state.data.projects.find((item) => item.id === state.activeProjectId);
  if (!project) { state.view = 'projects'; return renderProjects(); }

  const allTasks = state.data.tasks.filter((task) => task.projectId === project.id);
  const { internalMembers, externalMembers } = getProjectTeamData(project);

  // Default tab is 'tasks' as requested by user
  const tab = state.projectTab || 'tasks';

  // Apply member filter if set by click-to-filter
  const activeMemberFilter = state.projectMemberFilter || null;
  const tasks = activeMemberFilter
    ? allTasks.filter(t => t.assigneeId === activeMemberFilter || (t.customFields?.additionalAssignees || t.customFields?.additional_assignees || []).includes(activeMemberFilter))
    : allTasks;

  const filteredUser = activeMemberFilter ? state.data.users.find(u => u.id === activeMemberFilter) : null;

  let body = '';
  if (tab === 'overview') {
    body = renderProjectOverviewTab(project, allTasks, internalMembers, externalMembers);
  } else if (tab === 'tasks') {
    const taskSort = state.projectTaskSort || getSavedTaskSort();
    body = `
      <div class="panel">
        <div class="panel-head">
          <div>
            <h2 class="panel-title">${t('projectTasks')} ${activeMemberFilter ? `<span style="font-size:12px;color:var(--teal);font-weight:normal;">(${choose('مهام', 'Tasks of')}: ${esc(choose(filteredUser?.name, filteredUser?.nameEn || filteredUser?.name))})</span>` : ''}</h2>
            <p class="panel-subtitle">${choose('توزيع المهام حسب دورة العمل الحالية مرتبة تلقائياً بحسب تفضيل الترتيب.', 'Tasks grouped by current workflow state, automatically sorted.')}</p>
          </div>
          <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;">
            ${renderTaskSortSelect(taskSort, 'sort-project-tasks')}
            ${activeMemberFilter ? `<button class="btn btn-ghost btn-sm" data-action="clear-member-filter" style="font-size:11px;">${icon('close', 12)} ${choose('إلغاء الفلترة', 'Clear filter')}</button>` : ''}
            ${can('create_tasks') ? `<button class="btn btn-soft btn-sm" data-action="new-task" data-project-id="${esc(project.id)}" title="${choose('اضغط N للإضافة السريعة', 'Press N to add quickly')}">${icon('plus', 14)} ${t('addTask')} <kbd class="shortcut-kbd" style="margin-inline-start:4px;">N</kbd></button>` : ''}
          </div>
        </div>
        ${renderBoard(tasks, taskSort)}
      </div>
    `;
  } else if (tab === 'timeline') {
    const { renderTimelinePanel } = window.__timelineExports || {};
    body = renderTimelinePanel ? renderTimelinePanel(tasks, project) : `<div class="panel"><div class="panel-head"><div><h2 class="panel-title">${choose('المخطط الزمني والتقويم', 'Timeline & Calendar')}</h2></div></div>${renderTimeline(tasks)}</div>`;
  } else if (tab === 'drawings') {
    const projectDocs = (state.data.documents || []).filter(d => d.projectId === project.id && !d.deletedAt);
    const drawingTasks = allTasks.filter((task) => task.typeAr === 'مخطط' || task.typeEn === 'Drawing' || task.templateId);
    const docTaskFilter = state.docTaskFilter || 'all';

    const filteredDocs = docTaskFilter === 'all'
      ? projectDocs
      : projectDocs.filter(d => d.taskId === docTaskFilter);

    body = `
      <div class="panel">
        <div class="panel-head" style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px;">
          <div>
            <h2 class="panel-title">${choose('المخططات والمستندات الهندسية', 'Drawings & Documents')}</h2>
            <p class="panel-subtitle">${choose('جميع المخططات والملفات المرفوعة لهذا المشروع مع إمكانية الفلترة حسب المهمة والمعاينة الفورية.', 'All blueprints and files uploaded for this project, with task filtering and instant preview.')}</p>
          </div>
          <div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap;">
            <!-- Filter by Task dropdown -->
            <div style="display:flex;align-items:center;gap:6px;">
              <span style="font-size:12px;color:var(--ink-soft);">${choose('المهمة:', 'Task:')}</span>
              <select data-action="filter-project-docs-task" style="padding:6px 10px;border:1px solid var(--line);border-radius:8px;background:var(--surface);color:var(--ink);font-size:12px;max-width:200px;">
                <option value="all" ${docTaskFilter === 'all' ? 'selected' : ''}>${choose('— جميع المهام —', '— All Tasks —')}</option>
                ${allTasks.map(t => `<option value="${esc(t.id)}" ${docTaskFilter === t.id ? 'selected' : ''}>${esc(choose(t.titleAr, t.titleEn))}</option>`).join('')}
              </select>
            </div>
            ${can('create_tasks') ? `
              <button class="btn btn-soft btn-sm" data-action="new-task" data-project-id="${esc(project.id)}">
                ${icon('plus', 12)} ${choose('إضافة مخرج / مخطط', 'Add Deliverable / Drawing')}
              </button>
            ` : ''}
          </div>
        </div>

        <!-- Section 1: Uploaded Files (Direct previews) -->
        <div style="margin-bottom:24px;">
          <h3 style="margin:0 0 12px;font-size:13px;color:var(--teal);display:flex;align-items:center;gap:6px;">
            ${icon('document', 14)} ${choose('الملفات والمخططات المرفوعة', 'Uploaded Files & Blueprints')} (${filteredDocs.length})
          </h3>
          <div class="table-wrap">
            <table class="data-table">
              <thead>
                <tr>
                  <th>${choose('اسم المخطط / الملف', 'Blueprint / File Name')}</th>
                  <th>${t('tasks')}</th>
                  <th>${choose('الحالة', 'Status')}</th>
                  <th>${choose('الحجم', 'Size')}</th>
                  <th>${choose('تاريخ الرفع', 'Upload Date')}</th>
                  <th style="text-align:end;">${choose('الإجراءات', 'Actions')}</th>
                </tr>
              </thead>
              <tbody>
                ${filteredDocs.length > 0 ? filteredDocs.map((doc) => {
      const task = allTasks.find(t => t.id === doc.taskId);
      const sizeMB = doc.size > 1024 * 1024
        ? (doc.size / (1024 * 1024)).toFixed(1) + ' MB'
        : Math.round((doc.size || 0) / 1024) + ' KB';

      return `
                    <tr data-doc-id="${esc(doc.id)}">
                      <td>
                        <div style="display:flex;align-items:center;gap:10px;cursor:pointer;" data-action="preview-doc" data-doc-id="${esc(doc.id)}">
                          <span style="color:var(--teal);background:var(--teal-soft);padding:6px;border-radius:6px;display:flex;">
                            ${icon('document', 15)}
                          </span>
                          <div>
                            <strong style="display:block;font-size:13px;color:var(--ink);max-width:320px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;" title="${esc(doc.originalName)}">
                              ${esc(doc.originalName)}
                            </strong>
                            <span style="font-size:11px;color:var(--muted);">${esc(doc.mimeType || 'application/octet-stream')}</span>
                          </div>
                        </div>
                      </td>
                      <td>
                        ${task ? `<span style="font-size:12px;color:var(--ink);cursor:pointer;" data-action="open-task" data-task-id="${esc(task.id)}">${esc(choose(task.titleAr, task.titleEn))}</span>` : '—'}
                      </td>
                      <td>
                        <span class="status-badge ${esc(doc.status || 'draft')}" style="font-size:11px;">
                          ${esc(statusText(doc.status || 'draft'))}
                        </span>
                      </td>
                      <td style="font-size:12px;color:var(--ink-soft);">${sizeMB}</td>
                      <td style="font-size:12px;color:var(--ink-soft);">${dateLabel(doc.createdAt, true)}</td>
                      <td style="text-align:end;">
                        <div style="display:inline-flex;align-items:center;gap:4px;">
                          <button class="btn btn-ghost btn-sm" data-action="preview-doc" data-doc-id="${esc(doc.id)}" style="padding:5px;" title="${choose('معاينة المخطط', 'Preview')}">
                            ${icon('eye', 14)}
                          </button>
                          <button class="btn btn-ghost btn-sm" data-action="copy-doc-link" data-doc-id="${esc(doc.id)}" style="padding:5px;color:var(--teal);" title="${choose('نسخ الرابط', 'Copy Link')}">
                            ${icon('link', 14)}
                          </button>
                          <a href="/api/documents/${esc(doc.id)}" target="_blank" download class="btn btn-ghost btn-sm" style="padding:5px;color:var(--blue);" title="${choose('تحميل', 'Download')}">
                            ${icon('download', 14)}
                          </a>
                        </div>
                      </td>
                    </tr>
                  `;
    }).join('') : `
                  <tr>
                    <td colspan="6">
                      <div class="empty" style="padding:30px 10px;">
                        ${icon('document', 20)}
                        <span>${choose('لا توجد ملفات مرفوعة لهذه المهمة أو المشروع حتى الآن.', 'No files uploaded for this task/project yet.')}</span>
                      </div>
                    </td>
                  </tr>
                `}
              </tbody>
            </table>
          </div>
        </div>

        <!-- Section 2: Drawing Deliverable Tasks Summary -->
        <div>
          <h3 style="margin:0 0 12px;font-size:13px;color:var(--teal);display:flex;align-items:center;gap:6px;">
            ${icon('checklist', 14)} ${choose('مخرجات المخططات المجدولة', 'Scheduled Drawing Tasks')} (${drawingTasks.length})
          </h3>
          <div class="table-wrap">
            <table class="data-table">
              <thead>
                <tr>
                  <th>${t('taskTitle')}</th>
                  <th>${t('taskType')}</th>
                  <th>${t('status')}</th>
                  <th>${t('progress')}</th>
                  <th>${t('assignee')}</th>
                </tr>
              </thead>
              <tbody>
                ${drawingTasks.map((task) => `
                  <tr data-action="open-task" data-task-id="${esc(task.id)}" style="cursor:pointer;" title="${choose('انقر لعرض وتعديل المهمة ورفع المخططات', 'Click to open task and manage files')}">
                    <td><span class="table-title">${esc(choose(task.titleAr, task.titleEn))}</span><span class="table-sub">${esc(task.templateId || 'CUSTOM')}</span></td>
                    <td><span class="mini-badge badge-blue" style="font-size:10px;padding:3px 8px;">${esc(choose(task.typeAr, task.typeEn) || choose('مخطط', 'Drawing'))}</span></td>
                    <td><span class="status-badge ${esc(task.status)}">${esc(statusText(task.status))}</span></td>
                    <td>
                      <div style="display:flex;align-items:center;gap:6px;">
                        <div style="flex:1;height:5px;background:var(--line);border-radius:3px;overflow:hidden;min-width:40px;">
                          <div style="height:100%;background:${task.status === 'done' ? 'var(--green)' : 'var(--blue)'};width:${task.progress || 0}%;"></div>
                        </div>
                        <span style="font-size:11px;font-weight:600;">${task.progress || 0}%</span>
                      </div>
                    </td>
                    <td>${task.assignee ? esc(choose(task.assignee.name, task.assignee.nameEn || task.assignee.name)) : '—'}</td>
                  </tr>
                `).join('') || `<tr><td colspan="5"><div class="empty">${t('noTasks')}</div></td></tr>`}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `;
  } else if (tab === 'activity') {
    body = `<div class="panel"><div class="panel-head"><div><h2 class="panel-title">${t('activity')}</h2><p class="panel-subtitle">${choose('كل تغيير مهم يبقى قابلًا للمراجعة.', 'Every important change remains reviewable.')}</p></div></div>${renderAuditForProject(project.id)}</div>`;
  }

  const manager = project.manager || (state.data.users || []).find(u => u.id === project.managerId);
  const daysLeftBadge = getDaysLeftBadge(project.dueDate);

  return `
    <div class="project-hero">
      <div class="project-hero-copy">
        <button class="back-button" data-action="back-to-projects">${icon(state.lang === 'ar' ? 'arrow' : 'arrowLeft', 15)}</button>
        <div>
          <p class="eyebrow">${esc(project.code)} · ${project.demo ? t('sampleData') : t('active')}</p>
          <h1>${esc(choose(project.nameAr, project.nameEn))}</h1>
          <p>${esc(choose(project.descriptionAr || project.clientAr, project.descriptionEn || project.clientEn))}</p>
          
          <div class="project-hero-meta">
            <span class="meta-chip">
              ${icon('user', 12)} 
              <strong>${t('manager')}:</strong> ${esc(manager ? choose(manager.name, manager.nameEn || manager.name) : '—')}
            </span>
            ${project.dueDate ? `
              <span class="meta-chip" style="display:inline-flex;align-items:center;gap:6px;">
                ${icon('calendar', 12)} ${dateLabel(project.dueDate, true)}
                ${daysLeftBadge}
              </span>
            ` : ''}
            <span class="meta-chip" style="display:inline-flex;align-items:center;gap:6px;position:relative;">
              ${icon('users', 12)}
              <span style="font-size:11px;">${t('team')}:</span>
              ${renderProjectTeamAvatars(internalMembers, 4, true, externalMembers)}
            </span>
            <span class="status-badge ${esc(project.health)}">${esc(statusText(project.health))}</span>
          </div>
        </div>
      </div>
      <div class="project-hero-score">
        <strong>${project.progress}%</strong>
        <span>${t('weightedProgress')}</span>
        ${(can('edit_projects') || can('create_projects') || can('delete_projects') || can('view_reports') || isAdmin()) ? `
          <div style="position:relative;margin-top:11px;width:100%">
            <button class="btn btn-soft btn-sm" data-action="toggle-project-menu" style="width:100%">${icon('more', 15)} ${choose('خيارات', 'Options')}</button>
            <div id="project-menu" class="dropdown-menu" style="display:none;position:absolute;top:100%;${state.lang === 'ar' ? 'left:0' : 'right:0'};background:var(--surface);border:1px solid var(--line);border-radius:8px;box-shadow:0 10px 30px rgba(0,0,0,0.1);z-index:100;min-width:180px;padding:5px;margin-top:5px;text-align:start">
              ${(can('edit_projects') || isAdmin()) ? `<button class="menu-item" data-action="edit-project" data-project-id="${esc(project.id)}" style="display:flex;align-items:center;gap:8px;width:100%;padding:8px 12px;border:0;background:0;cursor:pointer;font-size:13px">${icon('edit', 14)} ${t('edit')}</button>` : ''}
              ${(can('create_projects') || isAdmin()) ? `<button class="menu-item" data-action="clone-project" data-project-id="${esc(project.id)}" style="display:flex;align-items:center;gap:8px;width:100%;padding:8px 12px;border:0;background:0;cursor:pointer;font-size:13px">${icon('document', 14)} ${choose('استنساخ المشروع', 'Clone Project')}</button>` : ''}
              ${(can('export_reports') || isAdmin()) ? `<button class="menu-item" data-action="export-project" data-project-id="${esc(project.id)}" style="display:flex;align-items:center;gap:8px;width:100%;padding:8px 12px;border:0;background:0;cursor:pointer;font-size:13px">${icon('document', 14)} ${choose('تصدير التقرير (Excel)', 'Export Report (Excel)')}</button>` : ''}
              ${(can('delete_projects') || isAdmin()) ? `<button class="menu-item" data-action="delete-project" data-project-id="${esc(project.id)}" style="display:flex;align-items:center;gap:8px;width:100%;padding:8px 12px;border:0;background:0;cursor:pointer;font-size:13px;color:var(--red)">${icon('trash', 14)} ${choose('حذف المشروع', 'Delete Project')}</button>` : ''}
            </div>
          </div>
        ` : ''}
      </div>
    </div>

    <!-- Sub Navigation Tabs: 'تفاصيل' instead of 'overview' -->
    <div class="detail-tabs">
      <button class="detail-tab ${tab === 'tasks' ? 'active' : ''}" data-action="project-tab" data-tab="tasks">${t('tasks')}</button>
      <button class="detail-tab ${tab === 'overview' ? 'active' : ''}" data-action="project-tab" data-tab="overview">${choose('تفاصيل', 'Details')}</button>
      <button class="detail-tab ${tab === 'timeline' ? 'active' : ''}" data-action="project-tab" data-tab="timeline">${choose('المخطط الزمني والتقويم', 'Timeline & Calendar')}</button>
      <button class="detail-tab ${tab === 'drawings' ? 'active' : ''}" data-action="project-tab" data-tab="drawings">${t('drawings')}</button>
      <button class="detail-tab ${tab === 'activity' ? 'active' : ''}" data-action="project-tab" data-tab="activity">${t('activity')}</button>
    </div>
    
    ${body}
  `;
}

export function buildProjectMemberChipsHtml(memberIds = []) {
  const users = state.data?.users || [];
  return memberIds.map(uid => {
    const u = users.find(x => x.id === uid) || { name: uid, id: uid };
    return `
      <span class="chip-item" data-uid="${esc(uid)}" style="display:inline-flex;align-items:center;gap:6px;background:var(--surface);border:1px solid var(--border);border-radius:16px;padding:3px 10px 3px 6px;font-size:12px;color:var(--ink);">
        ${avatar(u, 'mini-avatar')}
        <span style="font-weight:500;">${esc(choose(u.name, u.nameEn || u.name))}</span>
        <button type="button" class="btn-remove-project-member" data-uid="${esc(uid)}" style="border:none;background:none;cursor:pointer;color:var(--muted);padding:0 2px;font-size:14px;line-height:1;margin-inline-start:4px;" title="${choose('إزالة', 'Remove')}">×</button>
      </span>
    `;
  }).join('');
}

export function openProjectModal(project = null) {
  const defaultCode = project?.code || `DARC-${String((state.data?.projects?.length || 0) + 1).padStart(3, '0')}`;
  const existingTeam = project ? getProjectTeamData(project).internalMembers.map(m => m.id) : [];
  const currentMemberIds = existingTeam.length > 0 ? existingTeam : [state.data?.user?.id].filter(Boolean);

  const form = `
    <form id="project-form" data-project-id="${esc(project?.id || '')}">
      <input type="hidden" name="memberIds" id="project-members-input" value="${esc(JSON.stringify(currentMemberIds))}" />

      <div class="form-grid">
        <!-- 🏢 القسم 1: البيانات الأساسية للمشروع -->
        <div style="font-size:12px;font-weight:700;color:var(--teal);margin:4px 0 6px;grid-column:1/-1;border-bottom:1px solid var(--line);padding-bottom:4px;display:flex;align-items:center;gap:6px;">
          ${icon('building', 14)} <span>${choose('البيانات الأساسية للمشروع', 'Core Project Information')}</span>
        </div>

        <div class="field full">
          <label>${t('nameAr')} *</label>
          <input name="nameAr" value="${esc(project?.nameAr || '')}" placeholder="${choose('مثال: فيلا النخيل — التصميم الداخلي', 'e.g. Al Nakheel Villa — Interior Design')}" required />
        </div>
        <div class="field">
          <label>${t('nameEn')}</label>
          <input name="nameEn" value="${esc(project?.nameEn || '')}" placeholder="Al Nakheel Villa — Interior Design" />
        </div>
        <div class="field">
          <label>${t('projectCode')} *</label>
          <input name="code" value="${esc(defaultCode)}" placeholder="DARC-025" required />
        </div>
        <div class="field full">
          <label>${t('client')}</label>
          <input name="clientAr" value="${esc(project?.clientAr || '')}" placeholder="${choose('اسم العميل أو الجهة المالكة', 'Client or owning entity')}" />
        </div>

        <!-- 📅 القسم 2: الجدولة والإدارة -->
        <div style="font-size:12px;font-weight:700;color:var(--teal);margin:16px 0 6px;grid-column:1/-1;padding-top:12px;border-top:1px solid var(--line);display:flex;align-items:center;gap:6px;">
          ${icon('calendar', 14)} <span>${choose('الجدولة والإدارة', 'Management & Schedule')}</span>
        </div>

        <div class="field full">
          <label>${t('manager')}</label>
          <select name="managerId" id="project-manager-select">
            <option value="">${choose('— بدون تحديد —', '— Unassigned —')}</option>
            ${state.data.users.map((user) => `<option value="${esc(user.id)}" ${(project ? project.managerId === user.id : state.data.user.id === user.id) ? 'selected' : ''}>${esc(choose(user.name, user.nameEn || user.name))}</option>`).join('')}
          </select>
        </div>
        <div class="field">
          <label>${choose('أولوية المشروع', 'Project Priority')}</label>
          <select name="priority">
            <option value="low" ${(project?.priority === 'low' || project?.customFields?.priority === 'low') ? 'selected' : ''}>${choose('منخفضة', 'Low')}</option>
            <option value="medium" ${(!project || project?.priority === 'medium' || project?.customFields?.priority === 'medium' || !project?.priority) ? 'selected' : ''}>${choose('متوسطة', 'Medium')}</option>
            <option value="high" ${(project?.priority === 'high' || project?.customFields?.priority === 'high') ? 'selected' : ''}>${choose('عالية', 'High')}</option>
            <option value="urgent" ${(project?.priority === 'urgent' || project?.customFields?.priority === 'urgent') ? 'selected' : ''}>${choose('حرجة / عاجلة', 'Urgent')}</option>
          </select>
        </div>
        <div class="field">
          <label>${choose('حالة المشروع', 'Project Status')}</label>
          <select name="lifecycle">
            <option value="active" ${(!project || project.lifecycle === 'active') ? 'selected' : ''}>${choose('نشط (قيد التنفيذ)', 'Active (In Progress)')}</option>
            <option value="planning" ${project?.lifecycle === 'planning' ? 'selected' : ''}>${choose('تخطيط', 'Planning')}</option>
            <option value="on_hold" ${project?.lifecycle === 'on_hold' ? 'selected' : ''}>${choose('معلق / متوقف', 'On Hold')}</option>
            <option value="completed" ${project?.lifecycle === 'completed' ? 'selected' : ''}>${choose('مكتمل', 'Completed')}</option>
            <option value="archived" ${project?.lifecycle === 'archived' ? 'selected' : ''}>${choose('مؤرشف', 'Archived')}</option>
          </select>
        </div>
        <div class="field">
          <label>${t('startDate')}</label>
          <input type="date" name="startDate" value="${esc(project?.startDate || '')}" />
        </div>
        <div class="field">
          <label>${t('dueDate')}</label>
          <input type="date" name="dueDate" value="${esc(project?.dueDate || '')}" />
        </div>

        <!-- 👥 القسم 3: أعضاء فريق المشروع والمشاركون -->
        <div style="font-size:12px;font-weight:700;color:var(--teal);margin:16px 0 6px;grid-column:1/-1;padding-top:12px;border-top:1px solid var(--line);display:flex;align-items:center;justify-content:space-between;">
          <div style="display:flex;align-items:center;gap:6px;">
            ${icon('users', 14)} <span>${choose('أعضاء فريق المشروع والمشاركون', 'Project Team Members & Collaborators')}</span>
          </div>
          <span style="font-size:10px;color:var(--muted);font-weight:normal;">${choose('اختر من الفريق لإعطائهم حق الوصول للمشروع', 'Select team members who can access this project')}</span>
        </div>

        <div class="field full" style="position:relative;">
          <!-- الشارات المحددة حالياً (Pre-rendered for zero layout shift) -->
          <div id="project-members-chips-container" style="display:${currentMemberIds.length ? 'flex' : 'none'};flex-wrap:wrap;gap:6px;min-height:36px;padding:6px;background:var(--surface-soft);border:1px solid var(--line);border-radius:8px;margin-bottom:6px;align-items:center;">
            ${buildProjectMemberChipsHtml(currentMemberIds)}
          </div>

          <!-- حقل البحث والإضافة السريعة -->
          <div style="position:relative;display:flex;gap:6px;">
            <input type="text" id="project-member-search" placeholder="${choose('ابحث عن عضو لإضافته لفريق المشروع...', 'Search team member to add to project team...')}" autocomplete="off" style="flex:1;padding:8px 12px;font-size:12px;" />
          </div>

          <!-- القائمة المنسدلة للبحث والاختيار -->
          <div id="project-member-dropdown" style="display:none;position:absolute;top:100%;left:0;right:0;max-height:220px;overflow-y:auto;background:var(--surface);border:1px solid var(--line);border-radius:8px;box-shadow:0 8px 24px rgba(0,0,0,0.14);z-index:100;margin-top:4px;padding:4px;">
          </div>
        </div>

        <!-- 📝 القسم 4: نطاق المشروع والملاحظات -->
        <div style="font-size:12px;font-weight:700;color:var(--teal);margin:16px 0 6px;grid-column:1/-1;padding-top:12px;border-top:1px solid var(--line);display:flex;align-items:center;gap:6px;">
          ${icon('document', 14)} <span>${choose('نطاق المشروع والملاحظات', 'Scope & Notes')}</span>
        </div>

        <div class="field full">
          <label>${choose('وصف ونطاق المشروع', 'Project Scope & Description')}</label>
          <textarea name="descriptionAr" placeholder="${choose('وصف مختصر لنطاق العمل، المعايير المعتمدة، وأي ملاحظات خاصة...', 'Brief description of scope, design criteria, and special notes...')}">${esc(project?.descriptionAr || '')}</textarea>
        </div>
      </div>

      <div class="modal-actions" style="display:flex;align-items:center;justify-content:space-between;width:100%;flex-wrap:wrap;gap:10px;margin-top:20px;">
        <div>
          ${project && (can('delete_projects') || isAdmin()) ? `
            <button type="button" class="btn btn-ghost" data-action="delete-project" data-project-id="${esc(project.id)}" style="color:var(--red);display:inline-flex;align-items:center;gap:6px;" title="${choose('حذف المشروع ونقله لسلة المهملات', 'Delete project and move to trash')}">
              ${icon('trash', 14)} ${choose('حذف المشروع', 'Delete Project')}
            </button>
          ` : ''}
        </div>
        <div style="display:flex;align-items:center;gap:8px;">
          <button type="button" class="btn btn-ghost" data-action="close-modal">${t('cancel')}</button>
          <button type="submit" class="btn btn-primary">${icon('check', 14)} ${project ? t('save') : t('create')}</button>
        </div>
      </div>
    </form>
  `;
  document.getElementById('modal-root').innerHTML = modalShell(
    project ? choose('تعديل بيانات المشروع', 'Edit Project') : t('addProject'),
    choose('إدارة البيانات الأساسية وحالة متابعة المشروع والجدول الزمني.', 'Manage project details, schedule, and workflow health.'),
    form,
    'project'
  );

  // Wire interactive member chips and search dropdown
  setTimeout(() => {
    const searchInput = document.getElementById('project-member-search');
    const dropdown = document.getElementById('project-member-dropdown');
    const chipsContainer = document.getElementById('project-members-chips-container');
    const hiddenInput = document.getElementById('project-members-input');
    const managerSelect = document.getElementById('project-manager-select');
    if (!searchInput || !dropdown || !chipsContainer || !hiddenInput) return;

    let selectedIds = [...currentMemberIds];

    function updateChips() {
      chipsContainer.innerHTML = buildProjectMemberChipsHtml(selectedIds);
      chipsContainer.style.display = selectedIds.length ? 'flex' : 'none';
      hiddenInput.value = JSON.stringify(selectedIds);

      chipsContainer.querySelectorAll('.btn-remove-project-member').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          const uid = btn.dataset.uid;
          selectedIds = selectedIds.filter(id => id !== uid);
          updateChips();
        });
      });
    }

    if (managerSelect) {
      managerSelect.addEventListener('change', () => {
        const mgrId = managerSelect.value;
        if (mgrId && !selectedIds.includes(mgrId)) {
          selectedIds.push(mgrId);
          updateChips();
        }
      });
    }

    function renderDropdown(filterText = '') {
      const q = filterText.toLowerCase().trim();
      const allUsers = state.data?.users || [];
      const available = allUsers.filter(u => !selectedIds.includes(u.id) && (
        !q ||
        (u.name && u.name.toLowerCase().includes(q)) ||
        (u.nameEn && u.nameEn.toLowerCase().includes(q)) ||
        (u.email && u.email.toLowerCase().includes(q))
      ));

      if (!available.length) {
        dropdown.innerHTML = `<div style="padding:8px 12px;font-size:12px;color:var(--muted);">${choose('لا يوجد أعضاء مطابقون', 'No matching members')}</div>`;
      } else {
        dropdown.innerHTML = available.map(u => `
          <div class="project-member-opt" data-uid="${esc(u.id)}" style="display:flex;align-items:center;gap:8px;padding:6px 10px;border-radius:6px;cursor:pointer;font-size:12px;">
            ${avatar(u, 'mini-avatar')}
            <div style="flex:1;">
              <div style="font-weight:600;color:var(--ink);">${esc(choose(u.name, u.nameEn || u.name))}</div>
              <div style="font-size:10px;color:var(--muted);">${esc(u.roleId || '')}</div>
            </div>
            <span style="font-size:11px;color:var(--teal);">➕ ${choose('إضافة', 'Add')}</span>
          </div>
        `).join('');

        dropdown.querySelectorAll('.project-member-opt').forEach(opt => {
          opt.addEventListener('mouseenter', () => opt.style.background = 'var(--surface-soft)');
          opt.addEventListener('mouseleave', () => opt.style.background = 'transparent');
          opt.addEventListener('click', () => {
            const uid = opt.dataset.uid;
            if (uid && !selectedIds.includes(uid)) {
              selectedIds.push(uid);
              updateChips();
              searchInput.value = '';
              dropdown.style.display = 'none';
            }
          });
        });
      }
      dropdown.style.display = 'block';
    }

    searchInput.addEventListener('focus', () => renderDropdown(searchInput.value));
    searchInput.addEventListener('input', () => renderDropdown(searchInput.value));
    document.addEventListener('click', (e) => {
      if (!searchInput.contains(e.target) && !dropdown.contains(e.target)) {
        dropdown.style.display = 'none';
      }
    });

    updateChips();
  }, 50);
}

export function openCloneModal(project) {
  const formStr = `
    <form id="clone-form" data-project-id="${project.id}">
      <p style="margin-top:0;margin-bottom:20px;color:var(--ink-soft);font-size:13px">${choose('أنت على وشك استنساخ المشروع:', 'You are about to clone the project:')} <strong style="color:var(--ink)">${esc(choose(project.nameAr, project.nameEn))}</strong></p>
      <div class="form-grid">
        <div class="field full">
          <label>${t('nameAr')}</label>
          <input name="nameAr" value="${esc(project.nameAr)} (نسخة)" required />
        </div>
        <div class="field full">
          <label>${t('nameEn')}</label>
          <input name="nameEn" value="${esc(project.nameEn)} (Copy)" required />
        </div>
      </div>
      
      <div class="field full">
        <label>${choose('تاريخ التسليم المتوقع', 'Expected Due Date')}</label>
        <input name="dueDate" type="date" value="${project.dueDate || ''}" />
      </div>

      <div style="background:var(--surface-soft);border:1px solid var(--border);border-radius:8px;padding:15px;margin-top:20px;display:flex;flex-direction:column;gap:12px">
        <strong style="font-size:13px">${choose('إعدادات النسخ المتقدمة', 'Advanced Clone Settings')}</strong>
        
        <label style="display:flex;align-items:center;gap:10px;font-weight:500;cursor:pointer">
          <input type="checkbox" name="cloneTasks" checked style="width:16px;height:16px;margin:0">
          ${choose('نسخ جميع المهام والهيكلة (Tasks)', 'Clone all tasks & structure')}
        </label>
        
        <div style="padding-${state.lang === 'ar' ? 'right' : 'left'}:26px">
          <label style="display:flex;align-items:center;gap:8px;font-weight:400;color:var(--ink-soft);cursor:pointer">
            <input type="checkbox" name="keepAssignees" style="width:14px;height:14px;margin:0">
            ${choose('الاحتفاظ بالمسند إليهم (Keep Assignees)', 'Keep Task Assignees')}
          </label>
        </div>
        
        <hr style="border:0;border-top:1px solid var(--border);margin:4px 0" />
        
        <label style="display:flex;align-items:center;gap:10px;font-weight:500;cursor:pointer">
          <input type="checkbox" name="cloneMembers" checked style="width:16px;height:16px;margin:0">
          ${choose('استنساخ أعضاء فريق العمل (Team)', 'Clone team members')}
        </label>
      </div>
      
      <div class="modal-actions" style="margin-top:24px">
        <button type="button" class="btn btn-ghost" data-action="close-modal">${t('cancel')}</button>
        <button type="submit" class="btn btn-primary">${icon('document', 14)} ${choose('استنساخ المشروع', 'Clone Project')}</button>
      </div>
    </form>
  `;

  document.getElementById('modal-root').innerHTML = modalShell(choose('استنساخ المشروع', 'Clone Project'), choose('أداة إنشاء قوالب المشاريع السريعة', 'Rapid project templating tool'), formStr, 'clone');

  const form = document.getElementById('clone-form');
  const cloneTasksCheckbox = form.querySelector('input[name="cloneTasks"]');
  const keepAssigneesCheckbox = form.querySelector('input[name="keepAssignees"]');

  cloneTasksCheckbox.addEventListener('change', (e) => {
    keepAssigneesCheckbox.disabled = !e.target.checked;
    if (!e.target.checked) keepAssigneesCheckbox.checked = false;
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    btn.disabled = true;
    try {
      const data = {
        nameAr: form.nameAr.value,
        nameEn: form.nameEn.value,
        dueDate: form.dueDate.value,
        cloneTasks: form.cloneTasks.checked,
        keepAssignees: form.keepAssignees.checked,
        cloneMembers: form.cloneMembers.checked
      };
      const res = await api(`/api/projects/${project.id}/clone`, { method: 'POST', body: JSON.stringify(data) });
      closeModal();
      state.view = 'project-detail';
      state.activeProjectId = res.project.id;
      await refreshView();
      showToast(choose('تم استنساخ المشروع بنجاح.', 'Project cloned successfully.'));
    } catch (error) {
      showToast(error.message, true);
      btn.disabled = false;
    }
  });
}

export function exportXLS(filename, htmlTable) {
  const html = `
    <html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">
    <head>
      <meta charset="utf-8" />
      <style>
        table { border-collapse: collapse; font-family: Arial, sans-serif; }
        td, th { border: 1px solid #333; padding: 6px; text-align: right; vertical-align: middle; }
        .title { font-size: 18px; font-weight: bold; background: #0d6269; color: #fff; text-align: center; }
        .subtitle { font-size: 14px; font-weight: bold; background: #eef2f2; text-align: center; }
        .meta { font-size: 12px; text-align: center; background: #f9fafa; }
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
  a.download = filename + '.xls';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function exportPortfolioXLS() {
  const projects = state.data?.projects || [];
  if (!projects || !projects.length) {
    showToast(choose('لا توجد بيانات لتصديرها.', 'No data to export.'), true);
    return;
  }

  const reportDate = new Date().toLocaleDateString(state.lang === 'ar' ? 'ar-SA' : 'en-US');
  const colsCount = 11;

  let table = '<table>';
  table += `<tr><td colspan="${colsCount}" class="title">DARC Design Team</td></tr>`;
  table += `<tr><td colspan="${colsCount}" class="subtitle">${choose('تقرير حالة مشاريع المحفظة', 'Portfolio Projects Report')}</td></tr>`;
  table += `<tr><td colspan="${colsCount}" class="meta">${choose('تاريخ الإصدار:', 'Generated on:')} ${reportDate}</td></tr>`;
  table += `<tr><td colspan="${colsCount}" style="border:none;"></td></tr>`; // Empty Row

  // Headers
  table += `<tr class="header">
    <td>${choose('كود المشروع', 'Code')}</td>
    <td>${choose('اسم المشروع (عربي)', 'Project Name (Ar)')}</td>
    <td>${choose('اسم المشروع (إنجليزي)', 'Project Name (En)')}</td>
    <td>${choose('العميل', 'Client')}</td>
    <td>${choose('مدير المشروع', 'Manager')}</td>
    <td>${choose('الحالة', 'Lifecycle')}</td>
    <td>${choose('الصحة', 'Health')}</td>
    <td>${choose('تاريخ البدء', 'Start Date')}</td>
    <td>${choose('تاريخ التسليم', 'Due Date')}</td>
    <td>${choose('نسبة الإنجاز', 'Progress %')}</td>
    <td>${choose('عدد أعضاء الفريق', 'Team Size')}</td>
  </tr>`;

  projects.forEach(p => {
    const managerName = p.manager ? choose(p.manager.name, p.manager.nameEn || p.manager.name) : '';
    table += `<tr>
      <td>${esc(p.code)}</td>
      <td>${esc(p.nameAr)}</td>
      <td>${esc(p.nameEn)}</td>
      <td>${esc(choose(p.clientAr, p.clientEn))}</td>
      <td>${esc(managerName)}</td>
      <td>${esc(statusText(p.lifecycle))}</td>
      <td>${esc(statusText(p.health))}</td>
      <td>${esc(p.startDate || '')}</td>
      <td>${esc(p.dueDate || '')}</td>
      <td>${p.progress || 0}%</td>
      <td>${p.memberCount || 0}</td>
    </tr>`;
  });

  table += '</table>';
  exportXLS(`DARC_Portfolio_Report_${new Date().toISOString().split('T')[0]}`, table);
  showToast(choose('تم بدء تحميل التقرير.', 'Report download started.'));
}

export function exportProjectXLS(projectId) {
  const project = (state.data?.projects || []).find(p => p.id === projectId);
  if (!project) return;
  const tasks = (state.data?.tasks || []).filter(t => t.projectId === projectId);
  if (!tasks.length) {
    showToast(choose('لا توجد مهام لهذا المشروع لتصديرها.', 'No tasks to export.'), true);
    return;
  }

  const reportDate = new Date().toLocaleDateString(state.lang === 'ar' ? 'ar-SA' : 'en-US');
  const colsCount = 8;

  let table = '<table>';
  table += `<tr><td colspan="${colsCount}" class="title">DARC Design Team</td></tr>`;
  table += `<tr><td colspan="${colsCount}" class="subtitle">${choose('تقرير مهام المشروع:', 'Project Tasks Report:')} ${esc(choose(project.nameAr, project.nameEn))}</td></tr>`;
  table += `<tr><td colspan="${colsCount}" class="meta">${choose('تاريخ الإصدار:', 'Generated on:')} ${reportDate}</td></tr>`;
  table += `<tr><td colspan="${colsCount}" style="border:none;"></td></tr>`; // Empty Row

  // Headers
  table += `<tr class="header">
    <td>${choose('المهمة (عربي)', 'Task (Ar)')}</td>
    <td>${choose('المهمة (إنجليزي)', 'Task (En)')}</td>
    <td>${choose('القسم', 'Category')}</td>
    <td>${choose('المسؤول', 'Assignee')}</td>
    <td>${choose('الحالة', 'Status')}</td>
    <td>${choose('تاريخ البدء', 'Start Date')}</td>
    <td>${choose('تاريخ التسليم', 'Due Date')}</td>
    <td>${choose('الإنجاز', 'Progress %')}</td>
  </tr>`;

  tasks.forEach(t => {
    const matchedUser = (state.data?.users || []).find(u => u.id === (t.assigneeId || t.assignee_id));
    const assigneeName = t.assignee ? choose(t.assignee.name, t.assignee.nameEn || t.assignee.name) : (matchedUser ? choose(matchedUser.name, matchedUser.nameEn || matchedUser.name) : '');
    table += `<tr>
      <td>${esc(t.titleAr)}</td>
      <td>${esc(t.titleEn)}</td>
      <td>${esc(choose(t.categoryAr, t.categoryEn))}</td>
      <td>${esc(assigneeName)}</td>
      <td>${esc(statusText(t.status))}</td>
      <td>${esc(t.startDate || '')}</td>
      <td>${esc(t.dueDate || '')}</td>
      <td>${t.progress || 0}%</td>
    </tr>`;
  });

  table += '</table>';
  exportXLS(`DARC_Project_${project.code}_${new Date().toISOString().split('T')[0]}`, table);
  showToast(choose('تم بدء تحميل التقرير.', 'Report download started.'));
}

