import { Intent } from '@blueprintjs/core';

import { Phases } from 'enums';

export const getPhaseTime = (fl, lbl, sbl, cp) => {
  if (cp === Phases.FOCUS) return fl;
  else if (cp === Phases.SHORT_BREAK) return sbl;
  else if (cp === Phases.LONG_BREAK) return lbl;
  return 0;
};

export const hasReachedEnd = (currentPhase, currentRound, timer, totalRounds) => (
  currentRound >= totalRounds &&
  currentPhase >= 0 &&
  timer <= 0
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

export const getClockTime = ms => {
  const seconds = ms / 1000;

  return {
    seconds: Math.round(seconds % 60),
    minutes: Math.floor(seconds / 60),
  };
};

