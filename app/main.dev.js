import path from 'path';
import os from 'os';
import { app, Tray } from 'electron';
import { installExtensions } from './electron/utils';
import buildMain from './electron/main';
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

  mainWindow = buildMain(`file://${__dirname}/app.html`);

  buildMenu(mainWindow);
  buildTray(mainWindow);
  updater(mainWindow);
  setAppListeners(mainWindow);
});

function buildTray(win) {
  const icon = PLATFORM === 'darwin' || PLATFORM === 'linux'
    ? path.join(__dirname, 'assets/images/icon-mac@2x.png')
    : path.join(__dirname, 'assets/images/icon-windows@2x.png');

  tray = new Tray(icon);

  tray.on('click', () => win.isVisible() ? win.hide() : win.show());
}
