import settings from 'electron-settings';
import {
  ADD_SOUND,
  SET_AUDIO,
  TOGGLE_AUDIO_PHASE,
  TOGGLE_AUDIO_TICK,
} from './types';
import { Phases, Sounds, SoundTypes } from '../../enums';
import { createAudioTag } from '../../utils/sounds.util';
import defaultLibrary from './library';

const initialState = {
  audioPhaseDisabled: settings.get('sounds.audioPhaseDisabled', false),
  audioTickDisabled: settings.get('sounds.audioTickDisabled', false),
  library: settings.get('sounds.library', defaultLibrary).map(createAudioTag),
  musicFocusPhase: settings.get('sounds.focusPhaseMusic'),
  soundFocusPhase: settings.get('sounds.focusPhase', Sounds.TICK),
  soundShortBreakPhase: settings.get('sounds.shortBreakPhase', Sounds.WATER_DROP),
  soundLongBreakPhase: settings.get('sounds.longBreakPhase', Sounds.WATER_DROP),
  soundPhaseEnded: settings.get('sounds.phaseEnded', Sounds.CORSICA_DING),
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_SOUND: {
      const { library } = state;
      const newSounds = [...library, createAudioTag(action)];
      return { ...state, library: newSounds };
    }

    case SET_AUDIO: {
      const { audioSelection, phase, soundType } = action;

      if (soundType === SoundTypes.TICK) {
        if (phase === Phases.FOCUS) return { ...state, soundFocusPhase: audioSelection };
        if (phase === Phases.SHORT_BREAK) return { ...state, soundShortBreakPhase: audioSelection };
        if (phase === Phases.LONG_BREAK) return { ...state, soundLongBreakPhase: audioSelection };
      }

      return { ...state, soundPhaseEnded: audioSelection };
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
