import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { getDate } from 'utils/date.util';

import Summary from 'Charts/components/summary';
import LineGraph from 'common/LineGraph';
import Header from 'common/Header';

export default class Charts extends PureComponent {
  static propTypes = {
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

  componentDidMount() {
    const { loadChartData } = this.props;
    loadChartData();
  }

  render() {
    const { data, theme } = this.props;

    const defaultData = [
      {
        date: getDate(),
        focusLength: 0,
        shortBreakLength: 0,
        longBreakLength: 0,
        rounds: 0
      }
    ];

    const containerStyles = classNames(
      'charts',
      'container-fluid',
      'vh-100-offset-30',
      'no-select',
      'non-draggable'
    );
    return (
      <div className={containerStyles}>
        <Header title="Progress Chart" />
        <LineGraph data={data.length < 1 ? defaultData : data} theme={theme} />
        <Summary className="mt-3" data={data.length < 1 ? defaultData : data} />
      </div>
    );
  }
}
