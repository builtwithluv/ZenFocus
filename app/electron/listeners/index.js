import { ipcMain } from 'electron';
import { setWindowSize } from '../utils';
import { ON_CHANGE_COMPACT_MODE } from '../events';

export default function setAppListeners(win) {
  ipcMain.on(ON_CHANGE_COMPACT_MODE, (e, compact) =>
    setWindowSize(win, compact)
  );
}
