const addResourcesToCache = async (resources) => {
    const cache = await caches.open('v1');
    await cache.addAll(resources);
};

const putInCache = async (request, response) => {
    const cache = await caches.open('v1');
    await cache.put(request, response);
};

const cacheFirst = async ({ request, preloadResponsePromise, fallbackUrl }) => {
    // First try to get the resource from the cache
    const responseFromCache = await caches.match(request);
    if (responseFromCache) {
        return responseFromCache;
    }

    // Next try to use the preloaded response, if it's there
    const preloadResponse = await preloadResponsePromise;
    if (preloadResponse) {
        console.info('using preload response', preloadResponse);
        putInCache(request, preloadResponse.clone());
        return preloadResponse;
    }

    // Next try to get the resource from the network
    try {
        const responseFromNetwork = await fetch(request);
        // response may be used only once
        // we need to save clone to put one copy in cache
        // and serve second one
        putInCache(request, responseFromNetwork.clone());
        return responseFromNetwork;
    } catch (error) {
        const fallbackResponse = await caches.match(fallbackUrl);
        if (fallbackResponse) {
            return fallbackResponse;
        }
        // when even the fallback response is not available,
        // there is nothing we can do, but we must always
        // return a Response object
        return new Response('Network error happened', {
            status: 408,
            headers: { 'Content-Type': 'text/plain' },
        });
    }
};

const enableNavigationPreload = async () => {
    if (self.registration.navigationPreload) {
        // Enable navigation preloads!
        await self.registration.navigationPreload.enable();
    }
};

self.addEventListener('activate', (event) => {
    event.waitUntil(enableNavigationPreload());
});

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open('v1').then((cache) => {
            return cache.addAll([
                './my-pwa/',
                './my-pwa/index.html',
                './my-pwa/my-awards.html',
                './my-pwa/refer-and-earn.html',
                './my-pwa/shop.html',
                './my-pwa/ways-to-earn.html',
                './my-pwa/css/style.min.css',
                './my-pwa/js/app.js',
                './my-pwa/js/mobile-swipe-menu.min.js',
                './my-pwa/js/main.js',
                './my-pwa/js/modernizr-custom.js',
                './my-pwa/image/',
                './my-pwa/image/logo.svg',
                './my-pwa/image/logo-home.svg',
                './my-pwa/image/girl-with-phone.jpg',
                './my-pwa/image/girl-with-phone.webp',
                './my-pwa/image/man-with-phone.jpg',
                './my-pwa/image/man-with-phone.webp',
                './my-pwa/image/menu-bg.jpg',
                './my-pwa/image/menu-bg.webp'
            ]);
        })
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        cacheFirst({
            request: event.request,
            preloadResponsePromise: event.preloadResponse,
            fallbackUrl: '/my-pwa/image/Smile-Inspire.png',
        })
    );
});
