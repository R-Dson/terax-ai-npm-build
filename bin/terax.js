#!/usr/bin/env node
const { spawnSync } = require('child_process');
const path = require('path');
const os = require('os');

const platform = os.platform(); // 'linux', 'darwin', 'win32'
const arch = os.arch();         // 'x64', 'arm64'

// Determine the binary name based on OS and architecture
let binaryName = `terax-${platform}-${arch}`;
if (platform === 'win32') {
    binaryName += '.exe';
}

const binaryPath = path.join(__dirname, binaryName);

// Pass all arguments down to the actual Rust binary
const args = process.argv.slice(2);

const result = spawnSync(binaryPath, args, { stdio: 'inherit' });

if (result.error) {
    console.error(`Failed to start Terax: ${result.error.message}`);
    process.exit(1);
}

process.exit(result.status || 0);
