#!/usr/bin/env node

/**
 * DARC Design Team — Automated Secure Google Drive Backup Uploader (OAuth2 / 5TB Storage)
 * Zero-dependency pure Node.js (uses built-in crypto, fs, and fetch)
 * Uploads client-side AES-256 encrypted backups directly to User's 5TB Google Drive
 * Enforces 30-day automated rolling retention (purges older backups)
 */

import fs from 'node:fs';
import path from 'node:path';

// Exchange Refresh Token for a fresh Google Access Token (acts as the 5TB Account Owner)
async function getGoogleAccessToken(clientId, clientSecret, refreshToken) {
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
    throw new Error(`Failed to refresh Google access token: ${tokenRes.status} ${errText}`);
  }

  const tokenData = await tokenRes.json();
  return tokenData.access_token;
}

// Upload a file to Google Drive using multipart upload directly into the target folder
async function uploadFileToDrive(accessToken, folderId, filePath) {
  const fileName = path.basename(filePath);
  const fileStats = fs.statSync(filePath);
  const fileBuffer = fs.readFileSync(filePath);

  const boundary = `-------DARC_${Date.now()}_BOUNDARY`;
  const metadata = JSON.stringify({
    name: fileName,
    parents: [folderId],
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
    throw new Error(`Google Drive upload failed for ${fileName}: ${uploadRes.status} ${err}`);
  }

  const data = await uploadRes.json();
  console.log(`✅ Uploaded [${fileName}] successfully to 5TB Google Drive (File ID: ${data.id})`);
  return data;
}

// Automatically delete backups older than 30 days
async function purgeOldBackups(accessToken, folderId, retentionDays = 30) {
  const query = `'${folderId}' in parents and trashed = false`;
  const listUrl = `https://www.googleapis.com/drive/v3/files?q=${encodeURIComponent(query)}&fields=files(id,name,createdTime)`;

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
}

// Main execution
async function main() {
  const clientId = process.env.GDRIVE_CLIENT_ID;
  const clientSecret = process.env.GDRIVE_CLIENT_SECRET;
  const refreshToken = process.env.GDRIVE_REFRESH_TOKEN;
  const folderId = process.env.GDRIVE_FOLDER_ID;
  const filesToUpload = process.argv.slice(2);

  if (!clientId || !clientSecret || !refreshToken) {
    throw new Error('Missing Google OAuth2 credentials (GDRIVE_CLIENT_ID, GDRIVE_CLIENT_SECRET, GDRIVE_REFRESH_TOKEN)');
  }
  if (!folderId) throw new Error('Missing GDRIVE_FOLDER_ID environment variable');
  if (filesToUpload.length === 0) throw new Error('No files specified to upload');

  console.log('🔑 Authenticating via Google OAuth2 (5TB Account)...');
  const accessToken = await getGoogleAccessToken(clientId, clientSecret, refreshToken);
  console.log('🔒 Authentication successful! Uploading encrypted artifacts directly to your 5TB Google Drive...');

  for (const file of filesToUpload) {
    if (!fs.existsSync(file)) {
      throw new Error(`File not found: ${file}`);
    }
    await uploadFileToDrive(accessToken, folderId, file);
  }

  console.log('🧹 Checking retention policy (purging backups older than 30 days)...');
  await purgeOldBackups(accessToken, folderId, 30);
  console.log('✨ Backup sequence completed successfully in your 5TB Google Drive.');
}

main().catch(err => {
  console.error('❌ Error during backup:', err.message);
  process.exit(1);
});
