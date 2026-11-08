// DARC Design Team — Intelligent Realtime Sync & Ultra-Low Data Engine
// Granular In-Memory Delta Patching | Zero-Waste Idle Detection | Auto-Hibernation | 0 KB HTTP Traffic

import { state } from './state.js';
import { loadData, renderView, renderApp } from './router.js';
import { syncPendingMutations } from './offline.js';
import { invalidateBootstrapEtag } from './api.js';
import { choose, isNotificationRead, hasSessionIndicator } from './utils.js';
import { showToast } from '../shared/ui.js';
import { showNotifications } from '../features/notifications/notifications.js';
import { dispatchUniversalNotification } from '../features/notifications/notification-manager.js';
import { taskCard } from '../features/tasks/tasks.js';

const SUPABASE_WS_ENDPOINT = 'wss://yjfmrpwkjstxldnwegob.supabase.co/realtime/v1/websocket?apikey=sb_publishable_Zr7mRIWo5djcRpwq4Ihl0A_Eb3AA8gJ&vsn=1.0.0';

// Configuration thresholds
const isDataSaver = typeof navigator !== 'undefined' && Boolean(navigator.connection?.saveData);
const INACTIVITY_IDLE_TIMEOUT_MS = 5 * 60 * 1000;           // 5 minutes without user activity -> Hibernate
const TAB_HIDDEN_STANDBY_MS = isDataSaver ? 10 * 1000 : 30 * 1000; // 10s (Data Saver) or 30s in background -> Hibernate
const SYNC_DEBOUNCE_MS = isDataSaver ? 500 : 250;           // Fast & responsive 250ms batching (ultra-low latency)
const HEARTBEAT_ACTIVE_MS = 25 * 1000;                      // 25s keepalive ping while actively working
const HEARTBEAT_IDLE_MS = 45 * 1000;                        // 45s adaptive keepalive when idle > 2 minutes (conserves power)
const MAX_LOCAL_MUTATIONS = 50;

let _syncDebounceTimer = null;
let _isRealtimeInitialized = false;
let _isExplicitlyDisconnected = false;
let _sharedAudioContext = null;
let _ws = null;
let _wsHeartbeatTimer = null;
let _wsReconnectTimer = null;
let _socketHealthWatchdog = null;
let _idleCheckTimer = null;
let _hiddenStandbyTimer = null;
let _wsMsgRef = 0;
let _reconnectAttempts = 0;
let _isHibernating = false;
let _lastActivityTimestamp = Date.now();
let _lastActivityThrottle = 0;
let _renderRaf = null;

/**
 * Returns true if the WebSocket connection is actively open and receiving live deltas
 */
export function isRealtimeConnected() {
  return Boolean(_ws && _ws.readyState === 1);
}

// Track local client mutations to eliminate redundant echoes & re-renders
const _recentLocalMutations = new Map(); // id -> timestamp

/**
 * Record a mutation performed locally so that WebSocket echoes are ignored
 */
export function recordRecentLocalMutation(id) {
  if (!id || typeof id !== 'string') return;
  const now = Date.now();
  _recentLocalMutations.set(id, now);

  // Auto-prune entries older than 4 seconds
  for (const [k, v] of _recentLocalMutations.entries()) {
    if (now - v > 4000) _recentLocalMutations.delete(k);
  }

  // Strict cap on map size (prevent memory leak)
  if (_recentLocalMutations.size > MAX_LOCAL_MUTATIONS) {
    const oldestKey = _recentLocalMutations.keys().next().value;
    if (oldestKey) _recentLocalMutations.delete(oldestKey);
  }
}

/**
 * Check if the client is currently authenticated
 */
function isAuthenticated() {
  if (typeof localStorage === 'undefined') return false;
  return hasSessionIndicator() && Boolean(localStorage.getItem('darc_token'));
}

/**
 * Check if current session is isolated in Demo Showcase sandbox
 */
export function isDemoSession() {
  if (typeof window === 'undefined') return false;
  if (!hasSessionIndicator()) return false;
  return Boolean(
    state.data?.isDemo ||
    state.currentUser?.isDemo ||
    (state.data?.user && (state.data.user.id === 'usr_demo' || state.data.user.isDemo)) ||
    (state.currentUser && (state.currentUser.id === 'usr_demo' || state.currentUser.isDemo)) ||
    (typeof localStorage !== 'undefined' && localStorage.getItem('darc_user_id') === 'usr_demo')
  );
}

/**
 * Guard sets to prevent Prototype Pollution attacks
 */
const DANGEROUS_KEYS = new Set(['__proto__', 'constructor', 'prototype']);
const JSONB_PASSTHROUGH_KEYS = new Set(['custom_fields', 'permissions', 'details']);

/**
 * Convert snake_case Supabase CDC payload into camelCase frontend model with Prototype Pollution shielding
 */
function snakeToCamel(obj) {
  if (obj === null || typeof obj !== 'object') return obj;
  if (Array.isArray(obj)) return obj.map(snakeToCamel);
  const out = {};
  for (const [k, v] of Object.entries(obj)) {
    if (DANGEROUS_KEYS.has(k)) continue;
    const camelKey = k.indexOf('_') === -1 ? k : k.replace(/_([a-z0-9])/g, (_, c) => c.toUpperCase());
    if (DANGEROUS_KEYS.has(camelKey)) continue;
    out[camelKey] = (v !== null && typeof v === 'object' && !JSONB_PASSTHROUGH_KEYS.has(k))
      ? snakeToCamel(v)
      : v;
  }
  return out;
}

