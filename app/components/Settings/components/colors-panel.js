import React from 'react';
import PropTypes from 'prop-types';
import { RadioGroup, Radio } from '@blueprintjs/core';
import { Themes } from '../../../containers/enums';

const ColorsPanel = ({ theme, setTheme }) =>
  <div className="mt-1">
    <RadioGroup
      label="Themes"
      selectedValue={theme}
      onChange={e => setTheme(e.target.value)}
    >
      <Radio label="Dark Mode" value={Themes.DARK} />
      <Radio label="Light Mode" value={Themes.LIGHT} />
    </RadioGroup>
  </div>;

ColorsPanel.propTypes = {
  theme: PropTypes.string.isRequired,
  setTheme: PropTypes.func.isRequired
};

export default ColorsPanel;
