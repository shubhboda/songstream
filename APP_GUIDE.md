# SongStream Application Guide

This guide provides detailed instructions on how to use SongStream as either a desktop application or a web application.

## Installation

### Prerequisites

- Node.js (v14.x or higher)
- npm or yarn

### Quick Start (Windows)

We provide convenient batch scripts to install, run, or build the application in either web or desktop mode:

1. **Installing the application**:
   - Execute `install-songstream.bat`
   - Choose option 1 to install as a desktop application (recommended for most users)
   - Choose option 2 to install as a website (for developers)
   - Follow the on-screen instructions to complete installation
   - For detailed installation instructions, see [INSTALLATION.md](./INSTALLATION.md)

2. **Running the application**:
   - Execute `start-project.bat`
   - Choose option 1 to run as a website in your browser
   - Choose option 2 to run as a desktop application
   - Choose option 3 to add songs to your library

3. **Building for distribution**:
   - Execute `build-project.bat`
   - Choose option 1 to build the website for web deployment
   - Choose option 2 to build the desktop application installer

4. **Adding songs**:
   - Execute `add-song.bat` directly, or
   - Run `start-project.bat` and select option 3

### Manual Setup

#### Development Mode

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run in development mode:
   ```bash
   # For web application
   npm run dev
   
   # For desktop application
   npm run dev:electron
   ```

#### Building for Distribution

To create distributable packages:

```bash
# For web deployment
npm run build

# For desktop application
npm run build:electron
```

This will generate installation files in the `dist` folder:
- Windows: `.exe` installer
- macOS: `.dmg` file
- Linux: `.AppImage` and `.deb` packages

## Using the Application

### First Launch

After installation, you can launch SongStream from:
- Windows: Start menu or desktop shortcut
- macOS: Applications folder
- Linux: Applications menu or desktop shortcut

### Interface Overview

The application includes:
- Music player controls
- Library browser
- Playlist management
- Search functionality
- User settings

### Adding Songs

SongStream allows you to easily add songs to your library:

1. **Using the Add Song Tool**:
   - Run `add-song.bat` or select "Add Songs to Library" from the `start-project.bat` menu
   - Fill in the song details (title, artist, album, duration)
   - Upload audio file and cover image (optional)
   - Add YouTube URL (optional)
   - Click "Add Song" to save to your library

2. **Manual Navigation**:
   - Start the application in either web or desktop mode
   - Navigate to the Add Song page at `/add-song`
   - Complete the form as described above

### System Tray

When minimized, SongStream continues running in the system tray:
- Click the tray icon to show/hide the application
- Right-click for additional options (Open, Quit)

### Settings

The application saves your settings automatically, including:
- Theme preference (dark/light)
- Volume level
- Autoplay settings
- Minimize to tray behavior

## Troubleshooting

### Common Issues

1. **Application won't start**
   - Ensure Node.js is properly installed
   - Try reinstalling the application

2. **Missing dependencies**
   - Run `npm install` to ensure all dependencies are installed

3. **Build errors**
   - Make sure you have the latest version of Node.js
   - Clear the `node_modules` folder and reinstall dependencies

### Getting Help

If you encounter issues not covered in this guide, please:
- Check the GitHub repository for known issues
- Submit a new issue with detailed information about the problem

## Development

### Project Structure

The Electron-specific files are located in:

```
songstream/
├── electron/
│   ├── main.js       # Main process
│   └── preload.js    # Preload script
└── package.json      # Contains Electron configuration
```

### Adding Features

To extend the desktop application:

1. Modify `electron/main.js` for main process features
2. Update `electron/preload.js` to expose new functionality to the renderer
3. Use the exposed APIs in your React components

### Building Custom Installers

Customize the build configuration in `package.json` under the `build` section to:
- Change application metadata
- Modify installer options
- Add custom icons
- Configure platform-specific settings