const divInstall = document.getElementById('installContainer');
const butInstall = document.getElementById('butInstall');

window.addEventListener('beforeinstallprompt', (event) => {
    event.preventDefault();
    console.log('👍', 'beforeinstallprompt', event);
    window.deferredPrompt = event;
    divInstall.classList.toggle('hidden', false);
});

butInstall.addEventListener('click', async () => {
    console.log('👍', 'butInstall-clicked');
    const promptEvent = window.deferredPrompt;
    if (!promptEvent) {
        return;
    }
    promptEvent.prompt();
    const result = await promptEvent.userChoice;
    console.log('👍', 'userChoice', result);
    window.deferredPrompt = null;
    divInstall.classList.toggle('hidden', true);
});

window.addEventListener('appinstalled', (event) => {
    console.log('👍', 'appinstalled', event);
    window.deferredPrompt = null;
});

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js');
}
