import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import countdowntimer from './countdown-timer';

const rootReducer = combineReducers({
  countdowntimer,
  router,
});

export default rootReducer;
