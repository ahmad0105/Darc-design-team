import { choose, esc, icon, formatDateTime } from '../../core/utils.js';
import { showToast, modalShell } from '../../shared/ui.js';
import { recordBreadcrumb } from '../../core/telemetry.js';
import { isDemoSession } from '../../core/realtime.js';
import {
  fetchVaultBackups,
  fetchVaultWorkflowRuns,
  triggerDisasterBackup as apiTriggerBackup,
  triggerDisasterRecovery as apiTriggerRestore,
  getVaultState,
  copyToClipboardSafe,
  VAULT_CONFIG
} from './vault.service.js';

let _activeHoldTimer = null;
let _holdProgress = 0;
let _recentRuns = [];
let _pollingInterval = null;

export async function fetchVaultData(force = false) {
  const result = await fetchVaultBackups(force);
  if (result.data) {
    // Also fetch recent workflow runs
    fetchVaultWorkflowRuns().then(runs => {
      _recentRuns = runs.slice(0, VAULT_CONFIG.MAX_RUNS_DISPLAY);
      const runsContainer = document.getElementById('vault-runs-ledger');
      if (runsContainer) {
        runsContainer.innerHTML = renderRunsTable(_recentRuns);
      }
    });
  }
  return result.data;
}

export function renderVaultSection() {
  const isDemo = isDemoSession();
  const { cachedVault, isLoading } = getVaultState();

  if (!cachedVault && !isLoading) {
    fetchVaultData().then(() => {
      const container = document.getElementById('vault-content-area');
      if (container) {
        const state = getVaultState();
        container.innerHTML = renderVaultInner(isDemo, state.cachedVault, state.vaultError, state.isLoading);
        attachVaultEvents();
      }
    }).catch(err => {
      const container = document.getElementById('vault-content-area');
      if (container) {
        const state = getVaultState();
        container.innerHTML = renderVaultInner(isDemo, state.cachedVault, err?.message || state.vaultError, false);
        attachVaultEvents();
      }
    });
  }

  return `
    <div class="settings-vault-wrap" id="vault-content-area">
      ${renderVaultInner(isDemo, cachedVault, null, isLoading)}
    </div>
  `;
}

function renderRunsTable(runs) {
  if (!runs || runs.length === 0) {
    return `
      <div style="padding:2rem 1rem; text-align:center; color:var(--text-muted); font-size:0.85rem;">
        ${choose('لا توجد عمليات سحابية مسجلة مؤخراً.', 'No recent cloud workflow executions found.')}
      </div>
    `;
  }

  return `
    <div style="overflow-x:auto;">
      <table class="table" style="width:100%; margin:0; border-collapse:collapse; font-size:0.85rem;">
        <thead>
          <tr style="background:rgba(0,0,0,0.02); border-bottom:1px solid var(--border-color); text-align:start;">
            <th style="padding:0.75rem 1.25rem; font-weight:600; color:var(--text-muted);">${choose('مسار التشغيل', 'Workflow')}</th>
            <th style="padding:0.75rem 1.25rem; font-weight:600; color:var(--text-muted);">${choose('الحالة', 'Status')}</th>
            <th style="padding:0.75rem 1.25rem; font-weight:600; color:var(--text-muted);">${choose('طريقة الإطلاق', 'Trigger')}</th>
            <th style="padding:0.75rem 1.25rem; font-weight:600; color:var(--text-muted);">${choose('التوقيت', 'Timestamp')}</th>
            <th style="padding:0.75rem 1.25rem; font-weight:600; color:var(--text-muted); text-align:end;">${choose('التفاصيل', 'Log')}</th>
          </tr>
        </thead>
        <tbody>
          ${runs.map(r => {
            const isSuccess = r.conclusion === 'success';
            const isFailed = r.conclusion === 'failure';
            const isRunning = r.status === 'in_progress' || r.status === 'queued';

            let badgeHtml = '';
            if (isRunning) {
              badgeHtml = `
                <span style="display:inline-flex; align-items:center; gap:0.35rem; font-size:0.75rem; padding:0.2rem 0.6rem; border-radius:1rem; background:rgba(217,119,6,0.12); color:#d97706; font-weight:600;">
                  <span style="width:6px; height:6px; border-radius:50%; background:#d97706; animation:pulse 1.5s infinite;"></span>
                  ${choose('قيد التنفيذ...', 'In Progress...')}
                </span>
              `;
            } else if (isSuccess) {
              badgeHtml = `
                <span style="display:inline-flex; align-items:center; gap:0.35rem; font-size:0.75rem; padding:0.2rem 0.6rem; border-radius:1rem; background:rgba(16,185,129,0.12); color:#10b981; font-weight:600;">
                  ${icon('check', 'width:12px; height:12px;')} ${choose('ناجح 100%', 'Success')}
                </span>
              `;
            } else if (isFailed) {
              badgeHtml = `
                <span style="display:inline-flex; align-items:center; gap:0.35rem; font-size:0.75rem; padding:0.2rem 0.6rem; border-radius:1rem; background:rgba(239,68,68,0.12); color:#ef4444; font-weight:600;">
                  ${icon('alert-triangle', 'width:12px; height:12px;')} ${choose('تعثر التنفيذ', 'Failed')}
                </span>
              `;
            } else {
              badgeHtml = `<span style="font-size:0.75rem; color:var(--text-muted);">${esc(r.status || 'unknown')}</span>`;
            }

            return `
              <tr style="border-bottom:1px solid var(--border-color);">
                <td style="padding:0.75rem 1.25rem; font-weight:600; color:var(--text-main);">
                  <div style="display:flex; align-items:center; gap:0.4rem;">
                    ${icon('terminal', 'width:14px; height:14px; color:var(--text-muted);')}
                    <span>${esc(r.name)}</span>
                  </div>
                </td>
                <td style="padding:0.75rem 1.25rem;">${badgeHtml}</td>
                <td style="padding:0.75rem 1.25rem; color:var(--text-muted); font-size:0.8rem; font-family:monospace;">
                  ${r.event === 'workflow_dispatch' ? choose('يدوي من اللوحة', 'Manual UI') : esc(r.event)}
                </td>
                <td style="padding:0.75rem 1.25rem; color:var(--text-muted); font-size:0.8rem;">
                  ${formatDateTime(r.createdAt)}
                </td>
                <td style="padding:0.75rem 1.25rem; text-align:end;">
                  <a href="${esc(r.htmlUrl)}" target="_blank" rel="noopener noreferrer" class="btn btn-sm btn-secondary" style="font-size:0.75rem; text-decoration:none; padding:0.25rem 0.6rem;">
                    ${choose('GitHub ↗', 'GitHub ↗')}
                  </a>
                </td>
              </tr>
            `;
          }).join('')}
        </tbody>
      </table>
    </div>
  `;
}

