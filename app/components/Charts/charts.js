import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import LineGraph from '../common/LineGraph';

export default class Charts extends PureComponent {
  render() {
    const { data } = this.props;
    return (
      <div className="container-fluid vh-100 bg-dark-gray-5">
        <LineGraph data={data} />
      </div>
    );
  }
}

Charts.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    date: PropTypes.string.isRequired,
    focusLength: PropTypes.number.isRequired,
    shortBreakLength: PropTypes.number.isRequired,
    longBreakLength: PropTypes.number.isRequired,
    rounds: PropTypes.number.isRequired
  })).isRequired
};
