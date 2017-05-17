import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import rounds from '../components/common/Rounds/reducer';

const rootReducer = combineReducers({
  rounds,
  router,
});

export default rootReducer;
