import { Hono } from 'hono';
import { fetchVaultBackups, triggerDisasterRecovery, getVaultWorkflowRuns } from './vault.service.js';

const vaultApp = new Hono();

// Middleware: Strictly enforce SuperAdmin permission for all Vault operations
vaultApp.use('*', async (c, next) => {
  const isDemo = c.get('isDemo');
  const userId = c.get('userId');
  const roleId = c.get('roleId');
  const isAhmad = userId === 'usr_ahmad';
  const isAdmin = roleId === 'admin' || isAhmad;

  if (!isDemo && !isAdmin) {
    return c.json({
      error: 'غير مصرح: الوصول لمركز النسخ الاحتياطي والتعافي محصور بمدير النظام فقط',
      code: 'VAULT_E01_UNAUTHORIZED'
    }, 403);
  }

  await next();
});

// GET /api/vault/backups - Fetch list of verified backups from Google Drive
vaultApp.get('/backups', async (c) => {
  const isDemo = c.get('isDemo');
  const force = c.req.query('force') === 'true';

  if (isDemo) {
    return c.json({
      total: 3,
      latestBackup: {
        id: 'demo_file_001',
        filename: 'darc_backup_demo_latest.sql.gz.enc',
        sizeFormatted: '184.50 KB',
        createdAt: new Date().toISOString(),
        hasSha256Checksum: true,
        cipher: 'AES-256-CBC (PBKDF2 100k rounds)',
        provider: 'Google Drive 5TB Vault (Demo)'
      },
      backups: [
        {
          id: 'demo_file_001',
          filename: 'darc_backup_demo_latest.sql.gz.enc',
          sizeFormatted: '184.50 KB',
          createdAt: new Date().toISOString(),
          hasSha256Checksum: true,
          cipher: 'AES-256-CBC (PBKDF2 100k rounds)',
          provider: 'Google Drive 5TB Vault (Demo)'
        },
        {
          id: 'demo_file_002',
          filename: 'darc_backup_demo_yesterday.sql.gz.enc',
          sizeFormatted: '182.10 KB',
          createdAt: new Date(Date.now() - 86400000).toISOString(),
          hasSha256Checksum: true,
          cipher: 'AES-256-CBC (PBKDF2 100k rounds)',
          provider: 'Google Drive 5TB Vault (Demo)'
        }
      ]
    });
  }

  try {
    const data = await fetchVaultBackups(c.env, force);
    return c.json(data);
  } catch (err) {
    console.error('[Vault API Error]:', err);
    return c.json({
      error: err.message || 'فشل في استرجاع قائمة النسخ الاحتياطية',
      code: 'VAULT_E03_DRIVE_UNREACHABLE'
    }, 500);
  }
});

// POST /api/vault/restore - Trigger automated disaster recovery / dry-run
vaultApp.post('/restore', async (c) => {
  const isDemo = c.get('isDemo');
  const body = await c.req.json().catch(() => ({}));
  const { backupFilename, dryRun, confirmationPhrase } = body;

  if (isDemo) {
    return c.json({
      ok: true,
      dryRun: Boolean(dryRun),
      backupFilename: backupFilename || 'latest',
      message: 'تمت المحاكاة التجريبية بنجاح في جلسة العرض (Demo)'
    });
  }

  if (!dryRun && confirmationPhrase !== 'RESTORE_PRODUCTION_DATABASE') {
    return c.json({
      error: 'عبارة التأكيد غير صحيحة. لحماية النظام، يجب كتابة: RESTORE_PRODUCTION_DATABASE',
      code: 'VAULT_E02_CONFIRMATION_INVALID'
    }, 400);
  }

  try {
    const result = await triggerDisasterRecovery(c.env, {
      backupFilename,
      dryRun: Boolean(dryRun),
      confirmationPhrase
    });
    return c.json(result);
  } catch (err) {
    console.error('[Vault Restore Error]:', err);
    return c.json({
      error: err.message || 'فشل في إطلاق مسار التعافي من الكوارث',
      code: 'VAULT_E07_RESTORE_FAILED'
    }, 500);
  }
});

// GET /api/vault/runs - Live status of GitHub Actions backup & restore workflows
vaultApp.get('/runs', async (c) => {
  const isDemo = c.get('isDemo');
  if (isDemo) {
    return c.json({
      ok: true,
      runs: [
        {
          id: 1,
          name: 'Daily Encrypted Database Backup to Google Drive',
          status: 'completed',
          conclusion: 'success',
          createdAt: new Date().toISOString()
        }
      ]
    });
  }

  try {
    const result = await getVaultWorkflowRuns(c.env);
    return c.json(result);
  } catch (err) {
    return c.json({ ok: false, error: err.message }, 500);
  }
});

export default vaultApp;
