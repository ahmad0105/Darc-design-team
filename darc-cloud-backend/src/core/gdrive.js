import crypto from 'node:crypto';
import { Buffer } from 'node:buffer';

let _cachedOAuthToken = null;
let _cachedOAuthExpiry = 0;

let _devVars = null;
async function resolveEnv(env, key) {
  if (env[key]) return env[key];
  if (!_devVars) {
    try {
      const { default: fs } = await import('node:fs');
      if (fs.existsSync('.dev.vars')) {
        const txt = fs.readFileSync('.dev.vars', 'utf8');
        _devVars = {};
        txt.split('\n').forEach(l => {
          const idx = l.indexOf('=');
          if (idx > 0) {
            const k = l.substring(0, idx).trim();
            let v = l.substring(idx + 1).trim();
            if (v.startsWith('"') && v.endsWith('"')) v = v.slice(1, -1);
            _devVars[k] = v;
          }
        });
      }
    } catch (e) {
      _devVars = {};
    }
  }
  return _devVars?.[key] || env[key];
}

/**
 * Gets an OAuth2 Access Token for Google Drive using either OAuth2 User Refresh Token (5TB Quota) or Service Account.
 */
export async function getAccessToken(env) {
  const now = Math.floor(Date.now() / 1000);

  const refreshToken = await resolveEnv(env, 'GDRIVE_REFRESH_TOKEN');
  const clientId = await resolveEnv(env, 'GDRIVE_CLIENT_ID');
  const clientSecret = await resolveEnv(env, 'GDRIVE_CLIENT_SECRET');

  // 1. Prefer OAuth2 Refresh Token (Uses Ahmad Alhashmi's 5TB Google One Quota)
  if (refreshToken && clientId && clientSecret) {
    if (_cachedOAuthToken && now < _cachedOAuthExpiry - 60) {
      return _cachedOAuthToken;
    }
    try {
      const res = await fetch('https://oauth2.googleapis.com/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          client_id: clientId,
          client_secret: clientSecret,
          refresh_token: refreshToken,
          grant_type: 'refresh_token'
        })
      });
      const data = await res.json();
      if (res.ok && data.access_token) {
        _cachedOAuthToken = data.access_token;
        _cachedOAuthExpiry = now + (data.expires_in || 3600);
        return _cachedOAuthToken;
      }
      console.warn('[GDrive] OAuth token refresh failed, falling back to Service Account:', data);
    } catch (e) {
      console.warn('[GDrive] OAuth refresh error:', e.message);
    }
  }

  // 2. Fallback to Service Account
  const clientEmail = await resolveEnv(env, 'GDRIVE_CLIENT_EMAIL');
  let privateKey = await resolveEnv(env, 'GDRIVE_PRIVATE_KEY');
  if (!privateKey) throw new Error("GDRIVE credentials (OAuth or Service Account) are missing");
  
  privateKey = privateKey.replace(/\\n/g, '\n');

  const payload = {
    iss: clientEmail,
    sub: clientEmail,
    aud: 'https://oauth2.googleapis.com/token',
    iat: now,
    exp: now + 3600,
    scope: 'https://www.googleapis.com/auth/drive.file https://www.googleapis.com/auth/drive.metadata https://www.googleapis.com/auth/drive'
  };

  const header = { alg: 'RS256', typ: 'JWT' };
  const encodedHeader = Buffer.from(JSON.stringify(header)).toString('base64url');
  const encodedPayload = Buffer.from(JSON.stringify(payload)).toString('base64url');
  const unsignedToken = `${encodedHeader}.${encodedPayload}`;

  const sign = crypto.createSign('RSA-SHA256');
  sign.update(unsignedToken);
  const signature = sign.sign(privateKey, 'base64url');

  const jwt = `${unsignedToken}.${signature}`;

  const response = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `grant_type=urn%3Aietf%3Aparams%3Aoauth%3Agrant-type%3Ajwt-bearer&assertion=${jwt}`
  });
  
  const data = await response.json();
  if (!response.ok) throw new Error(data.error_description || 'Failed to get GDrive access token');
  
  return data.access_token;
}

/**
 * Uploads a file Buffer/ArrayBuffer to Google Drive.
 */
export async function uploadToGoogleDrive(env, fileBuffer, fileName, mimeType, parentFolderId = null) {
  const token = await getAccessToken(env);
  
  // Clean up the folder ID just in case it has URL params
  const rawRootId = await resolveEnv(env, 'GDRIVE_ROOT_FOLDER_ID');
  let rootFolderId = (rawRootId || '').split('?')[0];
  const targetFolder = parentFolderId || rootFolderId;

  const metadata = {
    name: fileName,
    parents: targetFolder ? [targetFolder] : []
  };

  const form = new FormData();
  form.append('metadata', new Blob([JSON.stringify(metadata)], { type: 'application/json' }));
  form.append('file', new Blob([fileBuffer], { type: mimeType }), fileName);

  const res = await fetch('https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`
    },
    body: form
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.error?.message || 'Upload failed');
  
  // Make it readable to anyone with the link
  await fetch(`https://www.googleapis.com/drive/v3/files/${data.id}/permissions`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      role: 'reader',
      type: 'anyone'
    })
  });

  // Get WebViewLink
  const fileRes = await fetch(`https://www.googleapis.com/drive/v3/files/${data.id}?fields=webViewLink,webContentLink`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  const fileInfo = await fileRes.json();

  return {
    id: data.id,
    webViewLink: fileInfo.webViewLink,
    webContentLink: fileInfo.webContentLink
  };
}

