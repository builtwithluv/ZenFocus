import { Intent } from '@blueprintjs/core';
import { Phases } from '../containers/enums';

export const getSecondsFromPhase = (min, sec, fl, lbl, sbl, cp) => {
  if (cp === Phases.FOCUS) return fl * 60;
  else if (cp === Phases.SHORT_BREAK) return sbl * 60;
  else if (cp === Phases.LONG_BREAK) return lbl * 60;
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
