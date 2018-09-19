import { ipcRenderer } from 'electron';
import { push } from 'react-router-redux';

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

import {
  ON_CHANGE_COMPACT_MODE,
  OPEN_WELCOME_WINDOW,
} from 'channels';

import { Routes } from 'enums';

export const goToHome = () => dispatch => {
  dispatch(push(Routes.HOME));
};

export const goToCharts = () => dispatch => {
  dispatch(push(Routes.CHARTS));
};

export const goToLibrary = () => dispatch => {
  dispatch(push(Routes.LIBRARY));
};

export const goToSettings = () => dispatch => {
  dispatch(push(Routes.SETTINGS));
};

export const openWelcomeSlides = () => {
  ipcRenderer.send(OPEN_WELCOME_WINDOW);
  return {
    type: OPEN_WELCOME_WINDOW
  };
};

export const setAppSettings = data => ({
  type: SET_APP_SETTINGS,
  data
});

export const setElectronSettings = (keyPath, value, options = {}) => ({
  type: SET_ELECTRON_SETTINGS,
  keyPath,
  value,
  options
});

export const setNotificationType = notificationType => ({
  type: SET_NOTIFICATIONS_TYPE,
  notificationType
});

export const setContinuousMode = bool => ({
  type: SET_CONTINUOUS_MODE,
  bool
});

export const setTheme = theme => ({
  type: SET_THEME,
  theme
});

export const toggleCompactMode = () => (dispatch, getState) => {
  dispatch({ type: TOGGLE_COMPACT_MODE });
  const { app: { compact } } = getState();
  ipcRenderer.send(ON_CHANGE_COMPACT_MODE, compact);
};

export const toggleMinimizeToTray = () => ({
  type: TOGGLE_MINIMIZE_TO_TRAY
});

export const toggleShowTrayIcon = () => ({
  type: TOGGLE_SHOW_TRAY_ICON
});
