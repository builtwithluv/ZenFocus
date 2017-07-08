import path from 'path';
import os from 'os';
import { app, BrowserWindow, Tray } from 'electron';
import settings from 'electron-settings';
import { installExtensions, setWindowSize } from './electron/utils';
import buildMenu from './electron/menu';
import updater from './electron/updater';
import setAppListeners from './electron/listeners';

if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support'); // eslint-disable-line global-require
  sourceMapSupport.install();
}

if (
  process.env.NODE_ENV === 'development' ||
  process.env.DEBUG_PROD === 'true'
) {
  require('electron-debug')(); // eslint-disable-line global-require
  const p = path.join(__dirname, '..', 'app', 'node_modules');
  require('module').globalPaths.push(p); // eslint-disable-line global-require
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

  buildMainWindow();
  buildMenu(mainWindow);
  buildTray(mainWindow);
  updater(mainWindow);
  setAppListeners(mainWindow);
});

function buildMainWindow() {
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

  setWindowSize(mainWindow, settings.get('system.compact'));
}

function buildTray(win) {
  const icon = PLATFORM === 'darwin' || PLATFORM === 'linux'
    ? path.join(__dirname, 'assets/images/icon-mac@2x.png')
    : path.join(__dirname, 'assets/images/icon-windows@2x.png');

  tray = new Tray(icon);

  tray.on('click', () => win.isVisible() ? win.hide() : win.show());
}
