import {
  INCREMENT_ROUND,
  SET_BREAK_PHASE,
  SET_FOCUS_PHASE,
  SET_MINUTES,
  SET_SECONDS
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

    case SET_FOCUS_PHASE: {
      return {
        ...state,
        currentPhase: 0
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

    default: {
      return state;
    }
  }
};
