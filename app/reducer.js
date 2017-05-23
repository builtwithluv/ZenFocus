import settings from 'electron-settings';
import {
  SET_APP_SETTINGS,
  SET_AUDIO_OFF,
  SET_AUDIO_ON,
  SET_ELECTRON_SETTINGS
} from './types';

const initialState = {
  audioDisabled: false
};

export default (state = initialState, action) => {
  switch (action.type) {

    case SET_APP_SETTINGS: {
      const { data } = action;
      return { ...data };
    }

    case SET_AUDIO_OFF: {
      return { ...state, audioDisabled: true };
    }

    case SET_AUDIO_ON: {
      return { ...state, audioDisabled: false };
    }

    case SET_ELECTRON_SETTINGS: {
      const { keyPath, value, options } = action;
      settings.set(keyPath, value, options);
      return { ...state };
    }

    default: {
      return state;
    }
  }
};
