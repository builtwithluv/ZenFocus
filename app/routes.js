import React from 'react';
import { Switch, Route } from 'react-router';
import App from './containers/App';
import CountdownTimerPage from './containers/CountdownTimerPage';

export default () => (
  <App>
    <Switch>
      <Route path="/" component={CountdownTimerPage} />
    </Switch>
  </App>
);
