// Add multuple URL to the cache
async function cacheMultipleFiles() {
    const cacheName = document.querySelector("#cacheName").value;
    if ('caches' in window) {
        try {
            const cache = await caches.open(cacheName);
            const urlsToCache = ["shop.html", "my-awards.html",
                "https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"]
            await cache.addAll(urlsToCache);
            showResult(urlsToCache.length + " files were cached on " + cacheName);

        } catch (error) {
            showResult("Error while caching multiple files. " + error.message);
        }
    } else {
        showResult("Cache Storage not available");
    }
};
