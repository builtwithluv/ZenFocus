import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Button, Intent, ProgressBar } from '@blueprintjs/core';

export default class Rounds extends PureComponent {

  render() {
    const {
      currentRound,
      title,
      totalRounds,
      resetRound,
      resetSession
    } = this.props;

    const ratio = currentRound / totalRounds;

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
          intent={Rounds.getIntent(ratio)}
          value={(currentRound) / totalRounds}
        />

        <div className="text-center mt-3">
          <Button
            text="Reset Round"
            intent={Intent.WARNING}
            onClick={resetRound}
            className="mr-3"
          />
          <Button
            text="Reset Session"
            intent={Intent.DANGER}
            onClick={resetSession}
          />
        </div>
      </div>
    );
  }
}

Rounds.propTypes = {
  currentRound: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  totalRounds: PropTypes.number.isRequired,
  resetRound: PropTypes.func.isRequired,
  resetSession: PropTypes.func.isRequired
};

Rounds.getIntent = (ratio) => {
  if (ratio < 0.50) return Intent.NONE;
  else if (ratio < 1) return Intent.PRIMARY;
  return Intent.SUCCESS;
};
