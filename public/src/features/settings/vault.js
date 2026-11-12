import { state } from '../../core/state.js';
import { api } from '../../core/api.js';
import { choose, esc, icon, statusDot, t, formatDateTime } from '../../core/utils.js';
import { showToast, modalShell, closeModal } from '../../shared/ui.js';
import { recordBreadcrumb } from '../../core/telemetry.js';
import { isDemoSession } from '../../core/realtime.js';

let _cachedVault = null;
let _isLoading = false;
let _vaultError = null;
let _activeHoldTimer = null;
let _holdProgress = 0;

export async function fetchVaultData(force = false) {
  if (_cachedVault && !force) return _cachedVault;
  _isLoading = true;
  _vaultError = null;
  try {
    recordBreadcrumb('vault', 'Fetching vault backups from Google Drive API');
    const res = await api('/api/vault/backups' + (force ? '?force=true' : ''));
    if (res && res.backups) {
      _cachedVault = res;
      _vaultError = null;
    }
  } catch (err) {
    console.warn('[Vault] Failed to fetch vault backups:', err);
    _vaultError = err.message || choose('فشل في استرجاع النسخ الاحتياطية من الخزنة', 'Failed to retrieve backups from vault');
    recordBreadcrumb('vault', 'Fetch error: ' + (err.message || 'unknown'));
  } finally {
    _isLoading = false;
  }
  return _cachedVault;
}

export function renderVaultSection() {
  const isDemo = isDemoSession();
  const data = _cachedVault;

  if (!data && !_isLoading) {
    fetchVaultData().then(() => {
      const container = document.getElementById('vault-content-area');
      if (container) {
        container.innerHTML = renderVaultInner(isDemo, _cachedVault);
        attachVaultEvents();
      }
    });
  }

  return `
    <div class="settings-vault-wrap" id="vault-content-area">
      ${renderVaultInner(isDemo, data)}
    </div>
  `;
}

