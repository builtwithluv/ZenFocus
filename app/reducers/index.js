import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import app from '../reducer';
import countdowntimer from '../components/common/CountdownTimer/reducer';
import rounds from '../components/common/Rounds/reducer';
import charts from '../components/Charts/reducer';
import genAlerts from '../components/common/GeneralAlerts/reducer';

const rootReducer = combineReducers({
  app,
  charts,
  countdowntimer,
  genAlerts,
  rounds,
  router
});

export default rootReducer;
