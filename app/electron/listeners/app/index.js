import path from 'path';
import { app, BrowserWindow } from 'electron';
import installExtensions from '../../utils/install-extensions';
import buildMenu from '../../menu';

export default function createListeners() {
  let mainWindow = null;

  app.on('window-all-closed', () => {
    // Respect the OSX convention of having the application in memory even
    // after all windows have been closed
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });

  app.on('ready', async () => {
    if (process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true') {
      await installExtensions();
    }

    mainWindow = new BrowserWindow({
      titleBarStyle: 'hidden',
      show: false,
      width: 1024,
      height: 728,
      minHeight: 600,
      minWidth: 740,
      icon: path.resolve('resources/icons/64x64.png')
    });

    mainWindow.loadURL(`file://${path.resolve('app')}/app.html`);

    // @TODO: Use 'ready-to-show' event
    //        https://github.com/electron/electron/blob/master/docs/api/browser-window.md#using-ready-to-show-event
    mainWindow.webContents.on('did-finish-load', () => {
      if (!mainWindow) {
        throw new Error('"mainWindow" is not defined');
      }
      mainWindow.show();
      mainWindow.focus();
    });

    mainWindow.on('closed', () => {
      mainWindow = null;
    });

    buildMenu(mainWindow);

    // new AppUpdater();
  });
}
