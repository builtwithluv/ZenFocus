import settings from 'electron-settings';
import uuidv4 from 'uuid/v4';
import {
  ADD_SOUND,
  SET_AUDIO,
  TOGGLE_AUDIO_PHASE,
  TOGGLE_AUDIO_TICK,
} from './types';
import {
  setElectronSettings
} from '../../actions';
import {
  library as getLibrary
} from '../../selectors/sounds.selectors';

import defaultLibrary from './library';

export const setAudio = (audioSelection, phase, soundType) => (dispatch, getState) => {
  const state = getState();
  const library = getLibrary(state);

  library.forEach(sound => sound.pause());

  dispatch({
    type: SET_AUDIO,
    audioSelection,
    phase,
    soundType
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
