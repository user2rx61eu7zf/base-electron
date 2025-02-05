import osUtils from 'os-utils';
import fs from 'fs';
import os from 'os';
import { BrowserWindow } from 'electron';
const POLLING_INTERVAL= 500;

export function PollResources(mainWindow:BrowserWindow){
        setInterval(async ()=>{
           const cpuUsage = await getCpuUsage();
           const ramUsage= getRamusage();
           const storageData= getStorageData();
           const StaticData= getStaticData();
           mainWindow.webContents.send('statistics',{
            cpuUsage,
            ramUsage,
            storageData:storageData.usage,});
        },POLLING_INTERVAL)
    
}

export function getStaticData(){

    const totalStorage=getStorageData().total;
    const cpuModel=os.cpus()[0].model;
    const totalMemGB=Math.floor((osUtils.totalmem()/1024)+1);

    return {
        totalStorage,
        cpuModel,
        totalMemGB,
    };
}


function getCpuUsage(){

    return new Promise(resolve => {
        osUtils.cpuUsage(resolve);
    });
}

function getRamusage() {
    return 1-osUtils.freememPercentage();
}

function getStorageData() {
     
    const stats = fs.statfsSync(process.platform === 'win32' ? 'C://' : '/');
    const total = stats.bsize * stats.blocks;
    const free = stats.bsize * stats.bfree;
  
    return {
      total: Math.floor(total / 1_000_000_000),
      usage: 1 - free / total,
    };
  }