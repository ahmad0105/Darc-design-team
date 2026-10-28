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

setupGlobalShortcuts();

document.addEventListener('click', (event) => { handleClick(event).catch((error) => showToast(error.message, true)); });
document.addEventListener('submit', (event) => { handleSubmit(event).catch((error) => showToast(error.message, true)); });
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

// Global runtime error boundaries
window.addEventListener('error', (event) => {
  const msg = String(event?.message || event?.error?.message || '');
  if (msg.includes('Turnstile') || msg.includes('turnstile') || msg.includes('Script error')) {
    return;
  }
  console.error("Runtime Error:", event.error);
  if (typeof showToast === 'function') showToast(`خطأ برمجي: ${event.message}`, true);
});

import { initRealtimeConnection } from './src/core/realtime.js';
import { initTelemetryEngine } from './src/core/telemetry.js';

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

