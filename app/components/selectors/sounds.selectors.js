import { createSelector } from 'reselect';
import { sounds } from './common.selectors';
import { SoundTypes } from '../enums';

export const audioPhaseDisabled = createSelector(
  sounds,
  so => so.audioPhaseDisabled
);

export const audioTickDisabled = createSelector(
  sounds,
  so => so.audioTickDisabled
);

export const library = createSelector(
  sounds,
  so => so.library
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

export const tickSounds = createSelector(
  library,
  lib => lib.filter(sound => sound.soundType === SoundTypes.TICK)
);
