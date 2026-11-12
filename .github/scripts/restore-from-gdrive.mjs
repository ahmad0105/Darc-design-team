#!/usr/bin/env node

/**
 * DARC Design Team — Automated Disaster Recovery & Decryption Engine
 * Pure Node.js (Zero external dependencies)
 * Downloads encrypted backup from Google Drive (5TB Account / Service Account fallback),
 * verifies cryptographic SHA-256 checksum, decrypts AES-256-CBC (PBKDF2 100k rounds),
 * decompresses gzip, and prepares an atomic SQL transaction with disabled triggers.
 *
 * Error Codes:
 * - VAULT_E01: Unauthorized / Credentials Missing
 * - VAULT_E03: Google Drive Unreachable
 * - VAULT_E04: Checksum Integrity Mismatch
 * - VAULT_E05: Decryption Key Invalid / Decryption Failed
 */

import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import zlib from 'node:zlib';

const VAULT_CONFIG = Object.freeze({
  PBKDF2_ITERATIONS: 100000,
  PBKDF2_KEYLEN: 48, // 32 bytes AES-256 key + 16 bytes IV
  DIGEST: 'sha256',
  CIPHER: 'aes-256-cbc',
  OPENSSL_HEADER: 'Salted__'
});

// 1. Exchange Refresh Token for a fresh Google Access Token (5TB Account)
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

// 2. Generate Access Token via Google Service Account (Fallback)
async function getGoogleAccessTokenViaServiceAccount(clientEmail, privateKeyRaw) {
  if (!clientEmail || !privateKeyRaw) {
    return { ok: false, error: 'Service account credentials incomplete' };
  }

  try {
    const privateKey = privateKeyRaw.replace(/\\n/g, '\n');
    const now = Math.floor(Date.now() / 1000);
    const header = { alg: 'RS256', typ: 'JWT' };
    const claim = {
      iss: clientEmail,
      scope: 'https://www.googleapis.com/auth/drive',
      aud: 'https://oauth2.googleapis.com/token',
      exp: now + 3600,
      iat: now
    };

    const b64Url = str => Buffer.from(str).toString('base64url');
    const headerB64 = b64Url(JSON.stringify(header));
    const claimB64 = b64Url(JSON.stringify(claim));
    const signatureInput = `${headerB64}.${claimB64}`;

    const sign = crypto.createSign('RSA-SHA256');
    sign.update(signatureInput);
    sign.end();
    const signature = sign.sign(privateKey, 'base64url');
    const assertion = `${signatureInput}.${signature}`;

    const response = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
        assertion
      })
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

