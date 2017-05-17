import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Intent } from '@blueprintjs/core';

import NavBar from './components/nav-bar';
import Option from './components/option';

export default class Settings extends PureComponent {
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
