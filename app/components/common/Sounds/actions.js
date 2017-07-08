import {
  SET_AUDIO,
  TOGGLE_AUDIO_PHASE,
  TOGGLE_AUDIO_TICK,
} from './types';

export const setAudio = (audioSelection, phase) => ({
  type: SET_AUDIO,
  audioSelection,
  phase
});

export const toggleAudioPhase = () => ({
  type: TOGGLE_AUDIO_PHASE
});

export const toggleAudioTick = () => ({
  type: TOGGLE_AUDIO_TICK
});
