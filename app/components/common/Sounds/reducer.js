import settings from 'electron-settings';
import {
  SET_AUDIO,
  TOGGLE_AUDIO_PHASE,
  TOGGLE_AUDIO_TICK,
} from './types';
import { Phases, Sounds } from '../../enums';

const initialState = {
  audioPhaseDisabled: settings.get('sounds.audioPhaseDisabled', false),
  audioTickDisabled: settings.get('sounds.audioTickDisabled', false),
  soundFocusPhase: settings.get('sounds.focusPhase', Sounds.TICK),
  soundShortBreakPhase: settings.get('sounds.shortBreakPhase', Sounds.TICK),
  soundLongBreakPhase: settings.get('sounds.longBreakPhase', Sounds.TICK),
  soundPhaseEnded: settings.get('sounds.phaseEnded', Sounds.CORSICA_DING),
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_AUDIO: {
      const { audioSelection, phase } = action;
      if (phase === Phases.FOCUS) return { ...state, soundFocusPhase: audioSelection };
      if (phase === Phases.SHORT_BREAK) return { ...state, soundShortBreakPhase: audioSelection };
      if (phase === Phases.LONG_BREAK) return { ...state, soundLongBreakPhase: audioSelection };
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
