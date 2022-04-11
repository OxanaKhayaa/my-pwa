const cacheName = 'pwa_v1';

const includeToCache = [
    '/',
    'index.html',
    'shop.html',
    'images/logo.svg',
    'css/styles.css',
    'js/main.js'
];

/* Start the service worker and cache all of the app's content */
self.addEventListener('install', e => {
    e.waitUntil(
        caches.open(cacheName).then(cache => {
            return cache.addAll(includeToCache);
        })
    );
});

/* Serve cached content when offline */
self.addEventListener('fetch', e => {
    e.respondWith(
        caches.match(e.request).then(response => {
            return response || fetch(e.request);
        })
    );
});
