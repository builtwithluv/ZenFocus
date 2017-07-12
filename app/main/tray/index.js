import path from 'path';
import { Tray, Menu } from 'electron';
import {
  isLinux,
  isMacOS,
} from '../../utils/platform.util';

export default function buildTray(win) {
  let icon;

  if (process.env.NODE_ENV === 'development') {
    icon = isLinux() || isMacOS()
      ? path.join(__dirname, '../../assets/images/icon-mac@2x.png')
      : path.join(__dirname, '../../assets/images/icon-windows@2x.png');
  } else {
    icon = isLinux() || isMacOS()
      ? path.join(__dirname, 'assets/images/icon-mac@2x.png')
      : path.join(__dirname, 'assets/images/icon-windows@2x.png');
  }

  const trayMenu = Menu.buildFromTemplate([
    {
      label: 'ZenFocus',
      click() {
        win.show();
      }
    },
    {
      label: 'Minimize to tray',
      click() {
        win.hide();
      }
    },
    { type: 'separator' },
    {
      label: 'Quit',
      click() {
        win.close();
      }
    }
  ]);

  const tray = new Tray(icon);
  tray.setToolTip('ZenFocus');
  tray.setContextMenu(trayMenu);
  tray.on('double-click', () => win.show());

  return tray;
}
