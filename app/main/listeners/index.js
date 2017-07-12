import { ipcMain } from 'electron';

import { ON_CHANGE_COMPACT_MODE } from '../../events';

import { setWindowSize } from '../../utils/windows.util';

export default function setAppListeners(win) {
  ipcMain.on(ON_CHANGE_COMPACT_MODE, (e, compact) =>
    setWindowSize(win, compact)
  );
}
