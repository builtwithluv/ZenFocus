/* eslint-disable */

import Analytics from 'electron-google-analytics';
import { remote } from 'electron';
import settings from 'electron-settings';
import uuidv4 from 'uuid/v4';

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

    default: {
      break;
    }
  }

  return next(action);
};
