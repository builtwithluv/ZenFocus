import path from 'path';
import { BrowserWindow, ipcMain } from 'electron';

import { ON_CHANGE_COMPACT_MODE } from '../channels';

import { ElectronSettingsPaths } from '../enums';

import settings from '../utils/electron-settings.util';
import { isMacOS, isLinux } from '../utils/platform.util';
import { setWindowSize } from '../utils/windows.util';

import ZenMenu from './menu';
import ZenTray from './tray';
import ZenUpdater from './updater';

class ZenFocus {
  menu = null;
  path = null;
  tray = null;
  updater = null;
  window = null;

  init(appPath) {
    this.path = appPath;
    this.createWindow();
    this.createMenu();
    this.createTray();
    this.createUpdater();
    this.load();
    this.setListeners();
    return this;
  }

  createMenu() {
    this.menu = ZenMenu.init(this.window);
  }

  createTray() {
    this.tray = ZenTray.init(this.window);
  }

  createUpdater() {
    this.updater = ZenUpdater.init(this.window);
  }

  createWindow() {
    const { COMPACT } = ElectronSettingsPaths;
    this.window = new BrowserWindow({
      frame: false,
      show: false,
      titleBarStyle: 'hidden-inset',
      icon: isMacOS() || isLinux()
        ? path.join(__dirname, '../../resources/icons/mac/64x64.png')
        : path.join(__dirname, '../../resources/icons/windows/64x64.png')
    });
    setWindowSize(this.window, settings.get(COMPACT));
  }

  load() {
    this.window.loadURL(this.path);
  }

  setAppListeners() {
    ipcMain.on(ON_CHANGE_COMPACT_MODE, (e, compact) => setWindowSize(this.window, compact));
  }

  setWindowListeners() {
    const { MINIMIZE_TO_TRAY } = ElectronSettingsPaths;

    this.window.on('ready-to-show', () => {
      if (!this.window) throw new Error('"ZenFocus" is not defined');
      this.window.show();
      this.window.focus();
    });

    this.window.on('minimize', e => {
      const minimizeToTray = settings.get(MINIMIZE_TO_TRAY);
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
