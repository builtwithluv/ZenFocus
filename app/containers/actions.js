import {
  SET_APP_SETTINGS,
  SET_AUDIO,
  SET_AUDIO_OFF,
  SET_AUDIO_ON,
  SET_ELECTRON_SETTINGS,
  SET_THEME
} from './types';

export const setAppSettings = (data) => ({
  type: SET_APP_SETTINGS,
  data
});

export const setAudio = (audioSelection) => ({
  type: SET_AUDIO,
  audioSelection
});

export const setAudioOff = () => ({
  type: SET_AUDIO_OFF
});

export const setAudioOn = () => ({
  type: SET_AUDIO_ON
});

export const setElectronSettings = (keyPath, value, options = {}) => ({
  type: SET_ELECTRON_SETTINGS,
  keyPath,
  value,
  options
});

export const setTheme = (theme) => (dispatch) => {
  dispatch(setElectronSettings('styles.theme', theme));
  dispatch({ type: SET_THEME, theme });
};
