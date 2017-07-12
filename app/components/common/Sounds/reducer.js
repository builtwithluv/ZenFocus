// @flow

import settings from 'electron-settings';

import { Phases, Sounds } from 'enums';

import {
  ADD_SOUND,
  REMOVE_SOUND,
  SET_AUDIO,
  TOGGLE_AUDIO_PHASE,
  TOGGLE_AUDIO_TICK,
} from 'common/Sounds/types';

import { createAudioTag } from 'utils/sounds.util';

import defaultLibrary from 'common/Sounds/library';

type State = {
  audioPhaseDisabled: boolean,
  audioTickDisabled: boolean,
  library: Sound[],
  soundFocusPhase: SoundType,
  soundShortBreakPhase: SoundID,
  soundLongBreakPhase: SoundID,
  soundPhaseEnded: SoundID
};

const initialState = {
  audioPhaseDisabled: settings.get('sounds.audioPhaseDisabled', false),
  audioTickDisabled: settings.get('sounds.audioTickDisabled', false),
  library: settings.get('sounds.library', defaultLibrary).map(createAudioTag),
  soundFocusPhase: settings.get('sounds.focusPhase', Sounds.TICK),
  soundShortBreakPhase: settings.get('sounds.shortBreakPhase', Sounds.WATER_DROP),
  soundLongBreakPhase: settings.get('sounds.longBreakPhase', Sounds.WATER_DROP),
  soundPhaseEnded: settings.get('sounds.phaseEnded', Sounds.CORSICA_DING),
};

export default (state: State = initialState, action: Action) => {
  switch (action.type) {
    case ADD_SOUND: {
      const { library } = state;
      const newSounds = [...library, createAudioTag(action)];
      return { ...state, library: newSounds };
    }

    case REMOVE_SOUND: {
      const { library } = state;
      const { id } = action.payload;
      const newSounds = library.filter(sound => sound.id !== id);
      return { ...state, library: newSounds };
    }

    case SET_AUDIO: {
      const { id, phase } = action.payload;
      if (phase === Phases.FOCUS) return { ...state, soundFocusPhase: id };
      if (phase === Phases.SHORT_BREAK) return { ...state, soundShortBreakPhase: id };
      if (phase === Phases.LONG_BREAK) return { ...state, soundLongBreakPhase: id };
      return { ...state, soundPhaseEnded: id };
    }

    case TOGGLE_AUDIO_PHASE: {
      const { audioPhaseDisabled } = state;
      return { ...state, audioPhaseDisabled: !audioPhaseDisabled };
    }

    case TOGGLE_AUDIO_TICK: {
      const { audioTickDisabled } = state;
      return { ...state, audioTickDisabled: !audioTickDisabled };
    }

    default: {
      return state;
    }
  }
};
