import settings from 'electron-settings';
import {
  SET_APP_SETTINGS,
  SET_AUDIO,
  SET_ELECTRON_SETTINGS,
  SET_NOTIFICATIONS_TYPE,
  SET_THEME,
  TOGGLE_AUDIO_PHASE,
  TOGGLE_AUDIO_TICK,
  TOGGLE_COMPACT_MODE,
  TOGGLE_WELCOME_SLIDES
} from './types';
import { NotificationTypes, Sounds, Themes } from './enums';

const initialState = {
  audioPhaseDisabled: false,
  audioSelection: Sounds.TICK,
  audioTickDisabled: false,
  compact: settings.get('system.compact'),
  notificationType: settings.get(
    'system.notificationType',
    NotificationTypes.PHASE_CHANGES_NO_WINDOW
  ),
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

    case SET_ELECTRON_SETTINGS: {
      const { keyPath, value, options } = action;
      settings.set(keyPath, value, options);
      return { ...state };
    }

    case SET_NOTIFICATIONS_TYPE: {
      const { notificationType } = action;
      return { ...state, notificationType };
    }

    case TOGGLE_AUDIO_PHASE: {
      const { audioPhaseDisabled } = state;
      return { ...state, audioPhaseDisabled: !audioPhaseDisabled };
    }

    case TOGGLE_AUDIO_TICK: {
      const { audioTickDisabled } = state;
      return { ...state, audioTickDisabled: !audioTickDisabled };
    }

    case TOGGLE_WELCOME_SLIDES: {
      return { ...state, showWelcomeSlides: true };
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
