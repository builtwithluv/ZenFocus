import { hasReachedEnd } from '../../utils/countdown-timer.util';
import { goToNextPhase, setMinutes, setSeconds } from '../Rounds/actions';
import { PAUSE, RESUME } from './types';
import { Phases } from '../../enums';
import {
  audioPhaseDisabled as getAudioPhaseDisabled,
  audioTickDisabled as getAudioTickDisabled,
  soundFocusPhase as getSoundFocusPhase,
  soundShortBreakPhase as getSoundShortBreakPhase,
  soundLongBreakPhase as getSoundLongBreakPhase,
  soundPhaseEnded as getSoundPhaseEnded,
  tickSounds as getTickSounds,
} from '../../selectors/sounds.selectors';

let ticker = null;

export const pause = () => (dispatch, getState) => {
  clearInterval(ticker);

  const state = getState();
  const { rounds } = state;
  const { currentPhase } = rounds;

  const soundFocusPhase = getSoundFocusPhase(state);
  const soundShortBreakPhase = getSoundShortBreakPhase(state);
  const soundLongBreakPhase = getSoundLongBreakPhase(state);
  const tickSounds = getTickSounds(state);

  const getSound = id => tickSounds.find(sound => sound.id === id);

  switch (currentPhase) {
    case Phases.FOCUS: {
      getSound(soundFocusPhase).pause();
      break;
    }
    case Phases.SHORT_BREAK: {
      getSound(soundShortBreakPhase).pause();
      break;
    }
    case Phases.LONG_BREAK: {
      getSound(soundLongBreakPhase).pause();
      break;
    }
    default: {
      return null;
    }
  }

  dispatch({ type: PAUSE });
};

export const resume = () => (dispatch, getState) => {
  const { rounds } = getState();
  const { currentPhase, currentRound, minutes, seconds, totalRounds } = rounds;
  const end = hasReachedEnd(
    currentPhase,
    currentRound,
    minutes,
    seconds,
    totalRounds
  );
  if (end) return;
  ticker = setInterval(() => tick(dispatch, getState), 1000);
  return dispatch({ type: RESUME });
};

export const tick = (dispatch, getState) => {
  const state = getState();
  const { rounds } = state;
  const { currentPhase, currentRound, minutes, seconds, totalRounds } = rounds;

  const audioPhaseDisabled = getAudioPhaseDisabled(state);
  const audioTickDisabled = getAudioTickDisabled(state);
  const soundFocusPhase = getSoundFocusPhase(state);
  const soundShortBreakPhase = getSoundShortBreakPhase(state);
  const soundLongBreakPhase = getSoundLongBreakPhase(state);
  const soundPhaseEnded = getSoundPhaseEnded(state);
  const tickSounds = getTickSounds(state);

  const getSound = id => tickSounds.find(sound => sound.id === id);

  const playSound = () => {
    if (!audioTickDisabled) {
      switch (currentPhase) {
        case Phases.FOCUS: {
          getSound(soundFocusPhase).play();
          break;
        }
        case Phases.SHORT_BREAK: {
          getSound(soundShortBreakPhase).play();
          break;
        }
        case Phases.LONG_BREAK: {
          getSound(soundLongBreakPhase).play();
          break;
        }
        default: {
          return null;
        }
      }
    }
  };

  if (seconds > 0) {
    dispatch(setSeconds(seconds - 1));
    playSound();
  } else if (minutes > 0) {
    dispatch(setMinutes(minutes - 1));
    dispatch(setSeconds(59));
    playSound();
  } else {
    const end = hasReachedEnd(
      currentPhase,
      currentRound,
      minutes,
      seconds,
      totalRounds
    );
    if (!audioPhaseDisabled) getSound(soundPhaseEnded).play();
    if (end) dispatch(pause());
    dispatch(goToNextPhase());
  }
};
