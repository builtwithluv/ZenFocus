import { BrowserWindow as BrowserWindowElectron, dialog } from 'electron';
import { autoUpdater } from 'electron-updater';

export default class AppUpdater {
  constructor() {
    const platform = process.platform;

    if (platform === 'linux') return;

    const log = require('electron-log');

    log.transports.file.level = 'info';
    autoUpdater.logger = log;

    autoUpdater.signals.updateDownloaded(it => {
      notify('A new update is ready to install', `Version ${it.version} is downloaded and will be automatically installed on Quit`);

      dialog.showMessageBox({
        type: 'question',
        button: ['Cancel', 'Okay'],
        defaultId: 0,
        message: 'Would you like to install updates and restart?',
        cancelId: 0
      }, (response) => {
        if (response === 1) autoUpdater.quitAndInstall();
      });
    });

    autoUpdater.checkForUpdates();
  }
}

function notify(title, message) {
  const windows = BrowserWindowElectron.getAllWindows();
  if (windows.length === 0) return;
  windows[0].webContents.send('notify', title, message);
}
