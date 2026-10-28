import { state } from '../../core/state.js';
import { api } from '../../core/api.js';
import { getActiveCalendarSystem, esc, sanitizeForSpreadsheet, choose, icon, t, can, isAdmin, avatar, roleName, initials, statusText, formatDateTime, formatReportDate, formatReportTime } from '../../core/utils.js';
import { showToast, modalShell, closeModal } from '../../shared/ui.js';

export function renderTeam() {
  if (!isAdmin() && !can('manage_users')) {
    return `<section class="panel"><div class="empty">${icon('alert', 18)}<span>${choose('غير مصرح لك بعرض هذه الصفحة.', 'You are not authorized to view this page.')}</span></div></section>`;
  }
  const currentUserId = state.data?.user?.id;
  let users = (state.data?.users || []).filter((user) => user.status !== 'inactive');
  
  // Stealth Super Admin & Developer: Ahmad is completely invisible to any other user
  if (currentUserId !== 'usr_ahmad') {
    users = users.filter(u => u.id !== 'usr_ahmad');
  } else {
    // When logged in as Ahmad: sort Ahmad to the very top
    users = [...users].sort((a, b) => (a.id === 'usr_ahmad' ? -1 : b.id === 'usr_ahmad' ? 1 : 0));
  }

  return `
    <div class="page-head">
      <div>
        <p class="eyebrow">${choose('الأشخاص والمسؤوليات', 'PEOPLE & OWNERSHIP')}</p>
        <h1>${t('team')}</h1>
        <p>${choose('كل عضو يعرف دوره، مسؤولياته، وما يحتاج إغلاقه بعد ذلك.', 'Every member has a clear role, responsibility, and next action.')}</p>
      </div>
      <div class="page-actions">
        ${(isAdmin() || can('manage_users')) ? `<button class="btn btn-primary" data-action="new-user">${icon('plus', 15)} ${t('addMember')}</button>` : ''}
      </div>
    </div>
    <div class="team-grid">
      ${users.map((user) => {
        const metrics = teamMetrics(user.id, state.data?.tasks || []);
        const isAhmadUser = user.id === 'usr_ahmad';
        return `
          <article class="member-card ${isAhmadUser ? 'system-developer-card' : ''}" style="${isAhmadUser ? 'border:2px solid var(--brand-teal);box-shadow:0 6px 20px rgba(13,148,136,0.12);' : ''}">
            <div class="member-card-head">
              <div class="member-card-person">
                ${avatar(user, 'avatar-lg')}
                <div class="member-card-person-copy">
                  <strong>${esc(choose(user.name, user.nameEn || user.name))}</strong>
                  <span>${esc(choose(user.jobTitleAr || (isAhmadUser ? 'المبرمج / مدير النظام' : ''), user.jobTitleEn || user.jobTitleAr || ''))}</span>
                </div>
              </div>
              ${isAhmadUser 
                ? `<span class="stealth-dev-badge">${icon('shield', 12)} ${choose('مدير ومطور النظام', 'Super Admin & Dev')}</span>`
                : (canManageAccountPermissions() && user.id !== state.data?.user?.id ? `<button class="member-menu" data-action="open-user" data-user-id="${esc(user.id)}">${icon('more', 15)}</button>` : '')
              }
            </div>
            <div class="member-card-role">
              <span class="status-badge ${user.status === 'active' ? 'done' : 'not_started'}">${esc(roleName(user))}</span>
            </div>
            <div class="member-card-stats">
              <span>${t('progress')} <strong>${metrics.progress}%</strong></span>
              <span>${metrics.tasks} ${t('tasks')}</span>
            </div>
            <div class="member-email">${user.email ? esc(user.email) : t('noEmail')}</div>
          </article>
        `;
      }).join('')}
    </div>
  `;
}

export function renderAuditForProject(projectId) {
  const logs = (state.data?.auditLogs || []).filter((log) => log.details?.projectId === projectId || (log.entityType === 'project' && log.entityId === projectId));
  if (!logs.length) return `<div class="empty">${icon('check', 18)}<span>${choose('لا توجد تغييرات مسجلة بعد.', 'No changes recorded yet.')}</span></div>`;
  return `<div class="audit-list">${logs.map((log) => `<div class="audit-row"><span class="audit-dot"></span><div class="audit-copy"><strong>${esc(log.user ? choose(log.user.name, log.user.nameEn || log.user.name) : 'DARC')} · ${esc(log.action)}</strong><span>${esc(log.entityType)} · ${dateLabel(log.createdAt, true)}</span></div></div>`).join('')}</div>`;
}

export function renderUserActivityCell(user) {
  const lastActive = user.lastActiveAt || user.customFields?.lastActiveAt;
  const lastLogin = user.lastLoginAt || user.customFields?.lastLoginAt;

  if (!lastActive && !lastLogin) {
    return `<span class="activity-never">${choose('لم يسجل دخول بعد', 'Never logged in')}</span>`;
  }

  const now = Date.now();
  const activeTime = lastActive ? new Date(lastActive).getTime() : 0;
  const isMe = user.id === state.data?.user?.id;
  const diffMinutes = isMe ? 0 : (activeTime && !isNaN(activeTime) ? Math.floor((now - activeTime) / 60000) : 999999);
  const isOnline = diffMinutes >= 0 && diffMinutes <= 5;

  let activityPill = '';
  if (isOnline) {
    activityPill = `<span class="activity-pill online"><span class="activity-dot online"></span> ${choose('نشط الآن', 'Online')}</span>`;
  } else if (diffMinutes < 60) {
    activityPill = `<span class="activity-pill recent"><span class="activity-dot recent"></span> ${choose(`منذ ${diffMinutes} دقيقة`, `${diffMinutes}m ago`)}</span>`;
  } else if (diffMinutes < 24 * 60) {
    const hours = Math.floor(diffMinutes / 60);
    activityPill = `<span class="activity-pill idle"><span class="activity-dot idle"></span> ${choose(`منذ ${hours} ساعة`, `${hours}h ago`)}</span>`;
  } else if (activeTime > 0) {
    activityPill = `<span class="activity-pill idle"><span class="activity-dot idle"></span> ${dateLabel(lastActive, false)}</span>`;
  }

  const loginText = lastLogin ? `<span class="activity-sub" title="${esc(lastLogin)}">${choose('دخول:', 'Login:')} ${dateLabel(lastLogin, true)}</span>` : '';

  return `<div class="activity-wrapper">${activityPill}${loginText}</div>`;
}

function formatAuditTimestamp(isoStr) {
  return formatDateTime(isoStr, { includeSeconds: true });
}

function renderAuditDetails(log) {
  const action = log.action || '';
  const entityType = log.entityType || log.entity_type || '';
  const details = log.details || {};

  let badgeClass = 'badge-neutral';
  let actionLabel = action;
  let entityLabel = entityType;

  if (action === 'login') {
    badgeClass = 'badge-teal';
    actionLabel = choose('تسجيل دخول', 'Sign In');
    entityLabel = choose('جلسة نظام', 'System Session');
  } else if (action === 'create') {
    badgeClass = 'badge-mint';
    actionLabel = choose('إنشاء جديد', 'Created');
  } else if (action === 'update') {
    badgeClass = 'badge-blue';
    actionLabel = choose('تعديل بيانات', 'Updated');
  } else if (action === 'delete') {
    badgeClass = 'badge-red';
    actionLabel = choose('نقل للمهملات', 'Moved to Trash');
  } else if (action === 'status_change') {
    badgeClass = 'badge-amber';
    actionLabel = choose('تغيير حالة', 'Status Changed');
  } else if (action === 'export_report') {
    badgeClass = 'badge-teal';
    actionLabel = choose('تصدير تقرير', 'Exported Report');
  } else if (action === 'restore') {
    badgeClass = 'badge-mint';
    actionLabel = choose('استعادة', 'Restored');
  } else if (action === 'purge') {
    badgeClass = 'badge-danger';
    actionLabel = choose('حذف نهائي', 'Purged');
  } else if (action === 'invite') {
    badgeClass = 'badge-blue';
    actionLabel = choose('دعوة مستخدم', 'Invite Sent');
  }

  if (entityType === 'task') entityLabel = choose('مهمة', 'Task');
  else if (entityType === 'project') entityLabel = choose('مشروع', 'Project');
  else if (entityType === 'document') entityLabel = choose('مستند', 'Document');
  else if (entityType === 'user') entityLabel = choose('مستخدم', 'User');
  else if (entityType === 'report') entityLabel = choose('تقرير', 'Report');
  else if (entityType === 'role') entityLabel = choose('دور وصلاحيات', 'Role');

  let detailHtml = '—';
  if (details.title || details.name) {
    detailHtml = `<strong>${esc(details.title || details.name)}</strong>`;
  } else if (action === 'status_change' && (details.oldStatus || details.newStatus)) {
    detailHtml = `<span>${esc(statusText(details.oldStatus))} ➔ <strong>${esc(statusText(details.newStatus))}</strong></span>`;
  } else if (log.entityId) {
    detailHtml = `<code style="font-size:11px;color:var(--muted);">${esc(log.entityId)}</code>`;
  }

  return { badgeClass, actionLabel, entityLabel, detailHtml };
}

