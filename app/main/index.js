import path from 'path';
import { BrowserWindow } from 'electron';
import settings from 'electron-settings';

import { ElectronSettingsPaths } from '../enums';

import { isMacOS, isLinux } from '../utils/platform.util';

import Tray from './tray';

class ZenFocus {
  path = null;
  tray = null;
  window = null;

  init(appPath) {
    this.path = appPath;
    this.createWindow();
    this.createTray();
    this.load();
    return this;
  }

  createTray() {
    this.tray = Tray.build(this.window);
  }

  createWindow() {
    this.window = new BrowserWindow({
      frame: false,
      show: false,
      titleBarStyle: 'hidden-inset',
      icon: isMacOS() || isLinux()
        ? path.join(__dirname, '../../resources/icons/mac/64x64.png')
        : path.join(__dirname, '../../resources/icons/windows/64x64.png')
    });

    this.window.on('ready-to-show', () => {
      if (!this.window) throw new Error('"ZenFocus" is not defined');
      this.window.show();
      this.window.focus();
    });

    this.window.on('minimize', e => {
      const minimizeToTray = settings.get(ElectronSettingsPaths.MINIMIZE_TO_TRAY);
      e.preventDefault();
      if (minimizeToTray) this.window.hide();
    });
  }

  load() {
    this.window.loadURL(this.path);
  }
}

export default new ZenFocus();
