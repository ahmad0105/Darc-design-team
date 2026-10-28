import { state } from './state.js';
import { api, API_BASE } from './api.js';

let _sessionStartTime = Date.now();
let _activeSeconds = 0;
let _errorCount = 0;
let _longTaskCount = 0;
let _heartbeatTimer = null;
let _lastSyncTime = Date.now();
const _breadcrumbs = [];

// Breadcrumb recorder (captures the last 15 user actions for debugging)
export function recordBreadcrumb(category = 'action', message = '', metadata = null) {
  const d = new Date();
  const time = d.toTimeString().split(' ')[0]; // HH:mm:ss
  _breadcrumbs.push({
    time,
    category,
    message: String(message || '').slice(0, 150),
    metadata: metadata ? JSON.stringify(metadata).slice(0, 200) : null
  });
  if (_breadcrumbs.length > 15) {
    _breadcrumbs.shift();
  }
}

export function getRecentBreadcrumbs() {
  return [..._breadcrumbs];
}

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

function getClientPlatform() {
  if (typeof navigator === 'undefined') return { os: 'Unknown', browser: 'Unknown' };
  const ua = navigator.userAgent;
  let browser = 'Chrome';
  if (ua.includes('Edg/')) browser = 'Edge';
  else if (ua.includes('Safari/') && !ua.includes('Chrome/')) browser = 'Safari';
  else if (ua.includes('Firefox/')) browser = 'Firefox';

  let os = 'macOS';
  if (ua.includes('Win')) os = 'Windows';
  else if (ua.includes('Android')) os = 'Android';
  else if (ua.includes('iPhone') || ua.includes('iPad')) os = 'iOS';
  else if (ua.includes('Linux')) os = 'Linux';

  return { os, browser };
}

function getDeviceType() {
  if (typeof window === 'undefined') return 'desktop';
  const width = window.innerWidth;
  if (width < 768) return 'mobile';
  if (width < 1024) return 'tablet';
  return 'desktop';
}

/**
 * Dispatches an error report to the backend with complete client context,
 * triggering automatic email alerting and in-app diagnostics logging.
 */
export async function reportClientError(error, context = {}) {
  _errorCount++;
  const { os, browser } = getClientPlatform();
  const deviceType = getDeviceType();
  const screenResolution = typeof window !== 'undefined' && window.screen
    ? `${window.screen.width} x ${window.screen.height} (Scale: ${window.devicePixelRatio || 1}x)`
    : 'Unknown';

  const errObj = error || {};
  const errorMessage = String(errObj.message || errObj.reason || errObj || 'Unknown client error');
  const stackTrace = String(errObj.stack || context.stack || 'No stack trace provided.');
  const errorType = errObj.name || context.errorType || 'ClientRuntimeError';

  // Record into breadcrumbs
  recordBreadcrumb('error', `${errorType}: ${errorMessage}`);

  const user = state.data?.user || {};
  const payload = {
    userId: user.id || 'usr_demo',
    userName: user.name || 'مدير التوظيف / زائر',
    userEmail: user.email || 'demo@darc-design.bond',
    userRole: user.jobTitleAr || state.data?.role?.nameAr || 'مهندس مساحة العمل',
    avatarColor: user.avatarColor || '#0d6269',
    errorType,
    errorMessage,
    stackTrace,
    deviceType,
    browser,
    os,
    screenResolution,
    memoryMb: getMemoryUsageMb(),
    currentView: state.view ? `#${state.view}` : (typeof window !== 'undefined' ? window.location.hash || '#dashboard' : '#dashboard'),
    breadcrumbs: getRecentBreadcrumbs(),
    severity: context.severity || 'high',
    titleAr: context.titleAr || `خطأ تشغيلي في مساحة العمل (${errorType})`,
    titleEn: context.titleEn || `Workspace Runtime Error (${errorType})`
  };

  try {
    const res = await api('/api/telemetry/report-error', {
      method: 'POST',
      body: JSON.stringify(payload),
      silent: true
    });
    return res;
  } catch (err) {
    // If regular fetch fails or page is tearing down, attempt beacon
    if (typeof navigator !== 'undefined' && navigator.sendBeacon) {
      try {
        const blob = new Blob([JSON.stringify(payload)], { type: 'application/json' });
        navigator.sendBeacon((API_BASE || '') + '/api/telemetry/report-error', blob);
      } catch (e) {}
    }
  }
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
    longTaskCount: _longTaskCount,
    recentBreadcrumbs: getRecentBreadcrumbs()
  };
}
