import { remote } from 'electron';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'react-router-redux';
import RavenMiddleware from 'redux-raven-middleware';
import { analyticsLogger } from 'analytics/middleware';
import rootReducer from '../reducers';

const history = createBrowserHistory();
const router = routerMiddleware(history);
const enhancer = applyMiddleware(
  analyticsLogger,
  RavenMiddleware('https://d08845737ecd42cd836268b6ca8c1ab9@sentry.io/180237', {
    release: remote.app.getVersion(),
    environment: 'production'
  }),
  thunk,
  router
);

function configureStore(initialState) {
  return createStore(rootReducer, initialState, enhancer);
}

export default { configureStore, history };
