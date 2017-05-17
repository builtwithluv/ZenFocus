import {
  SET_ELECTRON_SETTINGS
} from './types';

export const setElectronSettings = (keyPath, value, options = {}) => ({
  type: SET_ELECTRON_SETTINGS,
  keyPath,
  value,
  options
});
