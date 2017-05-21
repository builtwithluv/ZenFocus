import { autoUpdater } from 'electron-updater';
import {
  ON_ACCEPT_UPDATE,
  SEND_NOTIFY_UPDATE
} from '../events';

export default function updater(win) {
  const platform = process.platform;
  if (process.env.NODE_ENV === 'development' || platform === 'linux') return;

  const log = require('electron-log');

  log.transports.file.level = 'info';
  autoUpdater.logger = log;

  autoUpdater.checkForUpdates();

  autoUpdater.on('update-downloaded', (info) => {
    win.webContents.send(SEND_NOTIFY_UPDATE, info);
  });

  win.on(ON_ACCEPT_UPDATE, () => {
    autoUpdater.quitAndInstall();
  });
}
