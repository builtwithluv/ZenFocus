import settings from 'electron-settings';
import {
  SET_APP_SETTINGS,
  SET_AUDIO,
  SET_AUDIO_OFF,
  SET_AUDIO_ON,
  SET_ELECTRON_SETTINGS,
  SET_THEME,
  TOGGLE_COMPACT_MODE
} from './types';
import { Sounds, Themes } from './enums';

const initialState = {
  audioDisabled: false,
  audioSelection: Sounds.TICK,
  compact: settings.get('system.compact'),
  showWelcomeSlides: !settings.has('system.showWelcomeSlides'),
  theme: Themes.DARK
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

    case SET_THEME: {
      const { theme } = action;
      return { ...state, theme };
    }

    case TOGGLE_COMPACT_MODE: {
      const { compact } = state;
      return { ...state, compact: !compact };
    }

    default: {
      return state;
    }
  }
};
