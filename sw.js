const CACHE_NAME = 'my-neutral-app-v1';
const ASSETS_TO_CACHE = [
  '/index.html',
  '/manifest.json'
];

// Install: cache core files
self.addEventListener('install', (ev) => {
  ev.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS_TO_CACHE))
  );
  self.skipWaiting();
});

// Activate: cleanup
self.addEventListener('activate', (ev) => {
  ev.waitUntil(clients.claim());
});

// Fetch: serve from cache, fallback to network
self.addEventListener('fetch', (ev) => {
  ev.respondWith(
    caches.match(ev.request).then(cached => {
      return cached || fetch(ev.request);
    })
  );
});
