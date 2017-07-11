import React from 'react';
import PropTypes from 'prop-types';
import {
  CartesianGrid,
  LineChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts';

import { Themes } from 'enums';

import { getTime, twoDigits } from 'utils/countdown-timer.util';

const LineGraph = ({ data, theme }) => {
  const tickStyles = {
    stroke: theme === Themes.DARK ? '#fff' : '#000',
    strokeWidth: 0.5
  };

  const toolTipWrapperStyles = {
    backgroundColor: theme === Themes.DARK && '#394b59',
    opacity: 0.9
  };

  return (
    <ResponsiveContainer width="100%" height="60%">
      <LineChart width={600} height={300} data={data}>
        <XAxis dataKey="date" hide />
        <YAxis tick={tickStyles} />
        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
        <Tooltip
          isAnimationActive={false}
          cursor={{ stroke: '#a82a2a', strokeWidth: 2 }}
          formatter={(val, key) => {
            if (key === 'Rounds') return val;
            const { hours, minutes } = getTime(val);
            return `${hours}:${twoDigits(minutes)}`;
          }}
          wrapperStyle={toolTipWrapperStyles}
        />
        <Line
          type="monotone"
          name="Total Focus Length"
          dataKey="focusLength"
          stroke="#f55656"
        />
        <Line
          type="monotone"
          name="Total Short Break Length"
          dataKey="shortBreakLength"
          stroke="#2ee6d6"
        />
        <Line
          type="monotone"
          name="Total Long Break Length"
          dataKey="longBreakLength"
          stroke="#FFC940"
        />
        <Line
          type="monotone"
          name="Rounds"
          dataKey="rounds"
          stroke="#C99765"
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

LineGraph.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      uv: PropTypes.number
    })
  ).isRequired,
  theme: PropTypes.string.isRequired
};

export default LineGraph;
