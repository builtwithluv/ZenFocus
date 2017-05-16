import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Slider } from '@blueprintjs/core';
import { twoDigits } from '../../utils/countdown-timer';

export default class CountdownTimer extends Component {
  constructor() {
    super();
    this.state = {
      minutes: 0,
      seconds: 0
    };
  }

  onSliderChange(value) {
    this.setState({ minutes: value });
  }

  render() {
    const { minutes, seconds } = this.state;

    return (
      <div className="count-down">
        <div className="zf-timer">
          <span className="zf-timer-minute">{twoDigits(minutes)}</span>
          <span className="zf-timer-divider">:</span>
          <span className="zf-timer-seconds">{twoDigits(seconds)}</span>
        </div>

        <Slider
          max={60}
          min={0}
          renderLabel={false}
          value={minutes}
          onChange={(v) => this.onSliderChange(v)}
        />

        <Button
          iconName="play"
        />
      </div>
    );
  }
}

CountdownTimer.propTypes = {
  time: PropTypes.number.isRequired
};
