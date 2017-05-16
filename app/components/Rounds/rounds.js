import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ProgressBar } from '@blueprintjs/core';

export default class Rounds extends Component {
  render() {
    const {
      currentRound,
      intent,
      rounds,
      title
    } = this.props;

    const totalRounds = rounds.length;

    return (
      <div>
        <p className="text-center text-muted font-weight-bold mb-0">
          <span>{title.toUpperCase()} </span>
        </p>

        <div className="text-center">
          <span className="h1">{currentRound + 1}</span>
          <span className="text-muted">/</span>
          <span className="text-muted">{totalRounds}</span>
        </div>

        <ProgressBar
          intent={intent}
          value={1 / totalRounds}
        />
      </div>
    );
  }
}

Rounds.propTypes = {
  currentRound: PropTypes.number.isRequired,
  intent: PropTypes.number.isRequired,
  rounds: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.shape({
    minutes: PropTypes.number.isRequired,
    seconds: PropTypes.number.isRequired
  }))).isRequired,
  title: PropTypes.string.isRequired
};
