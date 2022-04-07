const CACHE_NAME = 'offline';
const OFFLINE_URL = 'offline.html';

self.addEventListener('install', function(event) {
    /*console.log('[ServiceWorker] Install');

    event.waitUntil((async () => {
        const cache = await caches.open(CACHE_NAME);
        // Setting {cache: 'reload'} in the new request will ensure that the response
        // isn't fulfilled from the HTTP cache; i.e., it will be from the network.
        await cache.add(new Request(OFFLINE_URL, {cache: 'reload'}));
    })());

    self.skipWaiting();*/




    console.log('Installing [Service Worker]', event);
    event.waitUntil(
        caches.open('static')
            .then(cache => {
                console.log('[Service Worker] Precaching App Shell');
                cache.addAll([
                    /*'/',*/
                    'index.html',
                    'my-awards.html',
                    'refer-and-earn.html',
                    'shop.html',
                    'ways-to-earn.html',
                    'image/girl-with-phone.png',
                    'image/girl-with-phone.webp',
                    'image/man-with-phone.png',
                    'image/man-with-phone.webp',
                    'image/menu-bg.png',
                    'image/menu-bg.webp',

                    'image/shop-page/brand-name.png',
                    'image/shop-page/brand-name.webp',
                    'image/shop-page/concert.png',
                    'image/shop-page/concert.webp',
                    'image/shop-page/digital-gift.png',
                    'image/shop-page/digital-gift.webp',
                    'image/shop-page/local-shopping.png',
                    'image/shop-page/local-shopping.webp',
                    'image/shop-page/resort.png',
                    'image/shop-page/resort.webp',

                    'js/mobile-swipe-menu.min.js',
                    'js/main.js',
                    'js/modernizr-custom.js',
                    'js/app.js',
                    'css/style.css',
                    'css/style.min.css',
                    'https://fonts.googleapis.com/css2?family=Poppins:100;300;400;600;700'

                ]);
            }));

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


