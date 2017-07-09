import path from 'path';
import { BrowserWindow } from 'electron';
import settings from 'electron-settings';
import { setWindowSize } from '../utils';
import { isMacOS, isLinux } from '../utils/platform';

export default function buildMain(appPath) {
  const win = new BrowserWindow({
    frame: false,
    show: false,
    titleBarStyle: 'hidden-inset',
    icon: isMacOS() || isLinux()
      ? path.join(__dirname, '../../../resources/icons/mac/64x64.png')
      : path.join(__dirname, '../../../resources/icons/windows/64x64.png')
  });

  win.loadURL(appPath);

  win.on('ready-to-show', () => {
    if (!win) {
      throw new Error('"mainWindow" is not defined');
    }
    win.show();
    win.focus();
  });

  win.on('minimize', (e) => {
    const minimizeToTray = settings.get('system.minimizeToTray');
    e.preventDefault();
    if (minimizeToTray) win.hide();
  });

  setWindowSize(win, settings.get('system.compact'));

  return win;
}