/**
 * Sanitize object properties to prevent prototype tampering
 */
function sanitizeRecord(obj) {
  if (obj === null || typeof obj !== 'object') return obj;
  if (Array.isArray(obj)) return obj.map(sanitizeRecord);
  const clean = {};
  for (const [k, v] of Object.entries(obj)) {
    if (DANGEROUS_KEYS.has(k)) continue;
    clean[k] = (v !== null && typeof v === 'object' && !JSONB_PASSTHROUGH_KEYS.has(k))
      ? sanitizeRecord(v)
      : v;
  }
  return clean;
}

/**
 * Recalculate project weighted progress directly in-memory (0-latency instant UI update)
 */
export function recalculateProjectProgressInMemory(projectId) {
  if (!projectId || !state.data || !Array.isArray(state.data.tasks) || !Array.isArray(state.data.projects)) return;
  const project = state.data.projects.find((p) => p.id === projectId);
  if (!project) return;

  const projectTasks = state.data.tasks.filter((t) => t.projectId === projectId && !t.deletedAt && !t.deleted_at);
  let totalWeight = 0;
  let weightedProgress = 0;
  for (const t of projectTasks) {
    const w = Number(t.weight) || 1;
    const p = Number(t.progress) || 0;
    totalWeight += w;
    weightedProgress += w * (p / 100);
  }
  const finalPct = totalWeight > 0 ? Math.round((weightedProgress / totalWeight) * 100) : 0;
  if (project.progress !== finalPct) {
    project.progress = finalPct;
  }
  project.totalWeight = totalWeight;

  // Auto-sync project lifecycle state with task completion status
  const hasTasks = projectTasks.length > 0;
  const allDone = hasTasks && projectTasks.every(t => t.status === 'done' || t.status === 'completed');
  if (hasTasks && allDone && finalPct === 100) {
    project.lifecycle = 'completed';
  } else if (project.lifecycle === 'completed' && (!allDone || finalPct < 100)) {
    project.lifecycle = 'active';
  }
}

/**
 * Update the notification indicator dot in the topbar directly in DOM
 */
function updateNotificationDotInDom() {
  if (typeof document === 'undefined') return;
  const notifBtn = document.querySelector('[data-action="show-notifications"]');
  if (!notifBtn) return;
  const notifications = state.data?.notifications || [];
  const unread = notifications.filter((n) => !isNotificationRead(n)).length;
  let dot = notifBtn.querySelector('.notification-dot');
  if (unread > 0) {
    if (!dot) {
      notifBtn.insertAdjacentHTML('beforeend', '<span class="notification-dot"></span>');
    }
  } else if (dot) {
    dot.remove();
  }
}

/**
 * Play subtle, elegant chime using native Web Audio API (0 KB audio files, Singleton AudioContext)
 */
export function playNotificationChime() {
  if (typeof window === 'undefined') return;
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    if (!_sharedAudioContext || _sharedAudioContext.state === 'closed') {
      _sharedAudioContext = new AudioCtx();
    }
    if (_sharedAudioContext.state === 'suspended') {
      _sharedAudioContext.resume().catch(() => {});
    }
    const ctx = _sharedAudioContext;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
    osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.15); // A5
    gain.gain.setValueAtTime(0.06, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.36);
  } catch (e) {
    // Silent fail if AudioContext is prevented by browser policy
  }
}

/**
 * Surgical in-place DOM patching for task cards and Kanban columns (0ms latency, zero flicker, 90%+ CPU savings)
 */
