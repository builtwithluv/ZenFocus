import React from 'react';
import PropTypes from 'prop-types';
import { Switch } from '@blueprintjs/core';
import { Themes } from '../../../containers/enums';

const ColorsPanel = ({ theme, setTheme }) =>
  <div className="mt-1">
    <h3 className="mb-3">Themes</h3>
    <Switch
      label="Dark Theme"
      checked={theme === Themes.DARK}
      onChange={() =>
        setTheme(theme === Themes.DARK ? Themes.LIGHT : Themes.DARK)}
      className="pt-large w-fit-content"
    />
  </div>;

ColorsPanel.propTypes = {
  theme: PropTypes.string.isRequired,
  setTheme: PropTypes.func.isRequired
};

export default ColorsPanel;
