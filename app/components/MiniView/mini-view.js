import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Button } from '@blueprintjs/core';
import classNames from 'classnames';

import { Phases } from 'enums';

import { getClockTime, twoDigits } from 'utils/countdown-timer.util';
import { isLongBreak } from 'utils/phases.util';

import MediaControls from 'common/MediaControls';

export default class MiniView extends PureComponent {
  static propTypes = {
    currentPhase: PropTypes.number.isRequired,
    timer: PropTypes.number.isRequired,
    toggleCompactMode: PropTypes.func.isRequired
  };

  render() {
    const { currentPhase, timer, toggleCompactMode } = this.props;
    const { seconds, minutes } = getClockTime(timer);

    const containerStyles = classNames(
      'mini-view',
      'd-flex',
      'align-items-center',
      'justify-content-center',
      'vh-100',
      'w-exact-150',
      'draggable',
      {
        'bg-focus-phase': currentPhase === Phases.FOCUS,
        'bg-short-break-phase': currentPhase === Phases.SHORT_BREAK,
        'bg-long-break-phase': currentPhase === Phases.LONG_BREAK
      }
    );

    const timerStyles = classNames(
      'zf-timer-mini',
      'non-draggable',
      'no-select',
      'cursor-default',
      {
        'text-black': isLongBreak(currentPhase),
        'text-white': !isLongBreak(currentPhase)
      }
    );

    const fullscreenBtnStyles = classNames(
      'pt-minimal',
      'non-draggable',
      'btn-no-hover',
      {
        'black-btn': isLongBreak(currentPhase),
        'white-btn': !isLongBreak(currentPhase)
      }
    );

    return (
      <div className={containerStyles}>
        <div className="position-absolute absolute-top-right">
          <Button
            iconName="maximize"
            onClick={toggleCompactMode}
            className={fullscreenBtnStyles}
          />
        </div>
        <div className={timerStyles}>
          <span className="zf-timer-mini-minute w-exact-75">
            {twoDigits(minutes)}
          </span>
          <span className="zf-timer-mini-divider">:</span>
          <span className="zf-timer-mini-seconds w-exact-75">
            {twoDigits(seconds)}
          </span>
        </div>
        <div className="fixed-bottom text-center w-100">
          <MediaControls compact />
        </div>
      </div>
    );
  }
}
