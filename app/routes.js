import React from 'react';
import { Switch, Route } from 'react-router';
import App from './containers/App';
import FocusPage from './containers/FocusPage';

export default () => (
  <App>
    <Switch>
      <Route path="/" component={FocusPage} />
    </Switch>
  </App>
);
