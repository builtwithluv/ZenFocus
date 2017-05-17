import {
  INCREMENT_ROUND,
  LOAD_ROUNDS_DATA,
  SET_BREAK_PHASE,
  SET_FOCUS_LENGTH,
  SET_FOCUS_PHASE,
  SET_LONG_BREAK_LENGTH,
  SET_MINUTES,
  SET_SECONDS,
  SET_SHORT_BREAK_LENGTH,
  SET_TOTAL_ROUNDS
} from './types';

export const incrementRound = () => ({
  type: INCREMENT_ROUND
});

export const loadRoundsData = (data) => ({
  type: LOAD_ROUNDS_DATA,
  data
});

export const setBreakPhase = () => ({
  type: SET_BREAK_PHASE
});

export const setFocusLength = (length) => ({
  type: SET_FOCUS_LENGTH,
  length
});

export const setFocusPhase = () => ({
  type: SET_FOCUS_PHASE
});

export const setLongBreakLength = (length) => ({
  type: SET_LONG_BREAK_LENGTH,
  length
});

export const setMinutes = (minutes) => ({
  type: SET_MINUTES,
  minutes
});

export const setSeconds = (seconds) => ({
  type: SET_SECONDS,
  seconds
});

export const setShortBreakLength = (length) => ({
  type: SET_SHORT_BREAK_LENGTH,
  length
});

export const setTotalRounds = (rounds) => ({
  type: SET_TOTAL_ROUNDS,
  rounds
});
