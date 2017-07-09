import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import app from '../components/reducer';
import charts from '../components/Charts/reducer';
import genAlerts from '../components/common/GeneralAlerts/reducer';
import mediaControls from '../components/common/MediaControls/reducer';
import rounds from '../components/common/Rounds/reducer';
import sounds from '../components/common/Sounds/reducer';

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
