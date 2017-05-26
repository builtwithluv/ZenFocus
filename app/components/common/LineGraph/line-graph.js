import React from 'react';
import PropTypes from 'prop-types';
import {
  CartesianGrid,
  Legend,
  LineChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts';
import {
  Themes
} from '../../../enums';

const LineGraph = ({ data, theme }) => {
  const tickStyles = {
    stroke: theme === Themes.DARK && '#fff',
    strokeWidth: 1
  };

  const toolTipWrapperStyles = {
    backgroundColor: theme === Themes.DARK && '#394b59',
    opacity: 0.9
  };

  return (
    <ResponsiveContainer width="100%" height="60%">
      <LineChart
        width={600}
        height={300}
        data={data}
      >
        <XAxis dataKey="date" hide />
        <YAxis tick={tickStyles} />
        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
        <Tooltip
          isAnimationActive={false}
          cursor={{ stroke: '#a82a2a', strokeWidth: 2 }}
          wrapperStyle={toolTipWrapperStyles}
        />
        <Legend verticalAlign="top" height={36} wrapperStyle={{ width: '100vw' }} />
        <Line type="monotone" name="Rounds" dataKey="rounds" stroke="#8884d8" />
        <Line type="monotone" name="Total Focus Length" dataKey="focusLength" unit="mins" stroke="#f55656" />
        <Line type="monotone" name="Total Short Break Length" dataKey="shortBreakLength" unit="mins" stroke="#2ee6d6" />
        <Line type="monotone" name="Total Long Break Length" dataKey="longBreakLength" unit="mins" stroke="#FFC940" />
      </LineChart>
    </ResponsiveContainer>
  );
};

LineGraph.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    uv: PropTypes.number
  })).isRequired,
  theme: PropTypes.string.isRequired
};

export default LineGraph;
