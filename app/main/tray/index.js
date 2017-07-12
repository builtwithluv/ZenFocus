import { Tray, Menu } from 'electron';

import { isLinux, isMacOS } from '../../utils/platform.util';
import { root } from '../../utils/path.util';

class ZenTray {
  icon = null;
  menu = null;
  tray = null;
  win = null;

  build(win) {
    this.win = win;
    this.setIcon();
    this.createMenu();
    this.createTray();
    this.setListeners();
    return this.tray;
  }

  createMenu() {
    this.menu = Menu.buildFromTemplate([
      {
        label: 'ZenFocus',
        click: () => this.win.show()
      },
      {
        label: 'Minimize to tray',
        click: () => this.win.hide()
      },
      { type: 'separator' },
      {
        label: 'Quit',
        click: () => this.win.close()
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
      ? root('assets/images/icon-mac@2x.png')
      : root('assets/images/icon-windows@2x.png');
  }

  setListeners() {
    this.tray.on('double-click', () => this.win.show());
  }
}

export default new ZenTray();
