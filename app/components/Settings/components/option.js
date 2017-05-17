import React from 'react';
import PropTypes from 'prop-types';
import { InputGroup } from '@blueprintjs/core';

const Option = ({ intent, title, value, unit }) => (
  <label className="pt-label pt-inline">
    <div className="d-inline-block w-exact-200">{title}</div>
    <InputGroup
      intent={intent}
      value={unit ? `${value} ${unit}` : value}
    />
  </label>
);

Option.propTypes = {
  intent: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]).isRequired,
  unit: PropTypes.string
};

export default Option;
