import {
  PAUSE,
  RESUME,
  STOP,
} from 'common/MediaControls/types';

const initialState = {
  isPlaying: false,
  isStopped: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case PAUSE: {
      return { ...state, isPlaying: false };
    }

    case RESUME: {
      return { ...state, isPlaying: true };
    }

    case STOP: {
      return { ...state, isPlaying: false, isStopped: true };
    }

    default: {
      return state;
    }
  }
};
