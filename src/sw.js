// Version of the service worker
const version = 'v1.0.0';

// Name of the cache
const CACHE_NAME = 'static-' + version;
const DYNAMIC_CACHE_NAME = 'dynamic-' + version;

// Install the service worker
self.addEventListener('install', event => {
    event.waitUntil(caches.open(CACHE_NAME).then(cache => {

            // Add all the resources to the cache, using the chache-list.json file.
           return fetch('/sw-cache-list.json').then(response => {
               return response.json().then(cacheList => {
                   return cache.addAll(cacheList);
               });
           });
        })
    );

    // Force the waiting service worker to become the active service worker.
    self.skipWaiting();
});

// Activate the service worker
self.addEventListener('activate', event => {

    // Delete all caches that aren't CACHE_NAME.
    const cacheWhitelist = [CACHE_NAME, DYNAMIC_CACHE_NAME];
    
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );

    // Force the waiting service worker to become the active service worker.
    self.clients.claim();
});

// When a request is received, check the cache first.
// If the request is found in the cache, return it.
// If not, fetch the resource from the network.
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            return response || fetch(event.request).then(response => {
                return caches.open(DYNAMIC_CACHE_NAME).then(cache => {
                    cache.put(event.request.url, response.clone());
                    return response;
                });
            });
        })
    );
});