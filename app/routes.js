import React from 'react';
import { Switch } from 'react-router';
import PrivateRoute from './components/common/PrivateRoute';
import App from './components/App';
import Home from './components/Home';
import Charts from './components/Charts';
import Library from './components/Library';
import Settings from './components/Settings';

export default () => (
  <App>
    <Switch>
      <PrivateRoute path="/settings" component={Settings} anyprop={{ a: 1 }} />
      <PrivateRoute path="/library" component={Library} anyprop={{ a: 1 }} />
      <PrivateRoute path="/charts" component={Charts} anyprop={{ a: 1 }} />
      <PrivateRoute path="/" component={Home} anyprop={{ a: 1 }} />
    </Switch>
  </App>
);
