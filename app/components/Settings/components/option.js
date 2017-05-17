import React from 'react';
import PropTypes from 'prop-types';
import { InputGroup, Intent } from '@blueprintjs/core';

const Option = ({ intent, title, type, value, unit, onChange, inputStyles }) => (
  <label className="pt-label pt-inline">
    <div className="d-inline-block w-exact-200">{title} {unit && `(${unit})`}</div>
    {type === 'number' ? (
      <InputGroup
        min="1"
        pattern="[0-9]"
        type="number"
        intent={value ? intent : Intent.DANGER}
        value={value}
        onChange={onChange}
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

export default Option;
