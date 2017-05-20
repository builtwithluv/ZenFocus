import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Rounds from '../common/Rounds';
import CountdownTimer from '../common/CountdownTimer';

export default class MainPage extends PureComponent {
  render() {
    const { currentPhase } = this.props;
    const backgroundColor = currentPhase === 0 ? '#f55656' : '#2ee6d6';

    return (
      <div className="container-fluid vh-100" style={{ backgroundColor }}>
        <div className="row justify-content-center align-items-center h-65">
          <CountdownTimer />
        </div>
        <div className="row h-35 bg-faded text-primary align-items-center">
          <div className="col">
            <Rounds title="Round" />
          </div>
        </div>
      </div>
    );
  }
}

MainPage.propTypes = {
  currentPhase: PropTypes.number.isRequired
};
