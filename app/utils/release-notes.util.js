import { shell } from 'electron';
import settings from 'electron-settings';

export const openReleaseNotes = version => {
  shell.openExternal(`https://github.com/builtwithluv/ZenFocus/releases/tag/v${version}`);
  settings.set('system.showReleaseNotes', false);
};
