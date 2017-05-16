import {
  INCREMENT_ROUND,
  SET_BREAK_PHASE,
  SET_FOCUS_PHASE
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
