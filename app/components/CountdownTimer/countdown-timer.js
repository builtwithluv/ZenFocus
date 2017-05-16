import React, { Component } from 'react';
import { Button, Slider } from '@blueprintjs/core';
import { twoDigits } from '../../utils/countdown-timer';

export default class CountdownTimer extends Component {
  constructor() {
    super();
    this.state = {
      minutes: 0,
      seconds: 0,
      isPlaying: false,
      disableSlider: false
    };
  }

  tick() {
    const { minutes, seconds } = this.state;

    if (seconds > 0) {
      this.setState({ seconds: seconds - 1 });
    } else if (minutes > 0) {
      this.setState({
        minutes: minutes - 1,
        seconds: 59
      });
    }

    this.audio.play();
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
