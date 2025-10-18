const CACHE_NAME = 'mile-to-km-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/app.js',
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png'
];

// Install
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

// Fetch
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Return cached version or fetch from network
        return response || fetch(event.request);
      })
  );
});