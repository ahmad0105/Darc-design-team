/**
 * DARC Cloud Backend — Enterprise Vault & Disaster Recovery Service
 * High-performance, clean architecture, resilient error handling.
 * Integrates directly with Google Drive API v3 and GitHub Actions API.
 */

let _backupsCache = null;
let _backupsCacheTime = 0;
const CACHE_TTL_MS = 180000; // 3 minutes

// Multi-Auth OAuth2 / Service Account resolver for Google Drive
async function getGoogleDriveAccessToken(env) {
  const clean = val => (val || '').trim().replace(/^["']|["']$/g, '');
  const clientId = clean(env.GDRIVE_CLIENT_ID);
  const clientSecret = clean(env.GDRIVE_CLIENT_SECRET);
  const refreshToken = clean(env.GDRIVE_REFRESH_TOKEN);

  if (!clientId || !clientSecret || !refreshToken) {
    throw new Error('Vault credentials missing on server environment');
  }

  const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: clientId,
      client_secret: clientSecret,
      refresh_token: refreshToken,
      grant_type: 'refresh_token'
    })
  });

  if (!tokenRes.ok) {
    const errText = await tokenRes.text();
    throw new Error(`Google OAuth token refresh rejected (${tokenRes.status}): ${errText}`);
  }

  const data = await tokenRes.json();
  return data.access_token;
}

/**
 * Fetch and normalize all encrypted backups stored on Google Drive
 */
export async function fetchVaultBackups(env, force = false) {
  const now = Date.now();
  if (_backupsCache && !force && (now - _backupsCacheTime < CACHE_TTL_MS)) {
    return _backupsCache;
  }

  const rawFolderId = env.GDRIVE_ROOT_FOLDER_ID || env.GDRIVE_FOLDER_ID || '';
  const folderId = rawFolderId.split('?')[0].trim();
  if (!folderId) {
    throw new Error('GDRIVE_ROOT_FOLDER_ID is not configured');
  }

  const accessToken = await getGoogleDriveAccessToken(env);
  const query = `'${folderId}' in parents and trashed = false`;
  const url = `https://www.googleapis.com/drive/v3/files?q=${encodeURIComponent(query)}&orderBy=createdTime desc&pageSize=100&fields=files(id,name,size,createdTime,webContentLink)`;

  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${accessToken}` }
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Google Drive API failed: ${errText}`);
  }

  const data = await res.json();
  const allFiles = data.files || [];

  const encFiles = allFiles.filter(f => f.name.endsWith('.sql.gz.enc'));
  const shaFilesMap = new Map();
  allFiles.filter(f => f.name.endsWith('.sha256')).forEach(f => {
    shaFilesMap.set(f.name, f.id);
  });

  const backups = encFiles.map(file => {
    const expectedShaName = `${file.name}.sha256`;
    return {
      id: file.id,
      filename: file.name,
      sizeBytes: Number(file.size || 0),
      sizeFormatted: (Number(file.size || 0) / 1024).toFixed(2) + ' KB',
      createdAt: file.createdTime,
      hasSha256Checksum: shaFilesMap.has(expectedShaName),
      shaFileId: shaFilesMap.get(expectedShaName) || null,
      cipher: 'AES-256-CBC (PBKDF2 100k rounds)',
      provider: 'Google Drive 5TB Vault'
    };
  });

  _backupsCache = {
    total: backups.length,
    latestBackup: backups[0] || null,
    backups,
    cachedAt: new Date().toISOString()
  };
  _backupsCacheTime = now;

  return _backupsCache;
}

/**
 * Trigger GitHub Actions Disaster Recovery Workflow
 */
export async function triggerDisasterRecovery(env, { backupFilename = 'latest', dryRun = false, confirmationPhrase = '' }) {
  const token = env.GITHUB_PERSONAL_ACCESS_TOKEN;
  if (!token) {
    throw new Error('GITHUB_PERSONAL_ACCESS_TOKEN is missing on server environment');
  }

  const repo = 'ahmad0105/Darc-design-team';
  const dispatchUrl = `https://api.github.com/repos/${repo}/actions/workflows/database-restore.yml/dispatches`;

  const res = await fetch(dispatchUrl, {
    method: 'POST',
    headers: {
      'User-Agent': 'DARC-Cloud-Backend',
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/vnd.github.v3+json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      ref: 'main',
      inputs: {
        backup_filename: backupFilename || 'latest',
        dry_run: String(Boolean(dryRun)),
        confirmation_phrase: confirmationPhrase || ''
      }
    })
  });

  if (res.status !== 204 && res.status !== 200 && res.status !== 201) {
    const errText = await res.text();
    throw new Error(`GitHub Actions dispatch failed (HTTP ${res.status}): ${errText}`);
  }

  return {
    ok: true,
    dryRun: Boolean(dryRun),
    backupFilename,
    dispatchedAt: new Date().toISOString(),
    status: 'initiated'
  };
}

/**
 * Get the live status of recent backup and restore runs from GitHub Actions
 */
export async function getVaultWorkflowRuns(env) {
  const token = env.GITHUB_PERSONAL_ACCESS_TOKEN;
  if (!token) {
    return { ok: false, message: 'GitHub token not configured' };
  }

  const repo = 'ahmad0105/Darc-design-team';
  const url = `https://api.github.com/repos/${repo}/actions/runs?per_page=6`;

  const res = await fetch(url, {
    headers: {
      'User-Agent': 'DARC-Cloud-Backend',
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/vnd.github.v3+json'
    }
  });

  if (!res.ok) {
    return { ok: false, status: res.status };
  }

  const data = await res.json();
  const runs = (data.workflow_runs || []).map(r => ({
    id: r.id,
    name: r.name,
    workflowId: r.workflow_id,
    status: r.status,
    conclusion: r.conclusion,
    event: r.event,
    createdAt: r.created_at,
    updatedAt: r.updated_at,
    htmlUrl: r.html_url
  }));

  return { ok: true, runs };
}
