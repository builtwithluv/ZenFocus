import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Button } from '@blueprintjs/core';
import { twoDigits } from '../../../utils/countdown-timer.util';
import { Phases, Routes } from '../../../containers/enums';

class TitleBar extends PureComponent {
  render() {
    const { currentPhase, minutes, route, seconds, push } = this.props;
    const containerStyles = classNames(
      'title-bar',
      'd-flex',
      'align-items-center',
      'justify-content-center',
      'draggable',
      'position-relative',
      'no-select',
      {
        'bg-focus-phase':
          currentPhase === Phases.FOCUS && route !== Routes.HOME,
        'bg-short-break-phase':
          currentPhase === Phases.SHORT_BREAK && route !== Routes.HOME,
        'bg-long-break-phase':
          currentPhase === Phases.LONG_BREAK && route !== Routes.HOME
      }
    );
    const buttonStyles = classNames(
      'pt-minimal',
      'mr-1',
      'non-draggable',
      'btn-no-hover',
      'btn-no-bg'
    );

    return (
      <div className={containerStyles}>
        {route !== Routes.HOME &&
          <div className="zf-timer-title-bar">
            <span className="zf-timer-title-bar-minute w-exact-75">
              {twoDigits(minutes)}
            </span>
            <span className="zf-timer-title-bar-divider">:</span>
            <span className="zf-timer-title-bar-seconds w-exact-75">
              {twoDigits(seconds)}
            </span>
          </div>}
        <div className="position-absolute absolute-top-right">
          <Button
            iconName="time"
            onClick={() => push('/')}
            className={buttonStyles}
          />
          <Button
            iconName="timeline-line-chart"
            onClick={() => push('/charts')}
            className={buttonStyles}
          />
          <Button
            iconName="cog"
            onClick={() => push('/settings')}
            className={buttonStyles}
          />
        </div>
      </div>
    );
  }
}

TitleBar.propTypes = {
  currentPhase: PropTypes.number.isRequired,
  minutes: PropTypes.number.isRequired,
  route: PropTypes.string.isRequired,
  seconds: PropTypes.number.isRequired,
  push: PropTypes.func.isRequired
};

export default TitleBar;
