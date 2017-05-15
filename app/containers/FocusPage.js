import React, { Component } from 'react';

import Menu from '../components/Menu';
import CountdownTimer from '../components/CountdownTimer';

export default class HomePage extends Component {
  render() {
    return (
      <div>
        <Menu />
        <CountdownTimer />
      </div>
    );
  }
}
