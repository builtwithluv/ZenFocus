import {
  INCREMENT_ROUND,
  SET_BREAK_PHASE,
  SET_FOCUS_PHASE
} from './types';

const initialState = {
  currentRound: 0,
  currentPhase: 0,
  rounds: [
    [{ minutes: 0, seconds: 3 }, { minutes: 0, seconds: 5 }],
    [{ minutes: 0, seconds: 3 }, { minutes: 0, seconds: 5 }]
  ]
};

export default (state = initialState, action) => {
  switch (action.type) {
    case INCREMENT_ROUND: {
      const { currentRound, rounds } = state;
      const nextRound = rounds[currentRound + 1];
      if (nextRound) {
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

    default: {
      return state;
    }
  }
};
