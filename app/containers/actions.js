import { ipcRenderer } from 'electron';
import {
  SET_APP_SETTINGS,
  SET_AUDIO,
  SET_ELECTRON_SETTINGS,
  SET_NOTIFICATIONS_TYPE,
  SET_THEME,
  TOGGLE_AUDIO_PHASE,
  TOGGLE_AUDIO_TICK,
  TOGGLE_COMPACT_MODE,
  TOGGLE_MINIMIZE_TO_TRAY,
  TOGGLE_WELCOME_SLIDES
} from './types';
import { ON_CHANGE_COMPACT_MODE } from '../electron/events';

export const setAppSettings = data => ({
  type: SET_APP_SETTINGS,
  data
});

export const setAudio = audioSelection => ({
  type: SET_AUDIO,
  audioSelection
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

export const setTheme = theme => dispatch => {
  dispatch(setElectronSettings('styles.theme', theme));
  dispatch({ type: SET_THEME, theme });
};

export const toggleAudioPhase = () => ({
  type: TOGGLE_AUDIO_PHASE
});

export const toggleAudioTick = () => ({
  type: TOGGLE_AUDIO_TICK
});

export const toggleCompactMode = () => (dispatch, getState) => {
  dispatch({ type: TOGGLE_COMPACT_MODE });
  const { app: { compact } } = getState();
  ipcRenderer.send(ON_CHANGE_COMPACT_MODE, compact);
};

export const toggleMinimizeToTray = () => ({
  type: TOGGLE_MINIMIZE_TO_TRAY
});

export const toggleWelcomeSlides = () => ({
  type: TOGGLE_WELCOME_SLIDES
});
