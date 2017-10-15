import { ipcRenderer } from 'electron';

import { Phases } from 'enums';

import {
  PAUSE,
  RESUME,
  SKIP,
  STOP,
} from 'common/MediaControls/types';
import { UPDATE_TRAY_TIMER, UPDATE_TRAY_ICON } from 'channels';

import { hasReachedEnd } from 'utils/countdown-timer.util';
import { pauseAllSounds } from 'utils/sounds.util';
import { isMacOS } from 'utils/platform.util';

import {
  audioPhaseDisabled as getAudioPhaseDisabled,
  audioTickDisabled as getAudioTickDisabled,
  library as getSoundsLibrary,
  soundFocusPhase as getSoundFocusPhase,
  soundShortBreakPhase as getSoundShortBreakPhase,
  soundLongBreakPhase as getSoundLongBreakPhase,
  soundPhaseEnded as getSoundPhaseEnded,
} from 'selectors/sounds.selectors';
import {
  currentPhase as getCurrentPhase,
  currentRound as getCurrentRound,
  timer as getCurrentTime,
  totalRounds as getTotalRounds,
} from 'selectors/rounds.selectors';

import { goToNextPhase, setTimer } from 'common/Rounds/actions';

let ticker = null;

export const clearTicker = () => {
  clearInterval(ticker);
  ticker = null;
};

export const pause = () => (dispatch, getState) => {
  const state = getState();
  clearTicker();
  pauseAllSounds(state);
  dispatch({ type: PAUSE });
};

export const stop = () => (dispatch, getState) => {
  const state = getState();
  clearTicker();
  pauseAllSounds(state);
  dispatch({ type: STOP });
  ipcRenderer.send(UPDATE_TRAY_TIMER, '');
  if (isMacOS()) ipcRenderer.send(UPDATE_TRAY_ICON);
};

export const resume = () => (dispatch, getState) => {
  if (!ticker) {
    const state = getState();
    const currentPhase = getCurrentPhase(state);
    const currentRound = getCurrentRound(state);
    const timer = getCurrentTime(state);
    const totalRounds = getTotalRounds(state);

    const end = hasReachedEnd(
      currentPhase,
      currentRound,
      timer,
      totalRounds
    );
    if (end) return;

    // JavaScript timer is inaccurate since it relies on CPU, which means, it will run
    // whenever it is available. Since we are depending that this is accurate for the timer,
    // we need to rely on the system clock
    const start = new Date().getTime();
    ticker = setInterval(() => {
      const delta = Math.floor(new Date().getTime() - start);
      tick(dispatch, getState, timer, delta);
    }, 1000);

    dispatch({ type: RESUME });
    if (isMacOS()) ipcRenderer.send(UPDATE_TRAY_ICON, currentPhase);
  }
};

export const skip = () => (dispatch, getState) => {
  const state = getState();

  const library = getSoundsLibrary(state);
  library.forEach(sound => sound.pause());

  dispatch(goToNextPhase());
  dispatch({ type: SKIP });
};

export const tick = (dispatch, getState, initial, delta) => {
  const state = getState();
  const { rounds } = state;
  const { currentPhase, currentRound, timer, totalRounds } = rounds;

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

  if (Math.floor(timer) > 0) {
    const newTime = initial - delta;
    dispatch(setTimer(newTime > 0 ? newTime : 0));
    playSound();
  } else {
    const end = hasReachedEnd(currentPhase, currentRound, timer, totalRounds);
    if (!audioPhaseDisabled) getSound(soundPhaseEnded).play();
    if (end) dispatch(stop());

    // Setting timeout ensures sound gets played before moving to next
    setTimeout(() => pauseAllSounds(state), 600);

    dispatch(goToNextPhase());
  }
};
