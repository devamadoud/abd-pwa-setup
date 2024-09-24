# abd-pwa-setup

A package to add and setup a PWA service.

### To install the package, run

```bash
npx abd-pwa-setup
```
# Usage
This package will :
* Generate a cache list of all html, css, js, and images files in the public folder.
* Copy the service-worker "sw.js", the register-sw.js, and the manifest.json file to the public folder.
* Generate a sw-cache-list.json file with the list of all files to cache.
* Create images/logos directory in the public folder if not exists.
* Copy abd-pwa's logos to the images/logos directory.

## How to use

### 1. Install the package
```bash
npx abd-pwa-setup
```

### 2. Add the sw-register.js file to your index.html file
```html
<script src="/sw-register.js"></script>
```

### 3. Configure the manifest.json file
Modify the manifest.json file to fit your needs, add your own icons, and change the name and short name of your app. you can find more information about the manifest.json file [here](https://developer.mozilla.org/en-US/docs/Web/Manifest).

### 4. Change the images file directory
By default, the package will copy all the images files in the public folder to the images/logos directory. If you want to change the directory, you can do it, but you need to modify the manifest.json file to change icon's source path.

### 5. Add message for offline and online status (optional)
If you want to add a message for offline and online status, you can do it by adding the following code to your index.html file, the message will be displayed when the device is offline or online, the id of the div is "offline-warning" and "online-warning", you can not change the id, but you can add your css style.
```html
<div id="offline-warning" style="display: none;">
    <p>You are offline</p>
</div>
<div id="online-warning" style="display: none;">
    <p>You are online</p>
</div>
```

Enjoy !