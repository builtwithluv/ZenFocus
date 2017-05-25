import settings from 'electron-settings';
import {
  SET_APP_SETTINGS,
  SET_AUDIO,
  SET_AUDIO_OFF,
  SET_AUDIO_ON,
  SET_ELECTRON_SETTINGS
} from './types';
import {
  Sounds
} from './enums';

const initialState = {
  audioDisabled: false,
  audioSelection: Sounds.TICK,
  showWelcomeSlides: !settings.has('system.showWelcomeSlides')
};

export default (state = initialState, action) => {
  switch (action.type) {

    case SET_APP_SETTINGS: {
      const { data } = action;
      return { ...state, ...data };
    }

    case SET_AUDIO: {
      const { audioSelection } = action;
      return { ...state, audioSelection };
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
