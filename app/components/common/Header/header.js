import React from 'react';
import PropTypes from 'prop-types';

const Header = ({ title }) => (
  <div className="py-3 pl-2 text-center">
    <h1 className="h6">{title}</h1>
  </div>
);

Header.propTypes = {
  title: PropTypes.string.isRequired
};

export default Header;
