"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron = require('electron');
electron.contextBridge.exposeInMainWorld('electron', {
    subscribeStatistics: (callback) => {
        electron.ipcRenderer.on("statistics", (_, stats) => {
            callback({ stats });
        });
    },
    getStaticData: () => electron.ipcRenderer.invoke('getStaticData'),
});
