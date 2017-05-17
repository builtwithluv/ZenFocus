import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { ProgressBar } from '@blueprintjs/core';

export default class Rounds extends PureComponent {
  render() {
    const {
      currentRound,
      intent,
      title,
      totalRounds
    } = this.props;

    return (
      <div>
        <p className="text-center text-muted font-weight-bold mb-0">
          <span>{title.toUpperCase()} </span>
        </p>

        <div className="text-center">
          <span className="h1">{currentRound}</span>
          <span className="text-muted">/</span>
          <span className="text-muted">{totalRounds}</span>
        </div>

        <ProgressBar
          intent={intent}
          value={(currentRound) / totalRounds}
        />
      </div>
    );
  }
}

Rounds.propTypes = {
  currentRound: PropTypes.number.isRequired,
  intent: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  totalRounds: PropTypes.number.isRequired
};
