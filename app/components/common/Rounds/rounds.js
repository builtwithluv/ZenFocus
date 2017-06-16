import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { ProgressBar } from '@blueprintjs/core';
import { isFocus, isShortBreak, isLongBreak } from '../../utils/phases.util';

export default class Rounds extends PureComponent {
  static propTypes = {
    currentPhase: PropTypes.number.isRequired,
    currentRound: PropTypes.number.isRequired,
    totalRounds: PropTypes.number.isRequired,
    className: PropTypes.string
  };

  render() {
    const {
      currentPhase,
      currentRound,
      totalRounds,
      className
    } = this.props;

    const ratio = currentRound / totalRounds;

    const containerStyles = cn('rounds', 'w-exact-150', className);

    const progressBarStyles = cn('w-exact-150', 'pt-no-stripes', {
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
