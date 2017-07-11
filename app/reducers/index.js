import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';

import app from 'App/reducer';
import charts from 'Charts/reducer';
import genAlerts from 'common/GeneralAlerts/reducer';
import mediaControls from 'common/MediaControls/reducer';
import rounds from 'common/Rounds/reducer';
import sounds from 'common/Sounds/reducer';

const rootReducer = combineReducers({
  app,
  charts,
  genAlerts,
  mediaControls,
  rounds,
  router,
  sounds,
});

export default rootReducer;
