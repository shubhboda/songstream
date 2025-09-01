const { app, BrowserWindow, shell, Menu, Tray, dialog, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');

let mainWindow;
let tray = null;

function createMainWindow() {
	mainWindow = new BrowserWindow({
		width: 1200,
		height: 800,
		backgroundColor: '#0b0b0f',
		icon: path.join(__dirname, '..', 'public', 'flute-icon.svg'),
		title: 'SongStream',
		webPreferences: {
			preload: path.join(__dirname, 'preload.js'),
			nodeIntegration: false,
			contextIsolation: true,
		},
		autoHideMenuBar: false,
		show: false,
	});

	if (process.env.VITE_DEV_SERVER_URL) {
		mainWindow.loadURL(process.env.VITE_DEV_SERVER_URL);
		mainWindow.webContents.openDevTools({ mode: 'detach' });
	} else {
		const indexPath = path.join(__dirname, '..', 'dist', 'index.html');
		mainWindow.loadFile(indexPath);
	}

	mainWindow.once('ready-to-show', () => {
		mainWindow.show();
	});

	mainWindow.on('closed', () => {
		mainWindow = null;
	});

	// Set up application menu
	const template = [
		{
			label: 'File',
			submenu: [
				{ role: 'quit' }
			]
		},
		{
			label: 'Edit',
			submenu: [
				{ role: 'undo' },
				{ role: 'redo' },
				{ type: 'separator' },
				{ role: 'cut' },
				{ role: 'copy' },
				{ role: 'paste' },
			]
		},
		{
			label: 'View',
			submenu: [
				{ role: 'reload' },
				{ role: 'forceReload' },
				{ role: 'toggleDevTools' },
				{ type: 'separator' },
				{ role: 'resetZoom' },
				{ role: 'zoomIn' },
				{ role: 'zoomOut' },
				{ type: 'separator' },
				{ role: 'togglefullscreen' }
			]
		},
		{
			label: 'Help',
			submenu: [
				{
					label: 'About SongStream',
					click: () => {
						dialog.showMessageBox(mainWindow, {
							title: 'About SongStream',
							message: 'SongStream v0.1.0',
							detail: 'A music streaming application built with Electron and React.',
							buttons: ['OK'],
							icon: path.join(__dirname, '..', 'public', 'flute-icon.svg')
						});
					}
				}
			]
		}
	];
	
	const menu = Menu.buildFromTemplate(template);
	Menu.setApplicationMenu(menu);

	// open external links in default browser
	mainWindow.webContents.setWindowOpenHandler(({ url }) => {
		shell.openExternal(url);
		return { action: 'deny' };
	});
}

function createTray() {
	tray = new Tray(path.join(__dirname, '..', 'public', 'flute-icon.svg'));
	tray.setToolTip('SongStream');
	tray.on('click', () => {
		if (mainWindow) {
			if (mainWindow.isVisible()) {
				mainWindow.hide();
			} else {
				mainWindow.show();
			}
		}
	});

	const contextMenu = Menu.buildFromTemplate([
		{ 
			label: 'Open SongStream', 
			click: () => {
				if (mainWindow) mainWindow.show();
			}
		},
		{ type: 'separator' },
		{ 
			label: 'Quit', 
			click: () => {
				app.quit();
			}
		}
	]);
	tray.setContextMenu(contextMenu);
}

app.whenReady().then(() => {
	createMainWindow();
	createTray();

	// Register IPC handlers
	ipcMain.handle('get-app-path', () => app.getPath('userData'));
	
	// Settings management
	ipcMain.handle('save-settings', async (event, settings) => {
		try {
			const userDataPath = app.getPath('userData');
			const settingsPath = path.join(userDataPath, 'settings.json');
			await fs.promises.writeFile(settingsPath, JSON.stringify(settings, null, 2));
			return { success: true };
		} catch (error) {
			console.error('Failed to save settings:', error);
			return { success: false, error: error.message };
		}
	});
	
	ipcMain.handle('load-settings', async () => {
		try {
			const userDataPath = app.getPath('userData');
			const settingsPath = path.join(userDataPath, 'settings.json');
			
			if (fs.existsSync(settingsPath)) {
				const data = await fs.promises.readFile(settingsPath, 'utf8');
				return JSON.parse(data);
			} else {
				// Return default settings if file doesn't exist
				return {
					theme: 'dark',
					volume: 80,
					autoplay: true,
					minimizeToTray: true
				};
			}
		} catch (error) {
			console.error('Failed to load settings:', error);
			return {
				theme: 'dark',
				volume: 80,
				autoplay: true,
				minimizeToTray: true
			};
		}
	});
	
	// System operations
	ipcMain.handle('open-external', async (event, url) => {
		try {
			await shell.openExternal(url);
			return { success: true };
		} catch (error) {
			console.error('Failed to open external URL:', error);
			return { success: false, error: error.message };
		}
	});
	
	ipcMain.handle('minimize-to-tray', () => {
		if (mainWindow) {
			mainWindow.hide();
			return { success: true };
		}
		return { success: false, error: 'Window not available' };
	});
});

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
	if (mainWindow === null) createMainWindow();
});

app.on('before-quit', () => {
	if (tray) {
		tray.destroy();
	}
});
