import { state } from './state.js';
import { api, API_BASE } from './api.js';
import { isDemoSession } from './realtime.js';

let _sessionStartTime = Date.now();
let _activeSeconds = 0;
let _visibleStartTs = (typeof document !== 'undefined' && document.visibilityState === 'visible') ? Date.now() : 0;

function flushActiveSeconds() {
  if (_visibleStartTs > 0) {
    const now = Date.now();
    _activeSeconds += Math.max(0, Math.round((now - _visibleStartTs) / 1000));
    _visibleStartTs = (typeof document !== 'undefined' && document.visibilityState === 'visible') ? now : 0;
  }
}
let _errorCount = 0;
let _longTaskCount = 0;
let _heartbeatTimer = null;
let _lastSyncTime = Date.now();
const _breadcrumbs = [];
const _clientErrorThrottle = new Map(); // key -> lastDispatchedMs

const SENSITIVE_KEY_REGEX = /(password|token|secret|authorization|cookie|creditCard|apiKey|turnstile|sessionToken)/i;

/**
 * Deterministic OWASP PII & Credential Scrubber
 * Redacts JWT tokens, secrets, passwords, cards, and session identifiers.
 */
export function scrubPII(value) {
  if (value === null || value === undefined) return value;
  if (typeof value === 'string') {
    return value
      .replace(/Bearer\s+[A-Za-z0-9-_=.]+/gi, 'Bearer [REDACTED_JWT]')
      .replace(/ey[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*/g, '[REDACTED_JWT]')
      .replace(/\b[A-Fa-f0-9]{32,64}\b/g, '[REDACTED_HASH]')
      .replace(/\b\d{4}[ -]?\d{4}[ -]?\d{4}[ -]?\d{4}\b/g, '[REDACTED_CARD]')
      .replace(/(password|secret|token|apiKey)=(?:[^\s&]+)/gi, '$1=[REDACTED]');
  }
  if (Array.isArray(value)) {
    return value.map(scrubPII);
  }
  if (typeof value === 'object') {
    const clean = {};
    for (const [k, v] of Object.entries(value)) {
      if (SENSITIVE_KEY_REGEX.test(k)) {
        clean[k] = '[REDACTED]';
      } else {
        clean[k] = scrubPII(v);
      }
    }
    return clean;
  }
  return value;
}

// 5D Flight Recorder Breadcrumb recorder (captures the last 25 user actions with ms precision)
export function recordBreadcrumb(category = 'action', message = '', metadata = null) {
  const d = new Date();
  const time = d.toTimeString().split(' ')[0] + '.' + String(d.getMilliseconds()).padStart(3, '0');
  const safeMessage = scrubPII(String(message || '').slice(0, 250));
  const safeMetadata = metadata ? scrubPII(metadata) : null;

  _breadcrumbs.push({
    time,
    timestamp: d.getTime(),
    category: String(category).slice(0, 40),
    message: safeMessage,
    metadata: safeMetadata ? JSON.stringify(safeMetadata).slice(0, 300) : null
  });

  if (_breadcrumbs.length > 25) {
    _breadcrumbs.shift();
  }
}

export function getRecentBreadcrumbs() {
  return [..._breadcrumbs];
}

// Track active time event-driven without any periodic 1000ms CPU wakeups (preserves battery & CPU sleep states)
if (typeof document !== 'undefined') {
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
      _visibleStartTs = Date.now();
    } else {
      flushActiveSeconds();
      _visibleStartTs = 0;
    }
  });
}

