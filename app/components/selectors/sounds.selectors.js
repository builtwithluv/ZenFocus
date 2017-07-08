import { createSelector } from 'reselect';
import { sounds } from './common.selectors';

export const audioPhaseDisabled = createSelector(
  sounds,
  so => so.audioPhaseDisabled
);

export const audioTickDisabled = createSelector(
  sounds,
  so => so.audioTickDisabled
);

export const soundFocusPhase = createSelector(
  sounds,
  so => so.soundFocusPhase
);

export const soundShortBreakPhase = createSelector(
  sounds,
  so => so.soundShortBreakPhase
);

export const soundLongBreakPhase = createSelector(
  sounds,
  so => so.soundLongBreakPhase
);

export const soundPhaseEnded = createSelector(
  sounds,
  so => so.soundPhaseEnded
);
