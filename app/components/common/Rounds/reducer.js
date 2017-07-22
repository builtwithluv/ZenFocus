import { Phases } from 'enums';

import { getTime } from 'utils/countdown-timer.util';

import {
  INCREMENT_ROUND,
  LOAD_ROUNDS_DATA,
  RESET_ROUND,
  RESET_SESSION,
  RESET_TIMER,
  SET_BREAK_PHASE,
  SET_FOCUS_LENGTH,
  SET_FOCUS_PHASE,
  SET_LONG_BREAK_LENGTH,
  SET_LONG_BREAK_INTERVAL,
  SET_LONG_BREAK_PHASE,
  SET_MINUTES,
  SET_SECONDS,
  SET_SHORT_BREAK_LENGTH,
  SET_TOTAL_ROUNDS
} from './types';

const initialState = {
  currentRound: 1,
  currentPhase: Phases.FOCUS,
  focusLength: 1500,
  longBreakInterval: 4,
  longBreakLength: 1500,
  shortBreakLength: 300,
  totalRounds: 12,
  minutes: null,
  seconds: null
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
      const { minutes, seconds } = getTime(data.focusLength || initialState.focusLength);
      return {
        ...state,
        ...data,
        minutes,
        seconds
      };
    }

    case RESET_ROUND: {
      const { focusLength } = state;
      const { minutes, seconds } = getTime(focusLength);
      return {
        ...state,
        currentPhase: 0,
        minutes,
        seconds
      };
    }

    case RESET_SESSION: {
      const { focusLength } = state;
      const { minutes, seconds } = getTime(focusLength);
      return {
        ...state,
        currentPhase: 0,
        currentRound: 1,
        minutes,
        seconds
      };
    }

    case RESET_TIMER: {
      const {
        currentPhase,
        focusLength,
        longBreakLength,
        shortBreakLength
      } = state;

      if (currentPhase === Phases.FOCUS) {
        const { minutes, seconds } = getTime(focusLength);
        return { ...state, minutes, seconds };
      } else if (currentPhase === Phases.SHORT_BREAK) {
        const { minutes, seconds } = getTime(shortBreakLength);
        return { ...state, minutes, seconds };
      } else if (currentPhase === Phases.LONG_BREAK) {
        const { minutes, seconds } = getTime(longBreakLength);
        return { ...state, minutes, seconds };
      }

      return { ...state };
    }

    case SET_BREAK_PHASE: {
      const { shortBreakLength } = state;
      const { minutes, seconds } = getTime(shortBreakLength);
      return {
        ...state,
        currentPhase: 1,
        minutes,
        seconds
      };
    }

    case SET_FOCUS_LENGTH: {
      const { length: focusLength } = action;
      return { ...state, focusLength };
    }

    case SET_FOCUS_PHASE: {
      const { focusLength } = state;
      const { minutes, seconds } = getTime(focusLength);
      return {
        ...state,
        currentPhase: 0,
        minutes,
        seconds
      };
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
      const { minutes, seconds } = getTime(longBreakLength);
      return {
        ...state,
        currentPhase: 2,
        minutes,
        seconds
      };
    }

    case SET_MINUTES: {
      const { minutes } = action;
      return { ...state, minutes };
    }

    case SET_SECONDS: {
      const { seconds } = action;
      return { ...state, seconds };
    }

    case SET_SHORT_BREAK_LENGTH: {
      const { length: shortBreakLength } = action;
      return { ...state, shortBreakLength };
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
