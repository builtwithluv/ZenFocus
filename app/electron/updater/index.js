import { autoUpdater } from 'electron-updater';
import {
  ON_ACCEPT_UPDATE,
  SEND_GENERAL_ALERT
} from '../events';

export default function updater(win) {
  const platform = process.platform;
  if (process.env.NODE_ENV === 'development' || platform === 'linux') return;

  const log = require('electron-log');

  log.transports.file.level = 'info';
  autoUpdater.logger = log;

  autoUpdater.checkForUpdates();

  autoUpdater.on('update-available', () => {
    notify(SEND_GENERAL_ALERT, 'Update is available');
  });

  autoUpdater.on('update-downloaded', () => {
    notify(SEND_GENERAL_ALERT, 'Zen Focus will be updated after it restarts.');
  });

  win.on(ON_ACCEPT_UPDATE, () => {
    autoUpdater.quitAndInstall();
  });

  function notify(channel, message) {
    win.webContents.send(channel, message);
  }
}

