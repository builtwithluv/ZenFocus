import React from 'react';
import PropTypes from 'prop-types';
import { Slider } from '@blueprintjs/core';

const Option = ({ max, min, title, value, unit, onChange, inputStyles }) => (
  <div className="d-flex mb-3 align-items-center">
    <div className="d-inline-block w-exact-150 em-0-9">{title} </div>
    <div className="w-exact-100"><span className="font-weight-bold">{value} </span>{unit}</div>
    <Slider
      labelStepSize={max}
      min={min}
      max={max}
      value={value}
      renderLabel={false}
      onChange={(val) => onChange(val)}
      className={inputStyles}
    />
  </div>
);

Option.propTypes = {
  max: PropTypes.number.isRequired,
  min: PropTypes.number,
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
