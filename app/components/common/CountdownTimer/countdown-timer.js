import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Button, Slider } from '@blueprintjs/core';
import { twoDigits } from '../../../utils/countdown-timer';

export default class CountdownTimer extends PureComponent {

  componentWillUnmount() {
    clearInterval(this.ticker);
  }

  tick() {
    const {
      currentRound,
      minutes,
      seconds,
      totalRounds,
      goToNextPhase,
      setMinutes,
      setSeconds
    } = this.props;

    if (
      currentRound >= totalRounds &&
      minutes === 0 &&
      seconds === 0
    ) return this.pause();

    if (seconds > 0) {
      setSeconds(seconds - 1);
      this.audio.play();
    } else if (minutes > 0) {
      setMinutes(minutes - 1);
      setSeconds(59);
      this.audio.play();
    } else {
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
      currentRound,
      currentPhase,
      minutes,
      resume: _resume,
      seconds,
      totalRounds
    } = this.props;

    if ((currentRound > totalRounds) || (
      minutes === 0 &&
      seconds === 0 &&
      currentRound === totalRounds &&
      currentPhase === 1
    )) return;

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
      disableSlider,
      isPlaying,
      minutes,
      seconds,
      goToNextPhase,
      resetTimer
    } = this.props;

    return (
      <div className="count-down">
        <div className="zf-timer">
          <span className="zf-timer-minute">{twoDigits(minutes)}</span>
          <span className="zf-timer-divider">:</span>
          <span className="zf-timer-seconds">{twoDigits(seconds)}</span>
        </div>

        <Slider
          disabled={disableSlider}
          max={60}
          min={0}
          renderLabel={false}
          value={minutes}
          onChange={(v) => this.onSliderChange(v)}
        />

        <div className="text-center mt-5">
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
            onClick={goToNextPhase}
            className="pt-large"
          />
        </div>

        <audio
          src="resources/tick.mp3"
          ref={(audio) => { this.audio = audio; }}
        />
      </div>
    );
  }
}

CountdownTimer.propTypes = {
  currentRound: PropTypes.number.isRequired,
  currentPhase: PropTypes.number.isRequired,
  disableSlider: PropTypes.bool.isRequired,
  minutes: PropTypes.number.isRequired,
  isPlaying: PropTypes.bool.isRequired,
  seconds: PropTypes.number.isRequired,
  totalRounds: PropTypes.number.isRequired,
  goToNextPhase: PropTypes.func.isRequired,
  pause: PropTypes.func.isRequired,
  resetTimer: PropTypes.func.isRequired,
  resume: PropTypes.func.isRequired,
  setMinutes: PropTypes.func.isRequired,
  setSeconds: PropTypes.func.isRequired
};
