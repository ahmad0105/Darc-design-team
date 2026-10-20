'use strict';

import { state } from './src/core/state.js?v=3.3';
import { api } from './src/core/api.js?v=3.3';

document.documentElement.dataset.theme = state.theme;

import * as UI from './src/shared/ui.js?v=3.3';
Object.assign(window, UI);
import * as Auth from './src/features/auth/auth.js?v=3.3';
Object.assign(window, Auth);
import * as Dashboard from './src/features/dashboard/dashboard.js?v=3.3';
Object.assign(window, Dashboard);
import * as Projects from './src/features/projects/projects.js?v=3.3';
Object.assign(window, Projects);
import * as Tasks from './src/features/tasks/tasks.js?v=3.3';
Object.assign(window, Tasks);
import * as Templates from './src/features/templates/templates.js?v=3.3';
Object.assign(window, Templates);
import * as Documents from './src/features/documents/documents.js?v=3.3';
Object.assign(window, Documents);
import * as Settings from './src/features/settings/settings.js?v=3.3';
Object.assign(window, Settings);
import * as Notifications from './src/features/notifications/notifications.js?v=3.3';
Object.assign(window, Notifications);
import * as Router from './src/core/router.js?v=3.3';
Object.assign(window, Router);
import * as Events from './src/core/events.js?v=3.3';
Object.assign(window, Events);
import * as Utils from './src/core/utils.js?v=3.3';
Object.assign(window, Utils);
import { setupGlobalShortcuts } from './src/features/dashboard/omnisearch.js?v=3.3';

import './src/core/dragdrop.js?v=3.3';

setupGlobalShortcuts();

document.addEventListener('click', (event) => { handleClick(event).catch((error) => showToast(error.message, true)); });
document.addEventListener('submit', (event) => { handleSubmit(event).catch((error) => showToast(error.message, true)); });
document.addEventListener('input', handleInput);
document.addEventListener('change', handleChange);
document.addEventListener('keydown', (event) => { if (event.key === 'Escape') closeModal(); });
window.addEventListener('resize', () => {
  if (state.view === 'project-detail' && state.projectTab === 'timeline') {
    drawTimelineArrows();
  }
});

// Global runtime error boundaries
window.addEventListener('error', (event) => {
  console.error("Runtime Error:", event.error);
  if (typeof showToast === 'function') showToast(`خطأ برمجي: ${event.message}`, true);
});

import { initRealtimeConnection } from './src/core/realtime.js';

// Register Service Worker for Offline-First PWA capabilities
if ('serviceWorker' in navigator && window.location.protocol.startsWith('http')) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch((err) => {
      console.warn('[PWA] ServiceWorker registration skipped:', err.message);
    });
  });
}

initRealtimeConnection();
init();

