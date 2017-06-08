import React from 'react';

const NavBar = ({ text }) =>
  <nav>
    <div className="pt-navbar-group pt-align-left">
      <div className="pt-navbar-heading">{text}</div>
    </div>
  </nav>;

export default NavBar;
