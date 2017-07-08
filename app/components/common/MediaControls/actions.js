import { hasReachedEnd } from '../../utils/countdown-timer.util';
import { getAllSounds } from '../../utils/sounds.util';
import { goToNextPhase, setMinutes, setSeconds } from '../Rounds/actions';
import { PAUSE, RESUME } from './types';
import { Phases } from '../../enums';

const allSounds = getAllSounds();

let ticker = null;

export const pause = () => {
  clearInterval(ticker);
  return { type: PAUSE };
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
  const { sounds, rounds } = getState();
  const {
    audioPhaseDisabled,
    audioTickDisabled,
    soundFocusPhase,
    soundShortBreakPhase,
    soundLongBreakPhase,
    soundPhaseEnded,
  } = sounds;
  const { currentPhase, currentRound, minutes, seconds, totalRounds } = rounds;

  const playSound = () => {
    if (!audioTickDisabled) {
      switch (currentPhase) {
        case Phases.FOCUS: {
          allSounds[soundFocusPhase].play();
          break;
        }
        case Phases.SHORT_BREAK: {
          allSounds[soundShortBreakPhase].play();
          break;
        }
        case Phases.LONG_BREAK: {
          allSounds[soundLongBreakPhase].play();
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
    if (!audioPhaseDisabled) allSounds[soundPhaseEnded].play();
    if (end) dispatch(pause());
    dispatch(goToNextPhase());
  }
};
