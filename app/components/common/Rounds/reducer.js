import {
  INCREMENT_ROUND,
  SET_BREAK_PHASE,
  SET_FOCUS_LENGTH,
  SET_FOCUS_PHASE,
  SET_LONG_BREAK_LENGTH,
  SET_MINUTES,
  SET_SECONDS,
  SET_SHORT_BREAK_LENGTH,
  SET_TOTAL_ROUNDS
} from './types';

const initialState = {
  currentRound: 1,
  currentPhase: 0,
  focusLength: 1,
  shortBreakLength: 1,
  longBreakLength: 1,
  totalRounds: 12,
  minutes: 0,
  seconds: 3
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

    case SET_BREAK_PHASE: {
      return {
        ...state,
        currentPhase: 1
      };
    }

    case SET_FOCUS_LENGTH: {
      const { length: focusLength } = action;
      return { ...state, focusLength };
    }


    case SET_FOCUS_PHASE: {
      return {
        ...state,
        currentPhase: 0
      };
    }

    case SET_LONG_BREAK_LENGTH: {
      const { length: longBreakLength } = action;
      return { ...state, longBreakLength };
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
