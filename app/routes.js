import React from 'react';
import { Switch, Route } from 'react-router';
import App from './containers/App';
import MainPage from './containers/MainPage';
import Settings from './containers/Settings';

export default () => (
  <App>
    <Switch>
      <Route path="/settings" component={Settings} />
      <Route path="/" component={MainPage} />
    </Switch>
  </App>
);
