/*importScripts('/src/js/idb.js');
importScripts('/src/js/utility.js');*/

self.addEventListener('install', event => {
    console.log('Installing [Service Worker]', event);

    event.waitUntil(
        caches.open('static')
            .then(cache => {
                console.log('[Service Worker] Precaching App Shell');
                cache.addAll([
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

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                if (response) {
                    return response;
                } else {
                    return fetch(event.request)
                        .then(res => {
                            return caches.open('dynamic')
                                .then(cache => {
                                    cache.put(event.request.url, res.clone());
                                    return res;
                                })
                        });
                }
            })
    );
});

self.addEventListener('sync', event => {
    console.log('[Service Worker] Syncing');

    if (event.tag === 'sync-request') {
        event.waitUntil(
            readAllData('sync-requests')
                .then(async data => {
                    const requests = [];

                    for (const d of data) {
                        requests.push(fetch('https://cdn.expediapartnersolutions.com/ean-rapid-site/Content_Reference_Lists_2_3.json', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                'Accept': 'application/json'
                            },
                            body: JSON.stringify({
                                sunday: d.sunday
                            })
                        }));
                    }

                    const results = await Promise.all(requests);

                    results.map((response, index) => {
                        if (response.ok) {
                            deleteItemFromData('sync-requests', data[index].id);
                        }
                    })
                })
        );
    }
});
