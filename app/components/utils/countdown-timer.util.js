import { Intent } from '@blueprintjs/core';
import { Phases } from '../enums';

export const getSecondsFromPhase = (min, sec, fl, lbl, sbl, cp) => {
  if (cp === Phases.FOCUS) return fl;
  else if (cp === Phases.SHORT_BREAK) return sbl;
  else if (cp === Phases.LONG_BREAK) return lbl;
  return 0;
};

export const hasReachedEnd = (currentPhase, currentRound, minutes, seconds, totalRounds) => (
  currentRound >= totalRounds &&
  minutes === 0 &&
  seconds === 0 &&
  currentPhase >= 0
);

export const hasReachedLastRound = (currentPhase, currentRound, totalRounds) => (
  currentRound >= totalRounds && currentPhase >= 0
);

export const spinnerIntent = (currentPhase) => {
  if (currentPhase === Phases.FOCUS) return Intent.DANGER;
  else if (currentPhase === Phases.SHORT_BREAK) return Intent.PRIMARY;
  else if (currentPhase === Phases.LONG_BREAK) return Intent.NONE;
};

export const twoDigits = (n) => {
  if (n < 10) return `0${n}`;
  return n;
};

export const getTime = (seconds) => ({
  hours: Math.floor(seconds / 60 / 60),
  minutes: Math.floor(seconds / 60),
  seconds: seconds % 60
});
