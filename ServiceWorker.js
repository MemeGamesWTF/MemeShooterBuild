const cacheName = "DefaultCompany-NoDroneZone-1.0";
const contentToCache = [
    "Build/b0d7489f531dc6068b3a8473b6ba9f6a.loader.js",
    "Build/357dfc6dcd0bde88046039a55e2c8f64.framework.js",
    "Build/9a698f9d7e64a45e910f681c5b6fe023.data",
    "Build/556a747b1195dbb523b6ea0ae828802a.wasm",
    "TemplateData/style.css"

];

self.addEventListener('install', function (e) {
    console.log('[Service Worker] Install');
    
    e.waitUntil((async function () {
      const cache = await caches.open(cacheName);
      console.log('[Service Worker] Caching all: app shell and content');
      await cache.addAll(contentToCache);
    })());
});

self.addEventListener('fetch', function (e) {
    e.respondWith((async function () {
      let response = await caches.match(e.request);
      console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
      if (response) { return response; }

      response = await fetch(e.request);
      const cache = await caches.open(cacheName);
      console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
      cache.put(e.request, response.clone());
      return response;
    })());
});
