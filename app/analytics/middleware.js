/* eslint-disable */

import Analytics from 'electron-google-analytics';
import { remote } from 'electron';

const analytics = new Analytics('UA-101155103-1');

export const analyticsLogger = store => next => action => { // eslint-disable-line no-unused-vars
  switch (action.type) {
    case '@@router/LOCATION_CHANGE': {
      const path = action.payload.pathname;
      analytics.event('View', 'click', { evLabel: path });
      break;
    }

    default: {
      break;
    }
  }

  return next(action);
};
