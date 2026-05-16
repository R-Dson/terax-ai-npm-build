# Terax ai npm

This package provides a cross-platform Node.js minimal wrapper for the `terax` binary. The published package can be found on [npmjs](https://www.npmjs.com/package/terax-ai). 

## Installation

Install globally via npm:

```bash
npm install -g terax-ai
```

To update to the latest version:
```bash
npm update -g terax-ai
```

## Usage

Launch the terminal from your command line:
```bash
terax
```

## Requirements (Linux)

If you are on Linux, ensure the following dependencies are installed for the GUI to render correctly:

- **WebkitGTK 4.1** (`libwebkit2gtk-4.1-0`)
- **OpenSSL** (`libssl`)
- **libsecret** (`libsecret-1-0`)

### Wayland Note
On Wayland sessions, this wrapper automatically sets `WEBKIT_DISABLE_DMABUF_RENDERER=1` to prevent rendering artifacts common with GPU acceleration in WebKit.

## Credits

This is a build-sync repository. 
- **Upstream Source:** [crynta/terax-ai](https://github.com/crynta/terax-ai)
- **License:** Apache-2.0

