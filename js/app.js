const divInstall = document.getElementById('installContainer');
const butInstall = document.getElementById('butInstall');

window.addEventListener('beforeinstallprompt', (event) => {
    // Запрет показа информационной мини-панели на мобильных устройствах.
    event.preventDefault();
    console.log('👍', 'beforeinstallprompt', event);
    // Убираем событие, чтобы его можно было активировать позже.
    window.deferredPrompt = event;
    // Убираем класс «hidden» из контейнера кнопки установки.
    divInstall.classList.toggle('hidden', false);
});

butInstall.addEventListener('click', async () => {
    console.log('👍', 'butInstall-clicked');
    const promptEvent = window.deferredPrompt;
    if (!promptEvent) {
        // Отложенный запрос недоступен.
        return;
    }
    // Показать запрос на установку.
    promptEvent.prompt();
    // Записать результат в журнал.
    const result = await promptEvent.userChoice;
    console.log('👍', 'userChoice', result);
    // Сбросить переменную отложенного запроса:
    // prompt() можно вызвать только один раз.
    window.deferredPrompt = null;
    // Скрыть кнопку установки.
    divInstall.classList.toggle('hidden', true);
});

window.addEventListener('appinstalled', (event) => {
    console.log('👍', 'appinstalled', event);
    // Очистить «deferredPrompt» для сборщика мусора
    window.deferredPrompt = null;
});



/*/!* Only register a service worker if it's supported *!/
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js');
}*/


if ('serviceWorker' in navigator) {
    navigator.serviceWorker
        .register('sw.js')
        .then(event => {
            console.log('Service worker registered', event);
        });
}

/**
 * Warn the page must be served over HTTPS
 * The `beforeinstallprompt` event won't fire if the page is served over HTTP.
 * Installability requires a service worker with a fetch event handler, and
 * if the page isn't served over HTTPS, the service worker won't load.
 */
/*if (window.location.protocol === 'http:') {
    const requireHTTPS = document.getElementById('requireHTTPS');
    const link = requireHTTPS.querySelector('a');
    link.href = window.location.href.replace('http://', 'https://');
    requireHTTPS.classList.remove('hidden');
}*/
