import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import rounds from '../components/Rounds/reducer';

const rootReducer = combineReducers({
  rounds,
  router,
});

export default rootReducer;
