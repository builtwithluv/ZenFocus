import React from 'react';
import PropTypes from 'prop-types';
import { Slider } from '@blueprintjs/core';

const Option = ({ max, title, value, unit, onChange, inputStyles }) => (
  <label className="pt-label pt-inline">
    <div className="d-inline-block w-exact-225 em-0-9">{title} {unit && `(${unit})`}</div>
    <Slider
      labelStepSize={max}
      max={max}
      value={value}
      onChange={(val) => onChange(val)}
      className={inputStyles}
    />
  </label>
);

Option.propTypes = {
  max: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]).isRequired,
  unit: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  inputStyles: PropTypes.string
};

export default Option;