export async function deleteFromGoogleDrive(env, fileId) {
  const token = await getAccessToken(env);
  const res = await fetch(`https://www.googleapis.com/drive/v3/files/${fileId}`, {
    method: 'DELETE',
    headers: { 'Authorization': `Bearer ${token}` }
  });
  if (!res.ok && res.status !== 404) {
    const err = await res.text();
    console.warn("[GDrive] Failed to delete file:", err);
  }
}

// In-memory cache for folder IDs: key = `${parentId}:${folderName}`, value = folderId
const _folderCache = new Map();

/**
 * Finds or creates a folder on Google Drive under parentId.
 * If the folder already exists, returns its ID.
 * If not, creates it immediately and returns the new ID.
 */
export async function getOrCreateFolder(env, folderName, parentId) {
  if (!folderName || !parentId) return parentId;
  const cleanParentId = parentId.split('?')[0];
  const cacheKey = `${cleanParentId}:${folderName}`;
  if (_folderCache.has(cacheKey)) {
    return _folderCache.get(cacheKey);
  }

  const token = await getAccessToken(env);
  const safeName = folderName.replace(/\\/g, '\\\\').replace(/'/g, "\\'");
  const q = `name = '${safeName}' and '${cleanParentId}' in parents and mimeType = 'application/vnd.google-apps.folder' and trashed = false`;

  try {
    const searchRes = await fetch(
      `https://www.googleapis.com/drive/v3/files?q=${encodeURIComponent(q)}&fields=files(id,name)`,
      { headers: { 'Authorization': `Bearer ${token}` } }
    );
    const searchData = await searchRes.json().catch(() => ({}));
    if (searchData.files && searchData.files.length > 0) {
      const foundId = searchData.files[0].id;
      _folderCache.set(cacheKey, foundId);
      return foundId;
    }
  } catch (e) {
    console.warn('[GDrive] Search folder error:', e.message);
  }

  // Folder doesn't exist, create it immediately
  try {
    const createRes = await fetch('https://www.googleapis.com/drive/v3/files', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: folderName,
        mimeType: 'application/vnd.google-apps.folder',
        parents: [cleanParentId]
      })
    });
    const createData = await createRes.json();
    if (createRes.ok && createData.id) {
      _folderCache.set(cacheKey, createData.id);
      return createData.id;
    }
    console.warn('[GDrive] Failed to create folder:', createData);
  } catch (e) {
    console.warn('[GDrive] Create folder error:', e.message);
  }

  return cleanParentId; // fallback
}

/**
 * Resolves or creates the Google Drive hierarchy for a project and task.
 * Hierarchy: Root Folder -> Project Folder -> Task Folder
 * Returns the target folder ID where files should be stored.
 */
export async function resolveTargetFolder(env, supabase, { projectId, taskId } = {}) {
  const rawRootId = await resolveEnv(env, 'GDRIVE_ROOT_FOLDER_ID');
  let currentParentId = (rawRootId || '').split('?')[0];
  if (!currentParentId) return null;

  // 1. Resolve Project Folder
  if (projectId && supabase) {
    try {
      const { data: project } = await supabase
        .from('projects')
        .select('name_ar, name_en, code')
        .eq('id', projectId)
        .single();

      if (project) {
        const projName = project.name_ar || project.name_en || projectId;
        const folderName = project.code ? `${project.code} - ${projName}` : projName;
        currentParentId = await getOrCreateFolder(env, folderName, currentParentId);
      }
    } catch (e) {
      console.warn('[GDrive] Project folder resolution warning:', e.message);
    }
  }

  // 2. Resolve Task Folder (inside Project Folder)
  if (taskId && supabase) {
    try {
      const { data: task } = await supabase
        .from('tasks')
        .select('title_ar, title_en')
        .eq('id', taskId)
        .single();

      if (task) {
        const taskName = task.title_ar || task.title_en || taskId;
        currentParentId = await getOrCreateFolder(env, taskName, currentParentId);
      }
    } catch (e) {
      console.warn('[GDrive] Task folder resolution warning:', e.message);
    }
  }

  return currentParentId;
}

/**
 * Creates a resumable upload session on Google Drive.
 * Returns the resumable upload URL with CORS enabled for the given origin.
 */
export async function createResumableSession(env, fileName, mimeType, origin = null, fileSize = null, parentFolderId = null) {
  const token = await getAccessToken(env);
  const rawFolderId = await resolveEnv(env, 'GDRIVE_ROOT_FOLDER_ID');
  let rootFolderId = (rawFolderId || '').split('?')[0];
  const targetFolder = parentFolderId || rootFolderId;

  const metadata = {
    name: fileName,
    parents: targetFolder ? [targetFolder] : []
  };

  const headers = {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json',
    'X-Upload-Content-Type': mimeType
  };
  if (fileSize) {
    headers['X-Upload-Content-Length'] = fileSize.toString();
  }
  if (origin) {
    headers['Origin'] = origin;
  }

  const res = await fetch('https://www.googleapis.com/upload/drive/v3/files?uploadType=resumable', {
    method: 'POST',
    headers,
    body: JSON.stringify(metadata)
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.error?.message || 'Failed to create resumable session');
  }

  // The Resumable URL is in the Location header
  return res.headers.get('Location');
}

/**
 * Applies public readable permissions to a GDrive file and fetches the view links.
 */
export async function finalizeGoogleDrivePermissions(env, fileId) {
  const token = await getAccessToken(env);
  
  await fetch(`https://www.googleapis.com/drive/v3/files/${fileId}/permissions`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ role: 'reader', type: 'anyone' })
  });

  const fileRes = await fetch(`https://www.googleapis.com/drive/v3/files/${fileId}?fields=webViewLink,webContentLink`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  const fileInfo = await fileRes.json();

  return {
    id: fileId,
    webViewLink: fileInfo.webViewLink,
    webContentLink: fileInfo.webContentLink
  };
}
