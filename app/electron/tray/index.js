import path from 'path';
import os from 'os';
import { Tray } from 'electron';

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

  const tray = new Tray(icon);

  tray.on('click', () => win.isVisible() ? win.hide() : win.show());

  return tray;
}
