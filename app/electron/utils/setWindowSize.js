import settings from 'electron-settings';

export default (win, compact) => {
  const WIDTH = 740;
  const HEIGHT = 550;
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
