const CACHE_NAME = 'obr-pwa-v9';
const urlsToCache = [
  './',
  './index.html',
  './manifest.json',
  './LOGO OBR.png',
  './LOGO CKR.jpeg',
  './icon-192.png',
  './icon-512.png'
];

self.addEventListener('install', (event) => {
  // Tiap file disimpan sendiri-sendiri, jadi kalau satu file hilang
  // service worker tetap berhasil terpasang.
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) =>
      Promise.allSettled(urlsToCache.map((url) => cache.add(url)))
    )
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  const request = event.request;

  // Hanya tangani request GET biasa
  if (request.method !== 'GET') return;

  const url = new URL(request.url);
  if (url.protocol !== 'http:' && url.protocol !== 'https:') return;

  // Jangan ikut campur request data Firebase (Firestore, Auth, dll)
  // supaya data selalu langsung dari server. Font Google tetap boleh disimpan.
  const isFirebaseApi =
    url.hostname.endsWith('googleapis.com') && url.hostname !== 'fonts.googleapis.com';
  if (isFirebaseApi) return;

  event.respondWith(
    fetch(request)
      .then((response) => {
        if (response && (response.status === 200 || response.type === 'opaque')) {
          const responseClone = response.clone();
          caches
            .open(CACHE_NAME)
            .then((cache) => cache.put(request, responseClone))
            .catch(() => {});
        }
        return response;
      })
      .catch(() =>
        caches.match(request).then((cached) => {
          if (cached) return cached;
          if (request.mode === 'navigate') return caches.match('./index.html');
          return Response.error();
        })
      )
  );
});
