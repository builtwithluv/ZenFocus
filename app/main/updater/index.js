import { ipcMain } from 'electron';
import { autoUpdater } from 'electron-updater';
import settings from 'electron-settings';

import {
  ON_ACCEPT_UPDATE,
  SEND_CHECKING_FOR_UPDATES,
  SEND_ERROR,
  SEND_NEEDS_UPDATE,
  CHECK_FOR_UPDATES,
} from '../../events';

import { openReleaseNotes } from '../../utils/release-notes.util';

export default function updater(win) {
  const platform = process.platform;
  if (platform === 'linux') return;

  const log = require('electron-log'); // eslint-disable-line global-require

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

    settings.set('version', info.version);

    // This flag prevents the alert to show up on the load everytime
    if (shouldShowUpdateAlert) notify(SEND_NEEDS_UPDATE, false);
    shouldShowUpdateAlert = true;

    if (showReleaseNotes) openReleaseNotes(info.version);
  });

  autoUpdater.on('update-available', (info) => {
    notify(SEND_NEEDS_UPDATE, info.version);
  });

  autoUpdater.on('update-downloaded', (info) => {
    settings.set('system.showReleaseNotes', true);
    settings.set('version', info.version);
    autoUpdater.quitAndInstall();
  });

  autoUpdater.on('error', () => {
    notify(SEND_ERROR, 'Something went wrong while trying to look for updates.');
  });

  ipcMain.on(ON_ACCEPT_UPDATE, () => {
    autoUpdater.downloadUpdate();
  });

  ipcMain.on(CHECK_FOR_UPDATES, () => {
    autoUpdater.checkForUpdates();
  });

  function notify(channel, message) {
    win.webContents.send(channel, message);
  }
}
