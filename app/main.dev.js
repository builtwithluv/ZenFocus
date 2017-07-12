import path from 'path';
import { app } from 'electron';

import { isDebugProd, isDev, isProd } from './utils/env.util';
import { flush } from './utils/flush.util';
import { installExtensions } from './utils/install-extensions.util';

import ZenFocus from './main';
import buildMenu from './main/menu';

if (isProd()) {
  const sourceMapSupport = require('source-map-support'); // eslint-disable-line global-require
  sourceMapSupport.install();
}

if (isDev() || isDebugProd) {
  require('electron-debug')(); // eslint-disable-line global-require
  const p = path.join(__dirname, '..', 'app', 'node_modules');
  require('module').globalPaths.push(p); // eslint-disable-line global-require
}

let Main = null;

app.on('activate', (e, hasVisibleWindows) => {
  if (!hasVisibleWindows) Main.show();
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

  // DANGER: Use wisely. This will delete their settings in local
  flush('DONE_FLUSH', { chart: true });

  Main = ZenFocus.init(`file://${__dirname}/app.html`).window;

  buildMenu(Main);
});
