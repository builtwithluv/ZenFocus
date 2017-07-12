import { Tray, Menu } from 'electron';

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

  setListeners() {
    this.tray.on('double-click', () => this.window.show());
  }
}

export default new ZenTray();
