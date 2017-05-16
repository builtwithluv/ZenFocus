import {
  INCREMENT_ROUND
} from './types';

const initialState = {
  currentRound: 1,
  rounds: [
    {
      focusLength: 1,
      breakLength: 1
    },
    {
      focusLength: 1,
      breakLength: 1
    },
    {
      focusLength: 1,
      breakLength: 1
    }
  ]
};

export default (state = initialState, action) => {
  switch (action) {
    case INCREMENT_ROUND: {
      const { currentRound, rounds } = state;
      if (currentRound + 1 < rounds.length) {
        return {
          ...state,
          currentRound: state.currentRound + 1
        };
      }
      return state;
    }

    default: {
      return state;
    }
  }
};
