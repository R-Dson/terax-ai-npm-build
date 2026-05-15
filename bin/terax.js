#!/usr/bin/env node
const { spawnSync } = require('child_process');
const path = require('path');
const os = require('os');

const platform = os.platform();
const arch = os.arch();

let binaryName = `terax-${platform}-${arch}`;
if (platform === 'win32') {
    binaryName += '.exe';
}

const binaryPath = path.join(__dirname, binaryName);
const args = process.argv.slice(2);

// AUTOMATIC FIX: Apply the Wayland rendering fix mentioned in README
const env = { ...process.env };
if (platform === 'linux' && process.env.XDG_SESSION_TYPE === 'wayland') {
    env.WEBKIT_DISABLE_DMABUF_RENDERER = '1';
}

const result = spawnSync(binaryPath, args, { 
    stdio: 'inherit',
    env: env 
});

if (result.error || result.status !== 0) {
    if (platform === 'linux') {
        const output = result.stderr?.toString() || "";
        
        console.error('\x1b[31m%s\x1b[0m', '\n[Terax Error] System dependencies missing!');

        if (output.includes('libwebkit2gtk')) {
            console.error('-> Missing WebKitGTK 4.1 (Webview engine)');
            console.error('   Fix: sudo apt install libwebkit2gtk-4.1-0 OR sudo dnf install webkit2gtk4.1');
        }
        
        if (output.includes('libsecret')) {
            console.error('-> Missing libsecret (Required for secure API key storage)');
            console.error('   Fix: sudo apt install libsecret-1-0 OR sudo dnf install libsecret');
        }

        if (output.includes('libssl')) {
            console.error('-> Missing OpenSSL (Required for AI API connections)');
            console.error('   Fix: sudo apt install libssl3 OR sudo dnf install openssl');
        }

        // If it was just a library error, exit gracefully with instructions
        if (output.includes('shared object file')) {
            process.exit(1);
        }
    }
}

process.exit(result.status || 0);
