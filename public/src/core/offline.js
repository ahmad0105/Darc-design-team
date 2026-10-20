// DARC Design Team — Enterprise Offline-First & Sync Engine (v3.0)
// Dual-layer storage (IndexedDB + LocalStorage fallback) + Optimistic Local Simulation + Deduplicated Outbox Replay

const DB_NAME = 'darc_offline_db';
const DB_VERSION = 1;
const STORE_NAME = 'cache_store';
const STORAGE_BOOTSTRAP_KEY = 'darc_offline_bootstrap';
const STORAGE_QUEUE_KEY = 'darc_offline_mutations_queue';

let _isSyncing = false;
let _idbPromise = null;

/**
 * Initializes IndexedDB for large, non-blocking offline storage (bypasses 5MB localStorage limit).
 */
function getIDB() {
  if (typeof indexedDB === 'undefined') return Promise.resolve(null);
  if (!_idbPromise) {
    _idbPromise = new Promise((resolve) => {
      try {
        const req = indexedDB.open(DB_NAME, DB_VERSION);
        req.onupgradeneeded = (e) => {
          const db = e.target.result;
          if (!db.objectStoreNames.contains(STORE_NAME)) {
            db.createObjectStore(STORE_NAME);
          }
        };
        req.onsuccess = () => resolve(req.result);
        req.onerror = () => resolve(null);
      } catch {
        resolve(null);
      }
    });
  }
  return _idbPromise;
}

async function idbGet(key) {
  const db = await getIDB();
  if (!db) return null;
  return new Promise((resolve) => {
    try {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);
      const req = store.get(key);
      req.onsuccess = () => resolve(req.result || null);
      req.onerror = () => resolve(null);
    } catch {
      resolve(null);
    }
  });
}

async function idbSet(key, val) {
  const db = await getIDB();
  if (!db) return false;
  return new Promise((resolve) => {
    try {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      const req = store.put(val, key);
      req.onsuccess = () => resolve(true);
      req.onerror = () => resolve(false);
    } catch {
      resolve(false);
    }
  });
}

async function idbDelete(key) {
  const db = await getIDB();
  if (!db) return false;
  return new Promise((resolve) => {
    try {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      const req = store.delete(key);
      req.onsuccess = () => resolve(true);
      req.onerror = () => resolve(false);
    } catch {
      resolve(false);
    }
  });
}

/**
 * Checks whether the browser has active network connectivity.
 */
export function isOnline() {
  return typeof navigator !== 'undefined' ? navigator.onLine : true;
}

/**
 * Persists bootstrap payload into IndexedDB (primary) and localStorage (fast synchronous fallback).
 */
export async function saveOfflineBootstrap(data) {
  if (!data) return;
  const record = {
    timestamp: Date.now(),
    data
  };

  // 1. Asynchronously persist to IndexedDB (handles hundreds of MBs smoothly)
  idbSet(STORAGE_BOOTSTRAP_KEY, record).catch(() => {});

  // 2. Persist to localStorage if quota permits (0ms synchronous read on first render)
  if (typeof localStorage !== 'undefined') {
    try {
      localStorage.setItem(STORAGE_BOOTSTRAP_KEY, JSON.stringify(record));
    } catch (err) {
      // If payload exceeds 5MB, localStorage fails gracefully while IndexedDB retains the data
      console.warn('[Offline] localStorage quota exceeded, relying on IndexedDB:', err.message);
    }
  }
}

/**
 * Retrieves the cached bootstrap payload when offline.
 */
export function getOfflineBootstrap() {
  // Synchronous check from localStorage for instant 0ms app boot
  if (typeof localStorage !== 'undefined') {
    try {
      const raw = localStorage.getItem(STORAGE_BOOTSTRAP_KEY);
      if (raw) {
        const record = JSON.parse(raw);
        if (record?.data) return record.data;
      }
    } catch {}
  }
  return null;
}

/**
 * Asynchronously retrieves full offline cache from IndexedDB.
 */
export async function getOfflineBootstrapAsync() {
  const idbRecord = await idbGet(STORAGE_BOOTSTRAP_KEY);
  if (idbRecord?.data) return idbRecord.data;
  return getOfflineBootstrap();
}