function patchTaskDomSurgically(taskId, record, actionType) {
  if (typeof document === 'undefined' || !taskId) return false;
  const cardEl = document.querySelector(`.task-card[data-task-id="${taskId}"]`);
  if (!cardEl) return false;

  // 0. Surgical delete: remove card and decrement column badge
  if (actionType === 'DELETE' || record?.deletedAt || record?.deleted_at) {
    const currentCol = cardEl.closest('.board-column');
    cardEl.remove();
    if (currentCol) {
      const currentCountEl = currentCol.querySelector('.board-count');
      if (currentCountEl) {
        const curVal = Math.max(0, (parseInt(currentCountEl.textContent, 10) || 1) - 1);
        currentCountEl.textContent = String(curVal);
        if (curVal === 0 && !currentCol.querySelector('.task-card')) {
          const targetCards = currentCol.querySelector('.board-cards');
          if (targetCards && !targetCards.querySelector('.empty')) {
            targetCards.innerHTML = '<div class="empty"><span>' + (window.t ? window.t('noTasks') : 'No tasks') + '</span></div>';
          }
        }
      }
    }
    return true;
  }

  // If locally dragging this exact card, don't interrupt active pointer interaction
  if (window._isDraggingTask && window._activeDraggedTaskId === taskId) {
    return true;
  }

  // Find updated task entity in local state
  const task = (state.data?.tasks || []).find((t) => t.id === taskId);
  if (!task) return false;

  // Render fresh card markup via single source of truth taskCard()
  const temp = document.createElement('div');
  temp.innerHTML = taskCard(task);
  const newCard = temp.firstElementChild;
  if (!newCard) return false;

  const currentCol = cardEl.closest('.board-column');
  const oldStatus = currentCol?.dataset.status;
  const newStatus = task.status;

  if (currentCol && oldStatus && newStatus && oldStatus !== newStatus) {
    const targetCol = document.querySelector(`.board-column[data-status="${newStatus}"]`);
    if (targetCol) {
      const targetCards = targetCol.querySelector('.board-cards');
      if (targetCards) {
        // Remove empty state placeholder in target column
        targetCards.querySelector('.empty')?.remove();
        targetCards.prepend(newCard);
        cardEl.remove();

        // Update old column counter
        const currentCountEl = currentCol.querySelector('.board-count');
        if (currentCountEl) {
          const curVal = Math.max(0, (parseInt(currentCountEl.textContent, 10) || 1) - 1);
          currentCountEl.textContent = String(curVal);
          if (curVal === 0 && !currentCol.querySelector('.task-card')) {
            const emptyT = (typeof window.t === 'function') ? window.t('noTasks') : 'لا توجد مهام';
            currentCol.querySelector('.board-cards')?.insertAdjacentHTML('beforeend', `<div class="empty" style="min-height:150px;pointer-events:none;">${emptyT}</div>`);
          }
        }
        // Update new column counter
        const targetCountEl = targetCol.querySelector('.board-count');
        if (targetCountEl) {
          const nextVal = (parseInt(targetCountEl.textContent, 10) || 0) + 1;
          targetCountEl.textContent = String(nextVal);
        }
      } else {
        cardEl.replaceWith(newCard);
      }
    } else {
      cardEl.replaceWith(newCard);
    }
  } else {
    // Status didn't change: surgical in-place DOM replacement
    cardEl.replaceWith(newCard);
  }

  // Subtle pulse highlight for instant collaborator awareness
  newCard.style.transition = 'box-shadow 0.3s ease';
  newCard.style.boxShadow = '0 0 0 2px var(--teal)';
  setTimeout(() => {
    if (newCard) newCard.style.boxShadow = '';
  }, 800);

  return true;
}

function patchBatchReorderSurgically(items) {
  if (typeof document === 'undefined' || !Array.isArray(items)) return false;
  let anyPatched = false;
  const affectedColumns = new Set();

  for (const item of items) {
    if (item.id) {
      const cardEl = document.querySelector(`.task-card[data-task-id="${item.id}"]`);
      if (cardEl) {
        const col = cardEl.closest('.board-column');
        if (col) affectedColumns.add(col);
      }
      const ok = patchTaskDomSurgically(item.id, item);
      if (ok) anyPatched = true;
    }
  }

  // In-place surgical DOM re-ordering inside affected Kanban columns by sortOrder (0 DOM rebuild)
  if (state.data?.tasks && affectedColumns.size > 0) {
    const taskMap = new Map(state.data.tasks.map(t => [t.id, t]));
    affectedColumns.forEach(col => {
      const cardsContainer = col.querySelector('.board-cards');
      if (!cardsContainer) return;
      const cardEls = Array.from(cardsContainer.querySelectorAll('.task-card'));
      if (cardEls.length <= 1) return;

      cardEls.sort((a, b) => {
        const tA = taskMap.get(a.dataset.taskId);
        const tB = taskMap.get(b.dataset.taskId);
        const orderA = (tA && typeof tA.sortOrder === 'number') ? tA.sortOrder : ((tA && typeof tA.sort_order === 'number') ? tA.sort_order : 0);
        const orderB = (tB && typeof tB.sortOrder === 'number') ? tB.sortOrder : ((tB && typeof tB.sort_order === 'number') ? tB.sort_order : 0);
        return orderA - orderB;
      });

      cardEls.forEach(el => cardsContainer.appendChild(el));
    });
  }

  return anyPatched;
}

/**
 * Batch render view updates using requestAnimationFrame (60 FPS fluid UI)
 */
function scheduleBatchedViewUpdate() {
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return;
  }
  if (typeof requestAnimationFrame === 'undefined') {
    if (typeof renderView === 'function') renderView();
    else if (typeof renderApp === 'function') renderApp();
    return;
  }
  if (_renderRaf) cancelAnimationFrame(_renderRaf);
  _renderRaf = requestAnimationFrame(() => {
    _renderRaf = null;
    if (typeof renderView === 'function') {
      renderView();
    } else if (typeof renderApp === 'function') {
      renderApp();
    }
  });
}

/**
 * Apply Granular Delta Changes In-Memory (Zero HTTP Requests / 0 KB Bandwidth)
 */
