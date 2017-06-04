import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Button } from '@blueprintjs/core';
import { hasReachedLastRound } from '../../../utils/countdown-timer.util';

export default class MediaControls extends PureComponent {
  constructor() {
    super();
    this.onMediaControlKey = e => e.key === ' ' && this.onMediaControlClick();
  }

  componentWillMount() {
    window.addEventListener('keyup', this.onMediaControlKey);
  }

  componentWillUnmount() {
    window.removeEventListener('keyup', this.onMediaControlKey);
  }

  onMediaControlClick() {
    const { isPlaying, pause, resume } = this.props;
    if (isPlaying) pause();
    else resume();
  }

  render() {
    const {
      currentPhase,
      currentRound,
      isPlaying,
      totalRounds,
      goToNextPhase,
      openGeneralAlert,
      resetTimer
    } = this.props;

    return (
      <section>
        <Button
          iconName="redo"
          onClick={() => {
            openGeneralAlert(
              'Are you sure you want to redo the current phase?',
              resetTimer,
              { cancelText: 'Cancel' }
            );
          }}
          className="pt-large"
        />
        <Button
          active={isPlaying}
          iconName={isPlaying ? 'pause' : 'play'}
          onClick={() => this.onMediaControlClick()}
          className="pt-large mx-3"
        />
        <Button
          iconName="chevron-forward"
          disabled={hasReachedLastRound(
            currentPhase,
            currentRound,
            totalRounds
          )}
          onClick={goToNextPhase}
          className="pt-large"
        />
      </section>
    );
  }
}

MediaControls.propTypes = {
  currentRound: PropTypes.number.isRequired,
  currentPhase: PropTypes.number.isRequired,
  isPlaying: PropTypes.bool.isRequired,
  totalRounds: PropTypes.number.isRequired,
  goToNextPhase: PropTypes.func.isRequired,
  openGeneralAlert: PropTypes.func.isRequired,
  pause: PropTypes.func.isRequired,
  resetTimer: PropTypes.func.isRequired,
  resume: PropTypes.func.isRequired
};
