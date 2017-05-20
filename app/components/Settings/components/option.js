import React from 'react';
import PropTypes from 'prop-types';
import { InputGroup } from '@blueprintjs/core';

const Option = ({ intent, max, title, type, value, unit, onChange, inputStyles }) => (
  <label className="pt-label pt-inline">
    <div className="d-inline-block w-exact-225">{title} {unit && `(${unit})`}</div>
    {type === 'number' ? (
      <InputGroup
        min="0"
        max={max}
        type="number"
        intent={intent}
        value={value}
        onChange={(e) => {
          const val = +e.target.value;
          if (!Option.isValidNumber(val, max)) return;
          onChange(val);
        }}
        className={inputStyles}
      />
    ) : (
      <InputGroup
        type={type}
        intent={intent}
        value={value}
        onChange={onChange}
        className={inputStyles}
      />
    )}
  </label>
);

Option.propTypes = {
  intent: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]).isRequired,
  unit: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  inputStyles: PropTypes.string
};

Option.isValidNumber = (n, max) => n % 1 === 0 && n >= 0 && n <= max;

export default Option;
