import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Intent } from '@blueprintjs/core';

import NavBar from './components/nav-bar';
import Option from './components/option';

export default class Settings extends PureComponent {
  onCloseClick() {
    this.props.goToMain();
  }

  onSettingsChange(keyPath, val, fn, opts) {
    const { setElectronSettings } = this.props;
    fn(val);
    setElectronSettings(keyPath, val, opts);
  }

  render() {
    const {
      focusLength,
      longBreakLength,
      shortBreakLength,
      totalRounds,
      setFocusLength,
      setLongBreakLength,
      setShortBreakLength,
      setTotalRounds
    } = this.props;

    return (
      <div className="settings bg-black vh-100">
        <NavBar onCloseClick={() => this.onCloseClick()} />
        <div className="container-fluid mt-4">
          <Option
            title="Focus Length"
            type="number"
            intent={Intent.PRIMARY}
            value={focusLength} unit="mins"
            inputStyles="w-exact-70"
            onChange={(e) => this.onSettingsChange('rounds.focusLength', +e.target.value, setFocusLength)}
          />
          <Option
            title="Short Break Length"
            type="number"
            unit="mins"
            intent={Intent.PRIMARY}
            value={shortBreakLength}
            inputStyles="w-exact-70"
            onChange={(e) => this.onSettingsChange('rounds.shortBreakLength', +e.target.value, setShortBreakLength)}
          />
          <Option
            title="Long Break Length"
            type="number"
            intent={Intent.PRIMARY}
            unit="mins"
            value={longBreakLength}
            inputStyles="w-exact-70"
            onChange={(e) => this.onSettingsChange('rounds.longBreakLength', +e.target.value, setLongBreakLength)}
          />
          <Option
            title="Focus Rounds"
            type="number"
            intent={Intent.PRIMARY}
            value={totalRounds}
            inputStyles="w-exact-70"
            onChange={(e) => this.onSettingsChange('rounds.totalRounds', +e.target.value, setTotalRounds)}
          />
        </div>
      </div>
    );
  }
}

Settings.propTypes = {
  focusLength: PropTypes.number.isRequired,
  longBreakLength: PropTypes.number.isRequired,
  shortBreakLength: PropTypes.number.isRequired,
  totalRounds: PropTypes.number.isRequired,
  goToMain: PropTypes.func.isRequired,
  setElectronSettings: PropTypes.func.isRequired,
  setFocusLength: PropTypes.func.isRequired,
  setLongBreakLength: PropTypes.func.isRequired,
  setShortBreakLength: PropTypes.func.isRequired,
  setTotalRounds: PropTypes.func.isRequired
};
