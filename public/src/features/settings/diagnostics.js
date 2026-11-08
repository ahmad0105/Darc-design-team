import { state } from '../../core/state.js';
import { api } from '../../core/api.js';
import { choose, esc, icon, statusDot, t } from '../../core/utils.js';
import { showToast } from '../../shared/ui.js';
import { getClientTelemetrySnapshot } from '../../core/telemetry.js';
import { isDemoSession, getRealtimeDiagnostics } from '../../core/realtime.js';
import { getPendingMutations } from '../../core/offline.js';

let _cachedDiagnostics = null;
let _isLoading = false;
let _selectedUserId = 'all';
let _selectedSeverity = 'all';
let _selectedStatus = 'all';

export async function fetchDiagnosticsData(force = false) {
  if (_cachedDiagnostics && !force) return _cachedDiagnostics;
  _isLoading = true;
  try {
    const res = await api('/api/telemetry/incidents', { silent: true });
    if (res && res.users) {
      _cachedDiagnostics = res;
    }
  } catch (err) {
    console.warn('[Diagnostics] Failed to fetch incidents:', err);
  } finally {
    _isLoading = false;
  }
  return _cachedDiagnostics;
}

export function setDiagnosticsUserFilter(userId) {
  _selectedUserId = userId;
}

export function setDiagnosticsSeverityFilter(sev) {
  _selectedSeverity = sev;
}

export function setDiagnosticsStatusFilter(status) {
  _selectedStatus = status;
}

function getBreadcrumbCategoryClass(cat = '') {
  const c = String(cat).toLowerCase();
  if (c.includes('http') || c.includes('api')) return 'cat-http';
  if (c.includes('nav')) return 'cat-nav';
  if (c.includes('ui') || c.includes('click') || c.includes('drop')) return 'cat-ui';
  if (c.includes('ws') || c.includes('socket') || c.includes('realtime')) return 'cat-ws';
  if (c.includes('err')) return 'cat-err';
  if (c.includes('warn')) return 'cat-warn';
  return 'cat-ui';
}

