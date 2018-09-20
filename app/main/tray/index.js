import { Tray, Menu, ipcMain } from 'electron';
import settings from 'electron-settings';

import {
  DESTROY_TRAY_ICON,
  UPDATE_TRAY_TIMER,
  UPDATE_TRAY_ICON,
} from '../../channels';
import { PAUSE, RESUME } from '../../components/common/MediaControls/types';
import { ElectronSettingsPaths, Phases } from '../../enums';

import { isLinux, isMacOS } from '../../utils/platform.util';
import { base } from '../../utils/path.util';

class ZenTray {
  icon = null;
  menu = null;
  tray = null;
  window = null;

  init(win) {
    const { SHOW_TRAY_ICON } = ElectronSettingsPaths;
    const showTrayIcon = settings.get(SHOW_TRAY_ICON);

    this.window = win;
    this.setIcon();
    this.createMenu();
    this.setTrayListeners();

    if (showTrayIcon) {
      this.createTray();
    }

    return this;
  }

  createMenu() {
    this.menu = Menu.buildFromTemplate([
      {
        label: 'ZenFocus',
        click: () => this.window.show()
      },
      {
        label: 'Pause',
        click: () => this.window.webContents.send(PAUSE)
      },
      {
        label: 'Resume',
        click: () => this.window.webContents.send(RESUME)
      },
      {
        label: 'Minimize to tray',
        click: () => this.window.hide()
      },
      { type: 'separator' },
      {
        label: 'Quit',
        click: () => this.window.close()
      }
    ]);
  }

  createTray = () => {
    this.tray = new Tray(this.icon);
    this.tray.setContextMenu(this.menu);
    this.tray.setToolTip('ZenFocus');

    this.tray.on('double-click', () => this.window.show());
    ipcMain.on(UPDATE_TRAY_ICON, this.setTrayIcon);
    ipcMain.on(UPDATE_TRAY_TIMER, this.setTrayTitle);
  }

  setIcon() {
    this.icon = isLinux() || isMacOS()
      ? base('assets/images/icon-mac@2x.png')
      : base('assets/images/icon-windows@2x.png');
  }

  setTrayTitle = (e, time) => {
    const { SHOW_TIMER_BY_TRAY } = ElectronSettingsPaths;
    const showTimerByTray = settings.get(SHOW_TIMER_BY_TRAY);

    if (!showTimerByTray) {
      this.tray.setTitle('');
    }

    if (showTimerByTray) {
      this.tray.setTitle(time);
    }
  }

  setTrayIcon = (e, currentPhase) => {
    switch (currentPhase) {
      case Phases.FOCUS: {
        this.tray.setImage(base('assets/images/icon-focus@2x.png'));
        break;
      }

      case Phases.SHORT_BREAK: {
        this.tray.setImage(base('assets/images/icon-short@2x.png'));
        break;
      }

      case Phases.LONG_BREAK: {
        this.tray.setImage(base('assets/images/icon-long@2x.png'));
        break;
      }

      default: {
        this.tray.setImage(base('assets/images/icon-mac@2x.png'));
        return null;
      }
    }
  }

  setTrayListeners = () => {
    ipcMain.on(DESTROY_TRAY_ICON, () => {
      this.tray.destroy();
      ipcMain.removeListener(UPDATE_TRAY_ICON, this.setTrayIcon);
      ipcMain.removeListener(UPDATE_TRAY_TIMER, this.setTrayTitle);
    });
  }
}

export default new ZenTray();
