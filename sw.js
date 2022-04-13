var cacheName = 'cache-site-element';
var filesToCache = [
    'index.html',
    'login.html',
    'my-awards.html',
    'new-patient.html',
    'passwordreset.html',
    'refer-and-earn.html',
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

/* Start the service worker and cache all of the app's content */
self.addEventListener('install', function(e) {
    e.waitUntil(
        caches.open(cacheName).then(function(cache) {
            return cache.addAll(filesToCache);
        })
    );
});

/* Serve cached content when offline */
self.addEventListener('fetch', function(e) {
    e.respondWith(
        caches.match(e.request).then(function(response) {
            return response || fetch(e.request);
        })
    );
});
