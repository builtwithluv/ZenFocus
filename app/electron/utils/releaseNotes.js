import { BrowserWindow } from 'electron';
import settings from 'electron-settings';

export default (version) => {
  const browserOpts = {
    width: 800,
    height: 800,
    show: false
  };

  let win = new BrowserWindow(browserOpts);
  win.loadURL(`https://github.com/builtwithluv/ZenFocus/releases/tag/v${version}`);

  win.on('closed', () => { win = null; });
  win.on('ready-to-show', () => win.show());

  settings.set('system.showReleaseNotes', false);
};
