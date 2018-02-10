/* eslint-disable */

import Analytics from 'electron-google-analytics';
import { remote } from 'electron';
import settings from 'electron-settings';
import uuidv4 from 'uuid/v4';

import {
  SET_NOTIFICATIONS_TYPE,
  SET_CONTINUOUS_MODE,
  SET_THEME,
  TOGGLE_COMPACT_MODE,
  TOGGLE_MINIMIZE_TO_TRAY,
} from 'components/App/types';

import {
  PAUSE,
  RESUME,
  SKIP,
} from 'common/MediaControls/types';

import {
  RESET_SESSION,
  RESET_TIMER,
  SET_FOCUS_LENGTH,
  SET_SHORT_BREAK_LENGTH,
  SET_LONG_BREAK_LENGTH,
  SET_LONG_BREAK_INTERVAL,
  SET_TOTAL_ROUNDS,
} from 'common/Rounds/types';

import {
  ADD_SOUND,
  REMOVE_SOUND,
} from 'common/Sounds/types';

const TRACKING_ID = 'UA-101155103-1';

let clientID = settings.get('clientID');
if (!clientID) {
  clientID = uuidv4();
  settings.set('clientID', clientID);
}

const analytics = new Analytics(TRACKING_ID);

export const analyticsLogger = store => next => action => { // eslint-disable-line no-unused-vars
  switch (action.type) {
    case '@@router/LOCATION_CHANGE': {
      const path = action.payload.pathname;
      analytics.event('View', 'click', { clientID, evLabel: path });
      break;
    }

    case SET_CONTINUOUS_MODE: {
      analytics.event('Settings', 'set-continuous-mode', { clientID });
      break;
    }

    case SET_THEME: {
      const { theme } = action;
      analytics.event('Settings', 'set-theme', { clientID, evLabel: theme });
      break;
    }

    case TOGGLE_COMPACT_MODE: {
      analytics.event('Settings', 'toggle-compact-mode', { clientID });
      break;
    }

    case TOGGLE_MINIMIZE_TO_TRAY: {
      analytics.event('Settings', 'toggle-minimize-to-tray', { clientID });
      break;
    }

    case ADD_SOUND: {
      analytics.event('SoundLibrary', 'add', { clientID });
      break;
    }

    case REMOVE_SOUND: {
      analytics.event('SoundLibrary', 'remove', { clientID });
      break;
    }

    case PAUSE: {
      analytics.event('Timer', 'pause', { clientID });
      break;
    }

    case RESET_SESSION: {
      analytics.event('Timer', 'reset-session', { clientID });
      break;
    }

    case RESET_TIMER: {
      analytics.event('Timer', 'reset-timer', { clientID });
      break;
    }

    case RESUME: {
      analytics.event('Timer', 'resume', { clientID });
      break;
    }

    case SET_FOCUS_LENGTH: {
      const { length } = action;
      analytics.event('Timer', 'set-focus-length', { clientID, evLabel: length / 60 });
      break;
    }

    case SET_SHORT_BREAK_LENGTH: {
      const { length } = action;
      analytics.event('Timer', 'set-short-break-length', { clientID, evLabel: length / 60});
      break;
    }

    case SET_LONG_BREAK_LENGTH: {
      const { length } = action;
      analytics.event('Timer', 'set-long-break-length', { clientID, evLabel: length / 60 });
      break;
    }

    case SET_LONG_BREAK_INTERVAL: {
      const { interval } = action;
      analytics.event('Timer', 'set-long-break-interval-length', { clientID, evLabel: interval });
      break;
    }

    case SET_TOTAL_ROUNDS: {
      const { rounds } = action;
      analytics.event('Timer', 'set-total-rounds', { clientID, evLabel: rounds });
      break;
    }

    case SKIP: {
      analytics.event('Timer', 'skip', { clientID });
      break;
    }

    default: {
      break;
    }
  }

  return next(action);
};
