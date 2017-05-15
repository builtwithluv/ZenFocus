import React from 'react';
import PropTypes from 'prop-types';
import { TimePicker } from '@blueprintjs/datetime';

export default class CountdownTimer extends React.Component {
  render() {
    return <TimePicker />;
  }
}

CountdownTimer.propTypes = {
  timer: PropTypes.number.isRequired
};
