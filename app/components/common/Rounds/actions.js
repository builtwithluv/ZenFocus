import {
  INCREMENT_ROUND,
  SET_BREAK_PHASE,
  SET_FOCUS_PHASE,
  SET_MINUTES,
  SET_SECONDS
} from './types';

export const incrementRound = () => ({
  type: INCREMENT_ROUND
});

export const setBreakPhase = () => ({
  type: SET_BREAK_PHASE
});

export const setFocusPhase = () => ({
  type: SET_FOCUS_PHASE
});

export const setMinutes = (minutes) => ({
  type: SET_MINUTES,
  minutes
});

export const setSeconds = (seconds) => ({
  type: SET_SECONDS,
  seconds
});