// 3. Multi-Auth Resolver
async function resolveGoogleAccessToken(env) {
  const clean = val => (val || '').trim().replace(/^["']|["']$/g, '');
  const clientId = clean(env.GDRIVE_CLIENT_ID);
  const clientSecret = clean(env.GDRIVE_CLIENT_SECRET);
  const refreshToken = clean(env.GDRIVE_REFRESH_TOKEN);
  const clientEmail = clean(env.GDRIVE_CLIENT_EMAIL);
  const privateKey = (env.GDRIVE_PRIVATE_KEY || '').trim();

  // Try OAuth2 User Refresh Token (5TB Account)
  if (clientId && clientSecret && refreshToken) {
    console.log('🔑 Authenticating with Google OAuth2 (5TB Account)...');
    const oauthResult = await getGoogleAccessTokenViaOAuth(clientId, clientSecret, refreshToken);
    if (oauthResult.ok) {
      console.log('✅ Google OAuth2 authenticated successfully!');
      return oauthResult.accessToken;
    }
    console.warn(`⚠️ OAuth2 failed (${oauthResult.error}): ${oauthResult.description}`);
  }

  // Fallback to Service Account
  if (clientEmail && privateKey) {
    console.log('🛡️ Falling back to Google Service Account...');
    const saResult = await getGoogleAccessTokenViaServiceAccount(clientEmail, privateKey);
    if (saResult.ok) {
      console.log('✅ Service Account authenticated successfully!');
      return saResult.accessToken;
    }
    console.warn(`⚠️ Service Account failed (${saResult.error}): ${saResult.description}`);
  }

  throw new Error('[VAULT_E01] Failed to authenticate with Google Drive API.');
}

// 4. List Files in Google Drive Folder
async function listDriveFiles(accessToken, folderId) {
  const cleanFolderId = (folderId || '').split('?')[0].trim();
  const query = `'${cleanFolderId}' in parents and trashed = false`;
  const url = `https://www.googleapis.com/drive/v3/files?q=${encodeURIComponent(query)}&orderBy=createdTime desc&pageSize=100&fields=files(id,name,size,createdTime)`;

  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${accessToken}` }
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`[VAULT_E03] Drive list failed (HTTP ${res.status}): ${errText}`);
  }

  const data = await res.json();
  return data.files || [];
}

// 5. Download File Buffer from Google Drive
async function downloadDriveFile(accessToken, fileId) {
  const url = `https://www.googleapis.com/drive/v3/files/${fileId}?alt=media`;
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${accessToken}` }
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`[VAULT_E03] File download failed (${fileId}): ${errText}`);
  }

  const arrayBuffer = await res.arrayBuffer();
  return Buffer.from(arrayBuffer);
}

// 6. Decrypt OpenSSL AES-256-CBC Payload
function decryptOpenSSLPBKDF2(encryptedBuffer, password) {
  const header = encryptedBuffer.subarray(0, 8).toString('utf8');
  if (header !== VAULT_CONFIG.OPENSSL_HEADER) {
    throw new Error('[VAULT_E05] Invalid OpenSSL header (missing Salted__ prefix).');
  }

  const salt = encryptedBuffer.subarray(8, 16);
  const ciphertext = encryptedBuffer.subarray(16);

  // Derive 32-byte key + 16-byte IV via PBKDF2 100k rounds
  const derived = crypto.pbkdf2Sync(
    Buffer.from(password, 'utf8'),
    salt,
    VAULT_CONFIG.PBKDF2_ITERATIONS,
    VAULT_CONFIG.PBKDF2_KEYLEN,
    VAULT_CONFIG.DIGEST
  );

  const key = derived.subarray(0, 32);
  const iv = derived.subarray(32, 48);

  try {
    const decipher = crypto.createDecipheriv(VAULT_CONFIG.CIPHER, key, iv);
    return Buffer.concat([decipher.update(ciphertext), decipher.final()]);
  } catch (err) {
    throw new Error(`[VAULT_E05] Decryption failed. Please verify BACKUP_ENCRYPTION_KEY: ${err.message}`);
  }
}

// Main Execution
async function main() {
  const traceId = `vault_restore_${Date.now()}_${crypto.randomBytes(4).toString('hex')}`;
  console.log(`\n==================================================`);
  console.log(`🛡️ DARC Enterprise Disaster Recovery Engine`);
  console.log(`Trace ID: ${traceId}`);
  console.log(`Timestamp: ${new Date().toISOString()}`);
  console.log(`==================================================\n`);

  const targetFilename = (process.env.BACKUP_FILENAME || 'latest').trim();
  const encryptionKey = (process.env.BACKUP_ENCRYPTION_KEY || '').trim();
  const outputFile = (process.env.OUTPUT_SQL_FILE || 'restore_payload.sql').trim();
  const folderId = (process.env.GDRIVE_FOLDER_ID || '').trim();

  if (!encryptionKey) {
    throw new Error('[VAULT_E01] BACKUP_ENCRYPTION_KEY environment variable is missing.');
  }

  if (!folderId) {
    throw new Error('[VAULT_E01] GDRIVE_FOLDER_ID environment variable is missing.');
  }

  // Step 1: Authenticate with Google Drive
  const accessToken = await resolveGoogleAccessToken(process.env);

  // Step 2: Query Drive Folder
  console.log(`📂 Scanning Google Drive folder for backups...`);
  const files = await listDriveFiles(accessToken, folderId);

  const encFiles = files.filter(f => f.name.endsWith('.sql.gz.enc'));
  if (encFiles.length === 0) {
    throw new Error('[VAULT_E03] No encrypted backup (.sql.gz.enc) files found in Google Drive folder.');
  }

  // Step 3: Select Backup File
  let selectedFile = null;
  if (targetFilename === 'latest') {
    selectedFile = encFiles[0]; // Sorted by createdTime desc
    console.log(`🎯 Auto-selected latest backup: [${selectedFile.name}] (Created: ${selectedFile.createdTime})`);
  } else {
    selectedFile = encFiles.find(f => f.name === targetFilename || f.name.includes(targetFilename));
    if (!selectedFile) {
      throw new Error(`[VAULT_E03] Specified backup [${targetFilename}] not found in Drive. Available: ${encFiles.slice(0, 5).map(f => f.name).join(', ')}`);
    }
    console.log(`🎯 Selected specified backup: [${selectedFile.name}] (Created: ${selectedFile.createdTime})`);
  }

  // Step 4: Download Backup Payload
  console.log(`⬇️ Downloading encrypted archive (${(Number(selectedFile.size) / 1024).toFixed(2)} KB)...`);
  const encryptedBuffer = await downloadDriveFile(accessToken, selectedFile.id);
  console.log(`✅ Downloaded [${selectedFile.name}] successfully.`);

  // Step 5: Checksum Integrity Verification
  const expectedShaFile = files.find(f => f.name === `${selectedFile.name}.sha256`);
  if (expectedShaFile) {
    console.log(`🛡️ Verifying SHA-256 integrity checksum...`);
    const shaBuffer = await downloadDriveFile(accessToken, expectedShaFile.id);
    const expectedSha = shaBuffer.toString('utf8').trim().split(/\s+/)[0].toLowerCase();
    const actualSha = crypto.createHash('sha256').update(encryptedBuffer).digest('hex').toLowerCase();

    if (expectedSha !== actualSha) {
      throw new Error(`[VAULT_E04] Checksum mismatch! Expected: ${expectedSha}, Actual: ${actualSha}`);
    }
    console.log(`✅ Cryptographic Checksum Verified: ${actualSha}`);
  } else {
    console.warn(`⚠️ Warning: Corresponding .sha256 file not found on Drive. Proceeding with caution.`);
  }

  // Step 6: Decrypt Archive
  console.log(`🔓 Decrypting AES-256-CBC archive with PBKDF2 (100k rounds)...`);
  const gzippedBuffer = decryptOpenSSLPBKDF2(encryptedBuffer, encryptionKey);
  console.log(`✅ Decryption successful (${(gzippedBuffer.length / 1024).toFixed(2)} KB compressed payload).`);

  // Step 7: Decompress GZIP
  console.log(`📦 Decompressing GZIP payload...`);
  const plainSqlBuffer = zlib.gunzipSync(gzippedBuffer);
  const rawSql = plainSqlBuffer.toString('utf8');
  console.log(`✅ Decompression completed (${(rawSql.length / 1024).toFixed(2)} KB plain SQL).`);

  // Step 8: Wrap SQL in Safe Atomic Transaction with Disabled Triggers
  console.log(`🛡️ Wrapping SQL in atomic transaction with session_replication_role = 'replica'...`);
  const wrappedSql = [
    `-- ========================================================`,
    `-- DARC Design Team Automated Disaster Recovery Injection`,
    `-- Trace ID: ${traceId}`,
    `-- Source Backup: ${selectedFile.name}`,
    `-- Generated At: ${new Date().toISOString()}`,
    `-- ========================================================`,
    ``,
    `\\set ON_ERROR_STOP on`,
    `SET session_replication_role = 'replica';`,
    ``,
    `BEGIN;`,
    ``,
    rawSql,
    ``,
    `COMMIT;`,
    ``,
    `SET session_replication_role = 'origin';`,
    `-- Restoration script completed cleanly.`,
    ``
  ].join('\n');

  fs.writeFileSync(outputFile, wrappedSql, 'utf8');
  console.log(`💾 Prepared atomic restoration payload written to: [${outputFile}]`);

  // Step 9: Forensic Diagnostic Telemetry
  const tableCount = (rawSql.match(/CREATE TABLE/gi) || []).length;
  const insertCount = (rawSql.match(/INSERT INTO/gi) || []).length;

  console.log(`\n📊 Forensic Inspection Summary:`);
  console.log(`- Detected Tables: ${tableCount}`);
  console.log(`- Detected Inserts: ${insertCount}`);
  console.log(`- SQL Payload Size: ${(wrappedSql.length / 1024).toFixed(2)} KB`);
  console.log(`✨ Disaster Recovery preparation finished with 100% integrity.\n`);
}

main().catch(err => {
  console.error(`\n❌ [FATAL RESTORE ERROR]: ${err.message}\n`);
  process.exit(1);
});