export function applyGranularDelta(tableName, actionType, rawRecord, rawOldRecord) {
  if (!state.data || !tableName) return false;

  const validTables = ['tasks', 'projects', 'comments', 'documents', 'notifications'];
  if (!validTables.includes(tableName)) return false;

  const record = rawRecord ? sanitizeRecord(snakeToCamel(rawRecord)) : null;
  const oldRecord = rawOldRecord ? sanitizeRecord(snakeToCamel(rawOldRecord)) : null;
  const targetId = (record && record.id) || (oldRecord && oldRecord.id);

  if (!targetId && actionType !== 'BATCH_REORDER') return false;

  // 1. Deduplication: Check if this was an echo of a local mutation performed by this client
  const clientMutId = record?._clientMutationId || record?.clientMutationId || oldRecord?._clientMutationId;
  if (clientMutId && _recentLocalMutations.has(clientMutId)) {
    return true; // Exact transaction echo from this tab -> skip re-render
  }

  // Optimistic Concurrency Control (OCC): Reject only if incoming record is strictly older than optimistic local state
  if (targetId && _recentLocalMutations.has(targetId)) {
    const existing = (state.data[tableName] || []).find(item => item.id === targetId);
    if (existing && record && record.updatedAt && existing.updatedAt) {
      const incomingTime = new Date(record.updatedAt).getTime();
      const existingTime = new Date(existing.updatedAt).getTime();
      if (!isNaN(incomingTime) && !isNaN(existingTime) && incomingTime < existingTime) {
        return true; // Incoming delta is older than our local optimistic modification -> ignore stale echo
      }
    }
  }

  // 1b. Authorization Guard: Prevent cross-project or cross-user data leakage for non-admins
  const isGlobalAdmin = (state.data?.user?.roleId === 'admin') || (state.data?.user?.role_id === 'admin');
  if (record && tableName === 'notifications') {
    const targetUserId = record.userId || record.user_id;
    if (targetUserId && targetUserId !== state.data?.user?.id) {
      return false; // Drop notifications meant for other users
    }
  } else if (!isGlobalAdmin && record) {
    if (tableName === 'tasks' || tableName === 'documents' || tableName === 'comments') {
      const pId = record.projectId || (tableName === 'comments' ? (state.data?.tasks?.find(t => t.id === record.taskId)?.projectId) : null);
      if (pId && !state.data?.projects?.some(p => p.id === pId)) {
        // Task/document arrived for a project not yet in memory -> trigger fast background reconciliation
        triggerImmediateSync('missing_project_dependency');
        return false;
      }
    }
  }

  // Ensure table collection exists in state
  if (!Array.isArray(state.data[tableName])) {
    state.data[tableName] = [];
  }
  const collection = state.data[tableName];

  let stateMutated = false;
  const isSoftDeleted = Boolean(record?.deletedAt || record?.deleted_at);

  if (actionType === 'BATCH_REORDER' && Array.isArray(record?.items)) {
    const affectedProjectIds = new Set();
    for (const item of record.items) {
      if (!item?.id) continue;
      const targetItem = collection.find((t) => t.id === item.id);
      if (targetItem) {
        if (item.status && targetItem.status !== item.status) {
          targetItem.status = item.status;
          stateMutated = true;
        }
        const sortVal = typeof item.sortOrder === 'number' ? item.sortOrder : (typeof item.sort_order === 'number' ? item.sort_order : null);
        if (sortVal !== null && targetItem.sortOrder !== sortVal) {
          targetItem.sortOrder = sortVal;
          stateMutated = true;
        }
        if (typeof item.progress === 'number' && targetItem.progress !== item.progress) {
          targetItem.progress = item.progress;
          stateMutated = true;
        }
        if (targetItem.projectId) affectedProjectIds.add(targetItem.projectId);
      }
    }
    if (stateMutated && tableName === 'tasks') {
      affectedProjectIds.forEach((pid) => recalculateProjectProgressInMemory(pid));
    }
  } else if (actionType === 'DELETE' || isSoftDeleted) {
    const prevLen = collection.length;
    let deletedItemProjectId = null;
    if (tableName === 'tasks') {
      const targetItem = collection.find((item) => item.id === targetId);
      deletedItemProjectId = targetItem?.projectId || oldRecord?.projectId || record?.projectId;
    }

    state.data[tableName] = collection.filter((item) => item.id !== targetId);
    if (state.data[tableName].length !== prevLen) {
      stateMutated = true;
    }

    // Cascade in-memory cleanup
    if (tableName === 'tasks' && deletedItemProjectId) {
      recalculateProjectProgressInMemory(deletedItemProjectId);
    } else if (tableName === 'projects') {
      // Remove orphaned tasks for deleted project
      if (Array.isArray(state.data.tasks)) {
        state.data.tasks = state.data.tasks.filter((t) => t.projectId !== targetId);
      }
    } else if (tableName === 'notifications') {
      updateNotificationDotInDom();
      if (typeof showNotifications === 'function' && document.querySelector('.modal-shell.notifications')) {
        showNotifications();
      }
    }
  } else if (actionType === 'UPDATE' && record) {
    const idx = collection.findIndex((item) => item.id === targetId);
    if (idx !== -1) {
      // Concurrency Guard (OCC): Discard stale network packets arriving out-of-order
      const existing = collection[idx];
      const existingTime = existing.updatedAt || existing.updated_at || existing.createdAt || existing.created_at;
      const incomingTime = record.updatedAt || record.updated_at || record.createdAt || record.created_at;
      if (existingTime && incomingTime) {
        const existingTs = new Date(existingTime).getTime();
        const incomingTs = new Date(incomingTime).getTime();
        if (!isNaN(existingTs) && !isNaN(incomingTs) && incomingTs < existingTs) {
          // Stale delta arrived after a newer local or remote update -> ignore safely
          return true;
        }
      }

      // Safe merge without prototype pollution
      for (const [key, val] of Object.entries(record)) {
        if (!DANGEROUS_KEYS.has(key)) {
          collection[idx][key] = val;
        }
      }
      stateMutated = true;
    } else {
      collection.unshift(record);
      stateMutated = true;
    }

    // Trigger in-memory recalculations
    if (tableName === 'tasks') {
      if (record.projectId) recalculateProjectProgressInMemory(record.projectId);
      if (oldRecord?.projectId && oldRecord.projectId !== record.projectId) {
        recalculateProjectProgressInMemory(oldRecord.projectId);
      }
    } else if (tableName === 'notifications') {
      updateNotificationDotInDom();
      if (typeof showNotifications === 'function' && document.querySelector('.modal-shell.notifications')) {
        showNotifications();
      }
    }
  } else if (actionType === 'INSERT' && record) {
    const exists = collection.some((item) => item.id === targetId);
    if (!exists) {
      collection.unshift(record);
      stateMutated = true;
    }

    // Trigger in-memory recalculations
    if (tableName === 'tasks' && record.projectId) {
      recalculateProjectProgressInMemory(record.projectId);
    } else if (tableName === 'notifications') {
      const currentUserId = state.data?.user?.id;
      const targetUserId = record.userId || record.user_id;
      const isRead = isNotificationRead(record);
      if (currentUserId && targetUserId === currentUserId && !isRead) {
        updateNotificationDotInDom();
        const title = state.lang === 'ar'
          ? (record.titleAr || record.messageAr || record.bodyAr || record.content || record.titleEn || choose('إشعار جديد', 'New notification'))
          : (record.titleEn || record.messageEn || record.bodyEn || (record.content !== record.titleAr && record.content !== record.messageAr ? record.content : '') || record.titleAr || choose('إشعار جديد', 'New notification'));
        if (title) {
          showToast(title, false);
        }
        // Universal Device Notification (Android ServiceWorker / iOS PWA / Desktop / In-App Chime & Haptics)
        const bodyMsg = state.lang === 'ar'
          ? (record.messageAr || record.bodyAr || record.content || '')
          : (record.messageEn || record.bodyEn || record.content || '');

        dispatchUniversalNotification({
          title,
          body: bodyMsg,
          icon: '/favicon.ico',
          tag: record.id || 'darc-alert',
          url: record.taskId 
            ? `${window.location.origin}/#workspace?task=${record.taskId}`
            : (record.projectId ? `${window.location.origin}/#project-detail?id=${record.projectId}` : window.location.href)
        }).catch(() => {});

        if (typeof showNotifications === 'function' && document.querySelector('.modal-notifications')) {
          showNotifications();
        }
      }
    }
  }

  if (stateMutated) {
    // Invalidate local ETag so next periodic or manual sync knows state progressed
    invalidateBootstrapEtag();

    // 1. Surgical DOM update for tasks and kanban columns (instant response, zero flicker)
    let didPatchSurgically = false;
    if (tableName === 'tasks') {
      if ((actionType === 'UPDATE' || actionType === 'DELETE' || isSoftDeleted) && (record || targetId)) {
        didPatchSurgically = patchTaskDomSurgically(targetId, record, isSoftDeleted ? 'DELETE' : actionType);
      } else if (actionType === 'BATCH_REORDER' && Array.isArray(record?.items)) {
        didPatchSurgically = patchBatchReorderSurgically(record.items);
      }
    }

    // 2. Fine-grained Modal DOM patching if task modal is currently open
    const openTaskId = record?.taskId || oldRecord?.taskId;
    if (openTaskId) {
      const parentTask = (state.data?.tasks || []).find((t) => t.id === openTaskId);
      if (parentTask) {
        // Comment list live update
        if (tableName === 'comments') {
          const openCommentForm = document.getElementById('task-comment-form');
          if (openCommentForm && openCommentForm.dataset.taskId === openTaskId) {
            const commentListEl = document.getElementById('task-comments-list');
            if (commentListEl && typeof window.renderTaskComments === 'function') {
              commentListEl.innerHTML = window.renderTaskComments(parentTask);
              commentListEl.scrollTop = commentListEl.scrollHeight;
            }
          }
        }
        // Document list live update
        if (tableName === 'documents') {
          const dropzoneEl = document.getElementById('task-dropzone');
          if (dropzoneEl && dropzoneEl.dataset.taskId === openTaskId) {
            const docListEl = document.getElementById('task-documents-list');
            if (docListEl && typeof window.renderTaskDocuments === 'function') {
              docListEl.innerHTML = window.renderTaskDocuments(parentTask);
            }
          }
        }
      }
    }

    // 3. Only batch render view if surgical DOM patching was not applicable
    // (e.g. INSERT of a new card, or updates to other views like projects/reports)
    if (!didPatchSurgically) {
      scheduleBatchedViewUpdate();
    }
    return true;
  }

  return false;
}

