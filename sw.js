const CACHE_NAME = 'offline';
const OFFLINE_URL = 'offline.html';

let cacheName = 'cache-site-element';
let filesToCache = [
    'index.html',
    'login.html',
    'my-awards.html',
    'new-patient.html',
    'passwordreset.html',
    //'refer-and-earn.html',
    'ways-to-earn.html',
    'shop.html',
    'css/style.min.css',
    'js/main.js',
    'js/mobile-swipe-menu.min.js',
    'js/modernizr-custom.js',
    'image/logo.svg',
    'image/logo-home.svg',
    'image/girl-with-phone.jpg',
    'image/girl-with-phone.webp',
    'image/man-with-phone.jpg',
    'image/man-with-phone.webp',
    'image/menu-bg.webp',
    'image/menu-bg.jpg',
    'image/shop-page/brand-name.webp',
    'image/shop-page/brand-name.jpg',
    'image/shop-page/concert.webp',
    'image/shop-page/concert.jpg',
    'image/shop-page/digital-gift.webp',
    'image/shop-page/digital-gift.jpg',
    'image/shop-page/local-shopping.webp',
    'image/shop-page/local-shopping.jpg',
    'image/shop-page/resort.webp',
    'image/shop-page/resort.jpg'
];

self.addEventListener('install', function(e) {
    e.waitUntil(
        caches.open(cacheName).then(function(cache) {
            return cache.addAll(filesToCache);
        })
    );
});

self.addEventListener('install', function(event) {
    console.log('[ServiceWorker] Install');

    event.waitUntil((async () => {
        const cache = await caches.open(CACHE_NAME);
        // Setting {cache: 'reload'} in the new request will ensure that the response
        // isn't fulfilled from the HTTP cache; i.e., it will be from the network.
        await cache.add(new Request(OFFLINE_URL, {cache: 'reload'}));
    })());

    self.skipWaiting();
});


self.addEventListener('activate', (event) => {
    console.log('[ServiceWorker] Activate');
    event.waitUntil((async () => {
        // Enable navigation preload if it's supported.
        // See https://developers.google.com/web/updates/2017/02/navigation-preload
        if ('navigationPreload' in self.registration) {
            await self.registration.navigationPreload.enable();
        }
    })());

    // Tell the active service worker to take control of the page immediately.
    self.clients.claim();
});

/* Serve cached content when offline */
self.addEventListener('fetch', function(e) {
    e.respondWith(
        caches.match(e.request).then(function(response) {
            return response || fetch(e.request);
        })
    );
});

self.addEventListener('fetch', function(event) {
    // console.log('[Service Worker] Fetch', event.request.url);
    if (event.request.mode === 'navigate') {
        event.respondWith((async () => {
            try {
                const preloadResponse = await event.preloadResponse;
                if (preloadResponse) {
                    return preloadResponse;
                }

                const networkResponse = await fetch(event.request);
                return networkResponse;
            } catch (error) {
                console.log('[Service Worker] Fetch failed; returning offline page instead.', error);

                const cache = await caches.open(CACHE_NAME);
                const cachedResponse = await cache.match(OFFLINE_URL);
                return cachedResponse;
            }
        })());
    }
});

