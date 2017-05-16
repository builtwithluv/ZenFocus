import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import countdowntimer from './countdown-timer';
import rounds from '../components/Rounds/reducer';

const rootReducer = combineReducers({
  countdowntimer,
  rounds,
  router,
});

export default rootReducer;
