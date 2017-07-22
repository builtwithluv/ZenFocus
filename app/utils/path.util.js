import * as _path from 'path';
import { remote } from 'electron';

import { isDev } from './env.util';

export const soundsPath = loc => {
  if (isDev()) return _path.resolve('app', 'assets', 'sounds', loc);
  return _path.join(remote.app.getAppPath(), 'assets', 'sounds', loc);
};

export const base = path => (
  isDev()
    ? _path.join(__dirname, '..', path)
    : _path.join(__dirname, path)
);
