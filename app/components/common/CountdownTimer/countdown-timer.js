import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Button, Spinner } from '@blueprintjs/core';
import {
  getSecondsFromPhase,
  hasReachedEnd,
  hasReachedLastRound,
  spinnerIntent,
  twoDigits
} from '../../../utils/countdown-timer.util';
import {
  getAllSounds
} from '../../../utils/sounds.util';

export default class CountdownTimer extends PureComponent {

  componentWillUnmount() {
    this.pause();
  }

  tick() {
    const {
      audioSelection,
      audioDisabled,
      currentPhase,
      currentRound,
      minutes,
      seconds,
      totalRounds,
      goToNextPhase,
      setMinutes,
      setSeconds,
      sounds
    } = this.props;

    const audio = sounds[audioSelection];

    if (seconds > 0) {
      setSeconds(seconds - 1);
      if (!audioDisabled) audio.play();
    } else if (minutes > 0) {
      setMinutes(minutes - 1);
      setSeconds(59);
      if (!audioDisabled) audio.play();
    } else {
      sounds[sounds.length - 1].play();
      if (hasReachedEnd(currentPhase, currentRound, minutes, seconds, totalRounds)) this.pause();
      goToNextPhase();
    }
  }

  pause() {
    const { pause: _pause } = this.props;
    clearInterval(this.ticker);
    _pause();
  }

  resume() {
    const {
      currentPhase,
      currentRound,
      minutes,
      seconds,
      totalRounds,
      resume: _resume,
    } = this.props;

    if (hasReachedEnd(currentPhase, currentRound, minutes, seconds, totalRounds)) return;

    this.ticker = setInterval(() => this.tick(), 1000);
    _resume();
  }

  onMediaControlClick() {
    const { isPlaying } = this.props;
    if (isPlaying) this.pause();
    else this.resume();
  }

  onSliderChange(value) {
    const { setMinutes, setSeconds } = this.props;
    setMinutes(value);
    setSeconds(0);
  }

  render() {
    const {
      currentPhase,
      currentRound,
      focusLength: fl,
      isPlaying,
      longBreakLength: lbl,
      minutes,
      seconds,
      shortBreakLength: sbl,
      totalRounds,
      goToNextPhase,
      resetTimer
    } = this.props;

    const secsFromPhase = getSecondsFromPhase(minutes, seconds, fl, lbl, sbl, currentPhase);

    return (
      <div className="count-down text-center w-exact-400">
        <div>
          <div className="zf-timer w-exact-400 h-exact-380">
            <span className="zf-timer-minute w-exact-125">{twoDigits(minutes)}</span>
            <span className="zf-timer-divider">:</span>
            <span className="zf-timer-seconds w-exact-125">{twoDigits(seconds)}</span>
          </div>

          <Spinner
            intent={spinnerIntent(currentPhase)}
            value={(secsFromPhase - ((minutes * 60) + seconds)) / secsFromPhase}
          />
        </div>

        <div className="text-center">
          <Button
            iconName="redo"
            onClick={resetTimer}
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
            disabled={hasReachedLastRound(currentPhase, currentRound, totalRounds)}
            onClick={goToNextPhase}
            className="pt-large"
          />
        </div>
      </div>
    );
  }
}

CountdownTimer.defaultProps = {
  sounds: getAllSounds()
};

CountdownTimer.propTypes = {
  audioDisabled: PropTypes.bool.isRequired,
  /*eslint-disable*/
  audioSelection: PropTypes.number.isRequired,
  /*eslint-enable*/
  currentRound: PropTypes.number.isRequired,
  currentPhase: PropTypes.number.isRequired,
  focusLength: PropTypes.number.isRequired,
  minutes: PropTypes.number.isRequired,
  isPlaying: PropTypes.bool.isRequired,
  longBreakLength: PropTypes.number.isRequired,
  seconds: PropTypes.number.isRequired,
  shortBreakLength: PropTypes.number.isRequired,
  totalRounds: PropTypes.number.isRequired,
  goToNextPhase: PropTypes.func.isRequired,
  pause: PropTypes.func.isRequired,
  resetTimer: PropTypes.func.isRequired,
  resume: PropTypes.func.isRequired,
  setMinutes: PropTypes.func.isRequired,
  setSeconds: PropTypes.func.isRequired,
  /*eslint-disable*/
  sounds: PropTypes.any
  /*eslint-enable*/
};
