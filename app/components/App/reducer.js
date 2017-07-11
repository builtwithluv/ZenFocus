import settings from 'electron-settings';

import { NotificationTypes, Themes } from 'enums';

import {
  SET_APP_SETTINGS,
  SET_ELECTRON_SETTINGS,
  SET_NOTIFICATIONS_TYPE,
  SET_CUSTOM_NOTIFICATION,
  SET_CONTINUOUS_MODE,
  SET_THEME,
  TOGGLE_COMPACT_MODE,
  TOGGLE_MINIMIZE_TO_TRAY,
  TOGGLE_WELCOME_SLIDES
} from 'App/types';

const initialState = {
  compact: settings.get('system.compact', false),
  minimizeToTray: settings.get('system.minimizeToTray', false),
  notificationType: settings.get(
    'system.notificationType',
    NotificationTypes.PHASE_CHANGES_NO_WINDOW
  ),
  customNotification: {
    title: 'Focus phase over',
    body: 'Time to take a break'
  },
  continuousMode: settings.get('system.continuousMode', false),
  showWelcomeSlides: !settings.has('system.showWelcomeSlides'),
  theme: settings.get('styles.theme', Themes.LIGHT)
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_APP_SETTINGS: {
      const { data } = action;
      return { ...state, ...data };
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

    case SET_CUSTOM_NOTIFICATION: {
      const { title, body } = action;
      return { ...state, customNotification: { title, body } };
    }

    case SET_CONTINUOUS_MODE: {
      const { bool } = action;
      return { ...state, continuousMode: bool };
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

    case TOGGLE_MINIMIZE_TO_TRAY: {
      const { minimizeToTray } = state;
      return { ...state, minimizeToTray: !minimizeToTray };
    }

    default: {
      return state;
    }
  }
};
