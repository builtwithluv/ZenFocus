import { Tray, Menu, ipcMain } from 'electron';

import { UPDATE_TRAY_TIMER, UPDATE_TRAY_ICON } from '../../channels';
import { PAUSE, RESUME } from '../../components/common/MediaControls/types';
import { Phases } from '../../enums';

import { isLinux, isMacOS } from '../../utils/platform.util';
import { base } from '../../utils/path.util';

class ZenTray {
  icon = null;
  menu = null;
  tray = null;
  window = null;

  init(win) {
    this.window = win;
    this.setIcon();
    this.createMenu();
    this.createTray();
    this.setListeners();
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

  createTray() {
    this.tray = new Tray(this.icon);
    this.tray.setContextMenu(this.menu);
    this.tray.setToolTip('ZenFocus');
  }

  setIcon() {
    this.icon = isLinux() || isMacOS()
      ? base('assets/images/icon-mac@2x.png')
      : base('assets/images/icon-windows@2x.png');
  }

  setTrayTitle = (e, time) => {
    this.tray.setTitle(time);
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

  setListeners() {
    this.tray.on('double-click', () => this.window.show());
    ipcMain.on(UPDATE_TRAY_TIMER, this.setTrayTitle);
    ipcMain.on(UPDATE_TRAY_ICON, this.setTrayIcon);
  }
}

export default new ZenTray();
