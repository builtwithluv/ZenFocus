import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Spinner } from '@blueprintjs/core';
import {
  getSecondsFromPhase,
  spinnerIntent,
  twoDigits
} from '../../../utils/countdown-timer.util';

export default class CountdownTimer extends PureComponent {
  render() {
    const {
      currentPhase,
      focusLength: fl,
      longBreakLength: lbl,
      minutes,
      seconds,
      shortBreakLength: sbl
    } = this.props;

    const secsFromPhase = getSecondsFromPhase(
      minutes,
      seconds,
      fl,
      lbl,
      sbl,
      currentPhase
    );

    return (
      <div className="count-down text-center w-exact-400">
        <div>
          <div className="zf-timer w-exact-400 h-exact-380">
            <span className="zf-timer-minute w-exact-125">
              {twoDigits(minutes)}
            </span>
            <span className="zf-timer-divider">:</span>
            <span className="zf-timer-seconds w-exact-125">
              {twoDigits(seconds)}
            </span>
          </div>

          <Spinner
            intent={spinnerIntent(currentPhase)}
            value={(secsFromPhase - (minutes * 60 + seconds)) / secsFromPhase}
          />
        </div>
      </div>
    );
  }
}

CountdownTimer.propTypes = {
  currentPhase: PropTypes.number.isRequired,
  focusLength: PropTypes.number.isRequired,
  minutes: PropTypes.number.isRequired,
  longBreakLength: PropTypes.number.isRequired,
  seconds: PropTypes.number.isRequired,
  shortBreakLength: PropTypes.number.isRequired
};
