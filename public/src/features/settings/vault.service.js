/**
 * DARC Design Team — Vault & Disaster Recovery Client Service
 * Enforces Clean Architecture & Single Responsibility Principle (SRP).
 * Handles all network requests, correlation tracing, and telemetry for the Cloud Vault.
 */

import { api } from '../../core/api.js';
import { recordBreadcrumb } from '../../core/telemetry.js';
import { choose } from '../../core/utils.js';

export const VAULT_CONFIG = Object.freeze({
  HOLD_LATCH_MS: 3500,
  CACHE_TTL_MS: 180000, // 3 minutes
  POLL_INTERVAL_MS: 4000,
  MAX_RUNS_DISPLAY: 5
});

let _cachedVault = null;
let _cachedVaultTime = 0;
let _isLoading = false;
let _vaultError = null;

/**
 * Generate a cryptographically random, deterministic correlation trace ID
 */
export function generateVaultTraceId() {
  const ts = Date.now().toString(36);
  const rnd = Math.random().toString(36).substring(2, 9);
  return `darc_vault_${ts}_${rnd}`;
}

/**
 * Fetch verified backups from Google Drive 5TB
 */
export async function fetchVaultBackups(force = false) {
  const now = Date.now();
  if (_cachedVault && !force && (now - _cachedVaultTime < VAULT_CONFIG.CACHE_TTL_MS)) {
    return { data: _cachedVault, error: null };
  }

  _isLoading = true;
  _vaultError = null;
  const traceId = generateVaultTraceId();

  try {
    recordBreadcrumb('vault', 'Fetching vault backups ledger from API', { traceId, force });
    const res = await api('/api/vault/backups' + (force ? '?force=true' : ''), {
      headers: {
        'x-darc-trace-id': traceId
      }
    });

    if (res && res.backups) {
      _cachedVault = res;
      _cachedVaultTime = now;
      _vaultError = null;
    }
    return { data: _cachedVault, error: null };
  } catch (err) {
    console.warn('[VaultService] Failed to fetch vault backups:', err);
    _vaultError = err.message || choose('فشل في جلب النسخ الاحتياطية من الخزنة', 'Failed to retrieve backups from vault');
    recordBreadcrumb('vault', 'Fetch error: ' + (err.message || 'unknown'), { traceId });
    return { data: _cachedVault, error: _vaultError };
  } finally {
    _isLoading = false;
  }
}

/**
 * Fetch live GitHub Actions workflow runs (Backups & Restores)
 */
export async function fetchVaultWorkflowRuns() {
  const traceId = generateVaultTraceId();
  try {
    const res = await api('/api/vault/runs', {
      headers: { 'x-darc-trace-id': traceId },
      silent: true
    });
    return res?.runs || [];
  } catch (err) {
    console.warn('[VaultService] Failed to fetch workflow runs:', err);
    return [];
  }
}

/**
 * Trigger immediate database backup
 */
export async function triggerDisasterBackup() {
  const traceId = generateVaultTraceId();
  recordBreadcrumb('vault', 'Triggering instant encrypted backup dispatch', { traceId });
  return await api('/api/vault/backup-now', {
    method: 'POST',
    headers: { 'x-darc-trace-id': traceId }
  });
}

/**
 * Trigger automated disaster recovery or dry-run rehearsal
 */
export async function triggerDisasterRecovery({ backupFilename = 'latest', dryRun = true, confirmationPhrase = '' }) {
  const traceId = generateVaultTraceId();
  recordBreadcrumb('vault', 'Dispatching disaster recovery workflow', {
    traceId,
    backupFilename,
    dryRun,
    isReal: !dryRun
  });

  return await api('/api/vault/restore', {
    method: 'POST',
    headers: { 'x-darc-trace-id': traceId },
    body: JSON.stringify({
      backupFilename,
      dryRun: Boolean(dryRun),
      confirmationPhrase
    })
  });
}

/**
 * Get current in-memory cache and status
 */
export function getVaultState() {
  return {
    cachedVault: _cachedVault,
    isLoading: _isLoading,
    vaultError: _vaultError
  };
}

/**
 * Copy text to clipboard with modern API and legacy fallback
 */
export async function copyToClipboardSafe(text) {
  if (typeof navigator !== 'undefined' && navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (e) {
      // Fallback to execCommand
    }
  }

  if (typeof document !== 'undefined') {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand('copy');
      textArea.remove();
      return true;
    } catch (err) {
      textArea.remove();
      return false;
    }
  }
  return false;
}
