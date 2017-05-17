import React from 'react';
import PropTypes from 'prop-types';
import { InputGroup } from '@blueprintjs/core';

const Option = ({ intent, title, type, value, unit, inputStyles }) => (
  <label className="pt-label pt-inline">
    <div className="d-inline-block w-exact-200">{title} {unit && `(${unit})`}</div>
    <InputGroup
      type={type}
      intent={intent}
      value={value}
      className={inputStyles}
    />
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
  inputStyles: PropTypes.string
};

export default Option;
