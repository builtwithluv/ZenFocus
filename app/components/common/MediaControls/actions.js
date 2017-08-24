import { ipcRenderer } from 'electron';

import { Phases } from 'enums';

import { PAUSE, RESUME, SKIP, STOP } from 'common/MediaControls/types';
import { UPDATE_TRAY_TIMER } from 'channels';

import { hasReachedEnd } from 'utils/countdown-timer.util';
import { pauseAllSounds } from 'utils/sounds.util';

import {
  audioPhaseDisabled as getAudioPhaseDisabled,
  audioTickDisabled as getAudioTickDisabled,
  library as getSoundsLibrary,
  soundFocusPhase as getSoundFocusPhase,
  soundShortBreakPhase as getSoundShortBreakPhase,
  soundLongBreakPhase as getSoundLongBreakPhase,
  soundPhaseEnded as getSoundPhaseEnded,
} from 'selectors/sounds.selectors';

import { goToNextPhase, setMinutes, setSeconds } from 'common/Rounds/actions';

let ticker = null;

export const pause = () => (dispatch, getState) => {
  const state = getState();
  clearInterval(ticker);
  pauseAllSounds(state);
  dispatch({ type: PAUSE });
};

export const stop = () => (dispatch, getState) => {
  const state = getState();
  clearInterval(ticker);
  pauseAllSounds(state);
  ipcRenderer.send(UPDATE_TRAY_TIMER, '');
  dispatch({ type: STOP });
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
  const library = getSoundsLibrary(state);
  const soundFocusPhase = getSoundFocusPhase(state);
  const soundShortBreakPhase = getSoundShortBreakPhase(state);
  const soundLongBreakPhase = getSoundLongBreakPhase(state);
  const soundPhaseEnded = getSoundPhaseEnded(state);

  const getSound = id => library.find(sound => sound.id === id);

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
    if (end) dispatch(stop());

    // Setting timeout ensures sound gets played before moving to next
    setTimeout(() => pauseAllSounds(state), 600);

    dispatch(goToNextPhase());
  }
};

export const skip = () => (dispatch, getState) => {
  const state = getState();

  const library = getSoundsLibrary(state);
  library.forEach(sound => sound.pause());

  dispatch(goToNextPhase());
  dispatch({ type: SKIP });
};

