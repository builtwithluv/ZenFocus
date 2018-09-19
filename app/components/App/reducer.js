import settings from 'electron-settings';

import { ElectronSettingsPaths, NotificationTypes, Themes } from 'enums';

import {
  SET_APP_SETTINGS,
  SET_ELECTRON_SETTINGS,
  SET_NOTIFICATIONS_TYPE,
  SET_CONTINUOUS_MODE,
  SET_THEME,
  TOGGLE_COMPACT_MODE,
  TOGGLE_MINIMIZE_TO_TRAY,
  TOGGLE_SHOW_TRAY_ICON,
} from 'components/App/types';

const {
  COMPACT,
  CONTINUOUS_MODE,
  MINIMIZE_TO_TRAY,
  NOTIFICATION_TYPE,
  SHOW_TRAY_ICON,
  THEME,
} = ElectronSettingsPaths;

const initialState = {
  compact: settings.get(COMPACT, false),
  continuousMode: settings.get(CONTINUOUS_MODE, false),
  minimizeToTray: settings.get(MINIMIZE_TO_TRAY, false),
  notificationType: settings.get(NOTIFICATION_TYPE, NotificationTypes.PHASE_CHANGES_NO_WINDOW),
  showTrayIcon: settings.get(SHOW_TRAY_ICON, false),
  theme: settings.get(THEME, Themes.LIGHT)
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

    case SET_CONTINUOUS_MODE: {
      const { bool } = action;
      return { ...state, continuousMode: bool };
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

    case TOGGLE_SHOW_TRAY_ICON: {
      const { showTrayIcon } = state;
      return { ...state, showTrayIcon: !showTrayIcon };
    }

    default: {
      return state;
    }
  }
};
