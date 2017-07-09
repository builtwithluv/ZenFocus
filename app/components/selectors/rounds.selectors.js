import { createSelector } from 'reselect';
import { rounds } from './common.selectors';

export const currentPhase = createSelector(
  rounds,
  r => r.currentPhase
);

export const currentRound = createSelector(
  rounds,
  r => r.currentRound
);

export const focusLength = createSelector(
  rounds,
  r => r.focusLength
);

export const longBreakInterval = createSelector(
  rounds,
  r => r.longBreakInterval
);

export const longBreakLength = createSelector(
  rounds,
  r => r.longBreakLength
);

export const minutes = createSelector(
  rounds,
  r => r.minutes
);

export const seconds = createSelector(
  rounds,
  r => r.seconds
);

export const shortBreakLength = createSelector(
  rounds,
  r => r.shortBreakLength
);

export const totalRounds = createSelector(
  rounds,
  r => r.totalRounds
);
