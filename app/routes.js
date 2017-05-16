import React from 'react';
import { Switch, Route } from 'react-router';
import App from './containers/App';
import MainPage from './containers/MainPage';

export default () => (
  <App>
    <Switch>
      <Route path="/" component={MainPage} />
    </Switch>
  </App>
);
