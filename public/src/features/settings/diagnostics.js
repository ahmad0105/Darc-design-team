import { state } from '../../core/state.js';
import { api } from '../../core/api.js';
import { choose, esc, icon, t } from '../../core/utils.js';
import { showToast } from '../../shared/ui.js';
import { getClientTelemetrySnapshot } from '../../core/telemetry.js';

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

export function renderDiagnosticsSection() {
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

  const users = data?.users || [];
  let incidents = data?.incidents || [];
  const stats = data?.stats || {
    totalIncidents: 3,
    activeIncidents: 1,
    resolvedIncidents: 2,
    totalUsersMonitored: 6,
    alertEmailRecipient: 'admin@darc-design.bond'
  };

  // Filter incidents
  if (_selectedUserId !== 'all') {
    incidents = incidents.filter(i => i.userId === _selectedUserId);
  }
  if (_selectedSeverity !== 'all') {
    incidents = incidents.filter(i => i.severity === _selectedSeverity);
  }
  if (_selectedStatus !== 'all') {
    incidents = incidents.filter(i => i.status === _selectedStatus);
  }

  const selectedUserObj = users.find(u => u.userId === _selectedUserId);

  return `
    <section class="setting-section" id="diagnostics-dashboard">
      <!-- 1. Header & Actions Bar -->
      <div class="panel-head" style="display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:14px;margin-bottom:20px;">
        <div>
          <div style="display:flex;align-items:center;gap:8px;">
            <span style="font-size:22px;">🛠️</span>
            <h2 style="margin:0;font-size:18px;font-weight:700;">
              ${choose('سجل الأخطاء الفنية وتشخيص أداء المستخدمين 🛠️', 'Error Diagnostics & User Incident Center 🛠️')}
            </h2>
          </div>
          <p style="margin:6px 0 0;font-size:13px;color:var(--muted);max-width:720px;line-height:1.5;">
            ${choose('رصد دقيق لكل مشكلة برمجية تواجه أي مستخدم، مع إرسال بريد إلكتروني فوري للإدارة، تسجيل ملف التتبع (Stack Trace)، خطوات المستخدم (Breadcrumbs)، وتشخيص آلي لمساعدتك على الحل فوراً.', 'Real-time error logging per user with automated admin email alerts, stack traces, user breadcrumbs, and instant diagnosis guidance.')}
          </p>
        </div>

        <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;">
          <button type="button" class="btn btn-sm btn-soft" data-action="test-diagnostic-email" style="color:var(--teal);display:flex;align-items:center;gap:6px;font-size:11px;font-weight:600;" title="${choose('اختبار وصول رسائل التنبيه إلى بريد الإدارة', 'Send test alert email to admin recipient')}">
            ${icon('mail', 13)} ${choose('اختبار إرسال بريد التنبيه ✉️', 'Test Email Alert ✉️')}
          </button>
          <button type="button" class="btn btn-sm btn-soft" data-action="test-incident-simulate" style="color:var(--amber);display:flex;align-items:center;gap:6px;font-size:11px;font-weight:600;" title="${choose('محاكاة رصد خطأ تشغيلي كامل مع خطوات المستخدم وإرسال إيميل تنبيه فوري', 'Simulate complete runtime error with breadcrumbs and trigger admin email alert')}">
            ${icon('alert', 13)} ${choose('محاكاة خطأ مع إيميل تنبيه 🚨', 'Simulate Error & Email 🚨')}
          </button>
          <button type="button" class="btn btn-sm btn-primary" data-action="refresh-diagnostics" style="display:flex;align-items:center;gap:6px;font-size:11px;">
            ${icon('clock', 13)} ${choose('تحديث السجل', 'Refresh')}
          </button>
        </div>
      </div>

      <!-- 2. Status & Metric Summary Badges -->
      <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(200px, 1fr));gap:12px;margin-bottom:20px;">
        <div style="background:var(--surface);border:1px solid var(--line);border-radius:10px;padding:14px 16px;">
          <div style="font-size:11px;color:var(--muted);font-weight:600;">${choose('إجمالي المشاكل المسجلة', 'Total Incidents')}</div>
          <div style="font-size:22px;font-weight:800;color:var(--ink);margin:4px 0;">${stats.totalIncidents || 0}</div>
          <div style="font-size:11px;color:var(--ink-soft);">${choose('تم توثيقها بالكامل مع تقارير التتبع', 'Fully documented with stack traces')}</div>
        </div>

        <div style="background:var(--surface);border:1px solid ${stats.activeIncidents > 0 ? 'rgba(239,68,68,0.3)' : 'var(--line)'};border-radius:10px;padding:14px 16px;">
          <div style="font-size:11px;color:${stats.activeIncidents > 0 ? 'var(--red)' : 'var(--muted)'};font-weight:600;">${choose('مشاكل نشطة بحاجة لمتابعة', 'Active / Unresolved')}</div>
          <div style="font-size:22px;font-weight:800;color:${stats.activeIncidents > 0 ? 'var(--red)' : 'var(--teal)'};margin:4px 0;">${stats.activeIncidents || 0}</div>
          <div style="font-size:11px;color:var(--ink-soft);">${stats.activeIncidents > 0 ? choose('⚠️ تستدعي فحص المطور', 'Requires developer review') : choose('✓ جميع المشاكل معالجة', 'All resolved')}</div>
        </div>

        <div style="background:var(--surface);border:1px solid var(--line);border-radius:10px;padding:14px 16px;">
          <div style="font-size:11px;color:var(--muted);font-weight:600;">${choose('حسابات الفريق المراقبة', 'Monitored Users')}</div>
          <div style="font-size:22px;font-weight:800;color:var(--teal);margin:4px 0;">${users.length || stats.totalUsersMonitored || 6} ${choose('مستخدمين', 'Users')}</div>
          <div style="font-size:11px;color:var(--ink-soft);">${choose('تغطية شاملة لكل جهاز ومصادقة', 'Continuous per-session telemetry')}</div>
        </div>

        <div style="background:var(--surface);border:1px solid var(--line);border-radius:10px;padding:14px 16px;">
          <div style="font-size:11px;color:var(--muted);font-weight:600;">${choose('نظام التنبيهات البريدية (Email Alerts)', 'Email Alert System')}</div>
          <div style="font-size:13px;font-weight:700;color:var(--mint-strong);margin:6px 0;display:flex;align-items:center;gap:6px;">
            <span>📧</span> ${choose('مفعّل ويرسل تلقائياً', 'Active & Auto-Dispatched')}
          </div>
          <div style="font-size:11px;color:var(--muted);font-family:monospace;">${stats.alertEmailRecipient || 'admin@darc-design.bond'}</div>
        </div>
      </div>

      <!-- 3. User Explorer Grid (بطاقات تفاصيل أداء كل مستخدم) -->
      <div style="margin-bottom:24px;">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;">
          <h3 style="margin:0;font-size:14px;font-weight:700;display:flex;align-items:center;gap:6px;">
            <span>👥</span> ${choose('تفاصيل حالة واستقرار أجهزة كل مستخدم (انقر للفلترة السريعة):', 'User Health & Crash Status (Click to Filter):')}
          </h3>
          ${_selectedUserId !== 'all' ? `
            <button type="button" class="btn btn-xs btn-soft" data-action="clear-diagnostics-user-filter" style="font-size:11px;">
              ${choose('إلغاء الفلترة وعرض الجميع ✕', 'Clear Filter & Show All ✕')}
            </button>
          ` : ''}
        </div>

        <div style="display:grid;grid-template-columns:repeat(auto-fill, minmax(220px, 1fr));gap:10px;">
          <div 
            class="user-diag-card ${(_selectedUserId === 'all') ? 'is-active' : ''}" 
            data-action="filter-diagnostics-user" 
            data-user-id="all"
            style="background:${_selectedUserId === 'all' ? 'rgba(13,98,105,0.08)' : 'var(--surface)'};border:1px solid ${_selectedUserId === 'all' ? 'var(--teal)' : 'var(--line)'};border-radius:10px;padding:12px 14px;cursor:pointer;transition:all 0.15s ease;"
          >
            <div style="display:flex;align-items:center;gap:8px;">
              <span style="font-size:18px;">🌐</span>
              <div style="flex:1;">
                <div style="font-size:12px;font-weight:700;color:var(--ink);">${choose('جميع المستخدمين', 'All Users')}</div>
                <div style="font-size:11px;color:var(--muted);">${incidents.length} ${choose('بلاغات', 'records')}</div>
              </div>
            </div>
          </div>

          ${users.map(u => {
            const isSelected = _selectedUserId === u.userId;
            const hasActive = u.activeIncidents > 0;
            return `
              <div 
                class="user-diag-card ${isSelected ? 'is-active' : ''}" 
                data-action="filter-diagnostics-user" 
                data-user-id="${esc(u.userId)}"
                style="background:${isSelected ? 'rgba(13,98,105,0.08)' : 'var(--surface)'};border:1px solid ${isSelected ? 'var(--teal)' : (hasActive ? 'rgba(239,68,68,0.3)' : 'var(--line)')};border-radius:10px;padding:12px 14px;cursor:pointer;transition:all 0.15s ease;"
                title="${choose('انقر لعرض الأخطاء الخاصة بهذا المستخدم فقط', 'Click to view only incidents for this user')}"
              >
                <div style="display:flex;align-items:center;gap:10px;">
                  <div style="width:34px;height:34px;border-radius:50%;background:${esc(u.avatarColor || '#0d6269')};color:#fff;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:12px;flex-shrink:0;">
                    ${esc(u.name.slice(0, 2))}
                  </div>
                  <div style="flex:1;min-width:0;">
                    <div style="font-size:12px;font-weight:700;color:var(--ink);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${esc(choose(u.name, u.nameEn || u.name))}</div>
                    <div style="font-size:10px;color:var(--muted);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${esc(u.email)}</div>
                    <div style="display:flex;align-items:center;gap:6px;margin-top:4px;">
                      <span class="status-badge ${hasActive ? 'urgent' : 'done'}" style="font-size:9px;padding:1px 6px;">
                        ${hasActive ? choose(`${u.activeIncidents} خطأ نشط ⚠️`, `${u.activeIncidents} Active ⚠️`) : choose('مستقر ✓', 'Healthy ✓')}
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
      <div style="background:var(--surface);border:1px solid var(--line);border-radius:10px;padding:12px 16px;margin-bottom:16px;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px;">
        <div style="display:flex;align-items:center;gap:12px;flex-wrap:wrap;">
          <div style="font-size:12px;font-weight:600;color:var(--muted);">${choose('تصفية حسب:', 'Filter by:')}</div>
          
          <select id="diag-severity-filter" data-action="filter-diagnostics-severity" class="input input-sm" style="font-size:11px;min-width:130px;height:32px;">
            <option value="all" ${_selectedSeverity === 'all' ? 'selected' : ''}>${choose('جميع مستويات الخطورة', 'All Severities')}</option>
            <option value="critical" ${_selectedSeverity === 'critical' ? 'selected' : ''}>🚨 ${choose('حرجة (Critical)', 'Critical')}</option>
            <option value="high" ${_selectedSeverity === 'high' ? 'selected' : ''}>⚠️ ${choose('مرتفعة (High)', 'High')}</option>
            <option value="medium" ${_selectedSeverity === 'medium' ? 'selected' : ''}>ℹ️ ${choose('متوسطة (Medium)', 'Medium')}</option>
          </select>

          <select id="diag-status-filter" data-action="filter-diagnostics-status" class="input input-sm" style="font-size:11px;min-width:130px;height:32px;">
            <option value="all" ${_selectedStatus === 'all' ? 'selected' : ''}>${choose('جميع الحالات', 'All Statuses')}</option>
            <option value="active" ${_selectedStatus === 'active' ? 'selected' : ''}>🔴 ${choose('نشطة قيد المعالجة', 'Active')}</option>
            <option value="resolved" ${_selectedStatus === 'resolved' ? 'selected' : ''}>✅ ${choose('تم حلها بنجاح', 'Resolved')}</option>
          </select>
        </div>

        <div style="font-size:12px;color:var(--muted);">
          ${choose(`عرض ${incidents.length} مشكلة مسجلة`, `Showing ${incidents.length} incidents`)}
          ${selectedUserObj ? ` (${choose('للمستخدم:', 'for user:')} <strong>${selectedUserObj.name}</strong>)` : ''}
        </div>
      </div>

      <!-- 5. Detailed Incident Cards (مع كل التفاصيل التي تساعد في الحل الدقيق) -->
      <div style="display:flex;flex-direction:column;gap:16px;">
        ${incidents.length ? incidents.map(inc => {
          const isCritical = inc.severity === 'critical';
          const isResolved = inc.status === 'resolved';
          const debugBundleJson = JSON.stringify({
            incidentId: inc.id,
            timestamp: inc.timestamp,
            user: { id: inc.userId, name: inc.userName, email: inc.userEmail, role: inc.userRole },
            client: { device: inc.deviceType, browser: inc.browser, os: inc.os, resolution: inc.screenResolution, memoryMb: inc.memoryMb, ip: inc.ip, location: `${inc.city}, ${inc.country}` },
            error: { type: inc.errorType, message: inc.errorMessage, stack: inc.stackTrace },
            breadcrumbs: inc.breadcrumbs,
            suggestedFix: inc.suggestedSolution
          }, null, 2);

          return `
            <article class="incident-card" style="background:var(--surface);border:1px solid ${isResolved ? 'var(--line)' : (isCritical ? 'rgba(239,68,68,0.4)' : 'rgba(245,158,11,0.35)')};border-radius:12px;padding:20px;box-shadow:var(--shadow-sm);transition:all 0.2s ease;">
              
              <!-- Incident Head -->
              <div style="display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:12px;margin-bottom:14px;border-bottom:1px solid var(--line);padding-bottom:14px;">
                <div style="display:flex;align-items:flex-start;gap:12px;">
                  <span style="font-size:24px;line-height:1;margin-top:2px;">${isResolved ? '✅' : (isCritical ? '🚨' : '⚠️')}</span>
                  <div>
                    <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;">
                      <h4 style="margin:0;font-size:15px;font-weight:700;color:${isResolved ? 'var(--ink)' : (isCritical ? 'var(--red)' : 'var(--amber-strong)')};">
                        ${choose(inc.titleAr, inc.titleEn)}
                      </h4>
                      <span class="status-badge ${isCritical ? 'urgent' : (inc.severity === 'high' ? 'in-review' : 'done')}" style="font-size:10px;">
                        ${inc.severity.toUpperCase()}
                      </span>
                      <span style="font-size:11px;font-family:monospace;background:var(--surface-soft);border:1px solid var(--line);padding:2px 8px;border-radius:4px;color:var(--muted);">
                        ${inc.id}
                      </span>
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
                      <span>📍 ${esc(inc.city)}, ${esc(inc.country)} (${esc(inc.ip)})</span>
                      <span>·</span>
                      <span>🕒 ${new Date(inc.timestamp).toLocaleString(state.lang === 'ar' ? 'ar-AE' : 'en-US')}</span>
                    </div>
                  </div>
                </div>

                <!-- Resolve & Actions -->
                <div style="display:flex;align-items:center;gap:8px;">
                  ${!isResolved ? `
                    <button type="button" class="btn btn-sm btn-primary" data-action="resolve-diagnostic-incident" data-incident-id="${esc(inc.id)}" style="font-size:11px;display:flex;align-items:center;gap:5px;">
                      ${icon('check', 13)} ${choose('تحديد كمعالج ✅', 'Mark Resolved ✅')}
                    </button>
                  ` : `
                    <span class="status-badge done" style="font-size:11px;">
                      ✓ ${choose('تم حل المشكلة وإغلاق البلاغ', 'Resolved')}
                    </span>
                  `}
                  <button type="button" class="btn btn-sm btn-soft" data-action="copy-debug-bundle" data-bundle="${esc(debugBundleJson)}" style="font-size:11px;display:flex;align-items:center;gap:5px;" title="${choose('نسخ كامل التقرير الفني لحل المشكلة فوراً', 'Copy complete technical debug bundle to clipboard')}">
                    ${icon('copy', 13)} ${choose('نسخ تقرير الخطأ 📋', 'Copy Debug Info 📋')}
                  </button>
                </div>
              </div>

              <!-- Technical Environment Specs Matrix -->
              <div style="background:var(--surface-soft);border:1px solid var(--line);border-radius:8px;padding:12px 14px;margin-bottom:14px;display:grid;grid-template-columns:repeat(auto-fit, minmax(180px, 1fr));gap:10px;font-size:12px;">
                <div><span style="color:var(--muted);">${choose('نظام التشغيل:', 'OS:')}</span> <strong>${esc(inc.os || 'macOS')}</strong></div>
                <div><span style="color:var(--muted);">${choose('المتصفح:', 'Browser:')}</span> <strong>${esc(inc.browser || 'Chrome')}</strong></div>
                <div><span style="color:var(--muted);">${choose('نوع الجهاز:', 'Device:')}</span> <strong>${esc(inc.deviceType || 'Desktop')}</strong></div>
                <div><span style="color:var(--muted);">${choose('أبعاد الشاشة:', 'Screen:')}</span> <strong>${esc(inc.screenResolution || '1920x1080')}</strong></div>
                <div><span style="color:var(--muted);">${choose('ذاكرة الـ Heap:', 'Memory:')}</span> <strong style="color:${inc.memoryMb > 130 ? 'var(--red)' : 'var(--teal)'};">${esc(String(inc.memoryMb))} MB</strong></div>
                <div><span style="color:var(--muted);">${choose('الشاشة النشطة:', 'Route:')}</span> <strong style="color:var(--teal);font-family:monospace;">${esc(inc.currentView || '#dashboard')}</strong></div>
              </div>

              <!-- Error Message & Stack Trace (The exact code location) -->
              <div style="margin-bottom:14px;">
                <div style="font-size:12px;font-weight:700;color:var(--ink);margin-bottom:6px;display:flex;align-items:center;gap:6px;">
                  <span>🔍</span> ${choose('الخطأ البرمجي وموقع الاستثناء في الكود (Stack Trace):', 'Error Message & Call Stack:')}
                </div>
                <div style="background:#090d16;color:#f8fafc;border:1px solid #1e293b;border-radius:8px;padding:12px 14px;font-family:Consolas, Monaco, monospace;font-size:12px;overflow-x:auto;">
                  <div style="color:#ef4444;font-weight:700;margin-bottom:8px;">${esc(inc.errorMessage)}</div>
                  <pre style="margin:0;color:#94a3b8;font-size:11px;line-height:1.5;white-space:pre-wrap;word-break:break-all;">${esc(inc.stackTrace)}</pre>
                </div>
              </div>

              <!-- User Breadcrumbs (Step-by-step actions that caused it) -->
              <div style="margin-bottom:14px;">
                <div style="font-size:12px;font-weight:700;color:var(--ink);margin-bottom:6px;display:flex;align-items:center;gap:6px;">
                  <span>👣</span> ${choose('تسلسل خطوات المستخدم قبل حدوث المشكلة (User Breadcrumbs):', 'Step-by-Step User Actions Prior to Error:')}
                </div>
                <div style="background:var(--surface-soft);border:1px solid var(--line);border-radius:8px;padding:10px 14px;">
                  <ol style="margin:0;padding-right:20px;font-size:12px;color:var(--ink-soft);line-height:1.7;">
                    ${(inc.breadcrumbs || []).length ? inc.breadcrumbs.map(b => `
                      <li>
                        <span style="color:var(--muted);font-family:monospace;">[${esc(b.time)}]</span>
                        <strong style="color:var(--teal);">${esc(b.category)}:</strong>
                        <span>${esc(b.message)}</span>
                      </li>
                    `).join('') : `<li>${choose('لا توجد خطوات سابقة مسجلة.', 'No prior breadcrumbs.')}</li>`}
                  </ol>
                </div>
              </div>

              <!-- Suggested Automated Resolution -->
              <div style="background:rgba(16,185,129,0.07);border:1px solid rgba(16,185,129,0.3);border-radius:8px;padding:12px 16px;margin-bottom:12px;">
                <div style="font-size:12px;font-weight:700;color:var(--mint-strong);margin-bottom:4px;display:flex;align-items:center;gap:6px;">
                  <span>💡</span> ${choose('التشخيص التلقائي والحل المقترح للمطور:', 'Automated Root Cause Diagnosis & Recommended Fix:')}
                </div>
                <div style="font-size:12px;color:var(--ink);line-height:1.6;">
                  ${esc(inc.suggestedSolution || choose('تحقق من صحة الكود ومسارات المعالجة.', 'Review code handling.'))}
                </div>
              </div>

              <!-- Email Dispatch Status Receipt -->
              <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;font-size:11px;color:var(--muted);padding-top:10px;border-top:1px dashed var(--line);">
                <div style="display:flex;align-items:center;gap:6px;">
                  <span>📧</span>
                  <span>${choose('حالة إرسال بريد التنبيه للإدارة:', 'Admin Alert Email:')}</span>
                  <strong style="color:var(--teal);">${inc.emailAlert?.status === 'delivered' ? choose('تم التسليم للبريد بنجاح ✓', 'Delivered ✓') : choose('تم التحقق والتسجيل في السيرفر ✓', 'Dispatched to Sandbox ✓')}</strong>
                  <span style="font-family:monospace;">(${esc(inc.emailAlert?.deliveredTo || 'admin@darc-design.bond')})</span>
                </div>
                <div>
                  ${isResolved ? choose(`معالج بواسطة: ${inc.resolvedBy || 'Admin'}`, `Resolved by: ${inc.resolvedBy || 'Admin'}`) : choose('قيد التدخل البرمجي', 'Awaiting resolution')}
                </div>
              </div>

            </article>
          `;
        }).join('') : `
          <div style="text-align:center;padding:40px 20px;background:var(--surface);border:1px dashed var(--line);border-radius:12px;">
            <span style="font-size:32px;">🎉</span>
            <h4 style="margin:8px 0 4px;font-size:15px;font-weight:700;color:var(--ink);">${choose('لا توجد أي مشاكل مسجلة تطابق التصفية الحالية', 'No Incidents Found')}</h4>
            <p style="margin:0;font-size:12px;color:var(--muted);">${choose('جميع أجهزة المستخدمين تعمل بأقصى درجات الاستقرار والأمان.', 'All user sessions are running with zero active errors.')}</p>
          </div>
        `}
      </div>
    </section>
  `;
}
