const fs = require('fs');
const path = require('path');

const publicDir = path.join(process.cwd(), 'public');
const cacheListFile = [];

function walkDir(currentPath) {
    // If the public folder doesn't exist or is empty, return.
    if (!fs.existsSync(publicDir) || fs.readdirSync(publicDir).length === 0) {
        console.warn('The public folder is empty or doesn\'t exist in the current directory!');
        throw new Error('The public folder is empty or doesn\'t exist in the current directory!');
    }

    console.log('Searching for files to cache...');
    const files = fs.readdirSync(currentPath);
    console.log('Found', files.length, 'files');
    files.forEach(file => {
        const fullPath = path.join(currentPath, file);
        if (fs.statSync(fullPath).isDirectory()) {
            walkDir(fullPath);
        } else {
            // Eviter de copier le service-worker et le register-sw
            if(/\.(css|js|json|html)$/.test(fullPath)) {
                if (fullPath.indexOf('sw.js') === -1 && fullPath.indexOf('sw-register.js') === -1 && fullPath.indexOf('sw-cache-list.json') === -1 && fullPath.indexOf('manifest.json') === -1 && fullPath.indexOf('index.html') === -1) {
                    cacheListFile.push(fullPath.replace(publicDir, ''));
                }
            } 
        }
    })
}

walkDir(publicDir);

const cacheList = JSON.stringify(cacheListFile, null, 2);

fs.writeFileSync(path.join(publicDir, 'sw-cache-list.json'), cacheList);
console.log('Cache list generated:', cacheListFile);