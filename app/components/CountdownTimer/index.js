import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TimePicker } from '@blueprintjs/datetime';

export default class CountdownTimer extends Component {
  render() {
    return (
      <TimePicker
        showArrowButtons
      />
    );
  }
}

CountdownTimer.propTypes = {
  timer: PropTypes.number.isRequired
};
