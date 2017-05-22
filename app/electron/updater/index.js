import { ipcMain } from 'electron';
import { autoUpdater } from 'electron-updater';
import {
  ON_ACCEPT_UPDATE,
  SEND_NEEDS_UPDATE
} from '../events';

export default function updater(win) {
  // const platform = process.platform;
  // if (process.env.NODE_ENV === 'development' || platform === 'linux') return;

  const log = require('electron-log');

  log.transports.file.level = 'info';
  autoUpdater.logger = log;

  autoUpdater.checkForUpdates();

  autoUpdater.on('update-downloaded', () => {
    notify(SEND_NEEDS_UPDATE);
  });

  // TODO: Remove when live. Testing purposes only
  ipcMain.on('yo', () => {
    notify(SEND_NEEDS_UPDATE);
  });

  ipcMain.on(ON_ACCEPT_UPDATE, () => {
    autoUpdater.quitAndInstall();
  });

  function notify(channel, message) {
    win.webContents.send(channel, message);
  }
}

