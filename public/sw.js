const CACHE = 'pwa-offline';

const offlineFallbackPage = 'offline.html';

self.addEventListener('install', function (event) {
  console.log('[PWA] Install Event processing');

  event.waitUntil(
    caches.open(CACHE).then(function (cache) {
      console.log('[PWA] Cached offline page during install');

      if (offlineFallbackPage === 'offline.html') {
        return cache.add(
          new Response(
            '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Offline</title><style>body{font-family:sans-serif;margin:0;padding:20px;text-align:center;background-color:#f5f5f5;}h1{color:#333;}p{color:#666;}</style></head><body><h1>You are offline</h1><p>Please check your internet connection and try again.</p></body></html>',
          ),
        );
      }

      return cache.add(offlineFallbackPage);
    }),
  );
});

self.addEventListener('fetch', function (event) {
  if (event.request.method !== 'GET') return;

  event.respondWith(
    fetch(event.request)
      .then(function (response) {
        console.log('[PWA] add page to offline cache: ' + response.url);

        event.waitUntil(updateCache(event.request, response.clone()));

        return response;
      })
      .catch(function (error) {
        console.log('[PWA] Network request Failed. Serving content from cache: ' + error);
        return fromCache(event.request);
      }),
  );
});

function fromCache(request) {
  return caches.open(CACHE).then(function (cache) {
    return cache.match(request).then(function (matching) {
      if (!matching || matching.status === 404) {
        if (request.destination !== 'document' || request.mode !== 'navigate') {
          return Promise.reject('no-match');
        }

        return cache.match(offlineFallbackPage);
      }

      return matching;
    });
  });
}

function updateCache(request, response) {
  return caches.open(CACHE).then(function (cache) {
    return cache.put(request, response);
  });
}
