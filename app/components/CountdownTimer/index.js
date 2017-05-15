import React from 'react';
import PropTypes from 'prop-types';

export default class CountdownTimer extends React.Component {
  render() {
    const { timer } = this.props;

    return <div>{timer}</div>;
  }
}

CountdownTimer.propTypes = {
  timer: PropTypes.number.isRequired
};