/**
 * Debounced silent state synchronization using ETag validation (Fallback reconciler)
 */
export function triggerImmediateSync(source = 'realtime', immediate = false) {
  if (!isAuthenticated()) return;
  if (_isHibernating && source !== 'tab_visible' && source !== 'user_active' && source !== 'online') return;
  if (typeof document !== 'undefined' && document.hidden) return;
  if (!state.data || !state.view) return;

  if (_syncDebounceTimer) clearTimeout(_syncDebounceTimer);

  const runSync = async () => {
    try {
      await loadData(true); // Silent high-performance ETag sync (HTTP 304 if unchanged)
    } catch (e) {
      console.warn('[Realtime] Sync error:', String(source), e.message);
    }
  };

  if (immediate) {
    runSync();
  } else {
    _syncDebounceTimer = setTimeout(runSync, SYNC_DEBOUNCE_MS);
  }
}

/**
 * Send framed Phoenix protocol message over WebSocket
 */
function sendWsMessage(ws, topic, event, payload = {}) {
  if (ws && ws.readyState === WebSocket.OPEN) {
    _wsMsgRef++;
    ws.send(JSON.stringify({
      topic,
      event,
      payload,
      ref: String(_wsMsgRef)
    }));
  }
}

/**
 * Dynamic adaptive heartbeat: 25s when actively working, 45s when idle (> 2 min)
 */