/**
 * Completely purges offline cached bootstrap and queued mutations from localStorage and IndexedDB.
 * Essential on logout and session expiration to prevent cross-account data leakage.
 */
export async function clearOfflineBootstrap() {
  if (typeof localStorage !== 'undefined') {
    try {
      localStorage.removeItem(STORAGE_BOOTSTRAP_KEY);
      localStorage.removeItem(STORAGE_QUEUE_KEY);
    } catch {}
  }
  await Promise.all([
    idbDelete(STORAGE_BOOTSTRAP_KEY),
    idbDelete(STORAGE_QUEUE_KEY)
  ]);
  emitQueueChange();
}

/**
 * Emits queue change event to reactively update UI topbar counters.
 */
function emitQueueChange() {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('darc:queue-change', { detail: { count: getPendingMutations().length } }));
  }
}

/**
 * Deterministically generates prefixed IDs matching Supabase DB generator convention.
 */
export function generatePrefixedId(prefix) {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return prefix + '_' + crypto.randomUUID().replace(/-/g, '').slice(0, 16);
  }
  return prefix + '_' + Math.random().toString(36).slice(2, 10) + Date.now().toString(36).slice(-8);
}

/**
 * Queues a mutation (POST, PATCH, PUT, DELETE) to be replayed upon reconnection.
 */
export function enqueueOfflineMutation({ path, method = 'POST', body = null, description = '' }) {
  if (typeof localStorage === 'undefined') return null;
  try {
    const raw = localStorage.getItem(STORAGE_QUEUE_KEY);
    const queue = raw ? JSON.parse(raw) : [];

    // Outbox Compaction: If deleting a task/project that was only created locally in this outbox
    if (method === 'DELETE') {
      if (path.startsWith('/api/tasks/')) {
        const taskId = path.split('/')[3];
        const createdLocally = queue.some(m => m.method === 'POST' && m.path === '/api/tasks' && m.body?.id === taskId);
        if (createdLocally) {
          const compacted = queue.filter(m => !(
            (m.path === '/api/tasks' && m.body?.id === taskId) ||
            m.path === `/api/tasks/${taskId}` ||
            m.path.startsWith(`/api/tasks/${taskId}/`)
          ));
          localStorage.setItem(STORAGE_QUEUE_KEY, JSON.stringify(compacted));
          emitQueueChange();
          return { id: 'compacted', compacted: true };
        }
      } else if (path.startsWith('/api/projects/')) {
        const projId = path.split('/')[3];
        const createdLocally = queue.some(m => m.method === 'POST' && m.path === '/api/projects' && m.body?.id === projId);
        if (createdLocally) {
          const compacted = queue.filter(m => !(
            (m.path === '/api/projects' && m.body?.id === projId) ||
            m.path === `/api/projects/${projId}` ||
            (m.method === 'POST' && m.path === '/api/tasks' && m.body?.projectId === projId)
          ));
          localStorage.setItem(STORAGE_QUEUE_KEY, JSON.stringify(compacted));
          emitQueueChange();
          return { id: 'compacted', compacted: true };
        }
      }
    }

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
    emitQueueChange();
    console.log('[Offline Outbox] Enqueued mutation:', item);
    return item;
  } catch (err) {
    console.warn('[Offline Outbox] Failed to enqueue mutation:', err.message);
    return null;
  }
}

/**
 * Gets all pending mutations waiting in the outbox.
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
  emitQueueChange();
}

/**
 * Optimistically simulates mutation results in memory so users see their actions immediately.
 */
