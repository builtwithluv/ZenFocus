import path from 'path';
import { app } from 'electron';
import { installExtensions } from './electron/utils';
import buildMain from './electron/main';
import buildMenu from './electron/menu';
import buildTray from './electron/tray';
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

let mainWindow = null;
let tray = null; // eslint-disable-line no-unused-vars

app.on('activate', (e, hasVisibleWindows) => {
  if (!hasVisibleWindows) mainWindow.show();
});

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
  tray = buildTray(mainWindow);

  buildMenu(mainWindow);
  updater(mainWindow);
  setAppListeners(mainWindow);
});
