import path from 'path';
import os from 'os';
import { app, BrowserWindow, ipcMain, nativeImage, Tray } from 'electron';
import settings from 'electron-settings';
import { installExtensions, setWindowSize } from './electron/utils';
import buildMenu from './electron/menu';
import updater from './electron/updater';
import { ON_CHANGE_COMPACT_MODE } from './electron/events';

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

  // Listeners
  ipcMain.on(ON_CHANGE_COMPACT_MODE, (e, compact) =>
    setWindowSize(mainWindow, compact)
  );

  setWindowSize(mainWindow, settings.get('system.compact'));
  buildMenu(mainWindow);
  buildTray(mainWindow);
  updater(mainWindow);
});

function buildTray(win) {
  const windowsTrayIcon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABz0lEQVR42n2TO0gkQRCGu8fZVBAPFE00Ok0UzlBDQQRNFFfEQPGRyMFdqCYGYmJkZuAll8kmF12gkYGggXDoBiIGPlBET1DZ0cXZnR2/gmppZHHg46/urv67pqfGpGnqE6j6ZD7LeQ8qlUoAoo0wCYvM/4VTyDGehq+aE1QzyKBjaB5iqDD2SZh6gR++iV/aCjzDoygJEbqP/kavxQ8uiMV8QU1q3OYxkOcWjmEevkCo699IXkqS5AA9ZPwf7fIr2FGDOxhwl1Xo7zfF5WVL/ZbNcuIUnLN2ieacQRPcq8Ev7+at3o2MQ41b0V30BE7L5XKbLHZCrAazYJKzszDKZs3z6GgDNEdDQybO5ZzhOvqPig7jOB4Ug25I1OAnmHI+n2GjgTboFLN4ezvUi5Occ/ShVCoNi0EHvKjBFhioEXXIRsq1YDh5jnEEKfGsS9pL9WHhu86Fr5ubQdTXZ6+MMXGxGBQKBTFaI+eG9VW01xkM6v5X1SlXCUkWXEWtxI+wAVmoe+9t+c5aQVG7cBFp8V6jHj1C96FHX918/EEmWHzSjhuBJuJ2mJfmgT/EtdrGFjXV/rJGaNFThRlttHGvL6yiBlDl9q1qvdfSgZt3vAFFsTmJw9JBOgAAAABJRU5ErkJggg==';
  const macTrayIcon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACCElEQVR42l2Sv2tTURTHz315Lz8xmB8mtQaaSi0aeGoWHUMQpIuL0abQRBdrxoLgUFdxkTr4B7gpOOjmoOjmJI0gCGID0sUl+BNplZbq83PhXHjtFz6cm3PP+d6bc5/sk8nlchJXNps1sleeMUaUvRtgkyW4yHIJHsN7eABd8nVX6/u+WNSFjOf5hAvwBrbgL0TwT+M2fIFr2uOJU6PRELQCP+AbfIWf8ALuwQcO2KVxZPeJy9qaENVlPeUzvIWbFBVSqZTRvzWbSCQGtVptRG5IagPD0xLTKzX4BHNuoHfC0FydnvaCctlM1etSKpU6GHxk7x08ElUFxmpwX3MBGGQH5a5qE5OEJ8QhRuvFYvGYoBOwrUNbBGkWCv7vblc25+ercGRnYUFucxs1WSU8z+fza61WqyPoDOxCBAOQc9VqQKPA8a1u9xTIYGbG3eI6YS2dTo/b7XZPUAM21eCZmy6FkkwmxUYL1zWVSkUymUyPAW6Q2+GjuyKq1xDFb4H8u82mF/V6Jur3ZXJiIhGGoZTL5VWM7WvdwOisqOa0+Y/GvuY9FH/vGs85tnOANnsH4l/ULYjY+KUDXaagymmiKsAQXpI/CUdB7NvGTRbhO6xjdJ6CIidOsV4iN4KHQRBkMDWsjTVwQ4qbHOL3YVGxvkR4Cp1YDtHjZJ04yf1XJ1dxEHxX6jqd/gMs/WoVZImhVAAAAABJRU5ErkJggg==';
  const icon = PLATFORM === 'darwin' || PLATFORM === 'linux'
    ? nativeImage.createFromDataURL(macTrayIcon)
    : nativeImage.createFromDataURL(windowsTrayIcon);

  tray = new Tray(icon);

  tray.on('click', () => win.isVisible() ? win.hide() : win.show());
}
