#!/usr/bin/env node

/**
 * DARC Design Team — Automated Secure Google Drive Backup Uploader
 * Dual-Engine Authentication: OAuth2 (5TB Google One Account) with Automatic Service Account Fallback
 * Zero-dependency pure Node.js (uses built-in crypto, fs, and fetch)
 * Uploads client-side AES-256 encrypted backups directly to Google Drive
 * Enforces 30-day automated rolling retention (purges older backups)
 */

import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

// 1. Exchange Refresh Token for a fresh Google Access Token (User 5TB Account)
async function getGoogleAccessTokenViaOAuth(clientId, clientSecret, refreshToken) {
  if (!clientId || !clientSecret || !refreshToken) {
    return { ok: false, error: 'OAuth credentials incomplete' };
  }

  try {
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

    const bodyText = await tokenRes.text();
    let tokenData;
    try {
      tokenData = JSON.parse(bodyText);
    } catch {
      tokenData = { error: 'invalid_json', raw: bodyText };
    }

    if (!tokenRes.ok || !tokenData.access_token) {
      return {
        ok: false,
        status: tokenRes.status,
        error: tokenData.error || 'refresh_failed',
        description: tokenData.error_description || bodyText
      };
    }

    return { ok: true, accessToken: tokenData.access_token };
  } catch (err) {
    return { ok: false, error: err.message };
  }
}

// 2. Generate Access Token via Google Service Account (Permanent Non-Expiring Fallback)
async function getGoogleAccessTokenViaServiceAccount(clientEmail, privateKeyRaw) {
  if (!clientEmail || !privateKeyRaw) {
    return { ok: false, error: 'Service account credentials incomplete' };
  }

  try {
    let privateKey = privateKeyRaw.trim();
    if (privateKey.startsWith('"') && privateKey.endsWith('"')) {
      try {
        privateKey = JSON.parse(privateKey);
      } catch {
        privateKey = privateKey.slice(1, -1);
      }
    }
    privateKey = privateKey.replace(/\\n/g, '\n');

    const now = Math.floor(Date.now() / 1000);
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

    const bodyText = await response.text();
    let data;
    try {
      data = JSON.parse(bodyText);
    } catch {
      data = { error: 'invalid_json', raw: bodyText };
    }

    if (!response.ok || !data.access_token) {
      return {
        ok: false,
        status: response.status,
        error: data.error || 'jwt_grant_failed',
        description: data.error_description || bodyText
      };
    }

    return { ok: true, accessToken: data.access_token };
  } catch (err) {
    return { ok: false, error: err.message };
  }
}

