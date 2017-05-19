import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import LineGraph from '../common/LineGraph';

export default class Charts extends PureComponent {
  componentDidMount() {
    const { loadChartData } = this.props;
    loadChartData();
  }

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
    date: PropTypes.string,
    focusLength: PropTypes.number,
    shortBreakLength: PropTypes.number,
    longBreakLength: PropTypes.number,
    rounds: PropTypes.number
  })).isRequired,
  loadChartData: PropTypes.func.isRequired
};