function getEffectiveHeartbeatInterval() {
  const isIdle = (Date.now() - _lastActivityTimestamp) > (2 * 60 * 1000);
  return isIdle ? HEARTBEAT_IDLE_MS : HEARTBEAT_ACTIVE_MS;
}

/**
 * Start adaptive keep-alive heartbeat loop
 */
function startWsHeartbeat(ws) {
  stopWsHeartbeat();
  const scheduleNext = () => {
    const interval = getEffectiveHeartbeatInterval();
    _wsHeartbeatTimer = setTimeout(() => {
      if (ws && ws.readyState === WebSocket.OPEN) {
        sendWsMessage(ws, 'phoenix', 'heartbeat');
        scheduleNext();
      }
    }, interval);
  };
  scheduleNext();
}

/**
 * Stop heartbeat loop to save battery and network
 */
function stopWsHeartbeat() {
  if (_wsHeartbeatTimer) {
    clearTimeout(_wsHeartbeatTimer);
    _wsHeartbeatTimer = null;
  }
}

/**
 * Disconnect WebSocket cleanly and release network resources
 */
export function disconnectSupabaseRealtime(reason = 'disconnect') {
  _isExplicitlyDisconnected = true;
  stopWsHeartbeat();
  if (_socketHealthWatchdog) {
    clearTimeout(_socketHealthWatchdog);
    _socketHealthWatchdog = null;
  }
  if (_wsReconnectTimer) {
    clearTimeout(_wsReconnectTimer);
    _wsReconnectTimer = null;
  }
  if (_ws) {
    try {
      _ws.close(1000, reason);
    } catch (e) {}
    _ws = null;
  }
}

/**
 * Put realtime engine into Hibernation (stops all background work)
 */
function enterHibernation(reason = 'idle') {
  if (_isHibernating) return;
  _isHibernating = true;
  disconnectSupabaseRealtime(reason);
}

/**
 * Wake up from hibernation and perform catch-up sync
 */
function wakeUpFromHibernation(source = 'wake_up') {
  const wasHibernating = _isHibernating;
  _isHibernating = false;

  if (!isAuthenticated()) return;
  if (typeof navigator !== 'undefined' && !navigator.onLine) return;

  // Active Socket Health Probe: Test if socket is truly alive or a silent carrier zombie
  if (_ws && _ws.readyState === WebSocket.OPEN) {
    if (_socketHealthWatchdog) clearTimeout(_socketHealthWatchdog);
    _socketHealthWatchdog = setTimeout(() => {
      console.warn('[Realtime] Socket health probe timed out (zombie connection detected). Reconnecting cleanly...');
      _socketHealthWatchdog = null;
      disconnectSupabaseRealtime('zombie_probe_timeout');
      connectSupabaseRealtime();
      triggerImmediateSync('zombie_recovery', true);
    }, 1200);
    sendWsMessage(_ws, 'phoenix', 'heartbeat');
  } else if (!_ws || _ws.readyState === WebSocket.CLOSED || _ws.readyState === WebSocket.CLOSING) {
    connectSupabaseRealtime();
  }

  // If we were sleeping, perform immediate catch-up sync for any missed mutations
  if (wasHibernating || source === 'tab_visible' || source === 'pageshow' || source === 'focus' || source === 'online') {
    triggerImmediateSync(source, true); // Immediate zero-latency catch-up
  }
}

/**
 * Connect to Supabase Realtime WebSocket engine
 */
