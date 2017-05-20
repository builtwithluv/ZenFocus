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
  SET_LONG_BREAK_PHASE,
  SET_MINUTES,
  SET_SECONDS,
  SET_SHORT_BREAK_LENGTH,
  SET_TOTAL_ROUNDS
} from './types';

const initialState = {
  currentRound: 1,
  currentPhase: 0,
  focusLength: 25,
  longBreakInterval: 4,
  longBreakLength: 25,
  shortBreakLength: 5,
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
      return {
        ...state,
        ...data,
        minutes: data.focusLength || 25,
        seconds: 0
      };
    }

    case RESET_ROUND: {
      const { focusLength } = state;
      return {
        ...state,
        currentPhase: 0,
        minutes: focusLength,
        seconds: 0
      };
    }

    case RESET_SESSION: {
      const { focusLength } = state;
      return {
        ...state,
        currentPhase: 0,
        currentRound: 1,
        minutes: focusLength,
        seconds: 0
      };
    }

    case RESET_TIMER: {
      const { currentPhase, focusLength, shortBreakLength } = state;
      if (currentPhase === 0) return { ...state, minutes: focusLength, seconds: 0 };
      return { ...state, minutes: shortBreakLength, seconds: 0 };
    }

    case SET_BREAK_PHASE: {
      const { shortBreakLength } = state;
      return {
        ...state,
        currentPhase: 1,
        minutes: shortBreakLength,
        seconds: 0
      };
    }

    case SET_FOCUS_LENGTH: {
      const { length: focusLength } = action;
      return { ...state, focusLength };
    }


    case SET_FOCUS_PHASE: {
      const { focusLength } = state;
      return {
        ...state,
        currentPhase: 0,
        minutes: focusLength,
        seconds: 0
      };
    }

    case SET_LONG_BREAK_LENGTH: {
      const { length: longBreakLength } = action;
      return { ...state, longBreakLength };
    }

    case SET_LONG_BREAK_PHASE: {
      const { longBreakLength } = state;
      return {
        ...state,
        currentPhase: 2,
        minutes: longBreakLength,
        seconds: 0
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