export function exportAuditLogsXLS(logs = null) {
  const currentLogs = logs || state._lastFilteredAuditLogs || state.data?.auditLogs || [];
  if (!currentLogs.length) {
    showToast(choose('لا توجد عمليات لتصديرها.', 'No logs to export.'), true);
    return;
  }

  const company = state.data?.company || {};
  const companyName = choose(company.nameAr || company.name, company.nameEn || company.name) || 'DARC Design Team';
  let logoUrl = company.logoUrl || '';
  if (logoUrl.startsWith('/') && typeof window !== 'undefined' && window.location?.origin) {
    logoUrl = `${window.location.origin}${logoUrl}`;
  }
  const currentUser = state.data?.user || {};
  const exporterName = choose(currentUser.name, currentUser.nameEn || currentUser.name) || 'Admin';
  const reportDate = formatReportDate();
  const reportTime = formatReportTime();

  let tableHtml = `
    <table>
      <tr>
        <th colspan="7" class="title" style="font-size:18px;font-weight:bold;background:#0d6269;color:#ffffff;text-align:center;padding:12px;">
          ${logoUrl ? `<img src="${esc(logoUrl)}" height="38" style="vertical-align:middle;margin-inline-end:10px;" />` : ''}
          <span style="vertical-align:middle;">${choose('سجل الرقابة والتدقيق الأمني والعمليات — ' + companyName, 'Audit & Security Trail Report — ' + companyName)}</span>
        </th>
      </tr>
      <tr>
        <th colspan="7" class="subtitle" style="font-size:13px;background:#eef2f2;color:#1e293b;text-align:center;padding:8px;">
          ${choose('المؤسسة:', 'Company:')} ${esc(companyName)} | ${choose('المشرف المستخرج:', 'Exported by:')} ${esc(exporterName)} | ${choose('تاريخ التصدير:', 'Export Date:')} ${esc(reportDate)} ${esc(reportTime)}
        </th>
      </tr>
      <tr>
        <th colspan="7" style="background:#f8fafc;color:#64748b;font-size:11px;text-align:center;padding:6px;">
          ${choose('إجمالي العمليات المضمنة في التقرير:', 'Total Events in Report:')} ${currentLogs.length} ${choose('عملية', 'events')}
        </th>
      </tr>
      <tr style="height:10px;"><td colspan="7" style="border:none;"></td></tr>
      <tr class="header" style="background:#134e4a;color:#ffffff;font-weight:bold;font-size:12px;text-align:center;">
        <th style="padding:8px;border:1px solid #cbd5e1;">${choose('المعرف', 'ID')}</th>
        <th style="padding:8px;border:1px solid #cbd5e1;">${choose('التاريخ والوقت', 'Date & Time')}</th>
        <th style="padding:8px;border:1px solid #cbd5e1;">${choose('المنفذ / المستخدم', 'Actor')}</th>
        <th style="padding:8px;border:1px solid #cbd5e1;">${choose('الدور الوظيفي', 'Role')}</th>
        <th style="padding:8px;border:1px solid #cbd5e1;">${choose('نوع النشاط', 'Action')}</th>
        <th style="padding:8px;border:1px solid #cbd5e1;">${choose('نوع العنصر', 'Entity')}</th>
        <th style="padding:8px;border:1px solid #cbd5e1;">${choose('التفاصيل والتغييرات', 'Details / Context')}</th>
      </tr>
  `;

  currentLogs.forEach((log, index) => {
    const author = log.user || (log.userId ? (state.data?.users || []).find(u => u.id === log.userId) : null);
    const authorName = author ? choose(author.name, author.nameEn || author.name) : choose('النظام', 'System');
    const authorRole = author ? roleName(author) : '—';
    const dt = formatAuditTimestamp(log.createdAt);
    const { actionLabel, entityLabel } = renderAuditDetails(log);
    
    let detailsStr = '';
    if (log.details?.title || log.details?.name) {
      detailsStr = log.details.title || log.details.name;
    } else if (log.action === 'status_change') {
      detailsStr = `${statusText(log.details?.oldStatus)} ➔ ${statusText(log.details?.newStatus)}`;
    } else if (typeof log.details === 'object') {
      detailsStr = JSON.stringify(log.details);
    } else {
      detailsStr = String(log.details || log.entityId || '—');
    }

    const rowBg = index % 2 === 0 ? '#ffffff' : '#f8fafc';

    tableHtml += `
      <tr style="background:${rowBg};font-size:11px;vertical-align:middle;">
        <td style="padding:6px 8px;border:1px solid #e2e8f0;font-family:monospace;text-align:center;">${esc(sanitizeForSpreadsheet(log.id || '—'))}</td>
        <td style="padding:6px 8px;border:1px solid #e2e8f0;text-align:center;">${esc(sanitizeForSpreadsheet(`${dt.date} ${dt.time}`))}</td>
        <td style="padding:6px 8px;border:1px solid #e2e8f0;font-weight:bold;">${esc(sanitizeForSpreadsheet(authorName))}</td>
        <td style="padding:6px 8px;border:1px solid #e2e8f0;">${esc(sanitizeForSpreadsheet(authorRole))}</td>
        <td style="padding:6px 8px;border:1px solid #e2e8f0;text-align:center;">${esc(sanitizeForSpreadsheet(actionLabel))}</td>
        <td style="padding:6px 8px;border:1px solid #e2e8f0;text-align:center;">${esc(sanitizeForSpreadsheet(entityLabel))}</td>
        <td style="padding:6px 8px;border:1px solid #e2e8f0;">${esc(sanitizeForSpreadsheet(detailsStr))}</td>
      </tr>
    `;
  });

  tableHtml += '</table>';

  const fullHtml = `
    <html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">
    <head>
      <meta charset="utf-8" />
      <style>
        table { border-collapse: collapse; font-family: 'Segoe UI', Tahoma, Arial, sans-serif; }
        th, td { border: 1px solid #cbd5e1; }
      </style>
    </head>
    <body dir="${state.lang === 'ar' ? 'rtl' : 'ltr'}">
      ${tableHtml}
    </body>
    </html>
  `;

  const blob = new Blob(['\uFEFF' + fullHtml], { type: 'application/vnd.ms-excel;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  const dateStamp = new Date().toISOString().split('T')[0];
  a.download = `DARC_Audit_Trail_${dateStamp}.xls`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);

  showToast(choose('تم تصدير ملف سجل التدقيق بنجاح.', 'Audit trail exported successfully.'));

  // Log the export action silently in audit trail
  api('/api/audit', {
    method: 'POST',
    body: JSON.stringify({
      action: 'export_report',
      entityType: 'report',
      entityId: `rep_audit_${dateStamp}`,
      details: { reportType: 'Audit_Logs_Excel', count: currentLogs.length }
    })
  }).catch(() => {});
}

export function printAuditReport(logs = null) {
  const currentLogs = logs || state._lastFilteredAuditLogs || state.data?.auditLogs || [];
  if (!currentLogs.length) {
    showToast(choose('لا توجد عمليات لطباعتها.', 'No logs to print.'), true);
    return;
  }

  const company = state.data?.company || {};
  const companyName = choose(company.nameAr || company.name, company.nameEn || company.name) || 'DARC Design Team';
  let printLogoUrl = company.logoUrl || '';
  if (printLogoUrl.startsWith('/') && typeof window !== 'undefined' && window.location?.origin) {
    printLogoUrl = `${window.location.origin}${printLogoUrl}`;
  }
  const currentUser = state.data?.user || {};
  const exporterName = choose(currentUser.name, currentUser.nameEn || currentUser.name) || 'Admin';
  const reportDate = formatReportDate();
  const reportTime = formatReportTime();

  // Statistical KPIs
  const totalEvents = currentLogs.length;
  const createsCount = currentLogs.filter(l => l.action === 'create').length;
  const updatesCount = currentLogs.filter(l => l.action === 'update' || l.action === 'status_change').length;
  const deletesCount = currentLogs.filter(l => l.action === 'delete' || l.action === 'purge' || l.action === 'trash').length;

  let rowsHtml = '';
  currentLogs.forEach((log, index) => {
    const author = log.user || (log.userId ? (state.data?.users || []).find(u => u.id === log.userId) : null);
    const authorName = author ? choose(author.name, author.nameEn || author.name) : choose('النظام', 'System');
    const authorRole = author ? roleName(author) : '—';
    const dt = formatAuditTimestamp(log.createdAt);
    const { actionLabel, entityLabel } = renderAuditDetails(log);

    let detailsStr = '';
    if (log.details?.title || log.details?.name) {
      detailsStr = log.details.title || log.details.name;
    } else if (log.action === 'status_change') {
      detailsStr = `${statusText(log.details?.oldStatus)} ➔ ${statusText(log.details?.newStatus)}`;
    } else if (typeof log.details === 'object') {
      detailsStr = JSON.stringify(log.details);
    } else {
      detailsStr = String(log.details || log.entityId || '—');
    }

    rowsHtml += `
      <tr>
        <td style="font-family:monospace;font-size:10px;color:#64748b;text-align:center;">${esc(log.id || String(index + 1))}</td>
        <td style="font-weight:bold;white-space:nowrap;">${esc(dt.date)} <span style="font-size:10px;font-weight:normal;color:#64748b;">${esc(dt.time)}</span></td>
        <td>
          <div style="font-weight:bold;color:#0f172a;">${esc(authorName)}</div>
          <div style="font-size:10px;color:#64748b;">${esc(authorRole)}</div>
        </td>
        <td style="text-align:center;">
          <span class="print-badge">${esc(actionLabel)}</span>
        </td>
        <td style="text-align:center;font-weight:600;">${esc(entityLabel)}</td>
        <td style="font-size:11px;color:#334155;">${esc(detailsStr)}</td>
      </tr>
    `;
  });

  const printWindow = window.open('', '_blank', 'width=1100,height=850');
  if (!printWindow) {
    showToast(choose('يرجى السماح بالنوافذ المنبثقة للطباعة.', 'Please allow popups to print report.'), true);
    return;
  }

  const printHtml = `
    <!DOCTYPE html>
    <html lang="${state.lang}" dir="${state.lang === 'ar' ? 'rtl' : 'ltr'}">
    <head>
      <meta charset="utf-8" />
      <title>DARC Audit & Security Report - ${new Date().toISOString().split('T')[0]}</title>
      <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;800&display=swap" rel="stylesheet" />
      <style>
        @page { size: A4 landscape; margin: 12mm; }
        * { box-sizing: border-box; }
        body {
          font-family: 'Cairo', system-ui, -apple-system, sans-serif;
          margin: 0;
          padding: 24px;
          color: #0f172a;
          background: #ffffff;
          font-size: 11px;
          line-height: 1.4;
        }
        .report-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 2px solid #0d6269;
          padding-bottom: 14px;
          margin-bottom: 16px;
        }
        .brand-title {
          font-size: 20px;
          font-weight: 800;
          color: #0d6269;
          margin: 0;
        }
        .report-subtitle {
          font-size: 12px;
          color: #475569;
          margin-top: 4px;
        }
        .report-meta-box {
          text-align: ${state.lang === 'ar' ? 'left' : 'right'};
          font-size: 11px;
          color: #334155;
        }
        .kpi-row {
          display: flex;
          gap: 12px;
          margin-bottom: 16px;
        }
        .kpi-card {
          flex: 1;
          border: 1px solid #e2e8f0;
          background: #f8fafc;
          border-radius: 8px;
          padding: 8px 12px;
          text-align: center;
        }
        .kpi-val {
          font-size: 18px;
          font-weight: 800;
          color: #0d6269;
        }
        .kpi-label {
          font-size: 10px;
          color: #64748b;
          margin-top: 2px;
        }
        table {
          width: 100%;
          border-collapse: collapse;
          margin-bottom: 24px;
        }
        th, td {
          border: 1px solid #cbd5e1;
          padding: 7px 9px;
          text-align: ${state.lang === 'ar' ? 'right' : 'left'};
          vertical-align: middle;
        }
        th {
          background: #0d6269;
          color: #ffffff;
          font-size: 11px;
          font-weight: 700;
          text-align: center;
        }
        tr:nth-child(even) {
          background: #f8fafc;
        }
        .print-badge {
          display: inline-block;
          padding: 2px 8px;
          border-radius: 4px;
          font-size: 10px;
          font-weight: 700;
          background: #e2e8f0;
          color: #1e293b;
        }
        .signature-section {
          margin-top: 32px;
          display: flex;
          justify-content: space-between;
          gap: 30px;
          page-break-inside: avoid;
        }
        .signature-box {
          flex: 1;
          border-top: 1px dashed #94a3b8;
          padding-top: 8px;
          text-align: center;
          font-size: 11px;
          color: #475569;
        }
        .no-print-bar {
          background: #f1f5f9;
          border: 1px solid #cbd5e1;
          border-radius: 8px;
          padding: 10px 16px;
          margin-bottom: 20px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .btn-print {
          background: #0d6269;
          color: #ffffff;
          border: none;
          padding: 8px 18px;
          border-radius: 6px;
          font-weight: bold;
          cursor: pointer;
          font-family: inherit;
        }
        @media print {
          .no-print-bar { display: none !important; }
          body { padding: 0; }
        }
      </style>
    </head>
    <body>
      <div class="no-print-bar">
        <div>
          <strong>${choose('معاينة التقرير الرقابي الرسمي جاهزة للطباعة / التصدير PDF', 'Official Executive Audit Report Ready for Print / Save as PDF')}</strong>
          <span style="display:block;font-size:11px;color:#64748b;">${choose('يمكنك الضغط على زر الطباعة أدناه واختيار "Save as PDF" لتخزين الملف كـ PDF رسمي.', 'Click the button below and choose "Save as PDF" in your browser.')}</span>
        </div>
        <button class="btn-print" onclick="window.print()">${choose('طباعة / حفظ كـ PDF', 'Print / Save as PDF')}</button>
      </div>

      <header class="report-header">
        <div>
          ${printLogoUrl ? `<img src="${esc(printLogoUrl)}" alt="Logo" style="height:44px;object-fit:contain;margin-bottom:6px;display:block;" />` : ''}
          <h1 class="brand-title">${esc(companyName)}</h1>
          <div class="report-subtitle">${choose('تقرير الرقابة والتدقيق الأمني وسجل العمليات الإدارية', 'Official Security Audit & Governance Operations Trail')}</div>
        </div>
        <div class="report-meta-box">
          <div><strong>${choose('المشرف المستخرج:', 'Generated By:')}</strong> ${esc(exporterName)}</div>
          <div><strong>${choose('تاريخ التقرير:', 'Report Date:')}</strong> ${esc(reportDate)} - ${esc(reportTime)}</div>
          <div><strong>${choose('حالة النظام:', 'System Status:')}</strong> Active / Enforced</div>
        </div>
      </header>

      <div class="kpi-row">
        <div class="kpi-card">
          <div class="kpi-val">${totalEvents}</div>
          <div class="kpi-label">${choose('إجمالي العمليات', 'Total Events')}</div>
        </div>
        <div class="kpi-card">
          <div class="kpi-val" style="color:#059669;">${createsCount}</div>
          <div class="kpi-label">${choose('عمليات إنشاء', 'Create Operations')}</div>
        </div>
        <div class="kpi-card">
          <div class="kpi-val" style="color:#2563eb;">${updatesCount}</div>
          <div class="kpi-label">${choose('عمليات تعديل وحالة', 'Updates & State Changes')}</div>
        </div>
        <div class="kpi-card">
          <div class="kpi-val" style="color:#dc2626;">${deletesCount}</div>
          <div class="kpi-label">${choose('عمليات حذف وحركة سلة', 'Deletions & Trash Moves')}</div>
        </div>
      </div>

      <table>
        <thead>
          <tr>
            <th style="width:50px;">#</th>
            <th style="width:130px;">${choose('التاريخ والوقت', 'Timestamp')}</th>
            <th style="width:160px;">${choose('المستخدم / المنفذ', 'Actor')}</th>
            <th style="width:90px;">${choose('نوع النشاط', 'Action')}</th>
            <th style="width:90px;">${choose('نوع العنصر', 'Entity')}</th>
            <th>${choose('التفاصيل والتغييرات', 'Details & Context')}</th>
          </tr>
        </thead>
        <tbody>
          ${rowsHtml}
        </tbody>
      </table>

      <footer class="signature-section">
        <div class="signature-box">
          <strong>${choose('إعداد وتصدير التقرير', 'Prepared By')}</strong><br /><br />
          <span>${esc(exporterName)}</span>
        </div>
        <div class="signature-box">
          <strong>${choose('مسؤول الجودة والامتثال الأمني', 'Security & Compliance Lead')}</strong><br /><br />
          <span>..............................................</span>
        </div>
        <div class="signature-box">
          <strong>${choose('الاعتماد الإداري العام', 'General Management Approval')}</strong><br /><br />
          <span>..............................................</span>
        </div>
      </footer>
    </body>
    </html>
  `;

  printWindow.document.open();
  printWindow.document.write(printHtml);
  printWindow.document.close();

  // Log report print action in audit trail
  api('/api/audit', {
    method: 'POST',
    body: JSON.stringify({
      action: 'export_report',
      entityType: 'report',
      entityId: `rep_audit_print_${Date.now()}`,
      details: { reportType: 'Audit_Logs_Print_PDF', count: currentLogs.length }
    })
  }).catch(() => {});
}

export async function fetchFullAuditHistory() {
  try {
    showToast(choose('جاري تحميل سجل التدقيق التاريخي الكامل...', 'Loading complete audit history...'));
    const res = await api('/api/audit?limit=1000');
    if (res && res.logs) {
      state.data.auditLogs = res.logs;
      state.auditFullHistoryLoaded = true;
      renderView();
      showToast(choose(`تم جلب ${res.logs.length} عملية بنجاح.`, `Loaded ${res.logs.length} audit logs.`));
    }
  } catch (err) {
    showToast(err.message || choose('فشل جلب السجل التاريخي.', 'Failed to fetch audit history.'), true);
  }
}

export function renderSettings() {
  const currentUserId = state.data?.user?.id;
  const userIsAdmin = isAdmin();
  const canAccessAccounts = userIsAdmin || can('manage_users') || can('view_user_activity');

  // Settings tabs: All users can access Profile and Security
  // Admins or authorized roles also get Company, Roles, Accounts, Trash, Audit
  const sections = [
    ['profile', choose('الملف الشخصي', 'Profile')],
    ...(userIsAdmin || can('manage_settings') ? [['company', t('company')]] : []),
    ...(userIsAdmin || can('manage_roles') ? [['roles', t('roles')]] : []),
    ...(canAccessAccounts ? [['accounts', t('accounts')]] : []),
    ['security', choose('الأمان', 'Security')],
    ['trash', choose('سلة المهملات', 'Trash')],
    ...(userIsAdmin || can('view_audit_logs') ? [['audit', t('audit')]] : [])
  ];

  if (!sections.some(([k]) => k === state.settingsSection)) {
    state.settingsSection = 'profile';
  }

  const currentUser = state.data?.user || {};
  let content = '';

  // PROFILE SECTION (All users)
  if (state.settingsSection === 'profile') {
    content = `
      <section class="setting-section">
        <div class="panel-head">
          <div>
            <h2>${choose('الملف الشخصي', 'Profile')}</h2>
            <p>${choose('إدارة صورتك الشخصية وبيانات حسابك في النظام.', 'Manage your profile picture and account information.')}</p>
          </div>
        </div>

        <div class="profile-avatar-card">
          <label for="user-avatar-file-input" class="avatar-upload-trigger" id="profile-avatar-preview" role="button" tabindex="0" title="${choose('انقر لرفع صورة شخصية جديدة', 'Click to upload a new profile picture')}">
            <div class="avatar-upload-circle">
              ${currentUser.avatarUrl
                ? `<img src="${esc(currentUser.avatarUrl)}" alt="Avatar" class="avatar-upload-img" onerror="this.style.display='none';this.nextElementSibling.style.display='flex';" /><div class="avatar-upload-fallback" style="display:none;background:${/^#[0-9a-f]{6}$/i.test(currentUser.avatarColor || '') ? currentUser.avatarColor : '#0d6269'};">${esc(initials(currentUser))}</div>`
                : `<div class="avatar-upload-fallback" style="background:${/^#[0-9a-f]{6}$/i.test(currentUser.avatarColor || '') ? currentUser.avatarColor : '#0d6269'};">${esc(initials(currentUser))}</div>`
              }
              <div class="avatar-upload-overlay">
                ${icon('upload', 18)}
                <span>${choose('تغيير', 'Change')}</span>
              </div>
            </div>
          </label>
          <div class="profile-avatar-meta">
            <h3 class="profile-user-name">${esc(choose(currentUser.name, currentUser.nameEn || currentUser.name))}</h3>
            <p class="profile-user-role">${esc(choose(currentUser.jobTitleAr || '', currentUser.jobTitleEn || currentUser.jobTitleAr || ''))} · <span class="status-badge done">${esc(roleName(currentUser))}</span></p>
            <div class="profile-upload-actions">
              <input type="file" id="user-avatar-file-input" accept="image/jpeg,image/png,image/webp" style="position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);border:0;opacity:0;pointer-events:none;" />
              <label for="user-avatar-file-input" class="btn btn-soft btn-sm" role="button" tabindex="0" style="cursor:pointer;display:inline-flex;align-items:center;gap:6px;">
                ${icon('upload', 14)} ${choose('رفع صورة جديدة', 'Upload new avatar')}
              </label>
              <span class="upload-hint">${choose('يدعم JPG, PNG, WebP (حد أقصى 2MB)', 'Supports JPG, PNG, WebP (Max 2MB)')}</span>
            </div>
          </div>
        </div>

        <form data-action="update-profile">
          <div class="form-grid">
            <div class="field">
              <label>${t('nameAr')}</label>
              <input name="name" value="${esc(currentUser.name || '')}" required />
            </div>
            <div class="field">
              <label>${t('nameEn')}</label>
              <input name="nameEn" value="${esc(currentUser.nameEn || '')}" />
            </div>
            <div class="field">
              <label>${t('jobTitle')} (${choose('عربي', 'AR')})</label>
              <input name="jobTitleAr" value="${esc(currentUser.jobTitleAr || '')}" />
            </div>
            <div class="field">
              <label>${t('jobTitle')} (${choose('إنجليزي', 'EN')})</label>
              <input name="jobTitleEn" value="${esc(currentUser.jobTitleEn || '')}" />
            </div>
            <div class="field full">
              <label>${t('email')}</label>
              <input value="${esc(currentUser.email || '')}" disabled style="background:var(--surface-soft);cursor:not-allowed;" />
            </div>
            <div class="field full">
              <label>${choose('نظام التقويم المفضل في المنصة', 'Preferred Calendar System')}</label>
              <select name="calendarSystem" class="input">
                <option value="gregorian" ${getActiveCalendarSystem() === 'gregorian' ? 'selected' : ''}>${choose('ميلادي — اليوم / الشهر / السنة (مثال: 07/09/2026)', 'Gregorian — Day / Month / Year (e.g. 07/09/2026)')}</option>
                <option value="hijri" ${getActiveCalendarSystem() === 'hijri' ? 'selected' : ''}>${choose('هجري أم القرى — اليوم / الشهر / السنة (مثال: 25/02/1448 هـ)', 'Hijri Umm al-Qura — Day / Month / Year (e.g. 25/02/1448 AH)')}</option>
              </select>
            </div>
          </div>
          <div class="form-actions" style="margin-top:20px;">
            <button type="submit" class="btn btn-primary">${t('save')}</button>
          </div>
        </form>
      </section>
    `;
  }

  // COMPANY SECTION (Admin or manage_settings)
  if (state.settingsSection === 'company' && (userIsAdmin || can('manage_settings'))) {
    const comp = state.data?.company || {};
    content = `
      <section class="setting-section">
        <div class="panel-head">
          <div>
            <h2>${t('company')}</h2>
            <p>${choose('هوية مساحة العمل وشعار الشركة واللغة الافتراضية.', 'Workspace identity, company logo, and default language.')}</p>
          </div>
        </div>
        
        <div class="company-preview">
          <label for="company-logo-file-input" class="logo-upload-trigger" id="company-logo-preview" role="button" tabindex="0" title="${choose('انقر لرفع وتعديل شعار الشركة', 'Click to upload and change company logo')}">
            <div class="logo-upload-box">
              ${comp.logoUrl 
                ? `<img src="${esc(comp.logoUrl)}" alt="Logo" class="logo-upload-img" onerror="this.style.display='none';this.nextElementSibling.style.display='flex';" /><span class="brand-mark" style="display:none;">${icon('building', 24)}</span>`
                : `<span class="brand-mark">${icon('building', 24)}</span>`
              }
              <div class="logo-upload-overlay">
                ${icon('upload', 16)}
                <span>${choose('تعديل', 'Edit')}</span>
              </div>
            </div>
          </label>
          <div class="company-preview-meta">
            <strong class="company-name">${esc(comp.name || 'DARC Design Team')}</strong>
            <span class="company-sub">${choose('العربية افتراضيًا · دعم الإنجليزية · توقيت الرياض', 'Arabic default · English support · Riyadh timezone')}</span>
            <div class="company-upload-actions">
              <input type="file" id="company-logo-file-input" accept="image/png,image/jpeg,image/webp,image/svg+xml" style="position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);border:0;opacity:0;pointer-events:none;" />
              <label for="company-logo-file-input" class="btn btn-soft btn-sm" role="button" tabindex="0" style="cursor:pointer;display:inline-flex;align-items:center;gap:6px;">
                ${icon('upload', 14)} ${choose('رفع وتعديل الشعار', 'Upload & Change Logo')}
              </label>
              <span class="upload-hint">${choose('يدعم PNG, SVG, JPG (حد أقصى 2MB)', 'Supports PNG, SVG, JPG (Max 2MB)')}</span>
            </div>
          </div>
        </div>

        <form data-action="update-company" class="company-form">
          <div class="form-grid">
            <div class="field">
              <label>${t('nameAr')}</label>
              <input name="nameAr" value="${esc(comp.nameAr || '')}" required />
            </div>
            <div class="field">
              <label>${t('nameEn')}</label>
              <input name="nameEn" value="${esc(comp.nameEn || '')}" />
            </div>
            <div class="field full">
              <label>${t('emailStatus')}</label>
              <input value="${esc(state.data?.emailConfigured ? t('emailConfigured') : t('emailNotConfigured'))}" disabled />
            </div>
          </div>
          <div class="form-actions" style="margin-top:20px;">
            <button type="submit" class="btn btn-primary">${t('save')}</button>
          </div>
        </form>
        <div class="login-demo" style="margin-top:16px;">${icon('info', 16)}<span>${t('emailInfo')}</span></div>
      </section>
      <section class="setting-section">
        <div class="panel-head">
          <div>
            <h2>${choose('نموذج الإنجاز', 'Progress model')}</h2>
            <p>${t('weightedExplanation')}</p>
          </div>
        </div>
        <div class="report-stat-list">
          <div class="report-stat"><span>${t('weightedProgress')}</span><strong style="color:var(--teal)">100%</strong></div>
          <div class="report-stat"><span>${t('simpleProgress')}</span><strong style="color:var(--ink-soft)">—</strong></div>
        </div>
      </section>
    `;
  }

  // SECURITY SECTION (All users)
  if (state.settingsSection === 'security') {
    content = `
      <section class="setting-section">
        <div class="panel-head">
          <div>
            <h2>${choose('الأمان', 'Security')}</h2>
            <p>${choose('تغيير كلمة المرور أو تسجيل الخروج من كافة الأجهزة.', 'Change your password or sign out from all devices.')}</p>
          </div>
        </div>
        <form data-action="change-password">
          <div class="form-grid" style="margin-top:18px">
            <div class="field"><label>${choose('كلمة المرور الحالية', 'Current password')}</label><input type="password" name="oldPassword" required /></div>
            <div class="field"><label>${choose('كلمة المرور الجديدة', 'New password')}</label><input type="password" name="newPassword" minlength="10" required /></div>
          </div>
          <div class="form-actions" style="margin-top:20px"><button type="submit" class="btn btn-primary">${t('save')}</button></div>
        </form>
        <hr style="margin:28px 0;border:0;border-top:1px solid var(--line)">
        <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:14px;">
          <div>
            <h3 style="font-size:14px;margin:0 0 4px">${choose('تسجيل الخروج من كل الأجهزة', 'Sign out of all devices')}</h3>
            <p style="color:var(--muted);font-size:12px;margin:0;">${choose('إنهاء كافة الجلسات النشطة على كل المتصفحات.', 'End all active sessions on all browsers.')}</p>
          </div>
          <button class="btn btn-danger btn-sm" data-action="logout-all">${choose('تسجيل خروج للكل', 'Sign out all')}</button>
        </div>
      </section>
    `;
  }

  // ACCOUNTS SECTION (Admin or users with manage_users / view_user_activity)
  if (state.settingsSection === 'accounts' && canAccessAccounts) {
    const canSeeActivity = isAdmin() || can('view_user_activity');
    const canManageUsers = isAdmin() || can('manage_users');
    const canManageExisting = isAdmin() || can('manage_existing_account_permissions') || can('manage_users');
    const canImpersonate = isAdmin();
    let accountsList = (state.data?.users || []);
    // Stealth Super Admin: Ahmad is completely invisible to any other user
    if (currentUserId !== 'usr_ahmad') {
      accountsList = accountsList.filter(u => u.id !== 'usr_ahmad');
    }

    content = `
      <section class="setting-section">
        <div class="panel-head">
          <div>
            <h2>${t('accounts')}</h2>
            <p>${choose('الحسابات الحالية وصلاحية كل عضو. يمكنك إضافة أو تعديل أو تعطيل الحسابات من هنا.', 'Current accounts and each member’s access. Add, edit, or deactivate them here.')}</p>
          </div>
          ${canManageUsers ? `<button class="btn btn-primary btn-sm" data-action="new-user">${icon('plus', 14)} ${t('addMember')}</button>` : ''}
        </div>
        <div class="table-wrap">
          <table class="data-table">
            <thead>
              <tr>
                <th>${t('team')}</th>
                <th>${t('role')}</th>
                <th>${t('email')}</th>
                <th>${t('accountStatus')}</th>
                ${canSeeActivity ? `<th>${choose('آخر ظهور ونشاط', 'Last Seen & Activity')}</th>` : ''}
                ${canManageExisting ? '<th></th>' : ''}
              </tr>
            </thead>
            <tbody>
              ${accountsList.map((user) => {
                const isAhmad = user.id === 'usr_ahmad';
                return `
                  <tr>
                    <td>
                      <div class="team-member">
                        ${avatar(user)}
                        <div class="team-member-copy">
                          <strong>${esc(choose(user.name, user.nameEn || user.name))}</strong>
                          <span>${esc(choose(user.jobTitleAr || (isAhmad ? 'المبرمج / مدير النظام' : ''), user.jobTitleEn || user.jobTitleAr || ''))}</span>
                        </div>
                      </div>
                    </td>
                    <td>
                      ${isAhmad ? `<span class="stealth-dev-badge">${icon('shield', 12)} ${choose('مدير ومطور النظام', 'Super Admin & Dev')}</span>` : esc(roleName(user))}
                    </td>
                    <td>${user.email ? esc(user.email) : `<span style="color:var(--muted)">${t('noEmail')}</span>`}</td>
                    <td>
                      <span class="status-badge ${user.status === 'active' ? 'done' : 'not_started'}">${user.status === 'active' ? t('activeAccount') : t('pendingAccount')}</span>
                    </td>
                    ${canSeeActivity ? `
                      <td>
                        ${renderUserActivityCell(user)}
                      </td>
                    ` : ''}
                    ${canManageExisting ? `
                      <td>
                        <div class="role-actions">
                          ${isAhmad ? `
                            <button class="btn btn-soft btn-sm" data-action="open-user" data-user-id="${esc(user.id)}">${t('edit')}</button>
                          ` : `
                            <button class="btn btn-soft btn-sm" data-action="open-user" data-user-id="${esc(user.id)}">${t('edit')}</button>
                            ${user.id !== state.data?.user?.id ? `
                              <button class="btn btn-soft btn-sm" data-action="force-password-user" data-user-id="${esc(user.id)}" title="${user.status === 'pending' ? choose('تفعيل الحساب يدوياً', 'Activate manually') : choose('تغيير كلمة المرور', 'Change password')}">${icon(user.status === 'pending' ? 'check' : 'settings', 13)}</button>
                              ${canImpersonate ? `<button class="btn btn-soft btn-sm" data-action="impersonate-user" data-user-id="${esc(user.id)}" title="دخول كـ هذا الحساب">${icon('user', 13)}</button>` : ''}
                            ` : ''}
                            ${user.id !== state.data?.user?.id && user.email ? `<button class="btn btn-ghost btn-sm" data-action="invite-user" data-user-id="${esc(user.id)}">${icon('send', 13)}</button>` : ''}
                            ${user.id !== state.data?.user?.id ? `<button class="btn btn-danger btn-sm" data-action="deactivate-user" data-user-id="${esc(user.id)}">${icon('trash', 13)}</button>` : ''}
                          `}
                        </div>
                      </td>
                    ` : ''}
                  </tr>
                `;
              }).join('')}
            </tbody>
          </table>
        </div>
      </section>
    `;
  }

  // ROLES SECTION (Admin or manage_roles)
  if (state.settingsSection === 'roles' && (userIsAdmin || can('manage_roles'))) {
    content = `
      <section class="setting-section">
        <div class="panel-head">
          <div>
            <h2>${t('roles')}</h2>
            <p>${choose('إدارة الأدوار وصلاحيات الوصول للنظام.', 'Manage roles and access permissions across the system.')}</p>
          </div>
          ${(userIsAdmin || can('manage_roles')) ? `<button class="btn btn-primary btn-sm" data-action="new-role">${icon('plus', 14)} ${t('addRole')}</button>` : ''}
        </div>
        <div class="role-list">
          ${(state.data?.roles || []).map((role) => `
            <div class="role-row">
              <div class="role-copy">
                <div class="role-title-row">
                  <strong class="role-name">${esc(choose(role.nameAr, role.nameEn))}</strong>
                  ${role.builtIn ? `<span class="role-system-badge">${icon('shield', 11)} ${t('builtIn')}</span>` : ''}
                </div>
                <p class="role-desc">${esc(choose(role.descriptionAr, role.descriptionEn))}</p>
                <div class="role-meta">${role.permissions.includes('*') ? choose('صلاحية كاملة', 'Full access') : `${role.permissions.length} ${t('permissionCount')}`}</div>
              </div>
              <div class="role-actions">
                <button class="btn btn-soft btn-sm" data-action="open-role" data-role-id="${esc(role.id)}">${icon('edit', 13)} ${t('edit')}</button>
                ${!role.builtIn ? `<button class="btn btn-danger btn-sm" data-action="delete-role" data-role-id="${esc(role.id)}">${icon('trash', 13)}</button>` : ''}
              </div>
            </div>
          `).join('')}
        </div>
      </section>
    `;
  }

  // TRASH SECTION (Available to all users, scoped by project membership)
  if (state.settingsSection === 'trash') {
    if (!state.trashLoaded && !state._trashFetching) {
      state._trashFetching = true;
      api('/api/trash').then(data => {
        state.trash = Array.isArray(data) ? data : (data.trash || [
          ...(data.projects || []).map(p => ({...p, type:'project'})),
          ...(data.tasks || []).map(t => ({...t, type:'task'})),
          ...(data.documents || []).map(d => ({...d, type:'document'}))
        ]);
        state.trashLoaded = true;
        state._trashFetching = false;
        if (typeof window.renderView === 'function') window.renderView();
      }).catch(err => {
        state._trashFetching = false;
        console.error('[Trash fetch error]', err);
      });
    }

    const allTrashItems = state.trash || [];
    const currentFilter = state.trashFilter || 'all';
    const searchQuery = (state.trashQuery || '').trim().toLowerCase();

    const filteredItems = allTrashItems.filter(item => {
      if (currentFilter !== 'all' && item.type !== currentFilter) return false;
      if (!searchQuery) return true;
      const name = (choose(item.nameAr || item.titleAr, item.nameEn || item.titleEn) || item.name || item.title || item.originalName || '').toLowerCase();
      const code = (item.code || item.projectCode || '').toLowerCase();
      const parent = (item.projectNameAr || item.projectNameEn || '').toLowerCase();
      return name.includes(searchQuery) || code.includes(searchQuery) || parent.includes(searchQuery);
    });

    const projectCount = allTrashItems.filter(x => x.type === 'project').length;
    const taskCount = allTrashItems.filter(x => x.type === 'task').length;
    const docCount = allTrashItems.filter(x => x.type === 'document').length;

    const listHtml = allTrashItems.length ? `
      <div class="trash-notice-banner">
        <div class="trash-notice-icon">${icon('info', 16)}</div>
        <div class="trash-notice-text">
          <strong>${choose('سلة المحذوفات المركزية المحمية', 'Central Protected Trash Bin')}</strong>
          <p>${choose('تحتفظ المنصة بالمشاريع والمهام والمستندات المحذوفة لمدة 30 يومًا قبل الحذف التلقائي. استعادة أي عنصر تعيده فوراً لمكانه دون فقدان أي بيانات.', 'Projects, tasks, and documents are retained for 30 days before permanent purging. Restoring any item recovers it immediately with full data integrity.')}</p>
        </div>
      </div>

      <div class="trash-filter-bar" style="display:flex;align-items:center;justify-content:space-between;gap:12px;margin-bottom:16px;flex-wrap:wrap;">
        <div style="display:flex;align-items:center;gap:6px;flex-wrap:wrap;">
          <button class="btn btn-sm ${currentFilter === 'all' ? 'btn-primary' : 'btn-ghost'}" data-action="filter-trash" data-filter="all">
            ${choose('الكل', 'All')} <span class="badge" style="margin-inline-start:4px;font-size:10px;background:rgba(255,255,255,0.25);">${allTrashItems.length}</span>
          </button>
          <button class="btn btn-sm ${currentFilter === 'project' ? 'btn-primary' : 'btn-ghost'}" data-action="filter-trash" data-filter="project">
            ${icon('building', 12)} ${choose('المشاريع', 'Projects')} <span class="badge" style="margin-inline-start:4px;font-size:10px;background:rgba(255,255,255,0.25);">${projectCount}</span>
          </button>
          <button class="btn btn-sm ${currentFilter === 'task' ? 'btn-primary' : 'btn-ghost'}" data-action="filter-trash" data-filter="task">
            ${icon('checklist', 12)} ${choose('المهام', 'Tasks')} <span class="badge" style="margin-inline-start:4px;font-size:10px;background:rgba(255,255,255,0.25);">${taskCount}</span>
          </button>
          <button class="btn btn-sm ${currentFilter === 'document' ? 'btn-primary' : 'btn-ghost'}" data-action="filter-trash" data-filter="document">
            ${icon('document', 12)} ${choose('المستندات', 'Documents')} <span class="badge" style="margin-inline-start:4px;font-size:10px;background:rgba(255,255,255,0.25);">${docCount}</span>
          </button>
        </div>
        <div class="search-box search-sm" style="min-width:220px;max-width:320px;flex:1;">
          ${icon('search', 14)}
          <input type="search" placeholder="${choose('بحث في المحذوفات...', 'Search deleted items...')}" value="${esc(state.trashQuery || '')}" data-action="search-trash-input" />
        </div>
      </div>

      ${filteredItems.length ? `
        <div class="table-wrap">
          <table class="data-table">
            <thead>
              <tr>
                <th>${choose('الاسم / العنوان', 'Name / Title')}</th>
                <th>${choose('النوع', 'Type')}</th>
                <th>${choose('المشروع التابع له', 'Project')}</th>
                <th>${choose('الحالة السابقة', 'Prior Status')}</th>
                <th>${choose('تاريخ الحذف', 'Deleted At')}</th>
                <th style="text-align:${state.lang === 'ar' ? 'left' : 'right'}">${choose('الإجراءات', 'Actions')}</th>
              </tr>
            </thead>
            <tbody>
              ${filteredItems.map((item) => {
                const isProject = item.type === 'project';
                const isTask = item.type === 'task';
                const isDoc = item.type === 'document';

                const displayName = choose(item.nameAr || item.titleAr, item.nameEn || item.titleEn) || item.name || item.title || item.originalName || item.code || choose('عنصر محذوف', 'Deleted item');
                const parentProject = !isProject && item.projectId ? (state.data?.projects || []).find(p => p.id === item.projectId) : null;
                const parentDisplayName = item.projectNameAr || item.projectNameEn || (parentProject ? choose(parentProject.nameAr, parentProject.nameEn || parentProject.nameAr) : null);
                const parentCode = item.projectCode || parentProject?.code;

                const sizeFormatted = isDoc && item.size ? (
                  item.size > 1024 * 1024 
                    ? (item.size / (1024 * 1024)).toFixed(1) + ' MB' 
                    : Math.round(item.size / 1024) + ' KB'
                ) : '';

                const canPurge = userIsAdmin || can('manage_trash') || item.uploaderId === currentUserId;

                return `
                  <tr class="trash-row">
                    <td>
                      <div class="trash-item-cell">
                        <div class="trash-item-icon ${isProject ? 'is-project' : (isTask ? 'is-task' : 'is-doc')}">
                          ${icon(isProject ? 'building' : (isTask ? 'checklist' : 'document'), 14)}
                        </div>
                        <div>
                          <strong class="trash-item-title">${esc(displayName)}</strong>
                          ${(item.code || isProject) ? `<span class="trash-item-code">${esc(item.code || item.id)}</span>` : ''}
                          ${isDoc && sizeFormatted ? `<span class="trash-item-code" style="color:var(--muted);">${sizeFormatted}</span>` : ''}
                        </div>
                      </div>
                    </td>
                    <td>
                      <span class="type-pill ${isProject ? 'type-project' : (isTask ? 'type-task' : 'type-doc')}">
                        ${icon(isProject ? 'building' : (isTask ? 'checklist' : 'document'), 11)}
                        ${isProject ? choose('مشروع', 'Project') : (isTask ? choose('مهمة', 'Task') : choose('مستند', 'Document'))}
                      </span>
                    </td>
                    <td>
                      <span class="trash-parent-badge">
                        ${isProject 
                          ? `<span class="mini-badge" style="background:var(--mint);color:var(--teal);">${choose('مشروع رئيسي', 'Primary Project')}</span>` 
                          : (parentDisplayName 
                              ? `${icon('building', 11)} <span>${esc(parentDisplayName)}${parentCode ? ` (${esc(parentCode)})` : ''}</span>${isDoc && item.taskTitleAr ? ` <span style="font-size:11px;color:var(--muted)">· ${esc(item.taskTitleAr)}</span>` : ''}` 
                              : `<span style="color:var(--muted)">—</span>`
                            )
                        }
                      </span>
                    </td>
                    <td>
                      ${item.status ? `<span class="status-badge ${esc(item.status)}">${esc(statusText(item.status))}</span>` : `<span style="color:var(--muted)">—</span>`}
                    </td>
                    <td>
                      <span class="trash-date" title="${esc(item.deletedAt || '')}">
                        ${dateLabel(item.deletedAt, true)}
                      </span>
                    </td>
                    <td style="text-align:${state.lang === 'ar' ? 'left' : 'right'}">
                      <div style="display:inline-flex;align-items:center;gap:6px;">
                        <button class="btn btn-soft btn-sm restore-btn" data-action="restore-item" data-type="${esc(item.type)}" data-id="${esc(item.id)}" title="${choose('استعادة العنصر وإعادته للعمل', 'Restore item to active')}">
                          ${icon(state.lang === 'ar' ? 'arrow' : 'arrowLeft', 12)} ${choose('استعادة', 'Restore')}
                        </button>
                        ${canPurge ? `
                          <button class="btn btn-danger btn-sm" data-action="purge-trash-item" data-type="${esc(item.type)}" data-id="${esc(item.id)}" title="${choose('حذف العنصر نهائياً', 'Permanently delete item')}">
                            ${icon('trash', 12)} ${choose('حذف نهائي', 'Purge')}
                          </button>
                        ` : ''}
                      </div>
                    </td>
                  </tr>
                `;
              }).join('')}
            </tbody>
          </table>
        </div>
      ` : `
        <div class="empty">
          ${icon('search', 22)}
          <span>${choose('لا توجد نتائج تطابق بحثك في سلة المهملات.', 'No items match your search in trash.')}</span>
        </div>
      `}
    ` : `
      <div class="empty">
        ${icon('trash', 24)}
        <span>${choose('سلة المهملات فارغة، لا توجد عناصر محذوفة حالياً.', 'Trash is empty, no deleted items found.')}</span>
      </div>
    `;

    content = `
      <section class="setting-section">
        <div class="panel-head">
          <div style="flex:1;">
            <div style="display:flex;align-items:center;gap:10px;">
              <h2>${choose('سلة المهملات', 'Recycle Bin')}</h2>
              <span class="mini-badge badge-neutral" style="padding:3px 9px;font-size:10px;font-weight:700;">
                ${allTrashItems.length} ${choose('عناصر', 'items')}
              </span>
            </div>
            <p>${choose('استعراض واستعادة المشاريع والمهام والمستندات المحذوفة مؤقتاً، أو حذفها نهائياً.', 'Review, restore, or permanently purge temporarily deleted projects, tasks, and documents.')}</p>
          </div>
          ${(userIsAdmin || can('manage_trash')) && allTrashItems.length > 0 ? `
            <div class="page-actions">
              <button class="btn btn-danger btn-sm" data-action="empty-trash" title="${choose('حذف كافة العناصر المحذوفة نهائياً من قاعدة البيانات', 'Permanently erase all deleted items')}">
                ${icon('trash', 13)} ${choose('إفراغ سلة المهملات', 'Empty Trash')}
              </button>
            </div>
          ` : ''}
        </div>
        ${listHtml}
      </section>
    `;
  }

  // AUDIT SECTION (Admin or view_audit_logs)
  if (state.settingsSection === 'audit' && (userIsAdmin || can('view_audit_logs'))) {
    const rawAuditLogs = state.data?.auditLogs || [];
    const sortedLogs = [...rawAuditLogs].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    const currentAction = state.auditFilterAction || 'all';
    const currentEntity = state.auditFilterEntity || 'all';
    const currentUser = state.auditFilterUser || 'all';
    const searchQuery = (state.auditSearchQuery || '').trim().toLowerCase();

    const filteredLogs = sortedLogs.filter(log => {
      if (currentAction !== 'all' && log.action !== currentAction) return false;
      if (currentEntity !== 'all' && (log.entityType || log.entity_type) !== currentEntity) return false;
      if (currentUser !== 'all') {
        const uid = log.userId || log.user_id || log.user?.id;
        if (uid !== currentUser) return false;
      }
      if (searchQuery) {
        const author = log.user || (log.userId ? (state.data?.users || []).find(u => u.id === log.userId) : null);
        const authorName = (author ? (choose(author.name, author.nameEn || author.name) || '') : '').toLowerCase();
        const { actionLabel, entityLabel } = renderAuditDetails(log);
        const actionStr = (actionLabel || log.action || '').toLowerCase();
        const entityStr = (entityLabel || log.entityType || '').toLowerCase();
        const idStr = (log.id || log.entityId || '').toLowerCase();
        const detailsStr = typeof log.details === 'object' ? JSON.stringify(log.details).toLowerCase() : String(log.details || '').toLowerCase();
        
        const match = authorName.includes(searchQuery) || 
                      actionStr.includes(searchQuery) || 
                      entityStr.includes(searchQuery) || 
                      idStr.includes(searchQuery) || 
                      detailsStr.includes(searchQuery);
        if (!match) return false;
      }
      return true;
    });

    state._lastFilteredAuditLogs = filteredLogs;

    const ACTION_FILTERS = [
      ['all', choose('كافة العمليات', 'All Actions')],
      ['create', choose('إنشاء جديد', 'Create')],
      ['update', choose('تعديل بيانات', 'Update')],
      ['status_change', choose('تغيير حالة', 'Status Change')],
      ['delete', choose('نقل للمهملات', 'Delete / Trash')],
      ['restore', choose('استعادة', 'Restore')],
      ['purge', choose('حذف نهائي', 'Purge')],
      ['export_report', choose('تصدير تقرير', 'Export Report')],
      ['login', choose('تسجيل دخول', 'Sign In')],
      ['invite', choose('دعوة مستخدم', 'Invite')]
    ];

    const ENTITY_FILTERS = [
      ['all', choose('كافة العناصر', 'All Entities')],
      ['project', choose('المشاريع', 'Projects')],
      ['task', choose('المهام', 'Tasks')],
      ['document', choose('المستندات', 'Documents')],
      ['user', choose('المستخدمين', 'Users')],
      ['role', choose('الأدوار والصلاحيات', 'Roles')],
      ['company', choose('إعدادات الشركة', 'Company Settings')],
      ['report', choose('التقارير', 'Reports')]
    ];

    const isFiltered = currentAction !== 'all' || currentEntity !== 'all' || currentUser !== 'all' || !!searchQuery;

    content = `
      <section class="setting-section">
        <div class="panel-head" style="display:flex;align-items:flex-start;justify-content:space-between;gap:16px;flex-wrap:wrap;">
          <div>
            <div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap;">
              <h2>${t('audit')}</h2>
              <span class="mini-badge badge-neutral" style="padding:3px 9px;font-size:10px;font-weight:700;">
                ${filteredLogs.length} ${choose('عملية معروضة', 'events shown')}
              </span>
              ${isFiltered ? `
                <span class="mini-badge" style="padding:3px 8px;font-size:10px;background:var(--surface-soft);color:var(--muted);border:1px solid var(--line);">
                  ${choose('من أصل', 'out of')} ${sortedLogs.length}
                </span>
              ` : ''}
            </div>
            <p>${choose('سجل رقابي شامل يسجل هوية المنفذ بدقة، ونوع النشاط، وتاريخ وساعة التعديل بالثواني.', 'Comprehensive audit trail tracking user identity, activity type, and exact timestamp down to the second.')}</p>
          </div>
          <div class="page-actions" style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;">
            ${!state.auditFullHistoryLoaded ? `
              <button class="btn btn-ghost btn-sm" data-action="load-full-audit" title="${choose('جلب الأرشيف الكامل للسجلات من السيرفر', 'Load complete audit archive')}">
                ${icon('refresh', 13)} ${choose('تحميل الأرشيف الكامل', 'Load All History')}
              </button>
            ` : ''}
            <button class="btn btn-soft btn-sm" data-action="export-audit-xls" title="${choose('تصدير السجل كملف Excel منسق', 'Export as styled Excel file')}">
              ${icon('download', 13)} ${choose('تصدير Excel', 'Export Excel')}
            </button>
            <button class="btn btn-primary btn-sm" data-action="print-audit-pdf" title="${choose('معاينة وطباعة تقرير رسمي وحفظه كـ PDF', 'Print or save executive PDF report')}">
              ${icon('printer', 13)} ${choose('طباعة تقرير PDF', 'Print / PDF')}
            </button>
          </div>
        </div>

        <div class="view-toolbar audit-toolbar" style="gap:10px;margin-bottom:16px;">
          <div class="search-box search-sm" style="flex:1;min-width:240px;max-width:380px;">
            ${icon('search', 14)}
            <input type="search" placeholder="${choose('بحث فوري بالمنفذ، العملية، أو التفاصيل...', 'Search by actor, action, details...')}" value="${esc(state.auditSearchQuery || '')}" data-action="search-audit-input" />
          </div>
          <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;">
            <select class="filter-select select-compact select-sm" data-action="filter-audit-action" style="min-width:125px;">
              ${ACTION_FILTERS.map(([val, label]) => `<option value="${val}" ${currentAction === val ? 'selected' : ''}>${label}</option>`).join('')}
            </select>
            <select class="filter-select select-compact select-sm" data-action="filter-audit-entity" style="min-width:125px;">
              ${ENTITY_FILTERS.map(([val, label]) => `<option value="${val}" ${currentEntity === val ? 'selected' : ''}>${label}</option>`).join('')}
            </select>
            <select class="filter-select select-compact select-sm" data-action="filter-audit-user" style="min-width:140px;">
              <option value="all">${choose('كافة المستخدمين', 'All Users')}</option>
              ${(state.data?.users || []).map(u => `<option value="${u.id}" ${currentUser === u.id ? 'selected' : ''}>${esc(choose(u.name, u.nameEn || u.name))}</option>`).join('')}
            </select>
            ${isFiltered ? `
              <button class="btn btn-ghost btn-sm" data-action="reset-audit-filters" style="font-size:11px;color:var(--muted);padding:4px 8px;" title="${choose('إعادة تعيين الفلاتر', 'Reset filters')}">
                ${choose('إلغاء التصفية', 'Clear')}
              </button>
            ` : ''}
          </div>
        </div>

        ${filteredLogs.length ? `
          <div class="table-wrap" style="border:1px solid var(--line);border-radius:12px;overflow-x:auto;background:var(--surface);">
            <table class="data-table" style="width:100%;border-collapse:collapse;font-size:12px;min-width:650px;">
              <thead>
                <tr style="background:var(--surface-soft);border-bottom:1px solid var(--line);color:var(--ink-soft);font-size:11px;font-weight:700;text-align:inherit;">
                  <th style="padding:12px 14px;">${choose('المستخدم / المنفذ', 'User / Actor')}</th>
                  <th style="padding:12px 14px;">${choose('نوع النشاط والعملية', 'Action & Target')}</th>
                  <th style="padding:12px 14px;">${choose('التفاصيل والتغيير', 'Details / Context')}</th>
                  <th style="padding:12px 14px;text-align:${state.lang === 'ar' ? 'left' : 'right'};">${choose('التاريخ والوقت الدقيق', 'Exact Date & Time')}</th>
                </tr>
              </thead>
              <tbody>
                ${filteredLogs.map((log) => {
                  const author = log.user || (log.userId ? (state.data?.users || []).find(u => u.id === log.userId) : null);
                  const authorName = author ? choose(author.name, author.nameEn || author.name) : choose('النظام', 'System');
                  const authorRole = author ? roleName(author) : choose('تلقائي', 'Automated');
                  
                  const dt = formatAuditTimestamp(log.createdAt);
                  const { badgeClass, actionLabel, entityLabel, detailHtml } = renderAuditDetails(log);

                  return `
                    <tr style="border-bottom:1px solid var(--line);transition:background 0.15s ease;">
                      <td style="padding:12px 14px;vertical-align:middle;">
                        <div style="display:flex;align-items:center;gap:10px;">
                          ${avatar(author)}
                          <div>
                            <div style="font-size:12.5px;font-weight:700;color:var(--ink);">${esc(authorName)}</div>
                            <div style="font-size:10.5px;color:var(--muted);">${esc(authorRole)}</div>
                          </div>
                        </div>
                      </td>
                      <td style="padding:12px 14px;vertical-align:middle;">
                        <div style="display:inline-flex;align-items:center;gap:6px;">
                          <span class="badge ${badgeClass}" style="font-size:11px;font-weight:700;padding:2px 8px;border-radius:6px;">
                            ${esc(actionLabel)}
                          </span>
                          <span style="font-size:11.5px;font-weight:600;color:var(--ink-soft);">${esc(entityLabel)}</span>
                        </div>
                      </td>
                      <td style="padding:12px 14px;vertical-align:middle;color:var(--ink);font-size:12px;">
                        ${detailHtml}
                      </td>
                      <td style="padding:12px 14px;vertical-align:middle;text-align:${state.lang === 'ar' ? 'left' : 'right'};white-space:nowrap;">
                        <div style="font-size:12px;font-weight:700;color:var(--ink);">${esc(dt.date)}</div>
                        <div style="font-size:11px;color:var(--muted);font-family:monospace;margin-top:2px;display:inline-flex;align-items:center;gap:4px;">
                          ${icon('clock', 11)}
                          <span>${esc(dt.time)}</span>
                        </div>
                      </td>
                    </tr>
                  `;
                }).join('')}
              </tbody>
            </table>
          </div>
        ` : `
          <div class="empty">
            ${icon(isFiltered ? 'search' : 'checklist', 24)}
            <span>${isFiltered ? choose('لا توجد عمليات تطابق معايير التصفية المحددة.', 'No audit logs match the selected filter criteria.') : choose('لا توجد عمليات مسجلة حتى الآن.', 'No audit logs recorded yet.')}</span>
            ${isFiltered ? `
              <button class="btn btn-soft btn-sm" data-action="reset-audit-filters" style="margin-top:10px;">
                ${choose('إعادة تعيين الفلاتر', 'Reset filters')}
              </button>
            ` : ''}
          </div>
        `}
      </section>
    `;
  }

  return `
    <div class="page-head">
      <div>
        <p class="eyebrow">${userIsAdmin ? choose('تحكم مركزي', 'CENTRAL CONTROL') : choose('الملف الشخصي', 'USER PROFILE')}</p>
        <h1>${userIsAdmin ? t('settings') : choose('الملف الشخصي والأمان', 'Profile & Security')}</h1>
        <p>${userIsAdmin ? choose('إدارة إعدادات الشركة والحسابات والأدوار والنظام.', 'Manage workspace, accounts, roles, and settings.') : choose('إدارة معلومات حسابك وكلمة المرور وصورتك الشخصية.', 'Manage your account info, password, and personal avatar.')}</p>
      </div>
      <div class="page-actions">
        <span class="status-badge done">${icon(userIsAdmin ? 'shield' : 'user', 13)} ${esc(roleName(currentUser))}</span>
      </div>
    </div>
    <div class="settings-layout">
      <aside class="settings-nav">
        ${sections.map(([key, label]) => `<button class="${state.settingsSection === key ? 'active' : ''}" data-action="settings-section" data-section="${key}">${label}</button>`).join('')}
      </aside>
      <div class="settings-content">${content}</div>
    </div>
  `;
}

export const FULL_PERMISSIONS_CATALOG = [
  // 🏢 المشاريع والفرق (Projects & Teams)
  { id: 'view_projects', category: 'projects', categoryAr: 'المشاريع والفرق', categoryEn: 'Projects & Teams', nameAr: 'عرض المشاريع', nameEn: 'View Projects' },
  { id: 'create_projects', category: 'projects', categoryAr: 'المشاريع والفرق', categoryEn: 'Projects & Teams', nameAr: 'إنشاء مشاريع جديدة', nameEn: 'Create Projects' },
  { id: 'edit_projects', category: 'projects', categoryAr: 'المشاريع والفرق', categoryEn: 'Projects & Teams', nameAr: 'تعديل بيانات ومراحل المشاريع', nameEn: 'Edit Projects' },
  { id: 'delete_projects', category: 'projects', categoryAr: 'المشاريع والفرق', categoryEn: 'Projects & Teams', nameAr: 'حذف المشاريع', nameEn: 'Delete Projects' },
  { id: 'manage_project_members', category: 'projects', categoryAr: 'المشاريع والفرق', categoryEn: 'Projects & Teams', nameAr: 'إدارة وتعيين أعضاء المشروع', nameEn: 'Manage Project Members' },

  // 📋 المهام والتنفيذ (Tasks & Execution)
  { id: 'create_tasks', category: 'tasks', categoryAr: 'المهام والتنفيذ', categoryEn: 'Tasks & Execution', nameAr: 'إنشاء المهام والمخرجات', nameEn: 'Create Tasks' },
  { id: 'edit_tasks', category: 'tasks', categoryAr: 'المهام والتنفيذ', categoryEn: 'Tasks & Execution', nameAr: 'تعديل تفاصيل وحالة المهام', nameEn: 'Edit Tasks' },
  { id: 'delete_tasks', category: 'tasks', categoryAr: 'المهام والتنفيذ', categoryEn: 'Tasks & Execution', nameAr: 'حذف المهام', nameEn: 'Delete Tasks' },
  { id: 'assign_tasks', category: 'tasks', categoryAr: 'المهام والتنفيذ', categoryEn: 'Tasks & Execution', nameAr: 'إسناد وتوزيع المهام للمنفذين', nameEn: 'Assign Tasks' },
  { id: 'review_tasks', category: 'tasks', categoryAr: 'المهام والتنفيذ', categoryEn: 'Tasks & Execution', nameAr: 'مراجعة المخرجات الهندسية', nameEn: 'Review Deliverables' },
  { id: 'approve_tasks', category: 'tasks', categoryAr: 'المهام والتنفيذ', categoryEn: 'Tasks & Execution', nameAr: 'اعتماد وتوقيع المخرجات الهندسية', nameEn: 'Approve Deliverables' },
  { id: 'manage_reminders', category: 'tasks', categoryAr: 'المهام والتنفيذ', categoryEn: 'Tasks & Execution', nameAr: 'إدارة التذكيرات والمتابعات', nameEn: 'Manage Reminders' },

  // 📐 المخططات والمكتبة القياسية (Drawings & Deliverables Library)
  { id: 'upload_documents', category: 'documents', categoryAr: 'المخططات والمكتبة القياسية', categoryEn: 'Drawings & Deliverables Library', nameAr: 'رفع وإدارة المخططات والمستندات', nameEn: 'Upload Documents' },
  { id: 'delete_documents', category: 'documents', categoryAr: 'المخططات والمكتبة القياسية', categoryEn: 'Drawings & Deliverables Library', nameAr: 'حذف المخططات والمستندات', nameEn: 'Delete Documents' },
  { id: 'manage_templates', category: 'documents', categoryAr: 'المخططات والمكتبة القياسية', categoryEn: 'Drawings & Deliverables Library', nameAr: 'إدارة مكتبة القوالب والمخرجات القياسية', nameEn: 'Manage Templates Library' },

  // 📊 المؤشرات والتقارير (Analytics & Reports)
  { id: 'view_dashboard', category: 'reports', categoryAr: 'المؤشرات والتقارير', categoryEn: 'Analytics & Reports', nameAr: 'عرض لوحة التحكم والمؤشرات', nameEn: 'View Dashboard' },
  { id: 'view_reports', category: 'reports', categoryAr: 'المؤشرات والتقارير', categoryEn: 'Analytics & Reports', nameAr: 'عرض صفحة التقارير والمؤشرات', nameEn: 'View Reports' },
  { id: 'export_reports', category: 'reports', categoryAr: 'المؤشرات والتقارير', categoryEn: 'Analytics & Reports', nameAr: 'تصدير التقارير (Excel)', nameEn: 'Export Reports (Excel)' },

  // 🛡️ النظام والأمان (Administration & Governance)
  { id: 'manage_users', category: 'admin', categoryAr: 'النظام والأمان', categoryEn: 'Administration & Governance', nameAr: 'إدارة ودعوة وتفعيل حسابات المستخدمين', nameEn: 'Manage Users' },
  { id: 'manage_existing_account_permissions', category: 'admin', categoryAr: 'النظام والأمان', categoryEn: 'Administration & Governance', nameAr: 'تعديل أدوار وصلاحيات الحسابات الموجودة', nameEn: 'Manage Existing Account Permissions' },
  { id: 'view_user_activity', category: 'admin', categoryAr: 'النظام والأمان', categoryEn: 'Administration & Governance', nameAr: 'متابعة أوقات دخول ونشاط المستخدمين', nameEn: 'View User Logins & Activity Timestamps' },
  { id: 'manage_roles', category: 'admin', categoryAr: 'النظام والأمان', categoryEn: 'Administration & Governance', nameAr: 'إنشاء وتعديل الأدوار والصلاحيات', nameEn: 'Manage Roles & Permissions' },
  { id: 'manage_settings', category: 'admin', categoryAr: 'النظام والأمان', categoryEn: 'Administration & Governance', nameAr: 'إدارة إعدادات النظام والشركة ومساحة العمل', nameEn: 'Manage Company & Settings' },
  { id: 'manage_trash', category: 'admin', categoryAr: 'النظام والأمان', categoryEn: 'Administration & Governance', nameAr: 'إدارة واستعادة سلة المهملات', nameEn: 'Manage Trash' },
  { id: 'view_audit_logs', category: 'admin', categoryAr: 'النظام والأمان', categoryEn: 'Administration & Governance', nameAr: 'استعراض سجل الرقابة والعمليات الأمنية', nameEn: 'View Audit Logs' }
];

export function openRoleModal(role = null) {
  const catalog = (state.data?.permissionsCatalog && state.data.permissionsCatalog.length >= 10)
    ? state.data.permissionsCatalog
    : FULL_PERMISSIONS_CATALOG;

  // Group by category
  const categoriesMap = new Map();
  catalog.forEach(p => {
    const catKey = p.category || 'general';
    const catName = choose(p.categoryAr || catKey, p.categoryEn || catKey);
    if (!categoriesMap.has(catKey)) {
      categoriesMap.set(catKey, { name: catName, items: [] });
    }
    categoriesMap.get(catKey).items.push(p);
  });

  const isRoleAdmin = role?.id === 'admin' || (role?.permissions && role.permissions.includes('*'));

  const categoriesHtml = Array.from(categoriesMap.entries()).map(([catKey, group]) => {
    const options = group.items.map((permission) => {
      const key = permission.id || permission.key;
      const label = choose(permission.nameAr || permission.ar, permission.nameEn || permission.en || key);
      const isChecked = isRoleAdmin || (role?.permissions && (role.permissions.includes(key) || (typeof PERMISSION_ALIASES !== 'undefined' && PERMISSION_ALIASES[key] && role.permissions.includes(PERMISSION_ALIASES[key]))));
      const isDisabled = isRoleAdmin ? 'disabled' : '';
      return `
        <label class="permission-option" style="cursor:${isRoleAdmin ? 'default' : 'pointer'};">
          <input type="checkbox" name="permissions" value="${esc(key)}" ${isChecked ? 'checked' : ''} ${isDisabled} />
          <span style="font-weight:500;">${esc(label)}</span>
        </label>
      `;
    }).join('');

    return `
      <div class="permission-category-group" style="margin-bottom:12px;">
        <div style="font-size:11.5px;font-weight:700;color:var(--teal);margin-bottom:6px;display:flex;align-items:center;gap:6px;border-bottom:1px solid var(--line);padding-bottom:3px;">
          <span>${esc(group.name)}</span>
          <span style="font-size:10px;font-weight:normal;color:var(--muted);">(${group.items.length})</span>
        </div>
        <div class="permission-grid" style="grid-template-columns:repeat(auto-fit, minmax(210px, 1fr));gap:6px;max-height:none;">
          ${options}
        </div>
      </div>
    `;
  }).join('');

  const selectAllControls = !isRoleAdmin ? `
    <div style="display:flex;justify-content:space-between;align-items:center;margin:15px 0 8px;">
      <p class="field-hint" style="margin:0;font-weight:600;color:var(--ink);">${t('permissions')} <span style="font-weight:normal;color:var(--muted);font-size:11px;">(${catalog.length} ${choose('صلاحية متاحة', 'available permissions')})</span></p>
      <div style="display:inline-flex;gap:6px;">
        <button type="button" class="btn btn-ghost btn-sm" id="btn-perm-select-all" style="font-size:11px;padding:2px 8px;">${choose('تحديد الكل', 'Select All')}</button>
        <button type="button" class="btn btn-ghost btn-sm" id="btn-perm-deselect-all" style="font-size:11px;padding:2px 8px;">${choose('إلغاء التحديد', 'Deselect All')}</button>
      </div>
    </div>
  ` : '';

  const form = `
    <form id="role-form" data-role-id="${esc(role?.id || '')}">
      <div class="form-grid">
        <div class="field">
          <label>${t('nameAr')} *</label>
          <input name="nameAr" value="${esc(role?.nameAr || '')}" required />
        </div>
        <div class="field">
          <label>${t('nameEn')}</label>
          <input name="nameEn" value="${esc(role?.nameEn || '')}" />
        </div>
        <div class="field full">
          <label>${t('roleDescription')}</label>
          <textarea name="descriptionAr" rows="2">${esc(role?.descriptionAr || '')}</textarea>
        </div>
      </div>
      ${isRoleAdmin ? `
        <div class="role-modal-note" style="margin-top:15px;">
          ${choose('مدير النظام يملك صلاحيات الإدارة الشاملة [*] الكاملة على كافة جوانب النظام والشركة ولا يمكن تقليصها.', 'The system administrator always keeps full root privileges [*] across all aspects of the system.')}
        </div>
      ` : `
        ${selectAllControls}
        <div style="max-height:360px;overflow-y:auto;padding-inline-end:4px;border:1px solid var(--line);border-radius:10px;padding:12px;background:var(--surface-soft);">
          ${categoriesHtml}
        </div>
      `}
      <div class="modal-actions" style="margin-top:18px;">
        <button type="button" class="btn btn-ghost" data-action="close-modal">${t('cancel')}</button>
        <button type="submit" class="btn btn-primary">${icon('check', 14)} ${role ? t('save') : t('create')}</button>
      </div>
    </form>
  `;

  document.getElementById('modal-root').innerHTML = modalShell(
    role ? choose('تعديل الدور والصلاحيات', 'Edit role & permissions') : t('addRole'),
    choose('تحديد الصلاحيات الدقيقة لهذا الدور ومجالات الوصول في النظام.', 'Define granular permissions and workspace access levels for this role.'),
    form,
    'role',
    'modal-lg'
  );

  // Wire up Select All / Deselect All
  const modalRoot = document.getElementById('modal-root');
  if (modalRoot) {
    const btnSelectAll = modalRoot.querySelector('#btn-perm-select-all');
    const btnDeselectAll = modalRoot.querySelector('#btn-perm-deselect-all');
    if (btnSelectAll) {
      btnSelectAll.addEventListener('click', () => {
        modalRoot.querySelectorAll('input[name="permissions"]:not(:disabled)').forEach(cb => cb.checked = true);
      });
    }
    if (btnDeselectAll) {
      btnDeselectAll.addEventListener('click', () => {
        modalRoot.querySelectorAll('input[name="permissions"]:not(:disabled)').forEach(cb => cb.checked = false);
      });
    }
  }
}

export function openUserModal(user = null) {
  if (user?.id === 'usr_ahmad' && state.data?.user?.id !== 'usr_ahmad') {
    return showToast(choose('لا يمكن تعديل حساب مدير ومطور النظام.', 'System Developer account is protected.'), true);
  }
  if (!user && !isAdmin()) return showToast(t('adminOnly'), true);
  const permissionOnly = !isAdmin();
  const locked = permissionOnly ? 'disabled' : '';
  const availableRoles = (state.data?.roles || []).filter((role) => isAdmin() || role.id !== 'admin');
  const form = `<form id="user-form" data-user-id="${esc(user?.id || '')}" data-permission-only="${permissionOnly}"><div class="form-grid"><div class="field full"><label>${t('nameAr')}</label><input name="name" value="${esc(user?.name || '')}" ${locked} required /></div><div class="field"><label>${t('nameEn')}</label><input name="nameEn" value="${esc(user?.nameEn || '')}" ${locked} /></div><div class="field"><label>${t('jobTitle')}</label><input name="jobTitleAr" value="${esc(user?.jobTitleAr || '')}" ${locked} /></div><div class="field"><label>${t('email')}</label><input name="email" type="email" value="${esc(user?.email || '')}" placeholder="name@darc.com" ${locked} /></div><div class="field"><label>${t('role')}</label><select name="roleId">${availableRoles.map((role) => `<option value="${esc(role.id)}" ${user?.roleId === role.id ? 'selected' : ''}>${esc(choose(role.nameAr, role.nameEn))}</option>`).join('')}</select></div></div><div class="field-hint">${permissionOnly ? choose('يمكنك هنا تغيير دور الحساب الموجود فقط. إدارة الاسم والبريد والحذف وإضافة الحسابات محصورة بأحمد مدير النظام.', 'Here you can change the role of an existing account only. Names, email, deletion, and account creation remain restricted to Ahmed, the system administrator.') : choose('إذا تركت البريد فارغًا يبقى الحساب مسجلًا داخل الفريق بانتظار دعوة. عند إضافة بريد يمكنك إرسال دعوة من قائمة الحسابات.', 'If email is left blank, the member remains in the team directory awaiting an invite. Add an email to send an invitation from Accounts.')}</div><div class="modal-actions"><button type="button" class="btn btn-ghost" data-action="close-modal">${t('cancel')}</button><button type="submit" class="btn btn-primary">${icon('check', 14)} ${user ? (permissionOnly ? choose('حفظ الصلاحية', 'Save permission') : t('save')) : t('create')}</button></div></form>`;
  document.getElementById('modal-root').innerHTML = modalShell(user ? (permissionOnly ? choose('تعديل صلاحية الحساب', 'Change account permission') : choose('تعديل حساب العضو', 'Edit member account')) : t('addMember'), choose('الصلاحية تحدد ما يستطيع العضو رؤيته وتعديله داخل المشاريع.', 'The role defines what this member can see and change across projects.'), form, 'user');
}
