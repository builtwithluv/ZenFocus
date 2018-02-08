import { currentPhase as getCurrentPhase } from 'selectors/rounds.selectors';
import {
  library as getSoundLibrary,
  soundFocusPhase as getFocusSound,
  soundShortBreakPhase as getShortBreakSound,
  soundLongBreakPhase as getLongBreakSound,
} from 'selectors/sounds.selectors';

import { ElectronSettingsPaths, Phases, Sounds } from 'enums';

export const createAudioTag = ({ id, src, title, soundType }) => {
  const audio = new Audio(src);
  audio.id = id;
  audio.title = title;
  audio.soundType = soundType;
  return audio;
};

export const getCurrentSound = (state) => {
  const currentPhase = getCurrentPhase(state);

  switch (currentPhase) {
    case Phases.FOCUS: {
      return getFocusSound(state);
    }
    case Phases.LONG_BREAK: {
      return getLongBreakSound(state);
    }
    case Phases.SHORT_BREAK: {
      return getShortBreakSound(state);
    }
    default: {
      return getFocusSound(state);
    }
  }
};

export const getDefaultSound = (state) => {
  const currentPhase = getCurrentPhase(state);

  switch (currentPhase) {
    case Phases.FOCUS: {
      return {
        key: ElectronSettingsPaths.FOCUS_SOUND,
        id: Sounds.TICK,
      };
    }
    case Phases.LONG_BREAK: {
      return {
        key: ElectronSettingsPaths.LONG_BREAK_SOUND,
        id: Sounds.TICK,
      };
    }
    case Phases.SHORT_BREAK: {
      return {
        key: ElectronSettingsPaths.SHORT_BREAK_SOUND,
        id: Sounds.TICK,
      };
    }
    default: {
      return {
        key: ElectronSettingsPaths.FOCUS_SOUND,
        id: Sounds.TICK,
      };
    }
  }
};

export const getTitleFromSrc = (src) => {
  const split = src.split('/');
  const last = split.length - 1;
  const title = split[last];
  return title;
};

export const pauseAllSounds = state => {
  const library = getSoundLibrary(state);
  library.forEach(sound => sound.pause());
};
