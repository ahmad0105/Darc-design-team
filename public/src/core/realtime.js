// DARC Design Team — Realtime Sync Layer (Instant Multi-Client Collaboration)
import { state } from './state.js';
import { loadData } from './router.js';

let _syncDebounceTimer = null;
let _isRealtimeConnected = false;

export function triggerImmediateSync(source = 'realtime') {
  if (_syncDebounceTimer) clearTimeout(_syncDebounceTimer);
  _syncDebounceTimer = setTimeout(async () => {
    if (typeof document !== 'undefined' && document.hidden) return;
    if (!state.data || !state.view) return;
    try {
      await loadData(true); // Silent high-performance ETag sync
    } catch (e) {
      console.warn('[Realtime] Sync error:', e.message);
    }
  }, 250); // 250ms debounce window prevents multi-event hammering
}

export function initRealtimeConnection() {
  if (_isRealtimeConnected) return;
  _isRealtimeConnected = true;

  // Realtime BroadcastChannel between local tabs/windows
  if (typeof BroadcastChannel !== 'undefined') {
    const channel = new BroadcastChannel('darc_state_sync');
    channel.onmessage = (event) => {
      if (event.data?.type === 'STATE_MUTATION') {
        triggerImmediateSync('broadcast_channel');
      }
    };
    window._darcBroadcastChannel = channel;
  }

  // Network online/offline status monitoring
  window.addEventListener('online', () => {
    triggerImmediateSync('online');
    if (typeof showToast === 'function') {
      showToast('تمت استعادة الاتصال بالإنترنت', false);
    }
  });

  window.addEventListener('offline', () => {
    if (typeof showToast === 'function') {
      showToast('أنت في وضع عدم الاتصال بالإنترنت (Offline Mode)', true);
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
