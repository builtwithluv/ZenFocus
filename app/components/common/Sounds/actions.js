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
  library as getSoundLibrary
} from '../../selectors/sounds.selectors';

export const setAudio = (audioSelection, phase, soundType) => ({
  type: SET_AUDIO,
  audioSelection,
  phase,
  soundType
});

export const toggleAudioPhase = () => ({
  type: TOGGLE_AUDIO_PHASE
});

export const toggleAudioTick = () => ({
  type: TOGGLE_AUDIO_TICK
});

export const addSound = (title, src, soundType) => (dispatch, getState) => {
  const payload = {
    title,
    src,
    soundType,
    id: uuidv4()
  };
  const state = getState();
  const library = getSoundLibrary(state);
  const sounds = [...library, payload];

  dispatch(setElectronSettings('sounds.library', sounds));
  dispatch({ type: ADD_SOUND, ...payload });
};