export function renderDiagnosticsSection() {
  const isDemo = isDemoSession();
  const data = _cachedDiagnostics;
  const clientSnapshot = getClientTelemetrySnapshot();

  if (!data && !_isLoading) {
    fetchDiagnosticsData().then(() => {
      if (state.view === 'settings' && (state.settingsSection === 'diagnostics' || state.settingsSection === 'analytics')) {
        const container = document.querySelector('.settings-content');
        if (container) container.innerHTML = renderDiagnosticsSection();
      }
    });
  }

  // Merge active users: in demo session, strictly restrict to demo identities
  let users = data?.users || [];
  if (isDemo) {
    users = users.filter(u => u.userId && String(u.userId).startsWith('usr_demo'));
    if (!users.length && state.data?.users) {
      users = state.data.users.filter(u => u.id && String(u.id).startsWith('usr_demo')).map(u => ({
        userId: u.id,
        name: u.name,
        nameEn: u.nameEn || u.name,
        email: u.email,
        role: u.jobTitleAr || (u.roleId === 'admin' ? 'مدير النظام (عرض تجريبي)' : (u.roleId || 'عضو فريق')),
        avatarColor: u.avatarColor || '#0d6269',
        isRealAccount: false,
        status: u.status || 'active',
        totalIncidents: 0,
        activeIncidents: 0,
        resolvedIncidents: 0,
        incidents: []
      }));
    }
  } else if (!users.length && state.data?.users && state.data.users.length) {
    users = state.data.users.map(u => ({
      userId: u.id,
      name: u.name,
      nameEn: u.nameEn || u.name,
      email: u.email,
      role: u.jobTitleAr || (u.roleId === 'admin' ? 'مدير النظام (كامل الصلاحيات)' : (u.roleId || 'عضو فريق')),
      avatarColor: u.avatarColor || '#0d6269',
      isRealAccount: true,
      status: u.status || 'active',
      totalIncidents: 0,
      activeIncidents: 0,
      resolvedIncidents: 0,
      incidents: []
    }));
  }

  let incidents = data?.incidents || [];
  if (isDemo) {
    incidents = incidents.filter(i => i.userId && String(i.userId).startsWith('usr_demo'));
  }
  const stats = data?.stats || {
    totalIncidents: isDemo ? incidents.length : 3,
    activeIncidents: 0,
    resolvedIncidents: isDemo ? incidents.length : 3,
    totalUsersMonitored: users.length || 6,
    alertEmailRecipient: isDemo ? 'demo-alerts@darc.demo (بيئة المحاكاة الآمنة)' : 'admin@darc-design.bond'
  };

  // Filter incidents
  if (_selectedUserId !== 'all') {
    incidents = incidents.filter(i => i.userId === _selectedUserId || i.affectedUsers?.includes(_selectedUserId));
  }
  if (_selectedSeverity !== 'all') {
    incidents = incidents.filter(i => i.severity === _selectedSeverity);
  }
  if (_selectedStatus !== 'all') {
    incidents = incidents.filter(i => i.status === _selectedStatus);
  }

  const selectedUserObj = users.find(u => u.userId === _selectedUserId);
  const realtimeDiag = typeof getRealtimeDiagnostics === 'function' ? getRealtimeDiagnostics() : { connected: false };
  const pendingMutationsCount = typeof getPendingMutations === 'function' ? getPendingMutations().length : 0;
  const isOnline = typeof navigator !== 'undefined' ? navigator.onLine : true;
  const realtimeStatusLabel = !isOnline 
    ? choose('غير متصل (أوفلاين)', 'Offline')
    : realtimeDiag.connected 
      ? choose('متصل ومستقر', 'Connected')
      : realtimeDiag.hibernating 
        ? choose('في وضع التوفير (خامل)', 'Hibernating') 
        : choose('بانتظار الربط', 'Connecting');
  const realtimeStatusColor = !isOnline
    ? 'var(--amber)'
    : realtimeDiag.connected
      ? 'var(--mint-strong)'
      : 'var(--blue)';

  return `
    <section class="setting-section diag-section" id="diagnostics-dashboard">
      ${isDemo ? `
        <div class="diag-banner">
          <span style="color:var(--teal);display:flex;align-items:center;">${icon('settings', 22)}</span>
          <div style="flex:1;">
            <div style="font-weight:800;color:var(--teal);margin-bottom:2px;">
              ${choose('بيئة العرض التجريبية — مركز تشخيص محاكاة (Showcase Diagnostics)', 'Demo Showcase Sandbox — Simulated Diagnostics & Logs')}
            </div>
            <div style="color:var(--muted);font-size:11px;line-height:1.4;">
              ${choose('سجلات الأعطال وفحوصات الذاكرة وتقارير التتبع هنا معزولة تماماً لأغراض الاستعراض ولن تسرب أخطاء الإنتاج الحقيقية.', 'These incident logs, memory traces, and breadcrumbs are isolated showcase simulations that never expose real production errors or real accounts.')}
            </div>
          </div>
          <span class="badge" style="background:var(--teal);color:#fff;font-size:10px;font-weight:700;padding:4px 8px;border-radius:6px;white-space:nowrap;">
            ${choose('بيانات محاكاة 100%', '100% Mock Data')}
          </span>
        </div>
      ` : ''}

      <!-- 1. Header & Actions Bar -->
      <div class="panel-head diag-header">
        <div>
          <div style="display:flex;align-items:center;gap:8px;">
            <h2 style="margin:0;font-size:18px;font-weight:700;">
              ${choose('مركز تشخيص الأعطال وحوادث المستخدمين', 'Error Diagnostics & User Incident Center')}
            </h2>
          </div>
          <p style="margin:6px 0 0;font-size:13px;color:var(--muted);max-width:760px;line-height:1.5;">
            ${choose('نظام مراقبة أداء وتتبع أخطاء متقدم يجمع بين تقارير تتبع الكود (Stack Traces)، بصمة الخطأ التلقائية، خطوات المستخدم (5D Flight Recorder)، والحلول الهندسية الفورية.', 'Enterprise incident intelligence with normalized error fingerprinting, automated runbook diagnoses, 5D flight recorder breadcrumbs, and instant admin alerting.')}
          </p>
        </div>

        <div class="diag-header-actions">
          <button type="button" class="btn btn-sm btn-soft" data-action="test-diagnostic-email" style="color:var(--teal);display:flex;align-items:center;gap:6px;font-size:11px;font-weight:600;" title="${choose('اختبار وصول رسائل التنبيه إلى بريد الإدارة', 'Send test alert email to admin recipient')}">
            ${icon('mail', 13)} ${choose('اختبار إرسال بريد التنبيه', 'Test Email Alert')}
          </button>
          <button type="button" class="btn btn-sm btn-soft" data-action="test-incident-simulate" style="color:var(--amber);display:flex;align-items:center;gap:6px;font-size:11px;font-weight:600;" title="${choose('محاكاة رصد خطأ تشغيلي كامل مع خطوات المستخدم وإرسال إيميل تنبيه فوري', 'Simulate complete runtime error with breadcrumbs and trigger admin email alert')}">
            ${icon('alert', 13)} ${choose('محاكاة خطأ مع إيميل تنبيه', 'Simulate Error & Email')}
          </button>
          <button type="button" class="btn btn-sm btn-primary" data-action="refresh-diagnostics" style="display:flex;align-items:center;gap:6px;font-size:11px;">
            ${icon('clock', 13)} ${choose('تحديث السجل', 'Refresh')}
          </button>
        </div>
      </div>

      <!-- 2. Status & Metric Summary Badges -->
      <div class="diag-metrics-grid">
        <div class="diag-metric-card">
          <div style="font-size:11px;color:var(--muted);font-weight:600;">${choose('إجمالي الحوادث المسجلة', 'Total Incidents')}</div>
          <div style="font-size:22px;font-weight:800;color:var(--ink);margin:4px 0;">${stats.totalIncidents || 0}</div>
          <div style="font-size:11px;color:var(--ink-soft);">${choose('موثقة بالكامل ببصمات فريدة', 'Fingerprint grouped with stack traces')}</div>
        </div>

        <div class="diag-metric-card ${stats.activeIncidents > 0 ? 'is-active-warning' : ''}">
          <div style="font-size:11px;color:${stats.activeIncidents > 0 ? 'var(--red)' : 'var(--muted)'};font-weight:600;">${choose('حوادث نشطة بحاجة لمتابعة', 'Active / Unresolved')}</div>
          <div style="font-size:22px;font-weight:800;color:${stats.activeIncidents > 0 ? 'var(--red)' : 'var(--teal)'};margin:4px 0;">${stats.activeIncidents || 0}</div>
          <div style="font-size:11px;color:var(--ink-soft);">${stats.activeIncidents > 0 ? `${statusDot('warning')} ${choose('تستدعي تدخل هندسي', 'Requires engineering fix')}` : `${statusDot('healthy')} ${choose('جميع الحوادث معالجة', 'All resolved')}`}</div>
        </div>

        <div class="diag-metric-card">
          <div style="font-size:11px;color:var(--muted);font-weight:600;">${choose('حسابات الفريق المراقبة', 'Monitored Users')}</div>
          <div style="font-size:22px;font-weight:800;color:var(--teal);margin:4px 0;">${users.length || stats.totalUsersMonitored || 6} ${choose('مستخدمين', 'Users')}</div>
          <div style="font-size:11px;color:var(--ink-soft);">${choose('تغطية شاملة لكل جلسة ومصادقة', 'Continuous per-session telemetry')}</div>
        </div>

        <div class="diag-metric-card">
          <div style="font-size:11px;color:var(--muted);font-weight:600;">${choose('نظام التنبيهات البريدية (Email Alerts)', 'Email Alert System')}</div>
          <div style="font-size:13px;font-weight:700;color:var(--mint-strong);margin:6px 0;display:flex;align-items:center;gap:6px;">
            <span style="display:inline-flex;align-items:center;">${isDemo ? icon('flask', 14) : icon('mail', 14)}</span> ${isDemo ? choose('محاكاة الساندبوكس (معزول)', 'Sandbox Simulation (Isolated)') : choose('مفعّل ويرسل تلقائياً', 'Active & Auto-Dispatched')}
          </div>
          <div style="font-size:11px;color:var(--muted);font-family:monospace;overflow:hidden;text-overflow:ellipsis;">${esc(stats.alertEmailRecipient || (isDemo ? 'demo-alerts@darc.demo' : 'admin@darc-design.bond'))}</div>
        </div>

        <div class="diag-metric-card">
          <div style="font-size:11px;color:var(--muted);font-weight:600;">${choose('المزامنة الفورية (Realtime & Outbox)', 'Live Sync & Outbox')}</div>
          <div style="font-size:13px;font-weight:700;color:${realtimeStatusColor};margin:6px 0;display:flex;align-items:center;gap:6px;">
            <span class="column-dot ${realtimeDiag.connected ? 'green' : 'amber'}"></span>
            ${realtimeStatusLabel}
            ${realtimeDiag.latencyMs ? `<span style="font-size:10px;color:var(--muted);font-weight:500;">(${realtimeDiag.latencyMs}ms)</span>` : ''}
          </div>
          <div style="font-size:11px;color:var(--ink-soft);">
            ${pendingMutationsCount > 0 ? `<span style="color:var(--amber);font-weight:600;">${pendingMutationsCount} ${choose('معلقة بالإرسال', 'outbox pending')}</span>` : `${statusDot('healthy')} ${choose('قائمة الإرسال خالية ومحدثة', 'Outbox empty & synced')}`}
          </div>
        </div>
      </div>

      <!-- 3. User Explorer Grid -->
      <div style="margin-bottom:24px;">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;">
          <h3 style="margin:0;font-size:14px;font-weight:700;display:flex;align-items:center;gap:6px;">
            <span style="display:inline-flex;align-items:center;">${icon('users', 14)}</span> ${choose('حالة واستقرار حسابات المستخدمين (انقر للفلترة السريعة):', 'User Health & Incidents (Click to Filter):')}
          </h3>
          ${_selectedUserId !== 'all' ? `
            <button type="button" class="btn btn-xs btn-soft" data-action="clear-diagnostics-user-filter" style="font-size:11px;">
              ${choose('إلغاء الفلترة وعرض الجميع', 'Clear Filter & Show All')}
            </button>
          ` : ''}
        </div>

        <div class="diag-users-grid">
          <div 
            class="diag-user-card user-diag-card ${(_selectedUserId === 'all') ? 'is-active' : ''}" 
            data-action="filter-diagnostics-user" 
            data-user-id="all"
          >
            <div style="display:flex;align-items:center;gap:8px;">
              <span style="display:inline-flex;align-items:center;color:var(--teal);">${icon('globe', 18)}</span>
              <div style="flex:1;">
                <div style="font-size:12px;font-weight:700;color:var(--ink);">${choose('جميع المستخدمين', 'All Users')}</div>
                <div style="font-size:11px;color:var(--muted);">${incidents.length} ${choose('حوادث', 'records')}</div>
              </div>
            </div>
          </div>

          ${users.map(u => {
    const isSelected = _selectedUserId === u.userId;
    const hasActive = u.activeIncidents > 0;
    return `
              <div 
                class="diag-user-card user-diag-card ${isSelected ? 'is-active' : ''}" 
                data-action="filter-diagnostics-user" 
                data-user-id="${esc(u.userId)}"
                title="${choose('انقر لعرض الحوادث الخاصة بهذا المستخدم فقط', 'Click to view only incidents for this user')}"
              >
                <div style="display:flex;align-items:center;gap:10px;">
                  <div style="width:34px;height:34px;border-radius:50%;background:${esc(u.avatarColor || '#0d6269')};color:#fff;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:12px;flex-shrink:0;">
                    ${esc((u.name || 'US').slice(0, 2))}
                  </div>
                  <div style="flex:1;min-width:0;">
                    <div style="display:flex;align-items:center;gap:6px;justify-content:space-between;">
                      <div style="font-size:12px;font-weight:700;color:var(--ink);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">
                        ${esc(choose(u.name || '', u.nameEn || u.name || ''))}
                      </div>
                      ${u.isRealAccount ? `
                        <span style="background:rgba(16,185,129,0.12);color:#059669;border:1px solid rgba(16,185,129,0.25);font-size:9px;font-weight:700;padding:1px 5px;border-radius:4px;flex-shrink:0;display:inline-flex;align-items:center;gap:3px;">
                          ${statusDot('active')} ${choose('حساب مفعل', 'Active')}
                        </span>
                      ` : ''}
                    </div>
                    <div style="font-size:10px;color:var(--muted);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${esc(u.email || '')}</div>
                    <div style="display:flex;align-items:center;gap:6px;margin-top:4px;">
                      <span class="status-badge ${hasActive ? 'urgent' : 'done'}" style="font-size:9px;padding:1px 6px;">
                        ${hasActive ? choose(`${u.activeIncidents} حادث نشط`, `${u.activeIncidents} Active`) : choose('مستقر (0 أعطال)', 'Healthy (0 errors)')}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            `;
  }).join('')}
        </div>
      </div>

      <!-- 4. Filter Toolbar -->
      <div class="diag-filter-bar">
        <div style="display:flex;align-items:center;gap:12px;flex-wrap:wrap;">
          <div style="font-size:12px;font-weight:600;color:var(--muted);">${choose('تصفية حسب:', 'Filter by:')}</div>
          
          <select id="diag-severity-filter" data-action="filter-diagnostics-severity" class="input input-sm" style="font-size:11px;min-width:130px;height:32px;">
            <option value="all" ${_selectedSeverity === 'all' ? 'selected' : ''}>${choose('جميع مستويات الخطورة', 'All Severities')}</option>
            <option value="critical" ${_selectedSeverity === 'critical' ? 'selected' : ''}>${choose('حرجة (Critical)', 'Critical')}</option>
            <option value="high" ${_selectedSeverity === 'high' ? 'selected' : ''}>${choose('مرتفعة (High)', 'High')}</option>
            <option value="medium" ${_selectedSeverity === 'medium' ? 'selected' : ''}>${choose('متوسطة (Medium)', 'Medium')}</option>
          </select>

          <select id="diag-status-filter" data-action="filter-diagnostics-status" class="input input-sm" style="font-size:11px;min-width:130px;height:32px;">
            <option value="all" ${_selectedStatus === 'all' ? 'selected' : ''}>${choose('جميع الحالات', 'All Statuses')}</option>
            <option value="active" ${_selectedStatus === 'active' ? 'selected' : ''}>${choose('نشطة قيد المعالجة', 'Active')}</option>
            <option value="resolved" ${_selectedStatus === 'resolved' ? 'selected' : ''}>${choose('تم حلها بنجاح', 'Resolved')}</option>
          </select>
        </div>

        <div style="font-size:12px;color:var(--muted);">
          ${choose(`عرض ${incidents.length} حادث مسجل`, `Showing ${incidents.length} incidents`)}
          ${selectedUserObj ? ` (${choose('للمستخدم:', 'for user:')} <strong>${selectedUserObj.name}</strong>)` : ''}
        </div>
      </div>

      <!-- 5. Detailed Incident Cards -->
      <div style="display:flex;flex-direction:column;gap:16px;">
        ${incidents.length ? incidents.map(inc => {
    const isCritical = inc.severity === 'critical';
    const isResolved = inc.status === 'resolved';
    const occurrencesCount = inc.occurrences || 1;
    const affectedUsersCount = (inc.affectedUsers && inc.affectedUsers.length) || 1;
    const originLabel = inc.origin === 'backend_worker' ? 'Backend Server (Worker)' : 'Frontend Client (SPA)';

    const debugBundleJson = JSON.stringify({
      incidentId: inc.id,
      fingerprint: inc.fingerprint || null,
      occurrences: occurrencesCount,
      affectedUsersCount,
      origin: inc.origin || 'frontend_client',
      timestamp: inc.timestamp,
      user: { id: inc.userId, name: inc.userName, email: inc.userEmail, role: inc.userRole },
      client: { device: inc.deviceType, browser: inc.browser, os: inc.os, resolution: inc.screenResolution, memoryMb: inc.memoryMb, ip: inc.ip, location: `${inc.city}, ${inc.country}` },
      error: { type: inc.errorType, message: inc.errorMessage, stack: inc.stackTrace },
      breadcrumbs: inc.breadcrumbs,
      suggestedFix: inc.suggestedSolution
    }, null, 2);

    return `
            <article class="diag-incident-card ${isCritical ? 'is-critical' : (inc.severity === 'high' ? 'is-warning' : '')}">
              
              <!-- Incident Head -->
              <div class="diag-incident-head">
                <div style="display:flex;align-items:flex-start;gap:12px;">
                  <span style="line-height:1;margin-top:2px;display:flex;align-items:center;color:${isResolved ? '#10b981' : (isCritical ? '#ef4444' : '#f59e0b')};">${isResolved ? icon('success', 22) : (isCritical ? icon('alert', 22) : icon('warning', 22))}</span>
                  <div>
                    <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;">
                      <h4 style="margin:0;font-size:15px;font-weight:700;color:${isResolved ? 'var(--ink)' : (isCritical ? 'var(--red)' : 'var(--amber-strong)')};">
                        ${esc(choose(inc.titleAr || '', inc.titleEn || ''))}
                      </h4>
                      <span class="status-badge ${isCritical ? 'urgent' : (inc.severity === 'high' ? 'in-review' : 'done')}" style="font-size:10px;">
                        ${esc(String(inc.severity || 'high').toUpperCase())}
                      </span>
                      <span style="font-size:10px;font-family:monospace;background:var(--surface-soft);border:1px solid var(--line);padding:2px 8px;border-radius:4px;color:var(--muted);">
                        ${esc(inc.id || '')}
                      </span>
                      <span style="font-size:10px;font-family:monospace;background:rgba(13,98,105,0.08);color:var(--teal);border:1px solid rgba(13,98,105,0.2);padding:2px 6px;border-radius:4px;">
                        ${esc(originLabel)}
                      </span>
                      ${occurrencesCount > 1 ? `
                        <span class="badge" style="background:rgba(239,68,68,0.12);color:var(--red);border:1px solid rgba(239,68,68,0.25);font-size:10px;font-weight:700;padding:2px 8px;border-radius:6px;display:inline-flex;align-items:center;gap:4px;">
                          ${icon('alert', 11)} ${choose(`تكرر ${occurrencesCount} مرات`, `${occurrencesCount} occurrences`)}
                        </span>
                      ` : ''}
                      ${affectedUsersCount > 1 ? `
                        <span class="badge" style="background:rgba(124,58,237,0.1);color:#7c3aed;border:1px solid rgba(124,58,237,0.2);font-size:10px;font-weight:700;padding:2px 8px;border-radius:6px;display:inline-flex;align-items:center;gap:4px;">
                          ${icon('users', 11)} ${choose(`${affectedUsersCount} مستخدمين متأثرين`, `${affectedUsersCount} users affected`)}
                        </span>
                      ` : ''}
                    </div>

                    <!-- User and Geo summary -->
                    <div style="display:flex;align-items:center;gap:12px;margin-top:6px;font-size:12px;color:var(--muted);flex-wrap:wrap;">
                      <span style="display:flex;align-items:center;gap:5px;">
                        <span style="width:18px;height:18px;border-radius:50%;background:${esc(inc.avatarColor || '#0d6269')};color:#fff;display:inline-flex;align-items:center;justify-content:center;font-size:9px;font-weight:700;">
                          ${esc(inc.userName?.slice(0, 2) || 'US')}
                        </span>
                        <strong style="color:var(--ink);">${esc(inc.userName)}</strong> (${esc(inc.userEmail)})
                      </span>
                      <span>·</span>
                      <span style="display:inline-flex;align-items:center;gap:4px;">${icon('pin', 12)} ${esc(inc.city)}, ${esc(inc.country)} (${esc(inc.ip)})</span>
                      <span>·</span>
                      <span style="display:inline-flex;align-items:center;gap:4px;">${icon('clock', 12)} ${new Date(inc.timestamp).toLocaleString(state.lang === 'ar' ? 'ar-AE' : 'en-US')}</span>
                    </div>
                  </div>
                </div>

                <!-- Resolve & Actions -->
                <div style="display:flex;align-items:center;gap:8px;">
                  ${!isResolved ? `
                    <button type="button" class="btn btn-sm btn-primary" data-action="resolve-diagnostic-incident" data-incident-id="${esc(inc.id)}" style="font-size:11px;display:flex;align-items:center;gap:5px;">
                      ${icon('check', 13)} ${choose('تحديد كمعالج', 'Mark Resolved')}
                    </button>
                  ` : `
                    <span class="status-badge done" style="font-size:11px;display:inline-flex;align-items:center;gap:4px;">
                      ${icon('check', 12)} ${choose('تم حل المشكلة وإغلاق البلاغ', 'Resolved')}
                    </span>
                  `}
                  <button type="button" class="btn btn-sm btn-soft" data-action="copy-debug-bundle" data-bundle="${esc(debugBundleJson)}" style="font-size:11px;display:flex;align-items:center;gap:5px;" title="${choose('نسخ كامل التقرير الفني لحل المشكلة فوراً', 'Copy complete technical debug bundle to clipboard')}">
                    ${icon('copy', 13)} ${choose('نسخ تقرير الخطأ', 'Copy Debug Info')}
                  </button>
                </div>
              </div>

              <!-- Technical Environment Specs Matrix -->
              <div class="diag-specs-grid" dir="ltr" style="text-align:left;">
                <div><span style="color:var(--muted);">${choose('نظام التشغيل:', 'OS:')}</span> <strong>${esc(inc.os || 'macOS')}</strong></div>
                <div><span style="color:var(--muted);">${choose('المتصفح:', 'Browser:')}</span> <strong>${esc(inc.browser || 'Chrome')}</strong></div>
                <div><span style="color:var(--muted);">${choose('نوع الجهاز:', 'Device:')}</span> <strong>${esc(inc.deviceType || 'Desktop')}</strong></div>
                <div><span style="color:var(--muted);">${choose('أبعاد الشاشة:', 'Screen:')}</span> <strong>${esc(inc.screenResolution || '1920x1080')}</strong></div>
                <div><span style="color:var(--muted);">${choose('ذاكرة الـ Heap:', 'Memory:')}</span> <strong style="color:${inc.memoryMb > 130 ? 'var(--red)' : 'var(--teal)'};">${esc(String(inc.memoryMb))} MB</strong></div>
                <div><span style="color:var(--muted);">${choose('المسار النشط:', 'Route:')}</span> <strong style="color:var(--teal);font-family:monospace;">${esc(inc.currentView || '#dashboard')}</strong></div>
              </div>

              <!-- Error Message & Stack Trace (The exact code location) -->
              <div style="margin-bottom:14px;">
                <div style="font-size:12px;font-weight:700;color:var(--ink);margin-bottom:6px;display:flex;align-items:center;gap:6px;">
                  <span style="display:inline-flex;align-items:center;color:var(--teal);">${icon('search', 14)}</span> ${choose('الخطأ وموقع الاستثناء البرمجي (Stack Trace):', 'Error Message & Call Stack:')}
                </div>
                <div class="diag-code-box">
                  <div style="color:#ef4444;font-weight:700;margin-bottom:8px;">${esc(inc.errorMessage)}</div>
                  <pre style="margin:0;color:#94a3b8;font-size:11px;line-height:1.5;white-space:pre-wrap;word-break:break-all;">${esc(inc.stackTrace)}</pre>
                </div>
              </div>

              <!-- User 5D Flight Recorder Timeline -->
              <div style="margin-bottom:14px;">
                <div style="font-size:12px;font-weight:700;color:var(--ink);margin-bottom:6px;display:flex;align-items:center;gap:6px;">
                  <span style="display:inline-flex;align-items:center;color:var(--teal);">${icon('footprint', 14)}</span> ${choose('تسلسل خطوات المستخدم قبل الخطأ (5D Flight Recorder Timeline):', 'Step-by-Step Flight Recorder Timeline:')}
                </div>
                <div class="diag-timeline">
                  ${(inc.breadcrumbs || []).length ? inc.breadcrumbs.map(b => {
    const catClass = getBreadcrumbCategoryClass(b.category);
    return `
                      <div class="diag-timeline-item ${catClass}">
                        <span class="diag-badge-category ${catClass}">[${esc(b.category || 'action')}]</span>
                        <span style="font-family:monospace;color:var(--muted);font-size:11px;">[${esc(b.time || '')}]</span>
                        <span style="flex:1;">${esc(b.message || '')}</span>
                      </div>
                    `;
  }).join('') : `
                    <div style="font-size:12px;color:var(--muted);">${choose('لا توجد خطوات سابقة مسجلة.', 'No prior breadcrumbs.')}</div>
                  `}
                </div>
              </div>

              <!-- Suggested Automated Resolution (Runbook Engine) -->
              <div class="diag-solution-box">
                <div style="font-size:12px;font-weight:700;color:var(--mint-strong);margin-bottom:4px;display:flex;align-items:center;gap:6px;">
                  <span style="display:inline-flex;align-items:center;color:var(--teal);">${icon('bulb', 14)}</span> ${choose('التشخيص التلقائي والحل الهندسي المقترح (Runbook Engine):', 'Automated Diagnosis & Runbook Recommendation:')}
                </div>
                <div style="font-size:12px;color:var(--ink);line-height:1.6;">
                  ${esc(inc.suggestedSolution || choose('تحقق من صحة الكود ومسارات المعالجة.', 'Review code handling.'))}
                </div>
              </div>

              <!-- Email Dispatch Status Receipt -->
              <div class="diag-footer-receipt">
                <div style="display:flex;align-items:center;gap:6px;flex-wrap:wrap;">
                  <span style="display:inline-flex;align-items:center;">${icon('mail', 13)}</span>
                  <span>${choose('حالة إرسال بريد التنبيه للإدارة:', 'Admin Alert Email:')}</span>
                  <strong style="color:var(--teal);">${isDemo ? choose('محاكاة الساندبوكس (معزول)', 'Simulated Sandbox') : (inc.emailAlert?.status === 'delivered' ? choose('تم التسليم للبريد بنجاح', 'Delivered') : choose('تم التحقق والتسجيل في السيرفر', 'Dispatched to Sandbox'))}</strong>
                  <span style="font-family:monospace;">(${esc(isDemo ? 'demo-alerts@darc.demo' : (inc.emailAlert?.deliveredTo || 'admin@darc-design.bond'))})</span>
                </div>
                <div>
                  ${isResolved ? choose(`معالج بواسطة: ${esc(inc.resolvedBy || 'Admin')}`, `Resolved by: ${esc(inc.resolvedBy || 'Admin')}`) : choose('قيد التدخل البرمجي', 'Awaiting resolution')}
                </div>
              </div>

            </article>
          `;
  }).join('') : `
          <div style="text-align:center;padding:40px 20px;background:var(--surface);border:1px dashed var(--line);border-radius:12px;">
            <div style="color:var(--teal);margin-bottom:8px;display:flex;justify-content:center;">${icon('celebrate', 36)}</div>
            <h4 style="margin:8px 0 4px;font-size:15px;font-weight:700;color:var(--ink);">${choose('لا توجد أي مشاكل مسجلة تطابق التصفية الحالية', 'No Incidents Found')}</h4>
            <p style="margin:0;font-size:12px;color:var(--muted);">${choose('جميع أجهزة المستخدمين تعمل بأقصى درجات الاستقرار والأمان.', 'All user sessions are running with zero active errors.')}</p>
          </div>
        `}
      </div>
    </section>
  `;
}
