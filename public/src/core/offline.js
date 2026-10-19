// DARC Design Team — Offline-First & Sync Engine
// Handles persistent local caching, outbox queue for mutations, and auto-sync on reconnect.

const STORAGE_BOOTSTRAP_KEY = 'darc_offline_bootstrap';
const STORAGE_QUEUE_KEY = 'darc_offline_mutations_queue';

let _isSyncing = false;

/**
 * Checks whether the browser is currently connected to the network.
 */
export function isOnline() {
  return typeof navigator !== 'undefined' ? navigator.onLine : true;
}

/**
 * Persists the bootstrap payload into localStorage for instant offline access.
 */
export function saveOfflineBootstrap(data) {
  if (!data || typeof localStorage === 'undefined') return;
  try {
    const record = {
      timestamp: Date.now(),
      data
    };
    localStorage.setItem(STORAGE_BOOTSTRAP_KEY, JSON.stringify(record));
  } catch (err) {
    console.warn('[Offline] Failed to save offline bootstrap cache:', err.message);
  }
}

/**
 * Retrieves the cached bootstrap payload when offline.
 */
export function getOfflineBootstrap() {
  if (typeof localStorage === 'undefined') return null;
  try {
    const raw = localStorage.getItem(STORAGE_BOOTSTRAP_KEY);
    if (!raw) return null;
    const record = JSON.parse(raw);
    return record?.data || null;
  } catch (err) {
    console.warn('[Offline] Failed to parse offline bootstrap cache:', err.message);
    return null;
  }
}

/**
 * Queues a mutation (POST, PATCH, PUT, DELETE) to be executed when connectivity is restored.
 */
export function enqueueOfflineMutation({ path, method = 'POST', body = null, description = '' }) {
  if (typeof localStorage === 'undefined') return;
  try {
    const raw = localStorage.getItem(STORAGE_QUEUE_KEY);
    const queue = raw ? JSON.parse(raw) : [];
    const item = {
      id: 'mut_' + Date.now() + '_' + Math.random().toString(36).substr(2, 6),
      path,
      method,
      body,
      description,
      createdAt: new Date().toISOString()
    };
    queue.push(item);
    localStorage.setItem(STORAGE_QUEUE_KEY, JSON.stringify(queue));
    console.log('[Offline] Enqueued offline mutation:', item);
    return item;
  } catch (err) {
    console.warn('[Offline] Failed to enqueue mutation:', err.message);
  }
}

/**
 * Gets all pending mutations in the outbox queue.
 */
export function getPendingMutations() {
  if (typeof localStorage === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_QUEUE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

/**
 * Clears the pending mutations queue.
 */
export function clearPendingMutations() {
  if (typeof localStorage === 'undefined') return;
  localStorage.removeItem(STORAGE_QUEUE_KEY);
}

/**
 * Synchronizes all pending offline mutations with the server sequentially (FIFO).
 */
export async function syncPendingMutations(apiFunction) {
  if (_isSyncing) return;
  const queue = getPendingMutations();
  if (!queue.length) return;

  _isSyncing = true;
  console.log(`[Offline Sync] Replaying ${queue.length} pending mutations...`);

  let syncedCount = 0;
  const failedItems = [];

  for (const item of queue) {
    try {
      const opts = {
        method: item.method,
        headers: {
          'X-Offline-Replay': 'true',
          'X-Offline-Id': item.id
        }
      };
      if (item.body) {
        opts.body = typeof item.body === 'string' ? item.body : JSON.stringify(item.body);
      }
      await apiFunction(item.path, opts);
      syncedCount++;
    } catch (err) {
      console.error(`[Offline Sync] Failed to replay mutation ${item.id} (${item.path}):`, err.message);
      // Keep in failed items if it was a network failure, drop if server rejected (4xx)
      if (err.message && err.message.includes('تعذر الاتصال')) {
        failedItems.push(item);
      }
    }
  }

  if (failedItems.length > 0) {
    localStorage.setItem(STORAGE_QUEUE_KEY, JSON.stringify(failedItems));
  } else {
    clearPendingMutations();
  }

  _isSyncing = false;
  return {
    total: queue.length,
    synced: syncedCount,
    failed: failedItems.length
  };
}
