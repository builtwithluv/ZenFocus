import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Alert, Button, Intent, ProgressBar } from '@blueprintjs/core';
import config from '../../../config/components.config';
import {
  isFocus,
  isShortBreak,
  isLongBreak
} from '../../../utils/phases.util';

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
      currentPhase,
      currentRound,
      title,
      totalRounds,
      resetRound,
      resetSession,
      className
    } = this.props;

    const { alertType, showAlert } = this.state;

    const ratio = currentRound / totalRounds;

    const progressBarStyles = classNames(
      'w-exact-150',
      'pt-no-stripes',
      {
        'intent-focus': isFocus(currentPhase),
        'intent-short-break': isShortBreak(currentPhase),
        'intent-long-break': isLongBreak(currentPhase)
      }
    );

    return (
      <div className={`rounds ${className}`}>
        {title &&
          <p className="text-center text-muted font-weight-bold mb-0 no-select">
            <span>{title.toUpperCase()}</span>
          </p>}

        <div className="text-center no-select">
          <span className="h4 font-weight-bold">{currentRound}</span>
          <span>/</span>
          <span>{totalRounds}</span>
        </div>

        <ProgressBar value={ratio} className={progressBarStyles} />

        {config.Rounds.showResetBtns &&
          <div className="text-center mt-3">
            <Button
              text="Reset Round"
              onClick={() => this.onResetClick('round')}
              className="bg-white text-black mr-3"
            />
            <Button
              text="Reset Session"
              onClick={() => this.onResetClick('session')}
              className="bg-white text-black"
            />
          </div>}

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
          Are you sure you want to reset the current {alertType}? Current phase
          data will be lost.
        </Alert>
      </div>
    );
  }
}

Rounds.propTypes = {
  currentPhase: PropTypes.number.isRequired,
  currentRound: PropTypes.number.isRequired,
  title: PropTypes.string,
  totalRounds: PropTypes.number.isRequired,
  resetRound: PropTypes.func.isRequired,
  resetSession: PropTypes.func.isRequired,
  className: PropTypes.string
};
