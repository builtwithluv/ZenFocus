import React from 'react';
import { Switch, Route } from 'react-router';
import App from './containers/App';
import CountdownTimer from './components/CountdownTimer';

export default () => (
  <App>
    <Switch>
      <Route path="/" component={CountdownTimer} />
    </Switch>
  </App>
);
