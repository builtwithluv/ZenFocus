import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Button } from '@blueprintjs/core';

import { Phases } from 'enums';

import { getClockTime, twoDigits } from 'utils/countdown-timer.util';
import { isLongBreak } from 'utils/phases.util';
import { isHome } from 'utils/routes.util';

import Rounds from 'common/Rounds';

export default class TitleBar extends PureComponent {
  static propTypes = {
    currentPhase: PropTypes.number.isRequired,
    route: PropTypes.string.isRequired,
    timer: PropTypes.number.isRequired,
    goToHome: PropTypes.func.isRequired,
    goToLibrary: PropTypes.func.isRequired,
  };

  render() {
    const {
      currentPhase,
      route,
      timer,
      goToHome,
      goToLibrary,
    } = this.props;

    const { seconds, minutes, hours } = getClockTime(timer);

    const containerStyles = classNames(
      'title-bar',
      'd-flex',
      'align-items-center',
      'justify-content-center',
      'draggable',
      'position-relative',
      'no-select',
      'py-1',
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
        'btn-white': !isHome(route) && !isLongBreak(currentPhase),
        'btn-black': !isHome(route) && isLongBreak(currentPhase)
      }
    );

    const roundsStyles = classNames(
      'position-absolute',
      'absolute-top-left',
      'ml-1',
    );

    const timerStyles = classNames(
      'zf-timer-title-bar',
      'font-weight-semi-bold',
      'pt-minimal',
      'non-draggable',
      'btn-no-hover',
      'btn-no-bg',
      {
        'text-white': !isLongBreak(currentPhase),
        'text-black': isLongBreak(currentPhase)
      }
    );

    return (
      <div className={containerStyles} data-tid="container-title-bar">
        {isHome(route) && <Rounds className={roundsStyles} />}
        {!isHome(route) &&
          <Button
            onClick={goToHome}
            className={timerStyles}
          >
            <span className="zf-timer-title-bar-hour w-exact-75">{hours}</span>
            <span className="zf-timer-title-bar-divider">:</span>
            <span className="zf-timer-title-bar-minute w-exact-75">{twoDigits(minutes)}</span>
            <span className="zf-timer-title-bar-divider">:</span>
            <span className="zf-timer-title-bar-seconds w-exact-75">{twoDigits(seconds)}</span>
          </Button>
        }
        {isHome(route) &&
          <span>{['Focus', 'Short Break', 'Long Break'][currentPhase]}</span>}
        <div className="position-absolute absolute-top-right">
          <Button
            iconName="music"
            onClick={goToLibrary}
            className={buttonStyles}
          />
        </div>
      </div>
    );
  }
}
