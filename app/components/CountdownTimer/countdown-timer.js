import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TimePicker, TimePickerPrecision } from '@blueprintjs/datetime';

export default class CountdownTimer extends Component {
  render() {
    return (
      <TimePicker
        showArrowButtons
        precision={TimePickerPrecision.SECOND}
      />
    );
  }
}

CountdownTimer.propTypes = {
  timer: PropTypes.number.isRequired
};
