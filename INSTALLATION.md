# SongStream Installation Guide

## Quick Installation (Windows)

### One-Click Installation

For the fastest installation experience on Windows:

1. Run the `quick-install.bat` file
2. Wait for the build process to complete
3. When the dist folder opens, run the installer (.exe file)

### Guided Installation

For a more customizable installation experience:

1. Run the `install-songstream.bat` file
2. Choose option 1 to install as a Desktop Application
3. Wait for the build process to complete
4. When the dist folder opens, run the installer (.exe file)

## Manual Installation

### Prerequisites

- Node.js (version 14 or higher) - [Download from nodejs.org](https://nodejs.org/)
- npm (comes with Node.js)

### Desktop Application Installation

1. **Install Dependencies**:
   ```
   npm install
   ```

2. **Build the Application**:
   ```
   npm run build:electron
   ```

3. **Install the Application**:
   - Navigate to the `dist` folder
   - Run the installer file:
     - Windows: `.exe` file
     - macOS: `.dmg` file
     - Linux: `.AppImage`, `.deb`, or `.rpm` file

### Web Application Installation

1. **Install Dependencies**:
   ```
   npm install
   ```

2. **Build the Website**:
   ```
   npm run build
   ```

3. **Deploy the Website**:
   - The built files will be in the `dist` folder
   - Upload these files to any web server
   - Or serve them locally using a tool like `serve`:
     ```
     npx serve -s dist
     ```

## Troubleshooting

### Node.js Not Installed

If you see an error about Node.js not being installed:

1. Download and install Node.js from [nodejs.org](https://nodejs.org/) (version 14 or higher)
2. Restart your computer
3. Try the installation again

### Build Errors

If you encounter errors during the build process:

1. Make sure you have the latest version of Node.js
2. Try clearing the npm cache:
   ```
   npm cache clean --force
   ```
3. Delete the `node_modules` folder and reinstall dependencies:
   ```
   rm -rf node_modules
   npm install
   ```

## System Requirements

### Desktop Application

- **Windows**: Windows 10 or later
- **macOS**: macOS 10.13 (High Sierra) or later
- **Linux**: Ubuntu 18.04 or equivalent
- **RAM**: 4GB minimum, 8GB recommended
- **Disk Space**: 500MB free space

### Web Application

- **Browser**: Chrome, Firefox, Safari, or Edge (latest versions)
- **Internet Connection**: Required for streaming music