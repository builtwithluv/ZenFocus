import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import app from '../reducer';
import rounds from '../components/common/Rounds/reducer';

const rootReducer = combineReducers({
  app,
  rounds,
  router
});

export default rootReducer;
