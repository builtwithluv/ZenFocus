import React from 'react';
import { Switch, Route } from 'react-router';
import App from './containers/App';
import Main from './components/Main';
import Charts from './components/Charts';
import Settings from './components/Settings';

export default () => (
  <App>
    <Switch>
      <Route path="/settings" component={Settings} />
      <Route path="/charts" component={Charts} />
      <Route path="/" component={Main} />
    </Switch>
  </App>
);
