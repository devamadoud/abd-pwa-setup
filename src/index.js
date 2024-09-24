const generateCacheList = require('./generate-cache-list.js');
const serviceWorker = require('./sw.js');
const registerServiceWorker = require('./sw-register.js');
const manifest = require('./manifest.json');

module.exports = {
    generateCacheList,
    serviceWorker,
    registerServiceWorker,
    manifest
};