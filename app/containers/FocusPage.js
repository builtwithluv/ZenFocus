import React, { Component } from 'react';

import Menu from '../components/Menu';
import CountdownTimer from '../components/CountdownTimer';
import Goal from '../components/Goal';

export default class HomePage extends Component {
  render() {
    return (
      <div className="container-fluid vh-100">
        <div className="row">
          <Menu />
        </div>
        <div className="row justify-content-center align-items-center h-50">
          <CountdownTimer />
        </div>
        <div className="row h-100 bg-faded text-primary">
          <div className="col">
            <Goal title="Round" />
          </div>
          <div className="col">
            <Goal title="Goal" />
          </div>
        </div>
      </div>
    );
  }
}
