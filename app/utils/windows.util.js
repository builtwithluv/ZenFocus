import { remote, shell } from 'electron';
import settings from 'electron-settings';

import { SEND_TOGGLE_COMPACT } from '../channels';

export const openNewWindow = (link) => shell.openExternal(link);

export const setFullAppMode = (win) => {
  const isCompact = settings.get('system.compact');
  if (isCompact) win.webContents.send(SEND_TOGGLE_COMPACT);
};

export const setWindowSize = (win, compact) => {
  const WIDTH = 400;
  const HEIGHT = 450;
  const COMPACT_WIDTH = 150;
  const COMPACT_HEIGHT = 90;

  if (compact) {
    win.setResizable(false);
    win.setMaximizable(false);
    win.setAlwaysOnTop(true);
    win.setMinimumSize(COMPACT_WIDTH, COMPACT_HEIGHT);
    win.setSize(COMPACT_WIDTH, COMPACT_HEIGHT, true);
    settings.set('system.compact', true);
  } else {
    win.setResizable(true);
    win.setMaximizable(true);
    win.setAlwaysOnTop(false);
    win.setMinimumSize(WIDTH, HEIGHT);
    win.setSize(WIDTH, HEIGHT, true);
    settings.set('system.compact', false);
  }
};

export const showWindow = () => remote.getCurrentWindow().show();
