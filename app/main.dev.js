import path from 'path';
import { app, BrowserWindow, ipcMain, Tray, Menu } from 'electron';
import settings from 'electron-settings';
import { installExtensions, setWindowSize } from './electron/utils';
import buildMenu from './electron/menu';
import updater from './electron/updater';
import { ON_CHANGE_COMPACT_MODE, GET_IS_FOCUSED } from './electron/events';

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

  const isCompact = settings.get('system.compact');

  mainWindow = new BrowserWindow({
    frame: false,
    show: false,
    titleBarStyle: 'hidden-inset',
    icon: path.join(__dirname, '../resources/icons/64x64.png')
  });

  mainWindow.on('minimize', function (e) {
    e.preventDefault();
    mainWindow.hide();
  });

  tray = new Tray(path.join(__dirname, '../resources/icons/16x16.png'));
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
  tray.on('click', function (e) {
    mainWindow.show();
  });

  mainWindow.loadURL(`file://${__dirname}/app.html`);

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

  ipcMain.on(ON_CHANGE_COMPACT_MODE, (e, compact) =>
    setWindowSize(mainWindow, compact)
  );

  ipcMain.on(GET_IS_FOCUSED, (e) => {
    e.returnValue = mainWindow.isFocused();
  });

  setWindowSize(mainWindow, isCompact);
  buildMenu(mainWindow);
  updater(mainWindow);
});
