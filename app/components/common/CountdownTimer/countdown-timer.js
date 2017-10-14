import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Spinner } from '@blueprintjs/core';

import {
  getClockTime,
  getPhaseTime,
  twoDigits,
} from 'utils/countdown-timer.util';
import {
  isFocus,
  isShortBreak,
  isLongBreak
} from 'utils/phases.util';

import MediaControls from 'common/CountdownTimer/components/media-controls';

export default class CountdownTimer extends PureComponent {
  static propTypes = {
    currentPhase: PropTypes.number.isRequired,
    dataTid: PropTypes.string.isRequired,
    focusLength: PropTypes.number.isRequired,
    longBreakLength: PropTypes.number.isRequired,
    shortBreakLength: PropTypes.number.isRequired,
    timer: PropTypes.number.isRequired,
  };

  render() {
    const {
      currentPhase,
      dataTid,
      focusLength: fl,
      longBreakLength: lbl,
      shortBreakLength: sbl,
      timer,
    } = this.props;

    const phaseTime = getPhaseTime(fl, lbl, sbl, currentPhase);
    const { seconds, minutes } = getClockTime(timer);

    const containerStyles = classNames(
      'count-down',
      'd-flex',
      'flex-column',
      'align-items-center',
      'justify-content-center',
      'w-exact-400',
      'h-exact-400',
      'non-draggable',
      'no-select'
    );

    const spinnerStyles = classNames({
      'intent-focus': isFocus(currentPhase),
      'intent-short-break': isShortBreak(currentPhase),
      'intent-long-break': isLongBreak(currentPhase)
    });


    return (
      <div className={containerStyles} data-tid={dataTid}>
        <div className="position-absolute">
          <Spinner
            value={(phaseTime - timer) / phaseTime}
            className={spinnerStyles}
          />
        </div>
        <div className="zf-timer">
          <span className="w-exact-125">
            {twoDigits(minutes)}
          </span>
          <span>:</span>
          <span className="w-exact-125">
            {twoDigits(seconds)}
          </span>
        </div>
        <MediaControls {...this.props} />
      </div>
    );
  }
}
