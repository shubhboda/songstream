const { contextBridge, ipcRenderer } = require('electron');
const os = require('os');

contextBridge.exposeInMainWorld('electron', {
	// App info
	appInfo: {
		version: '0.1.0',
		platform: process.platform,
		osVersion: os.release(),
		osName: os.type()
	},
	
	// File system operations
	fileSystem: {
		getAppPath: () => ipcRenderer.invoke('get-app-path'),
		saveSettings: (settings) => ipcRenderer.invoke('save-settings', settings),
		loadSettings: () => ipcRenderer.invoke('load-settings')
	},
	
	// System operations
	system: {
		openExternal: (url) => ipcRenderer.invoke('open-external', url),
		minimizeToTray: () => ipcRenderer.invoke('minimize-to-tray')
	}
});
