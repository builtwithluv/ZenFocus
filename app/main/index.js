import path from 'path';
import { BrowserWindow, ipcMain } from 'electron';
import settings from 'electron-settings';

import { ON_CHANGE_COMPACT_MODE } from '../events';

import { ElectronSettingsPaths } from '../enums';

import { isMacOS, isLinux } from '../utils/platform.util';
import { setWindowSize } from '../utils/windows.util';

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
    this.setListeners();
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

    setWindowSize(this.window, ElectronSettingsPaths.COMPACT);
  }

  load() {
    this.window.loadURL(this.path);
  }

  setAppListeners() {
    ipcMain.on(ON_CHANGE_COMPACT_MODE, (e, compact) => setWindowSize(this.window, compact));
  }

  setWindowListeners() {
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

  setListeners() {
    this.setAppListeners();
    this.setWindowListeners();
  }
}

export default new ZenFocus();
