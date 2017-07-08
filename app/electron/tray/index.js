import path from 'path';
import os from 'os';
import { Tray, Menu } from 'electron';

export default function buildTray(win) {
  const PLATFORM = os.platform();

  let icon;
  if (process.env.NODE_ENV === 'development') {
    icon = PLATFORM === 'darwin' || PLATFORM === 'linux'
      ? path.join(__dirname, '../../assets/images/icon-mac@2x.png')
      : path.join(__dirname, '../../assets/images/icon-windows@2x.png');
  } else {
    icon = PLATFORM === 'darwin' || PLATFORM === 'linux'
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
