#!/usr/bin/env node

// Install the dependencies
console.log('Installing dependencies...');

const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

console.log('ok');

// Define the source and destination directories
const publicDir = path.join(process.cwd(), 'public');
const imagesDir = path.resolve(publicDir, 'images');
const logosDir = path.resolve(imagesDir, 'logos');
const srcImages = path.resolve(__dirname, '../src/images');

// Function to copy a file
function copyFile(src, dest) {
    fs.copyFileSync(src, dest);
    console.log(`Copied : ${src} to ${dest}`);
}

// Function to create  a directory if it doesn't exist
function createDir(dir) {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
        console.log('Created directory:', dir);
    }
}
// Generate the cache list
console.log('Generating cache list...');
execSync('node node_modules/ad-pwa-setup/src/generate-cache-list.js', { stdio: 'inherit' });

console.log('Copying files...');

// Function to copy all images/logos files
function copyLogos() {
    try {
        const files = fs.readdirSync(srcImages);
        console.log('Copying logos files...');
        files.forEach(file => {
            const fullPath = path.join(srcImages, file);
            if (fs.statSync(fullPath).isDirectory()) {
                // Fonction récursive pour parcourir les sous-répertoires
                walkDir(fullPath);
            } else {
                // Copier les fichiers de logos
                if (/\.(png|jpg|jpeg|gif|svg|ico)$/.test(file)) {
                    fs.copyFileSync(fullPath, path.join(logosDir, file));
                    console.log(`Copied logo: ${fullPath} to ${path.join(logosDir, file)}`);
                }
            }
        });
    } catch (error) {
        console.error('Error copying logo files:', error);
    }
    
    function walkDir(dir) {
        const files = fs.readdirSync(dir);
        files.forEach(file => {
            const fullPath = path.join(dir, file);
            if (fs.statSync(fullPath).isDirectory()) {
                walkDir(fullPath);
            } else {
                if (/\.(png|jpg|jpeg|gif|svg|ico)$/.test(file)) {
                    fs.copyFileSync(fullPath, path.join(logosDir, file));
                }
            }
        });
    }
}

createDir(logosDir);
createDir(publicDir);
createDir(imagesDir);
copyLogos();
copyFile(path.join(__dirname, '../src/manifest.json'), path.join(publicDir, 'manifest.json'));
copyFile(path.join(__dirname, '../src/sw.js'), path.join(publicDir, 'sw.js'));
copyFile(path.join(__dirname, '../src/sw-register.js'), path.join(publicDir, 'sw-register.js'));

// Success message
console.log('\x1b[32m%s\x1b[0m', 'ABD PWA setup successfully installed !');