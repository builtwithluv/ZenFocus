import os from 'os';
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { ProgressBar } from '@blueprintjs/core';
import { isFocus, isShortBreak, isLongBreak } from '../../../utils/phases.util';

const PLATFORM = os.platform();

export default class Rounds extends PureComponent {
  render() {
    const { currentPhase, currentRound, totalRounds } = this.props;

    const ratio = currentRound / totalRounds;

    const containerStyles = classNames('rounds', 'w-exact-150', {
      'fixed-top': PLATFORM === 'win32',
      'mt-2': PLATFORM === 'win32',
      'ml-2': PLATFORM === 'win32'
    });

    const progressBarStyles = classNames('w-exact-150', 'pt-no-stripes', {
      'intent-focus': isFocus(currentPhase),
      'intent-short-break': isShortBreak(currentPhase),
      'intent-long-break': isLongBreak(currentPhase)
    });

    return (
      <div className={containerStyles}>
        <div className="text-center no-select">
          <span className="h4 font-weight-bold">{currentRound}</span>
          <span>/</span>
          <span>{totalRounds}</span>
        </div>

        <ProgressBar value={ratio} className={progressBarStyles} />
      </div>
    );
  }
}

Rounds.propTypes = {
  currentPhase: PropTypes.number.isRequired,
  currentRound: PropTypes.number.isRequired,
  totalRounds: PropTypes.number.isRequired
};
