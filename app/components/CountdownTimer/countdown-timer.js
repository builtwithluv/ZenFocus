import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Button, Slider } from '@blueprintjs/core';
import { twoDigits } from '../../utils/countdown-timer';

export default class CountdownTimer extends PureComponent {
  constructor(props) {
    super(props);
    const { currentRound, currentPhase, rounds } = this.props;
    this.state = {
      minutes: rounds[currentRound][currentPhase].minutes,
      seconds: rounds[currentRound][currentPhase].seconds,
      isPlaying: false,
      disableSlider: false
    };
  }

  tick() {
    const {
      minutes,
      seconds
    } = this.state;

    const {
      currentRound,
      currentPhase,
      rounds,
      incrementRound,
      setBreakPhase,
      setFocusPhase
    } = this.props;

    if (seconds > 0) {
      this.setState({ seconds: seconds - 1 });
      this.audio.play();
    } else if (minutes > 0) {
      this.setState({
        minutes: minutes - 1,
        seconds: 59
      });
      this.audio.play();
    } else if (currentPhase === 0) {
      setBreakPhase();
      this.setNextPhaseTimer();
    } else if (currentRound === rounds.length - 1) {
      this.pause();
    } else {
      incrementRound();
      setFocusPhase();
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
    const { minutes, seconds } = this.state;

    if (minutes === 0 && seconds === 0) return;

    this.setState({
      isPlaying: true,
      disableSlider: true
    });

    this.ticker = setInterval(() => this.tick(), 1000);
  }

  setNextPhaseTimer() {
    const {
      currentRound,
      currentPhase,
      rounds
    } = this.props;

    this.setState({
      minutes: rounds[currentRound][currentPhase].minutes,
      seconds: rounds[currentRound][currentPhase].seconds,
    });
  }

  onMediaControlClick() {
    const isPlaying = this.state.isPlaying;

    if (isPlaying) {
      this.pause();
    } else {
      this.resume();
    }
  }

  onSliderChange(value) {
    this.setState({ minutes: value, seconds: 0 });
  }

  render() {
    const {
      minutes,
      seconds,
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
            active={isPlaying}
            iconName={isPlaying ? 'pause' : 'play'}
            onClick={() => this.onMediaControlClick()}
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
  rounds: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.shape({
    minutes: PropTypes.number.isRequired,
    seconds: PropTypes.number.isRequired
  }))).isRequired,
  incrementRound: PropTypes.func.isRequired,
  setBreakPhase: PropTypes.func.isRequired,
  setFocusPhase: PropTypes.func.isRequired
};
