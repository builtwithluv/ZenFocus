import settings from 'electron-settings';
import { SEND_TOGGLE_COMPACT } from '../events';

export default function setFullAppMode(win) {
  const isCompact = settings.get('system.compact');
  if (isCompact) win.webContents.send(SEND_TOGGLE_COMPACT);
}
