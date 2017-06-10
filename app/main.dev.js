import path from 'path';
import os from 'os';
import { app, BrowserWindow, ipcMain, Tray, Menu } from 'electron';
import settings from 'electron-settings';
import { installExtensions, setWindowSize } from './electron/utils';
import buildMenu from './electron/menu';
import updater from './electron/updater';
import { ON_CHANGE_COMPACT_MODE } from './electron/events';

if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
}

if (
  process.env.NODE_ENV === 'development' ||
  process.env.DEBUG_PROD === 'true'
) {
  require('electron-debug')();
  const p = path.join(__dirname, '..', 'app', 'node_modules');
  require('module').globalPaths.push(p);
}

const PLATFORM = os.platform();

let mainWindow = null;
let tray = null;

app.on('window-all-closed', () => {
  app.quit();
});

app.on('ready', async () => {
  if (
    process.env.NODE_ENV === 'development' ||
    process.env.DEBUG_PROD === 'true'
  ) {
    await installExtensions();
  }

  // Main Window
  mainWindow = new BrowserWindow({
    frame: false,
    show: false,
    titleBarStyle: 'hidden-inset',
    icon: PLATFORM === 'darwin' || PLATFORM === 'linux'
      ? path.join(__dirname, '../resources/icons/mac/64x64.png')
      : path.join(__dirname, '../resources/icons/windows/64x64.png')
  });

  mainWindow.loadURL(`file://${__dirname}/app.html`);

  mainWindow.on('ready-to-show', () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined');
    }
    mainWindow.show();
    mainWindow.focus();
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  mainWindow.on('minimize', () => {
    const minimizeToTray = settings.get('system.minimizeToTray');
    if (minimizeToTray) mainWindow.hide();
  });

  // Tray
  // TODO: Tray does not work in build of darwin but works in development
  if (PLATFORM !== 'darwin') {
    tray = new Tray(
      PLATFORM === 'darwin' || PLATFORM === 'linux'
        ? path.join(__dirname, '../resources/icons/mac/16x16.png')
        : path.join(__dirname, '../resources/icons/windows/16x16.png')
    );
    const contextMenu = Menu.buildFromTemplate([
      {
        label: 'Zen Focus',
        click: () => mainWindow.show()
      },
      {
        label: 'Minimize to Tray',
        click: () => mainWindow.hide()
      },
      {
        label: 'Exit',
        click: () => app.quit()
      }
    ]);
    tray.setToolTip('Zen Focus');
    tray.setContextMenu(contextMenu);
    tray.on('click', () => mainWindow.show());
  }

  // Listeners
  ipcMain.on(ON_CHANGE_COMPACT_MODE, (e, compact) =>
    setWindowSize(mainWindow, compact)
  );

  setWindowSize(mainWindow, settings.get('system.compact'));
  buildMenu(mainWindow);
  updater(mainWindow);
});