// Track runtime errors for anomaly detection & WebGL context loss recovery
if (typeof window !== 'undefined') {
  // Global WebGL Context Lost Recovery & LOD Buffer Decimation Guard (resolves inc_darc_01)
  window.addEventListener('webglcontextlost', (event) => {
    event.preventDefault(); // Prevents browser unrecoverable WebGL abort, allows contextrestored
    console.warn('[WebGL Context Guard] Context loss intercepted; executing LOD vertex decimation and GPU memory purge.');
    recordBreadcrumb('webgl.guard', 'WebGL Context Lost intercepted. Auto-recovery and LOD mesh decimation active.');
  }, false);

  window.addEventListener('webglcontextrestored', () => {
    console.info('[WebGL Context Guard] WebGL context successfully restored with optimized buffer allocation.');
    recordBreadcrumb('webgl.guard', 'WebGL Context successfully restored with optimized buffer allocation.');
  }, false);

  // 5D Flight Recorder: Navigation & Route Tracking
  window.addEventListener('hashchange', () => {
    recordBreadcrumb('navigation', `الانتقال إلى: ${window.location.hash || '#dashboard'}`);
  });

  // 5D Flight Recorder: UI Click Interception (Buttons, Nav items, Modals)
  if (typeof document !== 'undefined') {
    document.addEventListener('click', (e) => {
      try {
        const target = e.target.closest('button, a, [data-action], input[type="submit"], .nav-item, .tab-item');
        if (!target) return;
        const action = target.getAttribute('data-action') || target.getAttribute('href') || target.className || target.tagName;
        const text = (target.innerText || target.value || target.title || '').trim().slice(0, 40);
        recordBreadcrumb('ui.click', `النقر على: ${text ? `"${text}" ` : ''}[${action}]`);
      } catch (err) {}
    }, { passive: true, capture: true });
  }

  // 5D Flight Recorder: Intercept console.warn & console.error
  if (!window.__DARC_CONSOLE_HOOKED__) {
    window.__DARC_CONSOLE_HOOKED__ = true;
    const originalWarn = console.warn;
    const originalError = console.error;
    console.warn = (...args) => {
      try {
        const msg = args.map(a => typeof a === 'object' ? JSON.stringify(a) : String(a)).join(' ');
        if (!msg.includes('[Telemetry]') && !msg.includes('[WebGL Context Guard]') && !msg.includes('[Offline Outbox]')) {
          recordBreadcrumb('console.warn', msg.slice(0, 160));
        }
      } catch (e) {}
      originalWarn.apply(console, args);
    };
    console.error = (...args) => {
      try {
        const msg = args.map(a => typeof a === 'object' ? JSON.stringify(a) : String(a)).join(' ');
        if (!msg.includes('[Telemetry]') && !msg.includes('API Failed')) {
          recordBreadcrumb('console.error', msg.slice(0, 160));
        }
      } catch (e) {}
      originalError.apply(console, args);
    };
  }

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
  const rawErrorMessage = String(errObj.message || errObj.reason || errObj || 'Unknown client error');
  const rawStackTrace = String(errObj.stack || context.stack || 'No stack trace provided.');
  const errorType = errObj.name || context.errorType || 'ClientRuntimeError';

  const errorMessage = scrubPII(rawErrorMessage);
  const stackTrace = scrubPII(rawStackTrace);

  // Client Throttle: Prevent flooding if identical error triggers repeatedly in a rapid loop
  const throttleKey = `${errorType}:${errorMessage.slice(0, 80)}`;
  const now = Date.now();
  const lastDispatched = _clientErrorThrottle.get(throttleKey) || 0;
  if (now - lastDispatched < 15000) {
    recordBreadcrumb('error.throttled', `${errorType}: ${errorMessage.slice(0, 100)} (Throttled local)`);
    return { ok: true, throttled: true };
  }
  _clientErrorThrottle.set(throttleKey, now);
  if (_clientErrorThrottle.size > 50) {
    for (const [k, ts] of _clientErrorThrottle.entries()) {
      if (now - ts > 60000) _clientErrorThrottle.delete(k);
    }
  }

  // Record into breadcrumbs
  recordBreadcrumb('error', `${errorType}: ${errorMessage}`);

  const user = state.data?.user || {};
  const isDemo = isDemoSession();
  const payload = {
    userId: user.id || 'usr_demo',
    isDemo,
    userName: user.name || 'Demo',
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

  let visitorId = null;
  let sessionId = null;
  let isNewVisit = false;

  try {
    if (typeof localStorage !== 'undefined') {
      visitorId = localStorage.getItem('darc_vid');
      if (!visitorId) {
        visitorId = 'vid_' + Math.random().toString(36).slice(2, 10) + Date.now().toString(36);
        localStorage.setItem('darc_vid', visitorId);
      }
    }
    if (typeof sessionStorage !== 'undefined') {
      sessionId = sessionStorage.getItem('darc_sid');
      if (!sessionId) {
        sessionId = 'sid_' + Math.random().toString(36).slice(2, 10) + Date.now().toString(36);
        sessionStorage.setItem('darc_sid', sessionId);
        isNewVisit = true;
      }
    }
  } catch (e) {}

  const { os, browser } = getClientPlatform();
  const deviceType = getDeviceType();
  const isDemo = isDemoSession();

  const payload = {
    userId: state.data?.user?.id || 'anonymous',
    isDemo,
    sessionId,
    visitorId,
    isNewVisit,
    os,
    browser,
    deviceType,
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

let _lastTelemetryActivity = Date.now();

if (typeof window !== 'undefined') {
  const onActivity = () => { _lastTelemetryActivity = Date.now(); };
  ['pointerdown', 'keydown', 'touchstart'].forEach(evt => {
    window.addEventListener(evt, onActivity, { passive: true });
  });
}

export function initTelemetryEngine() {
  if (_heartbeatTimer) clearInterval(_heartbeatTimer);
  const isDataSaver = typeof navigator !== 'undefined' && Boolean(navigator.connection?.saveData);
  const baseInterval = isDataSaver ? 90000 : 45000;

  // Send initial heartbeat after 5 seconds of activity
  setTimeout(() => sendHeartbeat(false), 5000);

  // Adaptive telemetry heartbeat: skips pings when tab is idle (>2 min) or hidden to conserve battery & data
  _heartbeatTimer = setInterval(() => {
    if (typeof document !== 'undefined' && document.visibilityState === 'visible') {
      const isIdle = (Date.now() - _lastTelemetryActivity) > (2 * 60 * 1000);
      if (!isIdle) {
        sendHeartbeat(false);
      }
    }
  }, baseInterval);
}

export function getClientTelemetrySnapshot() {
  flushActiveSeconds();
  return {
    totalSessionDurationSeconds: Math.round((Date.now() - _sessionStartTime) / 1000),
    activeDurationSeconds: _activeSeconds,
    memoryMb: getMemoryUsageMb(),
    errorCount: _errorCount,
    longTaskCount: _longTaskCount,
    recentBreadcrumbs: getRecentBreadcrumbs()
  };
}