export function simulateOfflineMutation(path, method, body, state) {
  if (!state || !state.data) return { ok: true, queued: true, offline: true };

  const now = new Date().toISOString();

  // 1. Task Creation: POST /api/tasks
  if (method === 'POST' && path === '/api/tasks' && body) {
    const tempId = body.id || generatePrefixedId('tsk');
    body.id = tempId;
    const optimisticTask = {
      id: tempId,
      code: 'OFFLINE',
      projectId: body.projectId,
      titleAr: body.titleAr,
      titleEn: body.titleEn || body.titleAr,
      descriptionAr: body.descriptionAr || '',
      descriptionEn: body.descriptionEn || '',
      status: body.status || 'not_started',
      priority: body.priority || 'medium',
      categoryAr: body.categoryAr || 'عام',
      categoryEn: body.categoryEn || 'General',
      weight: Number(body.weight || 1),
      progress: Number(body.progress || 0),
      assigneeId: body.assigneeId || null,
      assignee: state.data.users?.find(u => u.id === body.assigneeId) || null,
      reviewerId: body.reviewerId || null,
      startDate: body.startDate || null,
      dueDate: body.dueDate || null,
      customFields: body.customFields || {},
      createdAt: now,
      updatedAt: now,
      _isOfflinePending: true
    };
    if (!state.data.tasks) state.data.tasks = [];
    const existingIdx = state.data.tasks.findIndex(t => t.id === tempId);
    if (existingIdx !== -1) {
      state.data.tasks[existingIdx] = optimisticTask;
    } else {
      state.data.tasks.unshift(optimisticTask);
    }
    saveOfflineBootstrap(state.data);
    return { ok: true, queued: true, offline: true, task: optimisticTask };
  }

  // 2. Task Update: PATCH /api/tasks/:id
  if (method === 'PATCH' && path.startsWith('/api/tasks/') && body) {
    const taskId = path.split('/')[3];
    const taskIndex = (state.data.tasks || []).findIndex(t => t.id === taskId);
    if (taskIndex !== -1) {
      const current = state.data.tasks[taskIndex];
      const updated = { ...current, ...body, updatedAt: now, _isOfflinePending: true };
      if (body.assigneeId !== undefined) {
        updated.assignee = state.data.users?.find(u => u.id === body.assigneeId) || null;
      }
      state.data.tasks[taskIndex] = updated;
      saveOfflineBootstrap(state.data);
      return { ok: true, queued: true, offline: true, task: updated };
    }
  }

  // 3. Task Deletion: DELETE /api/tasks/:id
  if (method === 'DELETE' && path.startsWith('/api/tasks/')) {
    const taskId = path.split('/')[3];
    if (state.data.tasks) {
      state.data.tasks = state.data.tasks.filter(t => t.id !== taskId);
      saveOfflineBootstrap(state.data);
    }
    return { ok: true, queued: true, offline: true };
  }

  // 4. Project Creation: POST /api/projects
  if (method === 'POST' && path === '/api/projects' && body) {
    const tempId = body.id || generatePrefixedId('prj');
    body.id = tempId;
    const optimisticProject = {
      id: tempId,
      code: body.code || 'DARC-OFF',
      nameAr: body.nameAr || body.name || 'مشروع محلي جديد',
      nameEn: body.nameEn || body.name || 'New Offline Project',
      clientAr: body.clientAr || '',
      clientEn: body.clientEn || '',
      descriptionAr: body.descriptionAr || '',
      descriptionEn: body.descriptionEn || '',
      lifecycle: body.lifecycle || 'planning',
      health: body.health || 'on_track',
      progress: 0,
      progressMode: 'weighted',
      managerId: body.managerId || state.data.user?.id,
      startDate: body.startDate || null,
      dueDate: body.dueDate || null,
      createdAt: now,
      updatedAt: now,
      _isOfflinePending: true
    };
    if (!state.data.projects) state.data.projects = [];
    const existingIdx = state.data.projects.findIndex(p => p.id === tempId);
    if (existingIdx !== -1) {
      state.data.projects[existingIdx] = optimisticProject;
    } else {
      state.data.projects.unshift(optimisticProject);
    }
    saveOfflineBootstrap(state.data);
    return { ok: true, queued: true, offline: true, project: optimisticProject };
  }

  // 5. Project Update: PATCH /api/projects/:id
  if (method === 'PATCH' && path.startsWith('/api/projects/') && body) {
    const projId = path.split('/')[3];
    const projIndex = (state.data.projects || []).findIndex(p => p.id === projId);
    if (projIndex !== -1) {
      const current = state.data.projects[projIndex];
      const updated = { ...current, ...body, updatedAt: now, _isOfflinePending: true };
      state.data.projects[projIndex] = updated;
      saveOfflineBootstrap(state.data);
      return { ok: true, queued: true, offline: true, project: updated };
    }
  }

  // 6. Project Deletion: DELETE /api/projects/:id
  if (method === 'DELETE' && path.startsWith('/api/projects/')) {
    const projId = path.split('/')[3];
    if (state.data.projects) {
      state.data.projects = state.data.projects.filter(p => p.id !== projId);
      saveOfflineBootstrap(state.data);
    }
    return { ok: true, queued: true, offline: true };
  }

  // 7. Comment Creation: POST /api/tasks/:id/comments
  if (method === 'POST' && path.includes('/comments') && body) {
    const parts = path.split('/');
    const taskId = parts[3];
    const tempComment = {
      id: body.id || generatePrefixedId('cmt'),
      taskId,
      userId: state.data.user?.id,
      content: body.content,
      createdAt: now,
      _isOfflinePending: true
    };
    body.id = tempComment.id;
    if (!state.data.comments) state.data.comments = [];
    if (!state.data.comments.some(c => c.id === tempComment.id)) {
      state.data.comments.push(tempComment);
    }
    saveOfflineBootstrap(state.data);
    return { ok: true, queued: true, offline: true, comment: tempComment };
  }

  // 8. Task Reorder: PATCH /api/tasks/reorder
  if (method === 'PATCH' && path === '/api/tasks/reorder' && body && Array.isArray(body.items)) {
    if (state.data.tasks) {
      body.items.forEach(item => {
        const t = state.data.tasks.find(x => x.id === item.id);
        if (t) {
          if (item.status) t.status = item.status;
          if (item.sortOrder) t.sortOrder = item.sortOrder;
          if (item.customFields) t.customFields = { ...(t.customFields || {}), ...item.customFields };
          t._isOfflinePending = true;
        }
      });
      saveOfflineBootstrap(state.data);
    }
    return { ok: true, queued: true, offline: true };
  }

  return { ok: true, queued: true, offline: true };
}

