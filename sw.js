const CACHE_NAME = 'ward-ipa-cache-v1';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './tugas.css',
  './tugas.js',
  './manifest.json',
  './assets/icon-192.svg',
  './assets/icon-512.svg',
  './KELAS 7/index.html',
  './KELAS 8/index.html',
  './KELAS 9/index.html'
];

// Install Event
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[ServiceWorker] Caching App Shell & Core Assets');
      return cache.addAll(ASSETS_TO_CACHE).catch((err) => {
        console.warn('[ServiceWorker] Cache addAll skipped some dynamic items:', err);
      });
    }).then(() => self.skipWaiting())
  );
});

// Activate Event
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log('[ServiceWorker] Clearing Old Cache:', cache);
            return caches.delete(cache);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch Event (Network-First strategy with cache fallback for optimum fresh updates)
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  event.respondWith(
    fetch(event.request)
      .then((networkResponse) => {
        if (networkResponse && networkResponse.status === 200 && networkResponse.type === 'basic') {
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });
        }
        return networkResponse;
      })
      .catch(() => {
        return caches.match(event.request);
      })
  );
});
