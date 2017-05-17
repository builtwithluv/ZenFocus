import settings from 'electron-settings';
import {
  SET_ELECTRON_SETTINGS
} from './types';

export default (state = {}, action) => {
  switch (action.type) {
    case SET_ELECTRON_SETTINGS: {
      const { keyPath, value, options } = action;
      return settings.set(keyPath, value, options);
    }

    default: {
      return state;
    }
  }
};
