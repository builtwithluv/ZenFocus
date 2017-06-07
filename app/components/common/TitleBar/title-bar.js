import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Button } from '@blueprintjs/core';
import { twoDigits } from '../../../utils/countdown-timer.util';
import { isHome } from './utils';
import { Phases } from '../../../containers/enums';

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
      'pt-1',
      {
        'bg-focus-phase': currentPhase === Phases.FOCUS && !isHome(route),
        'bg-short-break-phase':
          currentPhase === Phases.SHORT_BREAK && !isHome(route),
        'bg-long-break-phase':
          currentPhase === Phases.LONG_BREAK && !isHome(route)
      }
    );
    const buttonStyles = classNames(
      'pt-minimal',
      'mr-1',
      'non-draggable',
      'btn-no-hover',
      'btn-no-bg',
      {
        'btn-black': !isHome(route)
      }
    );

    return (
      <div className={containerStyles}>
        {!isHome(route) &&
          <div className="zf-timer-title-bar text-black">
            <span className="zf-timer-title-bar-minute w-exact-75">
              {twoDigits(minutes)}
            </span>
            <span className="zf-timer-title-bar-divider">:</span>
            <span className="zf-timer-title-bar-seconds w-exact-75">
              {twoDigits(seconds)}
            </span>
          </div>}
        {isHome(route) &&
          <span>{['Focus', 'Short Break', 'Long Break'][currentPhase]}</span>}
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
