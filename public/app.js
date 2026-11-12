'use strict';

import { state } from './src/core/state.js';
import { api } from './src/core/api.js';

// Protect runtime state from arbitrary external tampering while preserving read compatibility
Object.defineProperty(window, 'state', {
  value: state,
  writable: false,
  configurable: true,
  enumerable: false
});

document.documentElement.dataset.theme = state.theme;
document.documentElement.lang = state.lang;
document.documentElement.dir = state.lang === 'ar' ? 'rtl' : 'ltr';
if (state.lang === 'en') {
  document.body.classList.add('is-ltr');
} else {
  document.body.classList.remove('is-ltr');
}

import * as UI from './src/shared/ui.js';
import { showToast, closeModal } from './src/shared/ui.js';
import * as Navbar from './src/shared/navbar.js';
import * as Sidebar from './src/shared/sidebar.js';
import * as Auth from './src/features/auth/auth.js';
import * as Dashboard from './src/features/dashboard/dashboard.js';
import * as Projects from './src/features/projects/projects.js';
import * as Tasks from './src/features/tasks/tasks.js';
import { drawTimelineArrows } from './src/features/tasks/tasks.js';
import * as Templates from './src/features/templates/templates.js';
import * as Documents from './src/features/documents/documents.js';
import * as Settings from './src/features/settings/settings.js';
import * as Reports from './src/features/reports/reports.js';
import * as Notifications from './src/features/notifications/notifications.js';
import * as Router from './src/core/router.js';
import * as Events from './src/core/events.js';
import { handleClick, handleSubmit, handleInput, handleChange, init } from './src/core/events.js';
import * as Utils from './src/core/utils.js';
import { setupGlobalShortcuts } from './src/features/dashboard/omnisearch.js';

// Enterprise Modular Registry: cleanly encapsulate all sub-modules
export const DarcApp = Object.freeze({
  UI, Navbar, Sidebar, Auth, Dashboard, Projects, Tasks,
  Templates, Documents, Settings, Reports, Notifications,
  Router, Events, Utils, state, api
});

// Non-enumerable, tamper-resistant internal namespace for telemetry & debugging
Object.defineProperty(window, '__darc', {
  value: DarcApp,
  writable: false,
  configurable: false,
  enumerable: false
});

// Dual-layer Bridge: non-enumerable fallback access to prevent legacy DOM breakage
// while eliminating global enumerable pollution and third-party extension harvesting.
const _legacyBridge = {
  ...UI, ...Navbar, ...Sidebar, ...Auth, ...Dashboard, ...Projects, ...Tasks,
  ...Templates, ...Documents, ...Settings, ...Reports, ...Notifications,
  ...Router, ...Events, ...Utils
};

for (const [key, value] of Object.entries(_legacyBridge)) {
  if (!(key in window)) {
    Object.defineProperty(window, key, {
      value,
      writable: true,
      configurable: true,
      enumerable: false
    });
  }
}

import './src/core/dragdrop.js';

import { initRealtimeConnection } from './src/core/realtime.js';
import { initTelemetryEngine, recordBreadcrumb, reportClientError } from './src/core/telemetry.js';

window._recentlyMovedTasks = window._recentlyMovedTasks || new Map();
setupGlobalShortcuts();

document.addEventListener('click', (event) => {
  const target = event.target.closest('[data-action], [data-view], button, a');
  if (target) {
    const desc = target.dataset.action || target.dataset.view || target.innerText?.trim()?.slice(0, 40) || target.tagName;
    recordBreadcrumb('ui.click', `النقر على: ${desc}`);
  }
  if (typeof handleClick === 'function') {
    handleClick(event).catch((error) => {
      reportClientError(error, { source: 'handleClick' });
      if (typeof showToast === 'function') showToast(error.message, true);
    });
  }
});

document.addEventListener('submit', (event) => {
  const formId = event.target.id || event.target.dataset.action || 'form';
  recordBreadcrumb('form.submit', `إرسال نموذج: ${formId}`);
  if (typeof handleSubmit === 'function') {
    handleSubmit(event).catch((error) => {
      reportClientError(error, { source: 'handleSubmit' });
      if (typeof showToast === 'function') showToast(error.message, true);
    });
  }
});

document.addEventListener('input', (e) => {
  try {
    if (typeof handleInput === 'function') handleInput(e);
  } catch (error) {
    reportClientError(error, { source: 'handleInput' });
  }
});
document.addEventListener('change', (e) => {
  if (typeof handleChange === 'function') {
    Promise.resolve(handleChange(e)).catch((error) => {
      reportClientError(error, { source: 'handleChange' });
      if (typeof showToast === 'function') showToast(error.message, true);
    });
  }
});
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && typeof closeModal === 'function') closeModal();
});
let _resizeRaf = null;
window.addEventListener('resize', () => {
  if (state.view === 'project-detail' && state.projectTab === 'timeline') {
    if (!_resizeRaf) {
      _resizeRaf = requestAnimationFrame(() => {
        _resizeRaf = null;
        if (typeof drawTimelineArrows === 'function') drawTimelineArrows();
      });
    }
  }
});

// Global runtime error boundaries with automated reporting & email alert trigger
const _noisePatterns = [
  'Turnstile', 'turnstile', 'Script error',
  'challenges.cloudflare.com', 'SafariExtensionMessageEvent',
  'Blocked a frame with origin', 'No available adapters', 'ResizeObserver loop',
];
const _isNoise = (msg) => _noisePatterns.some((p) => String(msg).includes(p));

window.addEventListener('error', (event) => {
  const msg = event?.message || event?.error?.message || '';
  if (_isNoise(msg)) return;
  console.error('Runtime Error:', event.error);
  reportClientError(event.error || { message: msg }, { source: 'window.onerror' });
  if (typeof showToast === 'function') showToast(`خطأ برمجي: ${event.message}`, true);
});

window.addEventListener('unhandledrejection', (event) => {
  const msg = event?.reason?.message || event?.reason || '';
  if (_isNoise(msg)) return;
  console.error('Unhandled Rejection:', event.reason);
  reportClientError(event.reason || { message: msg }, { source: 'unhandledrejection', errorType: 'UnhandledRejection' });
});

// Register Service Worker for Offline-First PWA capabilities
if ('serviceWorker' in navigator && window.location.protocol.startsWith('http')) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').then((registration) => {
      registration.addEventListener('updatefound', () => {
        const installingWorker = registration.installing;
        if (installingWorker) {
          installingWorker.addEventListener('statechange', () => {
            if (installingWorker.state === 'installed' && navigator.serviceWorker.controller) {
              console.log('[PWA] New version ready for next visit.');
            }
          });
        }
      });
    }).catch((err) => {
      console.warn('[PWA] ServiceWorker registration skipped:', err.message);
    });
  });
}

initRealtimeConnection();
initTelemetryEngine();
init();
