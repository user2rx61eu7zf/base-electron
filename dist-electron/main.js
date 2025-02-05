import { app, BrowserWindow, ipcMain } from 'electron';
import path from 'path';
import { isDev } from './util.js';
import { getStaticData, PollResources } from './resourceManager.js';
import { getPreloadPath } from './pathResolver.js';
app.on('ready', () => {
    const mainWindow = new BrowserWindow({
        webPreferences: {
            preload: getPreloadPath(),
        }
    });
    if (isDev()) {
        mainWindow.loadURL('http://localhost:8080/');
    }
    else {
        mainWindow.loadFile(path.join(app.getAppPath(), '/dist-react/index.html'));
    }
    PollResources(mainWindow);
    ipcMain.handle('getStaticData', () => {
        return getStaticData();
    });
});