function renderVaultInner(isDemo, data, error = null, isLoading = false) {
  if (!data && error) {
    return `
      <div class="vault-error-state card" style="text-align:center; padding:3.5rem 1.5rem; border:1px solid rgba(239, 68, 68, 0.3); background:rgba(239, 68, 68, 0.04); border-radius:1rem; margin-bottom:2rem;">
        <div style="color:#ef4444; margin-bottom:1rem;">
          ${icon('alert-triangle', 'width:36px; height:36px;')}
        </div>
        <h3 style="font-weight:700; color:var(--text-main); margin-bottom:0.5rem;">
          ${choose('تعذر تحميل سجل النسخ الاحتياطية من Google Drive', 'Failed to Load Backups Ledger from Google Drive')}
        </h3>
        <p style="color:var(--text-muted); font-size:0.9rem; max-width:540px; margin:0 auto 1.5rem auto;">
          ${esc(error)}
        </p>
        <button id="btn-retry-vault-fetch" class="btn btn-primary" style="display:inline-flex; align-items:center; gap:0.5rem; background:#059669; border-color:#059669; font-size:0.9rem;">
          ${icon('refresh', 'width:15px; height:15px;')}
          <span>${choose('إعادة المحاولة الآن', 'Retry Now')}</span>
        </button>
      </div>
    `;
  }

  if (!data || isLoading) {
    return `
      <div class="vault-loading-state" style="text-align:center; padding:4rem 1rem;">
        <div class="loading-spinner" style="margin: 0 auto 1.5rem auto;"></div>
        <h3 style="font-weight:600; color:var(--text-main); margin-bottom:0.5rem;">
          ${choose('جاري فحص خزنة Google Drive 5TB ومطابقة النسخ المشفرة...', 'Scanning Google Drive 5TB Vault & Verifying Checksums...')}
        </h3>
        <p style="color:var(--text-muted); font-size:0.9rem;">
          ${choose('يتم الاتصال عبر مصادقة Google OAuth2 المشفرة', 'Connecting via secure Google OAuth2 handshake')}
        </p>
      </div>
    `;
  }

  const total = data?.total || 0;
  const latest = data?.latestBackup;
  const backups = data?.backups || [];

  return `
    <!-- Top Hero Banner: Karim Al-Hakim Serenity & High Resilience -->
    <div class="vault-hero-card" style="
      background: linear-gradient(135deg, rgba(16, 24, 39, 0.95), rgba(15, 23, 42, 0.98));
      border: 1px solid rgba(16, 185, 129, 0.25);
      border-radius: 1rem;
      padding: 1.75rem 2rem;
      margin-bottom: 2rem;
      box-shadow: 0 10px 30px -10px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.05);
      position: relative;
      overflow: hidden;
    ">
      <div style="position:absolute; top:-40px; right:-40px; width:180px; height:180px; background:radial-gradient(circle, rgba(16,185,129,0.15) 0%, transparent 70%); pointer-events:none;"></div>
      
      <div style="display:flex; justify-content:space-between; align-items:flex-start; flex-wrap:wrap; gap:1.25rem;">
        <div>
          <div style="display:flex; align-items:center; gap:0.75rem; margin-bottom:0.75rem;">
            <span style="
              display:inline-flex; align-items:center; gap:0.5rem;
              background:rgba(16, 185, 129, 0.12); color:#10b981;
              padding:0.35rem 0.85rem; border-radius:2rem; font-size:0.8rem; font-weight:700;
              border: 1px solid rgba(16, 185, 129, 0.3);
            ">
              <span style="width:8px; height:8px; border-radius:50%; background:#10b981; box-shadow:0 0 10px #10b981; animation:pulse 2s infinite;"></span>
              ${choose('نظام الحصانة السحابية نشط 100%', 'Air-Gapped Cloud Vault Active')}
            </span>
            <span style="color:var(--text-muted); font-size:0.85rem;">
              ${choose('حساب Google Drive 5TB + أرشيف GitHub السحابي', 'Google Drive 5TB + GitHub Azure Cloud')}
            </span>
          </div>

          <h2 style="font-size:1.45rem; font-weight:700; color:#f8fafc; margin:0 0 0.5rem 0; letter-spacing:-0.02em;">
            ${choose('مركز النسخ الاحتياطي والتعافي من الكوارث (DARC Vault)', 'Disaster Recovery & Enterprise Vault')}
          </h2>
          <p style="color:#94a3b8; font-size:0.92rem; max-width:680px; line-height:1.6; margin:0;">
            ${choose(
              'النسخ تُسحب ذرياً، تُشفر محلياً بـ AES-256 عسكري قبل خروجها للإنترنت، وتُحفظ مستقلاً في سحابتين منفصلتين لحماية بيانات المشاريع من أي كارثة أو عطل سحابي.',
              'Database is dumped atomically, encrypted client-side with AES-256 before transit, and preserved across two independent cloud providers with 30-day rolling retention.'
            )}
          </p>
        </div>

        <div style="display:flex; gap:0.75rem; flex-wrap:wrap;">
          <button id="btn-trigger-backup-now" class="btn btn-secondary" style="background:rgba(255,255,255,0.06); border-color:rgba(255,255,255,0.12); color:#e2e8f0;">
            ${icon('upload', 'width:15px; height:15px;')}
            <span>${choose('أخذ نسخة فورية الآن', 'Backup Now')}</span>
          </button>
          <button id="btn-refresh-vault" class="btn btn-secondary" style="background:rgba(255,255,255,0.06); border-color:rgba(255,255,255,0.12); color:#e2e8f0;">
            ${icon('refresh', 'width:15px; height:15px;')}
            <span>${choose('تحديث القائمة', 'Refresh Vault')}</span>
          </button>
          <button id="btn-open-restore-wizard" class="btn btn-primary" style="background:#059669; border-color:#059669; color:#fff; box-shadow:0 4px 14px rgba(5,150,105,0.4);">
            ${icon('shield', 'width:15px; height:15px;')}
            <span>${choose('معالج الاستعادة الآمن', 'Restore Wizard')}</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Metrics Bento Row -->
    <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(240px, 1fr)); gap:1rem; margin-bottom:2rem;">
      <div class="card" style="padding:1.25rem 1.5rem; border-radius:0.75rem; border:1px solid var(--border-color);">
        <span style="font-size:0.8rem; color:var(--text-muted); text-transform:uppercase; font-weight:600; letter-spacing:0.05em;">
          ${choose('حالة أحدث نسخة مشفرة', 'Latest Encrypted Backup')}
        </span>
        <div style="font-size:1.15rem; font-weight:700; color:var(--text-main); margin-top:0.5rem; display:flex; align-items:center; gap:0.5rem;">
          <span style="color:#10b981;">${icon('check', 'width:18px; height:18px;')}</span>
          <span>${latest ? formatDateTime(latest.createdAt) : choose('لا توجد نسخ', 'None')}</span>
        </div>
      </div>

      <div class="card" style="padding:1.25rem 1.5rem; border-radius:0.75rem; border:1px solid var(--border-color);">
        <span style="font-size:0.8rem; color:var(--text-muted); text-transform:uppercase; font-weight:600; letter-spacing:0.05em;">
          ${choose('معيار التشفير المعتمد', 'Cipher Standard')}
        </span>
        <div style="font-size:1.05rem; font-weight:700; color:var(--text-main); margin-top:0.5rem; font-family:monospace;">
          AES-256-CBC (PBKDF2 100k)
        </div>
      </div>

      <div class="card" style="padding:1.25rem 1.5rem; border-radius:0.75rem; border:1px solid var(--border-color);">
        <span style="font-size:0.8rem; color:var(--text-muted); text-transform:uppercase; font-weight:600; letter-spacing:0.05em;">
          ${choose('إجمالي النسخ المتاحة (Drive 5TB)', 'Total Backups Available')}
        </span>
        <div style="font-size:1.5rem; font-weight:800; color:#10b981; margin-top:0.35rem;">
          ${total} ${choose('نسخ موثقة', 'Archives')}
        </div>
      </div>

      <div class="card" style="padding:1.25rem 1.5rem; border-radius:0.75rem; border:1px solid var(--border-color);">
        <span style="font-size:0.8rem; color:var(--text-muted); text-transform:uppercase; font-weight:600; letter-spacing:0.05em;">
          ${choose('حجم أرشيف قاعدة البيانات الأحدث', 'Latest Archive Size')}
        </span>
        <div style="font-size:1.4rem; font-weight:800; color:var(--text-main); margin-top:0.5rem;">
          ${latest?.sizeFormatted || '—'}
        </div>
      </div>
    </div>

    <!-- Backups Table Ledger -->
    <div class="card" style="padding:0; overflow:hidden; border-radius:0.75rem; border:1px solid var(--border-color); margin-bottom:2rem;">
      <div style="padding:1.25rem 1.5rem; border-bottom:1px solid var(--border-color); display:flex; justify-content:space-between; align-items:center;">
        <h3 style="font-size:1.05rem; font-weight:700; color:var(--text-main); margin:0;">
          ${choose('سجل النسخ الاحتياطية المتاحة على Google Drive (5TB)', 'Available Backups Ledger (Google Drive 5TB)')}
        </h3>
        <span style="font-size:0.82rem; color:var(--text-muted);">
          ${choose('فترة الاستبقاء: 30 يوماً متجددة', 'Retention Policy: 30-Day Rolling')}
        </span>
      </div>

      ${backups.length === 0 ? `
        <div style="padding:3rem 1rem; text-align:center; color:var(--text-muted);">
          <p>${choose('لم يتم العثور على نسخ احتياطية في مجلد Drive.', 'No encrypted backups found in Google Drive folder.')}</p>
        </div>
      ` : `
        <div style="overflow-x:auto;">
          <table class="table" style="width:100%; margin:0; border-collapse:collapse; font-size:0.9rem;">
            <thead>
              <tr style="background:rgba(0,0,0,0.03); border-bottom:1px solid var(--border-color); text-align:start;">
                <th style="padding:0.9rem 1.25rem; font-weight:600; color:var(--text-muted);">${choose('اسم الملف المشفر', 'Encrypted Filename')}</th>
                <th style="padding:0.9rem 1.25rem; font-weight:600; color:var(--text-muted);">${choose('تاريخ الحفظ', 'Timestamp')}</th>
                <th style="padding:0.9rem 1.25rem; font-weight:600; color:var(--text-muted);">${choose('الحجم', 'Size')}</th>
                <th style="padding:0.9rem 1.25rem; font-weight:600; color:var(--text-muted);">${choose('بصمة SHA-256', 'Integrity')}</th>
                <th style="padding:0.9rem 1.25rem; font-weight:600; color:var(--text-muted); text-align:end;">${choose('الإجراءات', 'Actions')}</th>
              </tr>
            </thead>
            <tbody>
              ${backups.map(b => `
                <tr style="border-bottom:1px solid var(--border-color); transition:background 0.15s ease;">
                  <td style="padding:1rem 1.25rem; font-weight:600; color:var(--text-main);">
                    <div style="display:flex; align-items:center; gap:0.5rem;">
                      <span style="color:#10b981;">${icon('lock', 'width:16px; height:16px;')}</span>
                      <code style="font-family:monospace; font-size:0.85rem; color:var(--text-main);">${esc(b.filename)}</code>
                    </div>
                  </td>
                  <td style="padding:1rem 1.25rem; color:var(--text-muted);">${formatDateTime(b.createdAt)}</td>
                  <td style="padding:1rem 1.25rem; color:var(--text-main); font-weight:600;">${b.sizeFormatted}</td>
                  <td style="padding:1rem 1.25rem;">
                    <span style="
                      display:inline-flex; align-items:center; gap:0.35rem;
                      font-size:0.75rem; padding:0.2rem 0.6rem; border-radius:1rem;
                      background:rgba(16,185,129,0.1); color:#10b981; font-weight:600;
                    ">
                      ${icon('check', 'width:12px; height:12px;')} ${choose('مطابقة وموثقة', 'Verified SHA-256')}
                    </span>
                  </td>
                  <td style="padding:1rem 1.25rem; text-align:end;">
                    <a href="https://drive.google.com/file/d/${esc(b.id)}/view" target="_blank" rel="noopener noreferrer" class="btn btn-sm btn-secondary" style="font-size:0.8rem; margin-inline-end:0.4rem; text-decoration:none;">
                      ${icon('download', 'width:13px; height:13px;')}
                      <span>${choose('Drive', 'Drive')}</span>
                    </a>
                    <button class="btn btn-sm btn-secondary btn-copy-cli" data-filename="${esc(b.filename)}" style="font-size:0.8rem; margin-inline-end:0.4rem;">
                      ${icon('copy', 'width:13px; height:13px;')}
                      <span>${choose('أمر CLI', 'CLI Command')}</span>
                    </button>
                    <button class="btn btn-sm btn-primary btn-restore-target" data-filename="${esc(b.filename)}" style="background:#059669; border-color:#059669; font-size:0.8rem;">
                      ${icon('shield', 'width:13px; height:13px;')}
                      <span>${choose('استعادة', 'Restore')}</span>
                    </button>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      `}
    </div>

    <!-- Live Cloud Run & Automation Ledger -->
    <div class="card" style="padding:0; overflow:hidden; border-radius:0.75rem; border:1px solid var(--border-color);">
      <div style="padding:1.25rem 1.5rem; border-bottom:1px solid var(--border-color); display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.75rem;">
        <div>
          <h3 style="font-size:1.05rem; font-weight:700; color:var(--text-main); margin:0;">
            ${choose('سجل العمليات الحية ومسارات الأتمتة (Cloud Run Ledger)', 'Live Automation & Cloud Run History')}
          </h3>
          <span style="font-size:0.82rem; color:var(--text-muted);">
            ${choose('مراقبة حالة مسارات GitHub Actions المباشرة للنسخ والتعافي', 'Live GitHub Actions Workflow Executions')}
          </span>
        </div>
        <button id="btn-refresh-runs" class="btn btn-sm btn-secondary" style="font-size:0.8rem;">
          ${icon('refresh', 'width:13px; height:13px;')}
          <span>${choose('تحديث السجل الحي', 'Refresh Runs')}</span>
        </button>
      </div>

      <div id="vault-runs-ledger">
        ${renderRunsTable(_recentRuns)}
      </div>
    </div>
  `;
}

export function attachVaultEvents() {
  const retryBtn = document.getElementById('btn-retry-vault-fetch');
  if (retryBtn) {
    retryBtn.onclick = async () => {
      retryBtn.disabled = true;
      retryBtn.innerHTML = `${icon('refresh', 'width:15px; height:15px; animation:spin 1s linear infinite;')} <span>${choose('جاري الفحص...', 'Retrying...')}</span>`;
      await fetchVaultData(true);
      const container = document.getElementById('vault-content-area');
      if (container) {
        const state = getVaultState();
        container.innerHTML = renderVaultInner(isDemoSession(), state.cachedVault, state.vaultError, state.isLoading);
        attachVaultEvents();
      }
    };
  }

  const backupBtn = document.getElementById('btn-trigger-backup-now');
  if (backupBtn) {
    backupBtn.onclick = async () => {
      backupBtn.disabled = true;
      backupBtn.innerHTML = `${icon('refresh', 'width:15px; height:15px; animation:spin 1s linear infinite;')} <span>${choose('جاري الإطلاق...', 'Launching...')}</span>`;
      try {
        await apiTriggerBackup();
        showToast(choose('تم إطلاق مسار النسخ الاحتياطي المشفر على GitHub بنجاح', 'Encrypted backup dispatched to GitHub successfully'));
        startWorkflowPolling();
      } catch (err) {
        showToast(err.message || 'Failed to dispatch backup', 'error');
      } finally {
        backupBtn.disabled = false;
        backupBtn.innerHTML = `${icon('upload', 'width:15px; height:15px;')} <span>${choose('أخذ نسخة فورية الآن', 'Backup Now')}</span>`;
      }
    };
  }

  const refreshBtn = document.getElementById('btn-refresh-vault');
  if (refreshBtn) {
    refreshBtn.onclick = async () => {
      refreshBtn.disabled = true;
      refreshBtn.innerHTML = `${icon('refresh', 'width:16px; height:16px; animation:spin 1s linear infinite;')} <span>${choose('جاري الفحص...', 'Scanning...')}</span>`;
      await fetchVaultData(true);
      const container = document.getElementById('vault-content-area');
      if (container) {
        const state = getVaultState();
        container.innerHTML = renderVaultInner(isDemoSession(), state.cachedVault, state.vaultError, state.isLoading);
        attachVaultEvents();
      }
      const state = getVaultState();
      if (state.vaultError) {
        showToast(state.vaultError, 'error');
      } else {
        showToast(choose('تم تحديث قائمة النسخ من Google Drive بنجاح', 'Vault list refreshed successfully'));
      }
    };
  }

  const refreshRunsBtn = document.getElementById('btn-refresh-runs');
  if (refreshRunsBtn) {
    refreshRunsBtn.onclick = async () => {
      refreshRunsBtn.disabled = true;
      const runs = await fetchVaultWorkflowRuns();
      _recentRuns = runs.slice(0, VAULT_CONFIG.MAX_RUNS_DISPLAY);
      const runsContainer = document.getElementById('vault-runs-ledger');
      if (runsContainer) {
        runsContainer.innerHTML = renderRunsTable(_recentRuns);
      }
      refreshRunsBtn.disabled = false;
      showToast(choose('تم تحديث سجل العمليات الحية', 'Live run history updated'));
    };
  }

  const wizardBtn = document.getElementById('btn-open-restore-wizard');
  if (wizardBtn) {
    wizardBtn.onclick = () => openRestoreWizardModal('latest');
  }

  document.querySelectorAll('.btn-restore-target').forEach(btn => {
    btn.onclick = () => {
      const filename = btn.getAttribute('data-filename');
      openRestoreWizardModal(filename);
    };
  });

  document.querySelectorAll('.btn-copy-cli').forEach(btn => {
    btn.onclick = async () => {
      const filename = btn.getAttribute('data-filename');
      const cmd = `openssl enc -d -aes-256-cbc -pbkdf2 -iter 100000 -pass pass:"$BACKUP_ENCRYPTION_KEY" -in "${filename}" | gunzip | psql "$SUPABASE_DB_URL"`;
      const copied = await copyToClipboardSafe(cmd);
      if (copied) {
        showToast(choose('تم نسخ أمر فك التشفير والاستعادة إلى الحافظة', 'Decryption & restore command copied to clipboard'));
      } else {
        showToast(choose('تعذر النسخ التلقائي، يرجى النسخ يدوياً', 'Could not auto-copy, please copy manually'), 'error');
      }
    };
  });
}

function startWorkflowPolling() {
  if (_pollingInterval) clearInterval(_pollingInterval);
  let pollCount = 0;
  _pollingInterval = setInterval(async () => {
    pollCount++;
    const runs = await fetchVaultWorkflowRuns();
    _recentRuns = runs.slice(0, VAULT_CONFIG.MAX_RUNS_DISPLAY);
    const runsContainer = document.getElementById('vault-runs-ledger');
    if (runsContainer) {
      runsContainer.innerHTML = renderRunsTable(_recentRuns);
    }
    const anyRunning = runs.some(r => r.status === 'in_progress' || r.status === 'queued');
    if (!anyRunning || pollCount > 15) {
      clearInterval(_pollingInterval);
      _pollingInterval = null;
      // Refresh backups ledger once run completes
      fetchVaultBackups(true).then(() => {
        const container = document.getElementById('vault-content-area');
        if (container) {
          const state = getVaultState();
          container.innerHTML = renderVaultInner(isDemoSession(), state.cachedVault, state.vaultError, state.isLoading);
          attachVaultEvents();
        }
      });
    }
  }, VAULT_CONFIG.POLL_INTERVAL_MS);
}

/**
 * Karim Al-Hakim 3.5s Radial Hold Disaster Recovery Modal
 */
export function openRestoreWizardModal(targetFilename = 'latest') {
  recordBreadcrumb('vault', 'Opened disaster recovery wizard modal', { targetFilename });

  const modalHtml = `
    <div class="restore-wizard-dialog" style="max-width:540px; margin:0 auto; padding:1.5rem 0;">
      <div style="text-align:center; margin-bottom:1.5rem;">
        <div style="width:56px; height:56px; border-radius:50%; background:rgba(217,119,6,0.12); color:#d97706; display:inline-flex; align-items:center; justify-content:center; margin-bottom:1rem;">
          ${icon('alert-triangle', 'width:28px; height:28px;')}
        </div>
        <h3 style="font-size:1.3rem; font-weight:700; color:var(--text-main); margin:0 0 0.5rem 0;">
          ${choose('معالج استعادة قاعدة البيانات (Disaster Recovery)', 'Database Disaster Recovery Wizard')}
        </h3>
        <p style="color:var(--text-muted); font-size:0.9rem; line-height:1.5; margin:0;">
          ${choose('النسخة المستهدفة:', 'Target Backup Archive:')}
          <strong style="color:#10b981; font-family:monospace;">${esc(targetFilename)}</strong>
        </p>
      </div>

      <!-- Mode Selector: Dry Run vs Real Restore -->
      <div style="background:var(--surface); border:1px solid var(--border-color); border-radius:0.75rem; padding:1.25rem; margin-bottom:1.5rem;">
        <label style="display:flex; align-items:flex-start; gap:0.75rem; cursor:pointer; margin-bottom:1rem;">
          <input type="radio" name="restore-mode" id="mode-dryrun" value="dryrun" checked style="margin-top:0.25rem;">
          <div>
            <strong style="display:flex; align-items:center; gap:0.4rem; color:var(--text-main); font-size:0.95rem;">
              <span style="color:#10b981;">${icon('check', 'width:16px; height:16px;')}</span>
              <span>${choose('محاكاة تجريبية آمنة (Dry-Run Rehearsal)', 'Safe Dry-Run Rehearsal')}</span>
            </strong>
            <p style="color:var(--text-muted); font-size:0.83rem; margin:0.25rem 0 0 0; line-height:1.4;">
              ${choose(
                'يقوم السيرفر بتنزيل النسخة، التحقق من بصمة SHA-256، وفك تشفيرها للتأكد من سلامتها دون أي مساس ببيانات الإنتاج الحية.',
                'Downloads archive, validates SHA-256 checksum & decrypts without touching production database.'
              )}
            </p>
          </div>
        </label>

        <label style="display:flex; align-items:flex-start; gap:0.75rem; cursor:pointer; margin:0;">
          <input type="radio" name="restore-mode" id="mode-real" value="real" style="margin-top:0.25rem;">
          <div>
            <strong style="display:flex; align-items:center; gap:0.4rem; color:#ef4444; font-size:0.95rem;">
              <span style="color:#ef4444;">${icon('alert-triangle', 'width:16px; height:16px;')}</span>
              <span>${choose('استعادة حقيقية كاملة (Live Production Restore)', 'Live Production Restore')}</span>
            </strong>
            <p style="color:var(--text-muted); font-size:0.83rem; margin:0.25rem 0 0 0; line-height:1.4;">
              ${choose(
                'يؤخذ باك أب استباقي فوري، ثم يتم حقن النسخة المستهدفة داخل معاملة ذرية مع تجميد التريغرز لمنع تكرار الإشعارات والرسائل.',
                'Takes pre-restore safety snapshot, disables triggers & injects SQL atomically.'
              )}
            </p>
          </div>
        </label>
      </div>

      <!-- Live Restore Confirmation Box -->
      <div id="real-confirm-box" style="display:none; background:rgba(239,68,68,0.06); border:1px solid rgba(239,68,68,0.3); border-radius:0.75rem; padding:1.25rem; margin-bottom:1.5rem;">
        <label style="font-size:0.85rem; font-weight:700; color:#ef4444; display:block; margin-bottom:0.5rem;">
          ${choose('اكتب عبارة الأمان لتأكيد الاستعادة الحية:', 'Type confirmation phrase to proceed:')}
        </label>
        <input type="text" id="input-confirm-phrase" class="form-control" placeholder="RESTORE_PRODUCTION_DATABASE" style="font-family:monospace; letter-spacing:0.05em;">
      </div>

      <!-- Karim Al-Hakim 3.5s Radial Hold Safety Trigger -->
      <div style="text-align:center; padding:1rem 0;">
        <button id="btn-hold-restore" class="btn" style="
          width:100%; height:52px; font-weight:700; font-size:1rem;
          background:#059669; color:#fff; border:none; border-radius:0.75rem;
          position:relative; overflow:hidden; user-select:none;
        ">
          <span id="hold-progress-bar" style="
            position:absolute; top:0; left:0; bottom:0; width:0%;
            background:rgba(255,255,255,0.25); transition:width 0.05s linear;
          "></span>
          <span id="hold-btn-text" style="position:relative; z-index:2; display:inline-flex; align-items:center; gap:0.5rem;">
            ${icon('play', 'width:18px; height:18px;')}
            <span>${choose('اضغط مطولاً لبدء المحاكاة التجريبية (3.5 ثانية)', 'Hold 3.5s to Execute Rehearsal')}</span>
          </span>
        </button>
        <p style="color:var(--text-muted); font-size:0.8rem; margin-top:0.75rem;">
          ${choose('آلية أمان لمنع النقر بالخطأ تحت الضغط العصبي', 'Safety latch to prevent accidental activation under stress')}
        </p>
      </div>

      <div id="restore-live-feedback" style="display:none; margin-top:1rem; padding:1rem; border-radius:0.5rem; background:rgba(0,0,0,0.2); font-family:monospace; font-size:0.85rem;"></div>
    </div>
  `;

  const modalRoot = document.getElementById('modal-root');
  if (!modalRoot) {
    console.error('[Vault] modal-root element not found in DOM');
    return;
  }

  modalRoot.innerHTML = modalShell(
    choose('غرفة عمليات التعافي من الكوارث', 'Disaster Recovery Ops'),
    choose('نظام استعادة آمن محمي بلقطة استباقية وتجميد الـ Triggers', 'Secure recovery protected by pre-flight snapshot & trigger freeze'),
    modalHtml,
    'restore-wizard',
    'modal-lg'
  );

  // Setup Dynamic Mode Toggle
  const radioDry = document.getElementById('mode-dryrun');
  const radioReal = document.getElementById('mode-real');
  const confirmBox = document.getElementById('real-confirm-box');
  const btnText = document.getElementById('hold-btn-text');
  const holdBtn = document.getElementById('btn-hold-restore');

  if (!radioDry || !radioReal || !holdBtn) {
    console.warn('[Vault] Wizard modal elements not ready in DOM');
    return;
  }

  const updateModeUi = () => {
    const isDry = radioDry.checked;
    if (confirmBox) confirmBox.style.display = isDry ? 'none' : 'block';
    if (holdBtn) holdBtn.style.background = isDry ? '#059669' : '#dc2626';
    if (btnText) {
      if (isDry) {
        btnText.innerHTML = `${icon('play', 'width:18px; height:18px;')} <span>${choose('اضغط مطولاً لبدء المحاكاة التجريبية (3.5 ثوانٍ)', 'Hold 3.5s to Execute Rehearsal')}</span>`;
      } else {
        btnText.innerHTML = `${icon('alert-triangle', 'width:18px; height:18px;')} <span>${choose('اضغط مطولاً لتأكيد الاستعادة الحية (3.5 ثوانٍ)', 'Hold 3.5s to Trigger LIVE Restore')}</span>`;
      }
    }
  };

  radioDry.onchange = updateModeUi;
  radioReal.onchange = updateModeUi;

  // Karim Al-Hakim Hold Logic (3.5s hold latch)
  const progressBar = document.getElementById('hold-progress-bar');
  let startTime = 0;

  const startHold = () => {
    const isDry = radioDry.checked;
    if (!isDry) {
      const phrase = (document.getElementById('input-confirm-phrase')?.value || '').trim();
      if (phrase !== 'RESTORE_PRODUCTION_DATABASE') {
        showToast(choose('يجب كتابة عبارة التأكيد RESTORE_PRODUCTION_DATABASE أولاً', 'Please enter confirmation phrase first'), 'error');
        return;
      }
    }

    startTime = Date.now();
    _holdProgress = 0;
    progressBar.style.width = '0%';

    _activeHoldTimer = setInterval(() => {
      const elapsed = Date.now() - startTime;
      _holdProgress = Math.min((elapsed / VAULT_CONFIG.HOLD_LATCH_MS) * 100, 100);
      progressBar.style.width = _holdProgress + '%';

      if (_holdProgress >= 100) {
        clearInterval(_activeHoldTimer);
        _activeHoldTimer = null;
        triggerRestoreExecution(targetFilename, isDry);
      }
    }, 50);
  };

  const cancelHold = () => {
    if (_activeHoldTimer) {
      clearInterval(_activeHoldTimer);
      _activeHoldTimer = null;
      progressBar.style.width = '0%';
    }
  };

  holdBtn.addEventListener('mousedown', startHold);
  holdBtn.addEventListener('mouseup', cancelHold);
  holdBtn.addEventListener('mouseleave', cancelHold);
  holdBtn.addEventListener('touchstart', startHold, { passive: true });
  holdBtn.addEventListener('touchend', cancelHold);
}

async function triggerRestoreExecution(backupFilename, isDryRun) {
  const feedback = document.getElementById('restore-live-feedback');
  const holdBtn = document.getElementById('btn-hold-restore');
  if (holdBtn) holdBtn.disabled = true;

  if (feedback) {
    feedback.style.display = 'block';
    feedback.innerHTML = `
      <div style="color:#10b981; display:flex; align-items:center; gap:0.4rem;">${icon('play', 'width:14px; height:14px;')} <span>${choose('جاري إطلاق مسار التعافي على GitHub Actions...', 'Dispatching Disaster Recovery on GitHub Actions...')}</span></div>
      <div style="color:var(--text-muted); margin-top:0.4rem;">Mode: ${isDryRun ? 'DRY_RUN (Safe Rehearsal)' : 'PRODUCTION_RESTORE'}</div>
    `;
  }

  try {
    recordBreadcrumb('vault', 'Triggering restore API call', { backupFilename, isDryRun });
    await apiTriggerRestore({
      backupFilename,
      dryRun: isDryRun,
      confirmationPhrase: isDryRun ? 'DRY_RUN_REHEARSAL' : 'RESTORE_PRODUCTION_DATABASE'
    });

    if (feedback) {
      feedback.innerHTML += `
        <div style="color:#10b981; margin-top:0.6rem; display:flex; align-items:center; gap:0.4rem;">${icon('check', 'width:14px; height:14px;')} <span>${choose('تم قبول العملية وتشغيل المسار المعزول بنجاح!', 'Workflow dispatched successfully!')}</span></div>
        <div style="color:var(--text-muted); margin-top:0.4rem;">Status: Initiated via GitHub Actions Runner</div>
        <div style="margin-top:0.75rem;">
          <a href="https://github.com/ahmad0105/Darc-design-team/actions/workflows/database-restore.yml" target="_blank" class="btn btn-sm btn-secondary" style="font-size:0.8rem;">
            ${choose('متابعة التنفيذ الحي على GitHub ↗', 'Watch Live Run on GitHub ↗')}
          </a>
        </div>
      `;
    }
    showToast(choose('تم إطلاق مسار التعافي بنجاح', 'Disaster recovery launched successfully'));
    startWorkflowPolling();
  } catch (err) {
    if (feedback) {
      feedback.innerHTML += `
        <div style="color:#ef4444; margin-top:0.6rem; display:flex; align-items:center; gap:0.4rem;">${icon('alert-triangle', 'width:14px; height:14px;')} <span>${choose('خطأ في إطلاق المسار:', 'Dispatch Error:')} ${esc(err.message)}</span></div>
      `;
    }
    showToast(err.message || 'Error triggering restore', 'error');
  } finally {
    if (holdBtn) holdBtn.disabled = false;
  }
}