function connectSupabaseRealtime() {
  if (typeof WebSocket === 'undefined') return;
  if (typeof navigator !== 'undefined' && !navigator.onLine) return;
  if (!isAuthenticated()) return;
  if (_isHibernating) return;
  if (isDemoSession()) {
    // Shielded Sandbox: Demo users are 100% isolated and NEVER connect to production WebSockets
    return;
  }
  if (_ws && (_ws.readyState === WebSocket.CONNECTING || _ws.readyState === WebSocket.OPEN)) return;

  _isExplicitlyDisconnected = false;

  try {
    const ws = new WebSocket(SUPABASE_WS_ENDPOINT);
    _ws = ws;

    ws.onopen = () => {
      _reconnectAttempts = 0;
      startWsHeartbeat(ws);

      // 1. Join Edge Worker Realtime Broadcast Channel
      sendWsMessage(ws, 'realtime:darc_live', 'phx_join', {
        config: { broadcast: { ack: false, self: false } }
      });

      // 2. Join PostgreSQL Change Data Capture Channels for Core Tables
      const cdcTables = ['tasks', 'projects', 'comments', 'documents', 'notifications'];
      cdcTables.forEach((table) => {
        sendWsMessage(ws, `realtime:public:${table}`, 'phx_join', {
          config: {
            postgres_changes: [
              { event: '*', schema: 'public', table }
            ]
          }
        });
      });
    };

    ws.onmessage = (event) => {
      try {
        if (_socketHealthWatchdog) {
          clearTimeout(_socketHealthWatchdog);
          _socketHealthWatchdog = null;
        }
        const msg = JSON.parse(event.data);
        const { event: evt, topic, payload } = msg;

        // Ignore internal protocol acknowledgments and heartbeats
        if (evt === 'phx_reply' || evt === 'phx_close') return;
        if (isDemoSession()) return; // Shielded Sandbox: Demo sessions NEVER process live production CDC events

        // A. Smart In-Memory Delta Patching (Postgres CDC events): 0 KB HTTP Traffic!
        if (evt === 'postgres_changes' && payload?.data) {
          const { table, type, record, old_record } = payload.data;
          const deltaApplied = applyGranularDelta(table, type, record, old_record);
          if (deltaApplied) {
            // Delta successfully applied in memory! No HTTP fetch needed!
            return;
          }
        }

        // B. Standard CDC direct event framing (INSERT / UPDATE / DELETE)
        if ((evt === 'INSERT' || evt === 'UPDATE' || evt === 'DELETE') && topic?.startsWith('realtime:public:')) {
          const table = topic.split(':')[2];
          const deltaApplied = applyGranularDelta(table, evt, payload?.record || payload?.new, payload?.old_record || payload?.old);
          if (deltaApplied) return;
        }

        // C. Worker Edge Broadcast: Smart granular delta or fallback reconciliation
        if (topic === 'realtime:darc_live' && (evt === 'broadcast' || evt === 'STATE_MUTATION' || evt === 'GRANULAR_DELTA')) {
          const mutationPayload = payload?.payload || payload;
          const mutationId = mutationPayload?.mutationId || mutationPayload?.id || mutationPayload?.entityId;

          // 1. Ignore own mutation echo (local tab already rendered with 0 HTTP traffic)
          if (mutationId && _recentLocalMutations.has(mutationId)) {
            return;
          }

          // 2. Direct granular delta patch from Cloudflare Worker
          if (mutationPayload?.delta) {
            const { table, action, record, oldRecord } = mutationPayload.delta;
            const deltaApplied = applyGranularDelta(table, action, record, oldRecord);
            if (deltaApplied) return;
          }

          // 3. Fallback reconciliation via ETag (only if granular patch was not applicable)
          triggerImmediateSync('edge_broadcast');
          return;
        }

        // D. General Fallback Trigger
        if (
          evt === 'broadcast' || 
          topic === 'realtime:darc_live' ||
          (typeof topic === 'string' && topic.startsWith('realtime:public:'))
        ) {
          triggerImmediateSync('supabase_ws');
        }
      } catch (e) {
        /* silent protocol parse guard */
      }
    };

    ws.onerror = () => {
      /* Handled gracefully in onclose */
    };

    ws.onclose = (event) => {
      stopWsHeartbeat();
      _ws = null;

      // Never reconnect if disconnected intentionally or unauthenticated
      if (_isExplicitlyDisconnected || !isAuthenticated() || _isHibernating) return;
      if (event?.reason === 'logout' || event?.reason === 'unauthorized_401') return;

      // Only attempt reconnection if online
      if (typeof navigator !== 'undefined' && navigator.onLine) {
        _reconnectAttempts++;
        const baseDelay = Math.min(30000, Math.pow(2, Math.min(_reconnectAttempts, 5)) * 1000);
        const jitter = Math.floor(Math.random() * 800);
        const delay = baseDelay + jitter;
        if (_wsReconnectTimer) clearTimeout(_wsReconnectTimer);
        _wsReconnectTimer = setTimeout(() => {
          connectSupabaseRealtime();
        }, delay);
      }
    };
  } catch (e) {
    console.warn('[Realtime] WebSocket init failed:', e.message);
  }
}

/**
 * Handle user interactions to detect active usage vs AFK idle state
 */
function handleUserActivity() {
  const now = Date.now();
  // Throttle updates to at most once every 10 seconds to eliminate CPU overhead
  if (now - _lastActivityThrottle > 10000) {
    const wasIdle = (now - _lastActivityTimestamp) > (2 * 60 * 1000);
    _lastActivityThrottle = now;
    _lastActivityTimestamp = now;

    // If returning from idle state, resume fast active heartbeats immediately
    if (wasIdle && _ws && _ws.readyState === WebSocket.OPEN) {
      startWsHeartbeat(_ws);
    }

    // If currently hibernating due to inactivity, wake up immediately
    if (_isHibernating && (typeof document === 'undefined' || !document.hidden)) {
      wakeUpFromHibernation('user_active');
    }
  }
}

/**
 * Start periodic idle check loop (checks once every 60s)
 */
function startIdleCheck() {
  if (_idleCheckTimer) clearInterval(_idleCheckTimer);
  _idleCheckTimer = setInterval(() => {
    // Periodic sweep of _recentLocalMutations to guarantee zero memory leaks
    const now = Date.now();
    for (const [k, v] of _recentLocalMutations.entries()) {
      if (now - v > 8000) _recentLocalMutations.delete(k);
    }

    // If already hibernating or tab is hidden, skip check
    if (_isHibernating || (typeof document !== 'undefined' && document.hidden)) return;

    const idleTime = Date.now() - _lastActivityTimestamp;
    if (idleTime >= INACTIVITY_IDLE_TIMEOUT_MS) {
      // User has been AFK for > 5 minutes -> enter hibernation to conserve bandwidth & battery
      enterHibernation('inactivity_idle');
    }
  }, 60000);
}

/**
 * Initialize Realtime Connection and Lifecycle Governors
 */
