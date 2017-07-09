import { hasReachedEnd } from '../../utils/countdown-timer.util';
import { goToNextPhase, setMinutes, setSeconds } from '../Rounds/actions';
import { PAUSE, RESUME } from './types';
import { Phases } from '../../enums';

let ticker = null;

export const pause = (tickSounds) => (dispatch, getState) => {
  clearInterval(ticker);

  const state = getState();
  const { rounds, sounds } = state;
  const { currentPhase } = rounds;
  const {
    soundFocusPhase,
    soundShortBreakPhase,
    soundLongBreakPhase,
  } = sounds;

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

export const resume = (tickSounds) => (dispatch, getState) => {
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
  ticker = setInterval(() => tick(tickSounds, dispatch, getState), 1000);
  return dispatch({ type: RESUME });
};

export const tick = (tickSounds, dispatch, getState) => {
  const state = getState();
  const { sounds, rounds } = state;
  const {
    audioPhaseDisabled,
    audioTickDisabled,
    soundFocusPhase,
    soundShortBreakPhase,
    soundLongBreakPhase,
    soundPhaseEnded,
  } = sounds;
  const { currentPhase, currentRound, minutes, seconds, totalRounds } = rounds;

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
