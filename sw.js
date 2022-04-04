
var CACHE_STATIC_NAME = 'static-v4';
var CACHE_DYNAMIC_NAME = 'dynamic-v2';

self.addEventListener('install', function(event) {
    console.log('[Service Worker] Installing Service Worker ...', event);
    event.waitUntil(
        caches.open(CACHE_STATIC_NAME)
            .then(function(cache) {
                console.log('[Service Worker] Precaching App Shell');
                cache.addAll([
                    '/',
                    '/index.html',
                    '/my-awards.html',
                    '/refer-and-earn.html',
                    '/shop.html',
                    '/ways-to-earn.html',
                    '/js/app.js',
                    '/js/promise.js',
                    '/js/fetch.js',
                    '/js/mobile-swipe-menu.min.js',
                    '/js/modernizr-custom.min.js',
                    '/js/main.js',
                    '/css/style.min.css',
                    '/images/logo.svg',
                    '/images/logo-home.svg',
                    '/images/girl-with-phone.jpg',
                    '/images/girl-with-phone.webp',
                    '/images/man-with-phone.jpg',
                    '/images/man-with-phone.webp',
                    '/images/menu-bg.jpg',
                    '/images/menu-bg.webp',
                    '/images/shop-page/brand-name.jpg',
                    '/images/shop-page/brand-name.webp',
                    '/images/shop-page/concert.jpg',
                    '/images/shop-page/concert.webp',
                    '/images/shop-page/digital-gift.jpg',
                    '/images/shop-page/digital-gift.webp',
                    '/images/shop-page/local-shopping.jpg',
                    '/images/shop-page/local-shopping.webp',
                    '/images/shop-page/resort.jpg',
                    '/images/shop-page/resort.webp',
                    'https://fonts.googleapis.com/css2?family=Poppins:100;300;400;600;700',
                ]);
            })
    )
});

self.addEventListener('activate', function(event) {
    console.log('[Service Worker] Activating Service Worker ....', event);
    event.waitUntil(
        caches.keys()
            .then(function(keyList) {
                return Promise.all(keyList.map(function(key) {
                    if (key !== CACHE_STATIC_NAME && key !== CACHE_DYNAMIC_NAME) {
                        console.log('[Service Worker] Removing old cache.', key);
                        return caches.delete(key);
                    }
                }));
            })
    );
    return self.clients.claim();
});

self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request)
            .then(function(response) {
                if (response) {
                    return response;
                } else {
                    return fetch(event.request)
                        .then(function(res) {
                            return caches.open(CACHE_DYNAMIC_NAME)
                                .then(function(cache) {
                                    cache.put(event.request.url, res.clone());
                                    return res;
                                })
                        })
                        .catch(function(err) {

                        });
                }
            })
    );
});
