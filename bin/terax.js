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

if (result.error) {
    console.error(result.error.message);
    process.exit(1);
}

process.exit(result.status || 0);
