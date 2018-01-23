import { Phases } from 'enums';

import {
  INCREMENT_ROUND,
  LOAD_ROUNDS_DATA,
  RESET_SESSION,
  RESET_TIMER,
  SET_SHORT_BREAK_PHASE,
  SET_FOCUS_LENGTH,
  SET_FOCUS_PHASE,
  SET_LONG_BREAK_LENGTH,
  SET_LONG_BREAK_INTERVAL,
  SET_LONG_BREAK_PHASE,
  SET_SHORT_BREAK_LENGTH,
  SET_TIMER,
  SET_TOTAL_ROUNDS,
} from './types';

const initialState = {
  currentRound: 1,
  currentPhase: Phases.FOCUS,
  focusLength: 1500000,
  longBreakInterval: 4,
  longBreakLength: 1500000,
  shortBreakLength: 300000,
  timer: null,
  totalRounds: 12,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case INCREMENT_ROUND: {
      const { currentRound, totalRounds } = state;
      if (currentRound < totalRounds) {
        return {
          ...state,
          currentRound: currentRound + 1
        };
      }
      return state;
    }

    case LOAD_ROUNDS_DATA: {
      const { data } = action;
      return { ...state, ...data, timer: data.focusLength || initialState.focusLength };
    }

    case RESET_SESSION: {
      const { focusLength } = state;
      return { ...state, currentPhase: 0, currentRound: 1, timer: focusLength };
    }

    case RESET_TIMER: {
      const {
        currentPhase,
        focusLength,
        longBreakLength,
        shortBreakLength
      } = state;

      if (currentPhase === Phases.FOCUS) {
        return { ...state, timer: focusLength };
      } else if (currentPhase === Phases.SHORT_BREAK) {
        return { ...state, timer: shortBreakLength };
      } else if (currentPhase === Phases.LONG_BREAK) {
        return { ...state, timer: longBreakLength };
      }

      return { ...state };
    }

    case SET_SHORT_BREAK_PHASE: {
      const { shortBreakLength } = state;
      return { ...state, currentPhase: Phases.SHORT_BREAK, timer: shortBreakLength };
    }

    case SET_FOCUS_LENGTH: {
      const { length: focusLength } = action;
      return { ...state, focusLength };
    }

    case SET_FOCUS_PHASE: {
      const { focusLength } = state;
      return { ...state, currentPhase: Phases.FOCUS, timer: focusLength };
    }

    case SET_LONG_BREAK_LENGTH: {
      const { length: longBreakLength } = action;
      return { ...state, longBreakLength };
    }

    case SET_LONG_BREAK_INTERVAL: {
      const { interval: longBreakInterval } = action;
      return { ...state, longBreakInterval };
    }

    case SET_LONG_BREAK_PHASE: {
      const { longBreakLength } = state;
      return { ...state, currentPhase: Phases.LONG_BREAK, timer: longBreakLength };
    }

    case SET_SHORT_BREAK_LENGTH: {
      const { length: shortBreakLength } = action;
      return { ...state, shortBreakLength };
    }

    case SET_TIMER: {
      const { newTime } = action;
      return { ...state, timer: newTime };
    }

    case SET_TOTAL_ROUNDS: {
      const { rounds: totalRounds } = action;
      return { ...state, totalRounds };
    }

    default: {
      return state;
    }
  }
};
