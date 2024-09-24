// Register the service worker
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js').then(registration => {
            // Registration was successful
            console.log('ServiceWorker registration successful with scope: ', registration.scope);
        }, err => {
            // registration failed :(
            console.log('ServiceWorker registration failed: ', err);
        });
    });
}

// Show message for de network state.
// This is a bit hacky, but it works.
window.addEventListener('load', () => {

    // Define the offline message and the online message elements.
    const statusOffline = document.getElementById('offline-warning');
    const statusOnline = document.getElementById('online-warning');

    // Check if the device is online.
    let wasOffline = !navigator.onLine;

    // Update the online/offline status.
    function updateOnlineStatus() {

        // check if the navigator is online.
        // if it is, remove the offline message.
        // if it isn't, show the offline message and remove the online message after 5 seconds
        if (navigator.onLine) {
            statusOffline.style.display = 'none';
            if (wasOffline) {
                statusOnline.style.display = 'block';

                setTimeout(() => {
                    statusOnline.style.display = 'none';
                }, 5000);
            }
            wasOffline = false;
    
        }else{
            statusOffline.style.display = 'block';
            statusOnline.style.display = 'none';
            wasOffline = true;
        }
    }

    window.addEventListener('online', () => {
        wasOffline = true;
        updateOnlineStatus();
    });
    
    window.addEventListener('offline', () => {
        wasOffline = false;
        updateOnlineStatus();
    });

    updateOnlineStatus();
});