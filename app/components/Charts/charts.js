import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { RangeSlider } from '@blueprintjs/core';
import classNames from 'classnames';
import LineGraph from '../common/LineGraph';
import { getDate } from '../../utils/date.util';

export default class Charts extends PureComponent {
  constructor() {
    super();
    this.onResizeWindow = () => this.forceUpdate();
    this.state = {
      range: [1, 30]
    };
  }

  componentWillMount() {
    window.addEventListener('resize', this.onResizeWindow);
  }

  componentDidMount() {
    const { loadChartData } = this.props;
    loadChartData();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onResizeWindow);
  }

  onSliderChange(range) {
    this.setState({ range });
  }

  render() {
    let { data } = this.props;

    const { theme } = this.props;
    const { range } = this.state;

    const defaultData = [
      {
        date: getDate,
        focusLength: 0,
        shortBreakLength: 0,
        rounds: 0
      }
    ];

    const DAYS = 30;
    const RANGE_1 = range[0] * -1 + 1;
    const RANGE_2 = range[1] * -1 + 1;
    data = data.slice(Math.abs(data.length - DAYS) * -1);
    data = RANGE_1 === 0 ? data.slice(RANGE_2) : data.slice(RANGE_2, RANGE_1);

    const containerStyles = classNames(
      'charts',
      'container-fluid',
      'vh-100-offset-30',
      'no-select',
      'non-draggable'
    );

    return (
      <div className={containerStyles}>
        <LineGraph data={data.length < 1 ? defaultData : data} theme={theme} />
        <RangeSlider
          min={1}
          max={DAYS}
          value={range}
          onChange={val => this.onSliderChange(val)}
          className="mt-5"
        />
      </div>
    );
  }
}

Charts.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.string,
      focusLength: PropTypes.number,
      shortBreakLength: PropTypes.number,
      longBreakLength: PropTypes.number,
      rounds: PropTypes.number
    })
  ).isRequired,
  theme: PropTypes.string.isRequired,
  loadChartData: PropTypes.func.isRequired
};
