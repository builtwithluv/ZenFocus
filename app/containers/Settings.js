import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { Button, InputGroup, Intent } from '@blueprintjs/core';

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

class Settings extends PureComponent {
  onCloseClick() {
    this.props.goToMain();
  }

  render() {
    return (
      <div className="settings bg-black vh-100">
        <NavBar onCloseClick={() => this.onCloseClick()} />
        <div className="container-fluid mt-4">
          <Option intent={Intent.PRIMARY} title="Focus Length" value={25} unit="minutes" />
          <Option intent={Intent.PRIMARY} title="Short Break Length" value={5} unit="minutes" />
          <Option intent={Intent.PRIMARY} title="Long Break Length" value={25} unit="minutes" />
          <Option intent={Intent.PRIMARY} title="Focus Rounds" value={12} />
        </div>
      </div>
    );
  }
}

Settings.propTypes = {
  goToMain: PropTypes.func.isRequired
};

const mapDispatchToProps = (dispatch) => ({
  goToMain: () => dispatch(push('/'))
});

export default connect(null, mapDispatchToProps)(Settings);
