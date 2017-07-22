/* eslint-disable */

import Analytics from 'electron-google-analytics';
import { remote } from 'electron';
import settings from 'electron-settings';
import uuidv4 from 'uuid/v4';

import {
  PAUSE,
  RESUME,
  SKIP,
} from 'common/MediaControls/types';

import {
  RESET_ROUND,
  RESET_SESSION,
  RESET_TIMER,
} from 'common/Rounds/types';

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

    case PAUSE: {
      analytics.event('Timer', 'pause', { clientID });
      break;
    }

    case RESET_ROUND: {
      analytics.event('Timer', 'reset-round', { clientID });
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
