// DARC Design Team — Realtime Sync Layer (Instant Multi-Client Collaboration)
import { state } from './state.js';
import { loadData } from './router.js';
import { syncPendingMutations } from './offline.js';

const SUPABASE_WS_ENDPOINT = 'wss://yjfmrpwkjstxldnwegob.supabase.co/realtime/v1/websocket?apikey=sb_publishable_Zr7mRIWo5djcRpwq4Ihl0A_Eb3AA8gJ&vsn=1.0.0';

let _syncDebounceTimer = null;
let _isRealtimeConnected = false;
let _ws = null;
let _wsHeartbeatTimer = null;
let _wsReconnectTimer = null;
let _wsMsgRef = 0;
let _reconnectAttempts = 0;

export function triggerImmediateSync(source = 'realtime') {
  if (_syncDebounceTimer) clearTimeout(_syncDebounceTimer);
  _syncDebounceTimer = setTimeout(async () => {
    if (typeof document !== 'undefined' && document.hidden) return;
    if (!state.data || !state.view) return;
    try {
      await loadData(true); // Silent high-performance ETag sync (304 if unchanged)
    } catch (e) {
      console.warn(`[Realtime:${source}] Sync error:`, e.message);
    }
  }, 250); // 250ms debounce window prevents multi-event hammering
}

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

function startWsHeartbeat(ws) {
  if (_wsHeartbeatTimer) clearInterval(_wsHeartbeatTimer);
  _wsHeartbeatTimer = setInterval(() => {
    if (ws && ws.readyState === WebSocket.OPEN) {
      sendWsMessage(ws, 'phoenix', 'heartbeat');
    }
  }, 25000); // 25s keep-alive interval
}

function stopWsHeartbeat() {
  if (_wsHeartbeatTimer) {
    clearInterval(_wsHeartbeatTimer);
    _wsHeartbeatTimer = null;
  }
}

function connectSupabaseRealtime() {
  if (typeof WebSocket === 'undefined') return;
  if (typeof navigator !== 'undefined' && !navigator.onLine) return;
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

      // 2. Join PostgreSQL Change Data Capture Channels for Core Entities
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

        // Ignore system joins and heartbeats
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

      // Exponential backoff reconnection (1s -> 2s -> 4s -> max 30s)
      if (typeof navigator !== 'undefined' && navigator.onLine) {
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

export function initRealtimeConnection() {
  if (_isRealtimeConnected) return;
  _isRealtimeConnected = true;

  // 1. Initialize Supabase Realtime WebSocket connection
  connectSupabaseRealtime();

  // 2. Realtime BroadcastChannel between local tabs/windows
  if (typeof BroadcastChannel !== 'undefined') {
    const channel = new BroadcastChannel('darc_state_sync');
    channel.onmessage = (event) => {
      if (event.data?.type === 'STATE_MUTATION') {
        triggerImmediateSync('broadcast_channel');
      }
    };
    window._darcBroadcastChannel = channel;
  }

  // 3. Tab visibility auto-refresh and reconnect
  if (typeof document !== 'undefined') {
    document.addEventListener('visibilitychange', () => {
      if (!document.hidden) {
        // Tab brought to foreground: immediately sync and verify WebSocket health
        triggerImmediateSync('visibility_focus');
        if (!_ws || _ws.readyState === WebSocket.CLOSED) {
          connectSupabaseRealtime();
        }
      }
    });
  }

  // 4. Network online/offline status monitoring
  window.addEventListener('online', async () => {
    state.isOffline = false;
    const apiFn = window.api;
    const chooseFn = typeof window.choose === 'function' ? window.choose : ((ar) => ar);
    const showToastFn = typeof window.showToast === 'function' ? window.showToast : console.log;
    
    // Connect WebSocket immediately on network restoration
    connectSupabaseRealtime();

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

    // Fetch fresh synchronized state from server
    triggerImmediateSync('online');
  });

  window.addEventListener('offline', () => {
    state.isOffline = true;
    stopWsHeartbeat();
    if (_ws) {
      try { _ws.close(); } catch (e) {}
      _ws = null;
    }
    if (typeof window.renderApp === 'function') window.renderApp();
    if (typeof window.showToast === 'function') {
      const msg = typeof window.choose === 'function' 
        ? window.choose('أنت في وضع عدم الاتصال (Offline Mode) — يمكنك مواصلة العمل وسيتم الرفع فور عودة الإنترنت', 'Offline Mode — you can continue working, changes will auto-sync on reconnect')
        : 'أنت في وضع عدم الاتصال (Offline Mode)';
      window.showToast(msg, true);
    }
  });
}

export function notifyStateMutation() {
  if (window._darcBroadcastChannel) {
    try {
      window._darcBroadcastChannel.postMessage({ type: 'STATE_MUTATION', timestamp: Date.now() });
    } catch (e) {}
  }
}

if (typeof window !== 'undefined') {
  window.notifyStateMutation = notifyStateMutation;
}
