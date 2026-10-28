import { state } from './state.js';
import { api, API_BASE } from './api.js';

let _sessionStartTime = Date.now();
let _activeSeconds = 0;
let _errorCount = 0;
let _longTaskCount = 0;
let _heartbeatTimer = null;
let _lastSyncTime = Date.now();

// Track active time only when the user is focused / tab is visible
if (typeof document !== 'undefined') {
  setInterval(() => {
    if (document.visibilityState === 'visible') {
      _activeSeconds++;
    }
  }, 1000);
}

// Track runtime errors for anomaly detection
if (typeof window !== 'undefined') {
  window.addEventListener('error', () => {
    _errorCount++;
    if (_errorCount >= 2) {
      sendHeartbeat(true);
    }
  });

  // Track long tasks (>50ms CPU blocking) if supported by browser
  try {
    if ('PerformanceObserver' in window && PerformanceObserver.supportedEntryTypes?.includes('longtask')) {
      const observer = new PerformanceObserver((list) => {
        _longTaskCount += list.getEntries().length;
      });
      observer.observe({ type: 'longtask', buffered: true });
    }
  } catch (e) {}

  // Sync on tab leave or close
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') {
      sendHeartbeat(false, true);
    }
  });

  window.addEventListener('pagehide', () => {
    sendHeartbeat(false, true);
  });
}

function getMemoryUsageMb() {
  if (typeof performance !== 'undefined' && performance.memory?.usedJSHeapSize) {
    return Math.round((performance.memory.usedJSHeapSize / (1024 * 1024)) * 10) / 10;
  }
  return 42.5; // Baseline estimate if browser shields precise memory API
}

export async function sendHeartbeat(isPriority = false, useBeacon = false) {
  const now = Date.now();
  const elapsedSinceSync = Math.max(5, Math.round((now - _lastSyncTime) / 1000));
  _lastSyncTime = now;

  const payload = {
    userId: state.data?.user?.id || 'anonymous',
    durationSeconds: elapsedSinceSync,
    memoryMb: getMemoryUsageMb(),
    errorCount: _errorCount,
    longTaskCount: _longTaskCount,
    currentView: state.view || 'dashboard'
  };

  // If memory is unusually high (>140MB), trigger priority sync
  if (payload.memoryMb > 140) {
    isPriority = true;
  }

  if (useBeacon && typeof navigator !== 'undefined' && navigator.sendBeacon) {
    try {
      const blob = new Blob([JSON.stringify(payload)], { type: 'application/json' });
      const targetUrl = (API_BASE || '') + '/api/telemetry/heartbeat';
      navigator.sendBeacon(targetUrl, blob);
      return;
    } catch (e) {}
  }

  try {
    const res = await api('/api/telemetry/heartbeat', {
      method: 'POST',
      body: JSON.stringify(payload),
      silent: true
    });
    // Reset transient counts once synced
    _errorCount = 0;
    _longTaskCount = 0;
    return res;
  } catch (e) {
    // Fail silently in telemetry
  }
}

export function initTelemetryEngine() {
  if (_heartbeatTimer) clearInterval(_heartbeatTimer);
  // Send initial heartbeat after 5 seconds of activity
  setTimeout(() => sendHeartbeat(false), 5000);
  // Recurring heartbeat every 45 seconds
  _heartbeatTimer = setInterval(() => {
    if (document.visibilityState === 'visible') {
      sendHeartbeat(false);
    }
  }, 45000);
}

export function getClientTelemetrySnapshot() {
  return {
    totalSessionDurationSeconds: Math.round((Date.now() - _sessionStartTime) / 1000),
    activeDurationSeconds: _activeSeconds,
    memoryMb: getMemoryUsageMb(),
    errorCount: _errorCount,
    longTaskCount: _longTaskCount
  };
}
