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
          <Option
            title="Focus Length"
            type="number"
            intent={Intent.PRIMARY}
            value={25} unit="mins"
            inputStyles="w-exact-70"
          />
          <Option
            title="Short Break Length"
            type="number"
            unit="mins"
            intent={Intent.PRIMARY}
            value={5}
            inputStyles="w-exact-70"
          />
          <Option
            title="Long Break Length"
            type="number"
            intent={Intent.PRIMARY}
            unit="mins"
            value={25}
            inputStyles="w-exact-70"
          />
          <Option
            title="Focus Rounds"
            type="number"
            intent={Intent.PRIMARY}
            value={12}
            inputStyles="w-exact-70"
          />
        </div>
      </div>
    );
  }
}

Settings.propTypes = {
  goToMain: PropTypes.func.isRequired
};
