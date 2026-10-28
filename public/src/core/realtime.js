// DARC Design Team — Intelligent Realtime Sync & Resource Optimizer
// High Performance | Zero-Waste Idle Detection | Auto-Hibernation | Sub-50ms CDC Sync

import { state } from './state.js';
import { loadData } from './router.js';
import { syncPendingMutations } from './offline.js';

const SUPABASE_WS_ENDPOINT = 'wss://yjfmrpwkjstxldnwegob.supabase.co/realtime/v1/websocket?apikey=sb_publishable_Zr7mRIWo5djcRpwq4Ihl0A_Eb3AA8gJ&vsn=1.0.0';

// Configuration thresholds
const INACTIVITY_IDLE_TIMEOUT_MS = 5 * 60 * 1000; // 5 minutes without user activity -> Hibernate
const TAB_HIDDEN_STANDBY_MS = 30 * 1000;           // 30 seconds in background tab -> Hibernate
const SYNC_DEBOUNCE_MS = 300;                      // 300ms window to batch multi-event mutations
const HEARTBEAT_INTERVAL_MS = 25 * 1000;           // 25s keepalive ping while actively working

let _syncDebounceTimer = null;
let _isRealtimeInitialized = false;
let _ws = null;
let _wsHeartbeatTimer = null;
let _wsReconnectTimer = null;
let _idleCheckTimer = null;
let _hiddenStandbyTimer = null;
let _wsMsgRef = 0;
let _reconnectAttempts = 0;
let _isHibernating = false;
let _lastActivityTimestamp = Date.now();
let _lastActivityThrottle = 0;

/**
 * Check if the client is currently authenticated
 */
function isAuthenticated() {
  if (typeof localStorage === 'undefined') return false;
  return Boolean(localStorage.getItem('darc_token'));
}

/**
 * Debounced silent state synchronization using ETag validation
 */
export function triggerImmediateSync(source = 'realtime') {
  if (!isAuthenticated()) return;
  if (_isHibernating && source !== 'tab_visible' && source !== 'user_active' && source !== 'online') return;
  if (typeof document !== 'undefined' && document.hidden) return;
  if (!state.data || !state.view) return;

  if (_syncDebounceTimer) clearTimeout(_syncDebounceTimer);
  _syncDebounceTimer = setTimeout(async () => {
    try {
      await loadData(true); // Silent high-performance ETag sync (HTTP 304 if unchanged)
    } catch (e) {
      console.warn(`[Realtime:${source}] Sync error:`, e.message);
    }
  }, SYNC_DEBOUNCE_MS);
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
 * Start keep-alive heartbeat loop
 */
function startWsHeartbeat(ws) {
  stopWsHeartbeat();
  _wsHeartbeatTimer = setInterval(() => {
    if (ws && ws.readyState === WebSocket.OPEN) {
      sendWsMessage(ws, 'phoenix', 'heartbeat');
    }
  }, HEARTBEAT_INTERVAL_MS);
}

/**
 * Stop heartbeat loop to save battery and network
 */
function stopWsHeartbeat() {
  if (_wsHeartbeatTimer) {
    clearInterval(_wsHeartbeatTimer);
    _wsHeartbeatTimer = null;
  }
}

/**
 * Disconnect WebSocket cleanly and release network resources
 */
export function disconnectSupabaseRealtime(reason = 'disconnect') {
  stopWsHeartbeat();
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

  // Re-establish connection if closed
  if (!_ws || _ws.readyState === WebSocket.CLOSED || _ws.readyState === WebSocket.CLOSING) {
    connectSupabaseRealtime();
  }

  // If we were sleeping, perform immediate catch-up sync for any missed mutations
  if (wasHibernating || source === 'tab_visible') {
    triggerImmediateSync(source);
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
  if (_ws && (_ws.readyState === WebSocket.CONNECTING || _ws.readyState === WebSocket.OPEN)) return;

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
        const msg = JSON.parse(event.data);
        const { event: evt, topic } = msg;

        // Ignore internal protocol acknowledgments and heartbeats
        if (evt === 'phx_reply' || evt === 'phx_close') return;

        // Trigger sync when broadcast mutation or DB CDC event is detected
        if (
          evt === 'broadcast' || 
          evt === 'postgres_changes' || 
          evt === 'INSERT' || 
          evt === 'UPDATE' || 
          evt === 'DELETE' || 
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

    ws.onclose = () => {
      stopWsHeartbeat();
      _ws = null;

      // Only attempt reconnection if NOT hibernating, authenticated, and online
      if (!_isHibernating && isAuthenticated() && typeof navigator !== 'undefined' && navigator.onLine) {
        _reconnectAttempts++;
        const delay = Math.min(30000, Math.pow(2, Math.min(_reconnectAttempts, 5)) * 1000);
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
    _lastActivityThrottle = now;
    _lastActivityTimestamp = now;

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
        // Tab moved to background: start 30s standby timer before hibernating
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
  }

  // 5. BroadcastChannel between local browser tabs (Zero-Network fast path)
  if (typeof BroadcastChannel !== 'undefined') {
    const channel = new BroadcastChannel('darc_state_sync');
    channel.onmessage = (event) => {
      if (event.data?.type === 'STATE_MUTATION') {
        triggerImmediateSync('broadcast_channel');
      }
    };
    window._darcBroadcastChannel = channel;
  }

  // 6. Network online/offline monitoring
  window.addEventListener('online', async () => {
    state.isOffline = false;
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
          `تمت استعادة الاتصال ومزامنة ${syncRes.synced} عمليات معلقة بنجاح! 🚀`,
          `Internet restored! Synced ${syncRes.synced} pending actions successfully! 🚀`
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
 * Cross-tab notification of local state mutations
 */
export function notifyStateMutation() {
  if (window._darcBroadcastChannel) {
    try {
      window._darcBroadcastChannel.postMessage({ type: 'STATE_MUTATION', timestamp: Date.now() });
    } catch (e) {}
  }
}

if (typeof window !== 'undefined') {
  window.notifyStateMutation = notifyStateMutation;
  window.disconnectSupabaseRealtime = disconnectSupabaseRealtime;
}
