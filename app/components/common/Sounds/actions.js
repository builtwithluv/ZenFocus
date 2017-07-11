import settings from 'electron-settings';
import uuidv4 from 'uuid/v4';

import {
  ADD_SOUND,
  SET_AUDIO,
  TOGGLE_AUDIO_PHASE,
  TOGGLE_AUDIO_TICK,
} from 'common/Sounds/types';

import { pauseAllSounds } from 'utils/sounds.util';

import { setElectronSettings } from 'App/actions';

import defaultLibrary from 'common/Sounds/library';

export const setAudio = (audioSelection, phase) => (dispatch, getState) => {
  const state = getState();

  pauseAllSounds(state);

  dispatch({
    type: SET_AUDIO,
    audioSelection,
    phase
  });
};

export const toggleAudioPhase = () => ({
  type: TOGGLE_AUDIO_PHASE
});

export const toggleAudioTick = () => ({
  type: TOGGLE_AUDIO_TICK
});

export const addSound = (title, src, soundType) => dispatch => {
  const payload = {
    title,
    src,
    soundType,
    id: uuidv4()
  };

  const localLibrary = settings.get('sounds.library', defaultLibrary);

  dispatch(setElectronSettings('sounds.library', [...localLibrary, payload]));
  dispatch({ type: ADD_SOUND, ...payload });
};
