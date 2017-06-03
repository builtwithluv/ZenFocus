import { ipcMain } from 'electron';
import { autoUpdater } from 'electron-updater';
import settings from 'electron-settings';
import { releaseNotes } from '../utils';
import {
  ON_ACCEPT_UPDATE,
  SEND_CHECKING_FOR_UPDATES,
  SEND_ERROR,
  SEND_NEEDS_UPDATE
} from '../events';

export default function updater(win) {
  const platform = process.platform;
  if (platform === 'linux') return;

  const log = require('electron-log');

  log.transports.file.level = 'info';
  autoUpdater.logger = log;

  // Controls whether to show alert or not on first load
  let shouldShowUpdateAlert = false;

  autoUpdater.autoDownload = false;

  autoUpdater.checkForUpdates();

  autoUpdater.on('checking-for-update', () => {
    notify(SEND_CHECKING_FOR_UPDATES);
  });

  autoUpdater.on('update-not-available', (info) => {
    const { showReleaseNotes } = settings.get('system');

    // This flag prevents the alert to show up on the load everytime
    if (shouldShowUpdateAlert) notify(SEND_NEEDS_UPDATE, false);
    shouldShowUpdateAlert = true;

    if (showReleaseNotes) releaseNotes(info.version);
  });

  autoUpdater.on('update-available', (info) => {
    notify(SEND_NEEDS_UPDATE, info.version);
  });

  autoUpdater.on('update-downloaded', () => {
    settings.set('system.showReleaseNotes', true);
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

