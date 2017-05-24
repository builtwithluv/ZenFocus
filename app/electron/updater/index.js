import { ipcMain } from 'electron';
import { autoUpdater } from 'electron-updater';
import {
  ON_ACCEPT_UPDATE,
  SEND_CHECKING_FOR_UPDATES,
  SEND_ERROR,
  SEND_GENERAL_ALERT,
  SEND_NEEDS_UPDATE
} from '../events';

export default function updater(win) {
  const platform = process.platform;
  if (platform === 'linux') return;

  const log = require('electron-log');

  log.transports.file.level = 'info';
  autoUpdater.logger = log;

  autoUpdater.autoDownload = false;

  autoUpdater.checkForUpdates();

  autoUpdater.on('checking-for-update', () => {
    notify(SEND_CHECKING_FOR_UPDATES);
  });

  autoUpdater.on('update-not-available', () => {
    notify(SEND_GENERAL_ALERT, 'You are currently up-to-date.');
  });

  autoUpdater.on('update-available', (info) => {
    notify(SEND_NEEDS_UPDATE, info.version);
  });

  autoUpdater.on('update-downloaded', () => {
    autoUpdater.quitAndInstall();
  });

  autoUpdater.on('error', () => {
    notify(SEND_ERROR, 'Something went wrong while trying to look for updates.');
  });

  ipcMain.on(ON_ACCEPT_UPDATE, () => {
    autoUpdater.downloadUpdate();
  });

  function notify(channel, message) {
    win.webContents.send(channel, message);
  }
}

