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
  window.addEventListener('online', async () => {
    state.isOffline = false;
    const { syncPendingMutations } = await import('./offline.js');
    const { api } = await import('./api.js');
    const { showToast, choose } = await import('./utils.js');
    
    // 1. Replay any pending offline operations
    const syncRes = await syncPendingMutations(api);
    if (syncRes && syncRes.synced > 0) {
      showToast(choose(
        `تمت استعادة الاتصال ومزامنة ${syncRes.synced} عمليات معلقة بنجاح! 🚀`,
        `Internet restored! Synced ${syncRes.synced} pending actions successfully! 🚀`
      ), false);
    } else {
      showToast(choose('تمت استعادة الاتصال بالإنترنت', 'Internet connection restored'), false);
    }

    // 2. Fetch fresh synchronized state from server
    triggerImmediateSync('online');
  });

  window.addEventListener('offline', async () => {
    state.isOffline = true;
    const { showToast, choose } = await import('./utils.js');
    const { renderApp } = await import('./router.js');
    renderApp();
    showToast(choose('أنت في وضع عدم الاتصال (Offline Mode) — يمكنك مواصلة العمل وسيتم الرفع فور عودة الإنترنت', 'Offline Mode — you can continue working, changes will auto-sync on reconnect'), true);
  });
}

export function notifyStateMutation() {
  if (window._darcBroadcastChannel) {
    try {
      window._darcBroadcastChannel.postMessage({ type: 'STATE_MUTATION', timestamp: Date.now() });
    } catch (e) {}
  }
}