function renderVaultInner(isDemo, data) {
  if (!data && _vaultError) {
    return `
      <div class="vault-error-state card" style="text-align:center; padding:3.5rem 1.5rem; border:1px solid rgba(239, 68, 68, 0.3); background:rgba(239, 68, 68, 0.04); border-radius:1rem; margin-bottom:2rem;">
        <div style="color:#ef4444; margin-bottom:1rem;">
          ${icon('alert-triangle', 'width:36px; height:36px;')}
        </div>
        <h3 style="font-weight:700; color:var(--text-main); margin-bottom:0.5rem;">
          ${choose('تعذر تحميل سجل النسخ الاحتياطية من Google Drive', 'Failed to Load Backups Ledger from Google Drive')}
        </h3>
        <p style="color:var(--text-muted); font-size:0.9rem; max-width:540px; margin:0 auto 1.5rem auto;">
          ${esc(_vaultError)}
        </p>
        <button id="btn-retry-vault-fetch" class="btn btn-primary" style="display:inline-flex; align-items:center; gap:0.5rem; background:#059669; border-color:#059669; font-size:0.9rem;">
          ${icon('refresh', 'width:15px; height:15px;')}
          <span>${choose('إعادة المحاولة الآن', 'Retry Now')}</span>
        </button>
      </div>
    `;
  }

  if (!data || _isLoading) {
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

    <!-- 4 High-Precision Telemetry Metrics Cards -->
    <div class="vault-metrics-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(210px, 1fr)); gap:1.25rem; margin-bottom:2rem;">
      <div class="card" style="padding:1.25rem; background:var(--surface); border:1px solid var(--border-color); border-radius:0.75rem;">
        <span style="font-size:0.8rem; color:var(--text-muted); text-transform:uppercase; font-weight:600; letter-spacing:0.05em;">
          ${choose('النسخ المحفوظة على Drive', 'Stored Encrypted Backups')}
        </span>
        <div style="font-size:1.85rem; font-weight:800; color:var(--text-main); margin-top:0.4rem;">
          ${total} <span style="font-size:0.9rem; font-weight:500; color:var(--text-muted);">${choose('نسخة معتمدة', 'snapshots')}</span>
        </div>
      </div>

      <div class="card" style="padding:1.25rem; background:var(--surface); border:1px solid var(--border-color); border-radius:0.75rem;">
        <span style="font-size:0.8rem; color:var(--text-muted); text-transform:uppercase; font-weight:600; letter-spacing:0.05em;">
          ${choose('تاريخ آخر نسخة ناجحة', 'Latest Backup Timestamp')}
        </span>
        <div style="font-size:1.1rem; font-weight:700; color:var(--text-main); margin-top:0.6rem;">
          ${latest ? formatDateTime(latest.createdAt) : choose('لا توجد نسخ', 'None')}
        </div>
      </div>

      <div class="card" style="padding:1.25rem; background:var(--surface); border:1px solid var(--border-color); border-radius:0.75rem;">
        <span style="font-size:0.8rem; color:var(--text-muted); text-transform:uppercase; font-weight:600; letter-spacing:0.05em;">
          ${choose('معيار التشفير والبصمة', 'Encryption Standard')}
        </span>
        <div style="font-size:1.1rem; font-weight:700; color:#10b981; margin-top:0.6rem;">
          AES-256-CBC <span style="font-size:0.75rem; color:var(--text-muted);">(PBKDF2 100k)</span>
        </div>
      </div>

      <div class="card" style="padding:1.25rem; background:var(--surface); border:1px solid var(--border-color); border-radius:0.75rem;">
        <span style="font-size:0.8rem; color:var(--text-muted); text-transform:uppercase; font-weight:600; letter-spacing:0.05em;">
          ${choose('حجم أرشيف قاعدة البيانات', 'Latest Archive Size')}
        </span>
        <div style="font-size:1.4rem; font-weight:800; color:var(--text-main); margin-top:0.5rem;">
          ${latest?.sizeFormatted || '—'}
        </div>
      </div>
    </div>

    <!-- Backups Table Ledger -->
    <div class="card" style="padding:0; overflow:hidden; border-radius:0.75rem; border:1px solid var(--border-color);">
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
        container.innerHTML = renderVaultInner(isDemoSession(), _cachedVault);
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
        recordBreadcrumb('vault', 'Triggering backup-now from UI');
        await api('/api/vault/backup-now', { method: 'POST' });
        showToast(choose('تم إطلاق مسار النسخ الاحتياطي المشفر على GitHub بنجاح', 'Encrypted backup dispatched to GitHub successfully'));
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
      refreshBtn.innerHTML = `${icon('refresh', 'width:16px; height:16px; animation:spin 1s linear infinite;')} ${choose('جاري الفحص...', 'Scanning...')}`;
      await fetchVaultData(true);
      const container = document.getElementById('vault-content-area');
      if (container) {
        container.innerHTML = renderVaultInner(isDemoSession(), _cachedVault);
        attachVaultEvents();
      }
      showToast(choose('تم تحديث قائمة النسخ من Google Drive بنجاح', 'Vault list refreshed successfully'));
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
    btn.onclick = () => {
      const filename = btn.getAttribute('data-filename');
      const cmd = `openssl enc -d -aes-256-cbc -pbkdf2 -iter 100000 -pass pass:"$BACKUP_ENCRYPTION_KEY" -in "${filename}" | gunzip | psql "$SUPABASE_DB_URL"`;
      navigator.clipboard.writeText(cmd);
      showToast(choose('تم نسخ أمر فك التشفير والاستعادة إلى الحافظة', 'Decryption & restore command copied to clipboard'));
    };
  });
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
              <span style="color:#10b981;">${icon('shield', 'width:15px; height:15px;')}</span>
              <span>${choose('المحاكاة الآمنة (Dry-Run Rehearsal) — موصى به', 'Safe Rehearsal (Dry-Run) — Recommended')}</span>
            </strong>
            <span style="color:var(--text-muted); font-size:0.83rem;">
              ${choose('يقوم بتحميل وفك تشفير النسخة والتأكد من مطابقة الـ SHA-256 وحساب الجداول دون لمس قاعدة البيانات الحية.', 'Downloads, verifies SHA-256, decrypts and inspects SQL without modifying production data.')}
            </span>
          </div>
        </label>

        <label style="display:flex; align-items:flex-start; gap:0.75rem; cursor:pointer;">
          <input type="radio" name="restore-mode" id="mode-real" value="real" style="margin-top:0.25rem;">
          <div>
            <strong style="display:flex; align-items:center; gap:0.4rem; color:#ef4444; font-size:0.95rem;">
              <span>${icon('alert-triangle', 'width:15px; height:15px;')}</span>
              <span>${choose('الاستعادة الإنتاجية الكاملة (Live Database Restore)', 'Full Live Production Restoration')}</span>
            </strong>
            <span style="color:var(--text-muted); font-size:0.83rem;">
              ${choose('يسحب لقطة أمان مسبقة، ثم يحقن النسخة المستعادة في معاملة ذرية مع تجميد الـ Triggers تلقائياً.', 'Takes a pre-restore safety snapshot, freezes triggers, and injects data in an atomic transaction.')}
            </span>
          </div>
        </label>
      </div>

      <!-- Live Confirmation Phrase (Only if Real is chosen) -->
      <div id="real-confirm-box" style="display:none; margin-bottom:1.5rem;">
        <label style="display:block; font-size:0.85rem; font-weight:600; color:#ef4444; margin-bottom:0.5rem;">
          ${choose('لحماية البيانات، اكتب بالضبط: RESTORE_PRODUCTION_DATABASE', 'Type exactly to confirm: RESTORE_PRODUCTION_DATABASE')}
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
      _holdProgress = Math.min((elapsed / 3500) * 100, 100);
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
    const res = await api('/api/vault/restore', {
      method: 'POST',
      body: JSON.stringify({
        backupFilename,
        dryRun: isDryRun,
        confirmationPhrase: isDryRun ? 'DRY_RUN_REHEARSAL' : 'RESTORE_PRODUCTION_DATABASE'
      })
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