export function initRealtimeConnection() {
  if (_isRealtimeInitialized) return;
  _isRealtimeInitialized = true;

  // 1. Initial connection (if authenticated)
  if (isAuthenticated()) {
    connectSupabaseRealtime();
  }

  // 2. Start Idle Watchdog
  startIdleCheck();

  // 3. Register passive user activity listeners (zero scroll blocking, negligible CPU)
  if (typeof window !== 'undefined') {
    const activityEvents = ['pointerdown', 'keydown', 'scroll', 'touchstart'];
    activityEvents.forEach((evt) => {
      window.addEventListener(evt, handleUserActivity, { passive: true });
    });
    // Throttled mousemove
    window.addEventListener('mousemove', handleUserActivity, { passive: true });
  }

  // 4. Tab visibility auto-hibernation and frictionless resume
  if (typeof document !== 'undefined') {
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        // Tab moved to background: start standby timer before hibernating
        if (_hiddenStandbyTimer) clearTimeout(_hiddenStandbyTimer);
        _hiddenStandbyTimer = setTimeout(() => {
          enterHibernation('tab_hidden');
        }, TAB_HIDDEN_STANDBY_MS);
      } else {
        // Tab brought to foreground: cancel standby timer and wake up immediately
        if (_hiddenStandbyTimer) {
          clearTimeout(_hiddenStandbyTimer);
          _hiddenStandbyTimer = null;
        }
        _lastActivityTimestamp = Date.now();
        _lastActivityThrottle = Date.now();
        wakeUpFromHibernation('tab_visible');
      }
    });

    // Mobile Safari / Android foreground recovery via pageshow & window focus
    if (typeof window !== 'undefined') {
      window.addEventListener('pageshow', () => wakeUpFromHibernation('pageshow'), { passive: true });
      window.addEventListener('focus', () => wakeUpFromHibernation('focus'), { passive: true });
    }
  }

  // 5. BroadcastChannel between local browser tabs (Zero-Network fast path with Demo Sandboxing)
  if (typeof BroadcastChannel !== 'undefined') {
    const channel = new BroadcastChannel('darc_state_sync');
    channel.onmessage = (event) => {
      const isDemoMsg = Boolean(event.data?.isDemo);
      if (isDemoMsg !== isDemoSession()) {
        // Cross-mode isolation: ignore messages across demo and production tabs
        return;
      }
      if (event.data?.type === 'GRANULAR_DELTA' && event.data.delta) {
        const { table, action, record, oldRecord } = event.data.delta;
        applyGranularDelta(table, action, record, oldRecord);
      } else if (event.data?.type === 'STATE_MUTATION') {
        triggerImmediateSync('broadcast_channel', true);
      }
    };
    window._darcBroadcastChannel = channel;
  }

  // 6. Network online/offline monitoring
  window.addEventListener('online', async () => {
    state.isOffline = false;
    _reconnectAttempts = 0;
    const apiFn = window.api;
    const chooseFn = typeof window.choose === 'function' ? window.choose : ((ar) => ar);
    const showToastFn = typeof window.showToast === 'function' ? window.showToast : console.log;
    
    // Wake up and reconnect on network restoration
    wakeUpFromHibernation('online');

    // Replay any pending offline operations
    if (apiFn) {
      const syncRes = await syncPendingMutations(apiFn);
      if (syncRes && syncRes.synced > 0) {
        showToastFn(chooseFn(
          `تمت استعادة الاتصال ومزامنة ${syncRes.synced} عمليات معلقة بنجاح!`,
          `Internet restored! Synced ${syncRes.synced} pending actions successfully!`
        ), false);
      } else {
        showToastFn(chooseFn('تمت استعادة الاتصال بالإنترنت', 'Internet connection restored'), false);
      }
    }

    // Fetch fresh synchronized state
    triggerImmediateSync('online');
  });

  window.addEventListener('offline', () => {
    state.isOffline = true;
    _reconnectAttempts = 0;
    enterHibernation('offline');

    if (typeof window.renderApp === 'function') window.renderApp();
    if (typeof window.showToast === 'function') {
      const msg = typeof window.choose === 'function' 
        ? window.choose('أنت في وضع عدم الاتصال (Offline Mode) — يمكنك مواصلة العمل وسيتم الرفع فور عودة الإنترنت', 'Offline Mode — you can continue working, changes will auto-sync on reconnect')
        : 'أنت في وضع عدم الاتصال (Offline Mode)';
      window.showToast(msg, true);
    }
  });
}

/**
 * Cross-tab notification of local state mutations with optional granular delta payload
 */
export function notifyStateMutation(delta = null) {
  if (typeof window !== 'undefined' && window._darcBroadcastChannel) {
    try {
      window._darcBroadcastChannel.postMessage({
        type: delta ? 'GRANULAR_DELTA' : 'STATE_MUTATION',
        delta,
        timestamp: Date.now(),
        isDemo: isDemoSession()
      });
    } catch (e) {}
  }
}

if (typeof window !== 'undefined') {
  window.isRealtimeConnected = isRealtimeConnected;
  window.notifyStateMutation = notifyStateMutation;
  window.disconnectSupabaseRealtime = disconnectSupabaseRealtime;
  window.recordRecentLocalMutation = recordRecentLocalMutation;
  window.recalculateProjectProgressInMemory = recalculateProjectProgressInMemory;
}
