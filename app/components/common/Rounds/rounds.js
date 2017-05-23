import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Alert, Button, Intent, ProgressBar } from '@blueprintjs/core';

export default class Rounds extends PureComponent {
  constructor() {
    super();
    this.state = {
      alertType: null,
      showAlert: false
    };
  }

  hideAlert() {
    this.setState({ showAlert: false });
  }

  onResetClick(type) {
    this.setState({ alertType: type, showAlert: true });
  }

  render() {
    const {
      currentRound,
      title,
      totalRounds,
      resetRound,
      resetSession,
      className
    } = this.props;

    const {
      alertType,
      showAlert
    } = this.state;

    const ratio = currentRound / totalRounds;

    return (
      <div className={className}>
        {title && (
          <p className="text-center text-muted font-weight-bold mb-0">
            <span>{title.toUpperCase()} </span>
          </p>
        )}

        <div className="text-center">
          <span className="h1">{currentRound}</span>
          <span className="text-muted">/</span>
          <span className="text-muted">{totalRounds}</span>
        </div>

        <ProgressBar
          intent={Rounds.getIntent(ratio)}
          value={ratio}
        />

        <div className="text-center mt-3">
          <Button
            text="Reset Round"
            intent={Intent.WARNING}
            onClick={() => this.onResetClick('round')}
            className="mr-3"
          />
          <Button
            text="Reset Session"
            intent={Intent.DANGER}
            onClick={() => this.onResetClick('session')}
          />
        </div>

        <Alert
          cancelButtonText="Cancel"
          intent={Intent.DANGER}
          isOpen={showAlert}
          onCancel={() => this.hideAlert()}
          onConfirm={() => {
            if (alertType === 'round') resetRound();
            else resetSession();
            this.hideAlert();
          }}
        >
          Are you sure you want to reset the current {alertType}? Current phase data will be lost.
        </Alert>
      </div>
    );
  }
}

Rounds.propTypes = {
  currentRound: PropTypes.number.isRequired,
  title: PropTypes.string,
  totalRounds: PropTypes.number.isRequired,
  resetRound: PropTypes.func.isRequired,
  resetSession: PropTypes.func.isRequired,
  className: PropTypes.string
};

Rounds.getIntent = (ratio) => {
  if (ratio < 0.50) return Intent.NONE;
  else if (ratio < 1) return Intent.PRIMARY;
  return Intent.SUCCESS;
};
