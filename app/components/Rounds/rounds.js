import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ProgressBar } from '@blueprintjs/core';

export default class Goal extends Component {
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
        <p className="text-center text-muted font-weight-bold">
          <span>{title.toUpperCase()} </span>
          <div>
            <span className="h1">{currentRound}</span>
            <span>/</span>
            <span>{totalRounds}</span>
          </div>
        </p>

        <ProgressBar
          intent={intent}
          value={1 / totalRounds}
        />
      </div>
    );
  }
}

Goal.propTypes = {
  title: PropTypes.string.isRequired,
  intent: PropTypes.number.isRequired,
  rounds: PropTypes.arrayOf(PropTypes.shape({
    focusLength: PropTypes.number.isRequired,
    breakLength: PropTypes.number.isRequired
  })).isRequired,
  currentRound: PropTypes.number.isRequired
};
