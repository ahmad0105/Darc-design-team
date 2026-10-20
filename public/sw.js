// DARC Design Team — Service Worker (Offline-First Cache v3.6)
const CACHE_NAME = 'darc-cache-v3.6';
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/styles.css',
  '/app.js',
  '/manifest.json',
  '/src/core/state.js',
  '/src/core/api.js',
  '/src/core/offline.js',
  '/src/core/realtime.js',
  '/src/core/router.js',
  '/src/core/events.js',
  '/src/core/utils.js',
  '/src/core/dragdrop.js',
  '/src/shared/ui.js',
  '/src/features/auth/auth.js',
  '/src/features/dashboard/dashboard.js',
  '/src/features/dashboard/omnisearch.js',
  '/src/features/projects/projects.js',
  '/src/features/tasks/tasks.js',
  '/src/features/documents/documents.js',
  '/src/features/templates/templates.js',
  '/src/features/settings/settings.js',
  '/src/features/notifications/notifications.js'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS.map((url) => new Request(url, { cache: 'reload' })));
    }).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // Do not intercept mutations (POST/PATCH/DELETE), API calls, or external streaming
  // API caching and offline persistence are managed by public/src/core/offline.js
  if (event.request.method !== 'GET') return;
  if (url.pathname.startsWith('/api/')) return;

    event.respondWith(
      caches.match(event.request).then((cachedResponse) => {
        if (cachedResponse) {
          // Serve from cache immediately, update cache in background
          fetch(event.request)
            .then((networkResponse) => {
              if (networkResponse && (networkResponse.status === 200 || networkResponse.type === 'opaque')) {
                const responseToCache = networkResponse.clone();
                caches.open(CACHE_NAME).then((cache) => cache.put(event.request, responseToCache));
              }
            })
            .catch(() => {});
          return cachedResponse;
        }

        // Cache miss: fetch from network and cache
        return fetch(event.request)
          .then((networkResponse) => {
            if (networkResponse && (networkResponse.status === 200 || networkResponse.type === 'opaque')) {
              const responseToCache = networkResponse.clone();
              caches.open(CACHE_NAME).then((cache) => cache.put(event.request, responseToCache));
            }
            return networkResponse;
          })
          .catch(async () => {
            // Graceful fallback for font and external stylesheet network failures
            const cachedFallback = await caches.match(event.request);
            if (cachedFallback) return cachedFallback;
            if (url.hostname.includes('fonts.googleapis.com')) {
              return new Response('/* Offline fallback for Google Fonts */', {
                status: 200,
                headers: { 'Content-Type': 'text/css; charset=utf-8' }
              });
            }
            if (url.hostname.includes('fonts.gstatic.com')) {
              return typeof Response.error === 'function' ? Response.error() : new Response(null, { status: 504, statusText: 'Font Unavailable' });
            }
            return new Response('', { status: 504, statusText: 'Gateway Timeout' });
          });
      })
    );
});
