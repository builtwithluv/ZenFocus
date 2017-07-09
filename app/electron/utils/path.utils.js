import path from 'path';
import { remote } from 'electron';
import { isDev } from './env.utils';

export const soundsPath = loc => {
  if (isDev()) return path.resolve('app', 'assets', 'sounds', loc);
  return path.join(remote.app.getAppPath(), 'assets', 'sounds', loc);
};
