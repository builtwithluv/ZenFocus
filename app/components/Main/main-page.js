import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Rounds from '../common/Rounds';
import CountdownTimer from '../common/CountdownTimer';

export default class MainPage extends PureComponent {
  render() {
    const { currentPhase } = this.props;
    const containerStyles = classNames({
      'container-fluid': true,
      'vh-100': true,
      'bg-focus-phase': currentPhase === 0,
      'bg-short-break-phase': currentPhase === 1,
      'bg-long-break-phase': currentPhase === 2
    });

    return (
      <div className={containerStyles}>
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
