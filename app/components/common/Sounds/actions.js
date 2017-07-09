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
  musicFiles as getMusicFiles
} from '../../selectors/sounds.selectors';
import { Phases, SoundTypes } from '../../enums';

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
  const musicFiles = getMusicFiles(state);
  const files = [...musicFiles, payload];

  // Case where user adds the first sound, we will use that as the default
  if (musicFiles.length < 1) {
    dispatch(setAudio(payload.id, Phases.FOCUS, SoundTypes.MUSIC));
    dispatch(setElectronSettings('sounds.focusPhaseMusic', payload.id));
  }

  dispatch({ type: ADD_SOUND, ...payload });
  dispatch(setElectronSettings('sounds.musicFiles', files));
};
