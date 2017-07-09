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
  customSounds as getCustomSounds
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

export const addSound = (title, path, soundType) => (dispatch, getState) => {
  const payload = {
    title,
    path,
    soundType,
    id: uuidv4()
  };
  const state = getState();
  const customSounds = getCustomSounds(state);
  const sounds = [...customSounds, payload];

  dispatch(setElectronSettings('sounds.customSounds', sounds));
  dispatch({ type: ADD_SOUND, ...payload });
};
