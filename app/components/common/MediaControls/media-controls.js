import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Button } from '@blueprintjs/core';
import { hasReachedLastRound } from '../../utils/countdown-timer.util';
import { isLongBreak } from '../../utils/phases.util';

export default class MediaControls extends PureComponent {
  static propTypes = {
    compact: PropTypes.bool,
    currentRound: PropTypes.number.isRequired,
    currentPhase: PropTypes.number.isRequired,
    isPlaying: PropTypes.bool.isRequired,
    tickSounds: PropTypes.arrayOf(PropTypes.any),
    totalRounds: PropTypes.number.isRequired,
    goToNextPhase: PropTypes.func.isRequired,
    openGeneralAlert: PropTypes.func.isRequired,
    pause: PropTypes.func.isRequired,
    resetTimer: PropTypes.func.isRequired,
    resume: PropTypes.func.isRequired
  };

  componentWillMount() {
    window.addEventListener('keyup', this.onMediaControlKeyPress);
  }

  componentWillUnmount() {
    window.removeEventListener('keyup', this.onMediaControlKeyPress);
  }

  onMediaControlClick = () => {
    // NOTE: Clicking sets focus on the button which will cause
    // unexpected behavior because it will trigger both the key press
    // event and also the click event
    this.playBtn.buttonRef.blur();

    const { isPlaying, tickSounds, pause, resume } = this.props;
    if (isPlaying) pause(tickSounds);
    else resume(tickSounds);
  };

  onMediaControlKeyPress = e => {
    const { isPlaying, tickSounds, pause, resume } = this.props;
    if (e.key === ' ') {
      if (isPlaying) pause(tickSounds);
      else resume(tickSounds);
    }
  };

  openAlert = () => {
    const { openGeneralAlert, resetTimer } = this.props;
    openGeneralAlert(
      'Are you sure you want to redo the current phase?',
      resetTimer,
      { cancelText: 'Cancel' }
    );
  };

  render() {
    const {
      compact,
      currentPhase,
      currentRound,
      isPlaying,
      totalRounds,
      goToNextPhase
    } = this.props;

    const buttonStyles = classNames(
      'non-draggable',
      'pt-minimal',
      'btn-no-hover',
      'btn-no-bg',
      {
        'pt-large': !compact,
        'white-btn': compact && !isLongBreak(currentPhase),
        'black-btn': compact && isLongBreak(currentPhase)
      }
    );

    return (
      <section>
        <Button
          iconName="redo"
          onClick={this.openAlert}
          className={buttonStyles}
        />
        <Button
          ref={p => { this.playBtn = p; }}
          active={isPlaying}
          iconName={isPlaying ? 'pause' : 'play'}
          onClick={this.onMediaControlClick}
          className={classNames(buttonStyles, 'mx-3')}
        />
        <Button
          iconName="step-forward"
          disabled={hasReachedLastRound(
            currentPhase,
            currentRound,
            totalRounds
          )}
          onClick={goToNextPhase}
          className={buttonStyles}
        />
      </section>
    );
  }
}
