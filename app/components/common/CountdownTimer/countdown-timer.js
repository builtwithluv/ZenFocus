import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Button, Slider } from '@blueprintjs/core';
import { twoDigits } from '../../../utils/countdown-timer';

export default class CountdownTimer extends PureComponent {
  constructor() {
    super();
    this.state = {
      isPlaying: false,
      disableSlider: false
    };
  }

  componentWillUnmount() {
    clearInterval(this.ticker);
  }

  tick() {
    const {
      currentRound,
      minutes,
      seconds,
      totalRounds,
      setMinutes,
      setSeconds
    } = this.props;

    if (currentRound > totalRounds) return this.pause();

    if (seconds > 0) {
      setSeconds(seconds - 1);
      this.audio.play();
    } else if (minutes > 0) {
      setMinutes(minutes - 1);
      setSeconds(59);
      this.audio.play();
    } else {
      this.setNextPhaseTimer();
    }
  }

  pause() {
    this.setState({
      isPlaying: false,
      disableSlider: false
    });

    clearInterval(this.ticker);
  }

  resume() {
    const {
      currentRound,
      currentPhase,
      minutes,
      seconds,
      totalRounds
    } = this.props;

    if ((currentRound > totalRounds) || (
      minutes === 0 &&
      seconds === 0 &&
      currentRound === totalRounds &&
      currentPhase === 1
    )) return;

    this.setState({
      isPlaying: true,
      disableSlider: true
    });

    this.ticker = setInterval(() => this.tick(), 1000);
  }

  setNextPhaseTimer() {
    const {
      currentPhase,
      incrementRound,
      setBreakPhase,
      setFocusPhase
    } = this.props;

    if (currentPhase === 0) setBreakPhase();
    else {
      incrementRound();
      setFocusPhase();
    }
  }

  onMediaControlClick() {
    const isPlaying = this.state.isPlaying;
    if (isPlaying) this.pause();
    else this.resume();
  }

  onSliderChange(value) {
    const { setMinutes, setSeconds } = this.props;
    setMinutes(value);
    setSeconds(0);
  }

  goToNextPhase() {
    const {
      currentRound,
      currentPhase,
      totalRounds,
      incrementRound,
      setBreakPhase,
      setFocusPhase
    } = this.props;

    if (currentRound >= totalRounds && currentPhase === 1) return;
    if (currentPhase === 0) setBreakPhase();
    else {
      incrementRound();
      setFocusPhase();
    }
  }

  render() {
    const {
      minutes,
      seconds
    } = this.props;

    const {
      isPlaying,
      disableSlider
    } = this.state;

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
            onClick={() => this.goToNextPhase()}
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
  minutes: PropTypes.number.isRequired,
  seconds: PropTypes.number.isRequired,
  totalRounds: PropTypes.number.isRequired,
  incrementRound: PropTypes.func.isRequired,
  setBreakPhase: PropTypes.func.isRequired,
  setFocusPhase: PropTypes.func.isRequired,
  setMinutes: PropTypes.func.isRequired,
  setSeconds: PropTypes.func.isRequired
};
