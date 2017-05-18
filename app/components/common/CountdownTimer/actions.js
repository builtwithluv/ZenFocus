import {
  PAUSE,
  RESUME
} from './types';

export const pause = () => ({
  type: PAUSE
});

export const resume = () => ({
  type: RESUME
});
