import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Spinner } from '@blueprintjs/core';
import MediaControls from './components/media-controls';
import {
  getSecondsFromPhase,
  twoDigits
} from '../../utils/countdown-timer.util';
import {
  isFocus,
  isShortBreak,
  isLongBreak
} from '../../utils/phases.util';

export default class CountdownTimer extends PureComponent {
  static propTypes = {
    currentPhase: PropTypes.number.isRequired,
    focusLength: PropTypes.number.isRequired,
    minutes: PropTypes.number.isRequired,
    longBreakLength: PropTypes.number.isRequired,
    seconds: PropTypes.number.isRequired,
    shortBreakLength: PropTypes.number.isRequired,
    dataTid: PropTypes.string.isRequired
  };

  render() {
    const {
      currentPhase,
      focusLength: fl,
      longBreakLength: lbl,
      minutes,
      seconds,
      shortBreakLength: sbl,
      dataTid
    } = this.props;

    const secsFromPhase = getSecondsFromPhase(
      minutes,
      seconds,
      fl,
      lbl,
      sbl,
      currentPhase
    );

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
            value={(secsFromPhase - ((minutes * 60) + seconds)) / secsFromPhase}
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
