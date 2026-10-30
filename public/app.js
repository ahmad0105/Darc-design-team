'use strict';

import { state } from './src/core/state.js';
import { api } from './src/core/api.js';

document.documentElement.dataset.theme = state.theme;
document.documentElement.lang = state.lang;
document.documentElement.dir = state.lang === 'ar' ? 'rtl' : 'ltr';
if (state.lang === 'en') {
  document.body.classList.add('is-ltr');
} else {
  document.body.classList.remove('is-ltr');
}

import * as UI from './src/shared/ui.js';
Object.assign(window, UI);
import * as Auth from './src/features/auth/auth.js';
Object.assign(window, Auth);
import * as Dashboard from './src/features/dashboard/dashboard.js';
Object.assign(window, Dashboard);
import * as Projects from './src/features/projects/projects.js';
Object.assign(window, Projects);
import * as Tasks from './src/features/tasks/tasks.js';
Object.assign(window, Tasks);
import * as Templates from './src/features/templates/templates.js';
Object.assign(window, Templates);
import * as Documents from './src/features/documents/documents.js';
Object.assign(window, Documents);
import * as Settings from './src/features/settings/settings.js';
Object.assign(window, Settings);
import * as Notifications from './src/features/notifications/notifications.js';
Object.assign(window, Notifications);
import * as Router from './src/core/router.js';
Object.assign(window, Router);
import * as Events from './src/core/events.js';
Object.assign(window, Events);
import * as Utils from './src/core/utils.js';
Object.assign(window, Utils);
import { setupGlobalShortcuts } from './src/features/dashboard/omnisearch.js';

import './src/core/dragdrop.js';

import { initRealtimeConnection } from './src/core/realtime.js';
import { initTelemetryEngine, recordBreadcrumb, reportClientError } from './src/core/telemetry.js';

setupGlobalShortcuts();

document.addEventListener('click', (event) => {
  const target = event.target.closest('[data-action], [data-view], button, a');
  if (target) {
    const desc = target.dataset.action || target.dataset.view || target.innerText?.trim()?.slice(0, 40) || target.tagName;
    recordBreadcrumb('ui.click', `النقر على: ${desc}`);
  }
  handleClick(event).catch((error) => {
    reportClientError(error, { source: 'handleClick' });
    showToast(error.message, true);
  });
});

document.addEventListener('submit', (event) => {
  const formId = event.target.id || event.target.dataset.action || 'form';
  recordBreadcrumb('form.submit', `إرسال نموذج: ${formId}`);
  handleSubmit(event).catch((error) => {
    reportClientError(error, { source: 'handleSubmit' });
    showToast(error.message, true);
  });
});

document.addEventListener('input', handleInput);
document.addEventListener('change', handleChange);
document.addEventListener('keydown', (event) => { if (event.key === 'Escape') closeModal(); });
let _resizeRaf = null;
window.addEventListener('resize', () => {
  if (state.view === 'project-detail' && state.projectTab === 'timeline') {
    if (!_resizeRaf) {
      _resizeRaf = requestAnimationFrame(() => {
        _resizeRaf = null;
        drawTimelineArrows();
      });
    }
  }
});

// Global runtime error boundaries with automated reporting & email alert trigger
window.addEventListener('error', (event) => {
  const msg = String(event?.message || event?.error?.message || '');
  if (
    msg.includes('Turnstile') || 
    msg.includes('turnstile') || 
    msg.includes('Script error') ||
    msg.includes('challenges.cloudflare.com') ||
    msg.includes('SafariExtensionMessageEvent') ||
    msg.includes('Blocked a frame with origin') ||
    msg.includes('No available adapters') ||
    msg.includes('ResizeObserver loop')
  ) {
    return;
  }
  console.error("Runtime Error:", event.error);
  reportClientError(event.error || { message: msg }, { source: 'window.onerror' });
  if (typeof showToast === 'function') showToast(`خطأ برمجي: ${event.message}`, true);
});

window.addEventListener('unhandledrejection', (event) => {
  const msg = String(event?.reason?.message || event?.reason || '');
  if (
    msg.includes('Turnstile') || 
    msg.includes('turnstile') || 
    msg.includes('Script error') ||
    msg.includes('challenges.cloudflare.com') ||
    msg.includes('SafariExtensionMessageEvent') ||
    msg.includes('Blocked a frame with origin') ||
    msg.includes('No available adapters') ||
    msg.includes('ResizeObserver loop')
  ) {
    return;
  }
  console.error("Unhandled Rejection:", event.reason);
  reportClientError(event.reason || { message: msg }, { source: 'unhandledrejection', errorType: 'UnhandledRejection' });
});

// Register Service Worker for Offline-First PWA capabilities
if ('serviceWorker' in navigator && window.location.protocol.startsWith('http')) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch((err) => {
      console.warn('[PWA] ServiceWorker registration skipped:', err.message);
    });
  });
}

initRealtimeConnection();
initTelemetryEngine();
init();