/**
 * Replays all pending mutations in the outbox sequentially (FIFO) with idempotency headers.
 */
export async function syncPendingMutations(apiFunction) {
  if (_isSyncing) return { total: 0, synced: 0, failed: 0 };
  const queue = getPendingMutations();
  if (!queue.length) return { total: 0, synced: 0, failed: 0 };

  _isSyncing = true;
  console.log(`[Offline Sync] Replaying ${queue.length} pending mutations...`);

  let syncedCount = 0;
  let stoppedDueToNetwork = false;

  for (let i = 0; i < queue.length; i++) {
    const item = queue[i];
    try {
      const opts = {
        method: item.method,
        headers: {
          'X-Offline-Replay': 'true',
          'X-Offline-Id': item.id,
          'X-Idempotency-Key': item.id
        }
      };
      if (item.body) {
        opts.body = typeof item.body === 'string' ? item.body : JSON.stringify(item.body);
      }
      const res = await apiFunction(item.path, opts);
      if (res && res.error && !res.ok) {
        // Validation / business error: drop poison pill so queue isn't blocked
        console.warn('[Offline Sync] Dropping unprocessable mutation:', item.id, res.error);
      } else {
        syncedCount++;
      }
    } catch (err) {
      console.error('[Offline Sync] Failed to replay mutation:', item.id, item.path, err.message);
      const isNetError = (typeof navigator !== 'undefined' && !navigator.onLine) ||
                         (err.message && (err.message.includes('تعذر الاتصال') || err.message.includes('fetch') || err.message.includes('NetworkError') || err.name === 'TypeError'));
      if (isNetError) {
        // Network dropped mid-replay: preserve this item AND all subsequent items in FIFO order
        const remaining = queue.slice(i);
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem(STORAGE_QUEUE_KEY, JSON.stringify(remaining));
        }
        stoppedDueToNetwork = true;
        break;
      }
      // If 4xx client validation or server rejection, drop the poison pill
    }
  }

  if (!stoppedDueToNetwork) {
    clearPendingMutations();
  }

  _isSyncing = false;
  emitQueueChange();
  return {
    total: queue.length,
    synced: syncedCount,
    failed: stoppedDueToNetwork ? (queue.length - syncedCount) : 0
  };
}
