import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@blueprintjs/core';

const NavBar = ({ onCloseClick }) => (
  <nav className="pt-navbar">
    <div className="pt-navbar-group pt-align-left">
      <div className="pt-navbar-heading">Settings</div>
    </div>
    <div className="pt-navbar-group pt-align-right">
      <Button
        iconName="cross"
        onClick={onCloseClick}
        className="pt-minimal"
      />
    </div>
  </nav>
);

NavBar.propTypes = {
  onCloseClick: PropTypes.func.isRequired
};

export default NavBar;
