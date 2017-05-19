import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import LineGraph from '../common/LineGraph';
import {
  getDate
} from '../../utils/date.util';

export default class Charts extends PureComponent {
  componentDidMount() {
    const { loadChartData } = this.props;
    loadChartData();
  }

  render() {
    const { data } = this.props;
    const defaultData = [{
      date: getDate,
      focusLength: 0,
      shortBreakLength: 0,
      rounds: 0,
    }];

    return (
      <div className="container-fluid vh-100 bg-dark-gray-5">
        <LineGraph data={data.length < 1 ? defaultData : data} />
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
