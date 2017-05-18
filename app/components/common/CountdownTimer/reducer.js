import {
  PAUSE,
  RESUME
} from './types';

const initialState = {
  isPlaying: false,
  disableSlider: false
};

export default (state = initialState, action) => {
  switch (action.type) {

    case PAUSE: {
      return {
        isPlaying: false,
        disableSlider: false
      };
    }

    case RESUME: {
      return {
        isPlaying: true,
        disableSlider: true
      };
    }

    default: {
      return state;
    }
  }
};
