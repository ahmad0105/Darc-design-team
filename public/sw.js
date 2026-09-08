// DARC Design Team — Service Worker (Offline-First Cache v1.7)
const CACHE_NAME = 'darc-cache-v1.7';
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/styles.css',
  '/app.js',
  '/manifest.json'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS);
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

  // Do not intercept mutations (POST/PATCH/DELETE) or external streaming
  if (event.request.method !== 'GET') return;
  if (url.pathname.startsWith('/api/documents/download')) return;

  // Stale-While-Revalidate for app static assets and fonts
  if (
    url.origin === location.origin ||
    url.hostname.includes('fonts.googleapis.com') ||
    url.hostname.includes('fonts.gstatic.com')
  ) {
    // For API requests, try network first, fallback to cached data if offline
    if (url.pathname.startsWith('/api/')) {
      event.respondWith(
        fetch(event.request).catch(async () => {
          const cachedResponse = await caches.match(event.request);
          if (cachedResponse) return cachedResponse;
          return new Response(JSON.stringify({ error: 'أنت غير متصل بالإنترنت حالياً (وضع عدم الاتصال)' }), {
            status: 503,
            headers: { 'Content-Type': 'application/json' }
          });
        })
      );
      return;
    }

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
              return new Response('', { status: 200, headers: { 'Content-Type': 'font/woff2' } });
            }
            return new Response('', { status: 504, statusText: 'Gateway Timeout' });
          });
      })
    );
  }
});