// 3. Resilient Multi-Auth Resolver
async function resolveGoogleAccessToken(env) {
  const clean = val => (val || '').trim().replace(/^["']|["']$/g, '');
  const clientId = clean(env.GDRIVE_CLIENT_ID);
  const clientSecret = clean(env.GDRIVE_CLIENT_SECRET);
  const refreshToken = clean(env.GDRIVE_REFRESH_TOKEN);
  const clientEmail = clean(env.GDRIVE_CLIENT_EMAIL);
  const privateKey = (env.GDRIVE_PRIVATE_KEY || '').trim();

  // Step A: Attempt OAuth2 User Refresh Token (5TB Account)
  if (clientId && clientSecret && refreshToken) {
    console.log('🔑 Attempting authentication via Google OAuth2 (5TB Account)...');
    const oauthResult = await getGoogleAccessTokenViaOAuth(clientId, clientSecret, refreshToken);
    if (oauthResult.ok) {
      console.log('✅ Google OAuth2 authentication successful! (5TB Account)');
      return oauthResult.accessToken;
    }

    console.warn(`⚠️ Google OAuth2 token refresh rejected: ${oauthResult.error} — ${oauthResult.description}`);
    if (oauthResult.error === 'invalid_grant') {
      console.warn('💡 Diagnosis: The Google OAuth refresh token has expired or was revoked.');
      console.warn('   Note: In Google Cloud Console, if the OAuth Consent Screen publishing status is "Testing", tokens expire every 7 days.');
    }
  }

  // Step B: Fallback to Service Account
  if (clientEmail && privateKey) {
    console.log('🛡️ Falling back to Google Service Account authentication...');
    const saResult = await getGoogleAccessTokenViaServiceAccount(clientEmail, privateKey);
    if (saResult.ok) {
      console.log(`✅ Authenticated successfully via Google Service Account (${clientEmail})!`);
      return saResult.accessToken;
    }
    console.warn(`⚠️ Service Account authentication failed: ${saResult.error} — ${saResult.description}`);
  }

  throw new Error(
    'Failed to authenticate with Google Drive using both OAuth2 and Service Account.\n' +
    'Please verify that GitHub Secrets (GDRIVE_REFRESH_TOKEN or GDRIVE_CLIENT_EMAIL & GDRIVE_PRIVATE_KEY) are up to date.'
  );
}

// Upload a file to Google Drive using multipart upload with automatic retry
async function uploadFileToDrive(accessToken, folderId, filePath, maxRetries = 3) {
  const fileName = path.basename(filePath);
  const fileStats = fs.statSync(filePath);
  const fileBuffer = fs.readFileSync(filePath);

  const boundary = `-------DARC_${Date.now()}_BOUNDARY`;
  const metadata = JSON.stringify({
    name: fileName,
    parents: folderId ? [folderId] : [],
    description: `DARC Design Team Automated Encrypted Backup (Size: ${(fileStats.size / 1024).toFixed(2)} KB)`
  });

  const delimiter = `\r\n--${boundary}\r\n`;
  const closeDelimiter = `\r\n--${boundary}--`;

  const multipartBody = Buffer.concat([
    Buffer.from(`${delimiter}Content-Type: application/json; charset=UTF-8\r\n\r\n${metadata}`),
    Buffer.from(`${delimiter}Content-Type: application/octet-stream\r\n\r\n`),
    fileBuffer,
    Buffer.from(closeDelimiter)
  ]);

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const uploadRes = await fetch('https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': `multipart/related; boundary=${boundary}`,
          'Content-Length': String(multipartBody.length)
        },
        body: multipartBody
      });

      if (!uploadRes.ok) {
        const err = await uploadRes.text();
        throw new Error(`Google Drive upload failed: ${uploadRes.status} ${err}`);
      }

      const data = await uploadRes.json();
      console.log(`✅ Uploaded [${fileName}] successfully to Google Drive (File ID: ${data.id})`);
      return data;
    } catch (err) {
      console.warn(`⚠️ Attempt ${attempt}/${maxRetries} failed for [${fileName}]: ${err.message}`);
      if (attempt === maxRetries) throw err;
      await new Promise(r => setTimeout(r, attempt * 2000));
    }
  }
}

// Automatically delete backups older than retentionDays
async function purgeOldBackups(accessToken, folderId, retentionDays = 30) {
  if (!folderId) return;

  const query = `'${folderId}' in parents and trashed = false`;
  const listUrl = `https://www.googleapis.com/drive/v3/files?q=${encodeURIComponent(query)}&fields=files(id,name,createdTime)`;

  try {
    const res = await fetch(listUrl, {
      headers: { Authorization: `Bearer ${accessToken}` }
    });

    if (!res.ok) {
      console.warn('⚠️ Could not list Drive files for retention cleanup:', await res.text());
      return;
    }

    const data = await res.json();
    const files = data.files || [];
    const cutoff = new Date(Date.now() - retentionDays * 24 * 60 * 60 * 1000);

    for (const file of files) {
      if (file.createdTime && new Date(file.createdTime) < cutoff) {
        console.log(`🗑️ Purging expired backup: ${file.name} (Created: ${file.createdTime})`);
        await fetch(`https://www.googleapis.com/drive/v3/files/${file.id}`, {
          method: 'DELETE',
          headers: { Authorization: `Bearer ${accessToken}` }
        }).catch(err => console.warn(`Failed to delete ${file.id}:`, err.message));
      }
    }
  } catch (err) {
    console.warn('⚠️ Retention purge error:', err.message);
  }
}

// Main execution
async function main() {
  const rawFolderId = process.env.GDRIVE_FOLDER_ID || '';
  const folderId = rawFolderId.split('?')[0].trim();
  const filesToUpload = process.argv.slice(2);

  if (filesToUpload.length === 0) {
    throw new Error('No files specified to upload');
  }

  for (const file of filesToUpload) {
    if (!fs.existsSync(file)) {
      throw new Error(`File not found: ${file}`);
    }
  }

  const accessToken = await resolveGoogleAccessToken(process.env);
  console.log(`🔒 Uploading ${filesToUpload.length} encrypted artifact(s) to Google Drive...`);

  for (const file of filesToUpload) {
    await uploadFileToDrive(accessToken, folderId, file);
  }

  console.log('🧹 Checking retention policy (purging backups older than 30 days)...');
  await purgeOldBackups(accessToken, folderId, 30);
  console.log('✨ Google Drive backup sequence completed successfully.');
}

main().catch(err => {
  console.error('❌ Error during backup:', err.message);
  process.exit(1);
});
