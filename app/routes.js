import React from 'react';
import { Switch } from 'react-router';
import PrivateRoute from './components/common/PrivateRoute';
import App from './containers/App';
import Main from './components/Main';
import Charts from './components/Charts';
import Settings from './components/Settings';

export default () => (
  <App>
    <Switch>
      <PrivateRoute path="/settings" component={Settings} anyprop={{ a: 1 }} />
      <PrivateRoute path="/charts" component={Charts} anyprop={{ a: 1 }} />
      <PrivateRoute path="/" component={Main} anyprop={{ a: 1 }} />
    </Switch>
  </App>
);
