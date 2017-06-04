import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Switch } from '@blueprintjs/core';
import { Themes } from '../../containers/enums';

import NavBar from './components/nav-bar';
import Option from './components/option';

export default class Settings extends PureComponent {
  onSettingsChange(keyPath, val, fn) {
    const { setElectronSettings } = this.props;
    fn(val);
    setElectronSettings(keyPath, val, { prettify: true });
  }

  renderTimerPreferences() {
    const {
      focusLength,
      longBreakInterval,
      longBreakLength,
      shortBreakLength,
      totalRounds,
      setFocusLength,
      setLongBreakInterval,
      setLongBreakLength,
      setShortBreakLength,
      setTotalRounds
    } = this.props;

    return (
      <div>
        <h3 className="mb-3">Timer Preferences</h3>
        <Option
          title="Focus Length"
          min={1}
          max={60}
          value={focusLength}
          unit="mins"
          onChange={val =>
            this.onSettingsChange('rounds.focusLength', val, setFocusLength)}
        />
        <Option
          title="Short Break Length"
          max={60}
          unit="mins"
          value={shortBreakLength}
          onChange={val =>
            this.onSettingsChange(
              'rounds.shortBreakLength',
              val,
              setShortBreakLength
            )}
        />
        <Option
          title="Long Break Length"
          max={60}
          unit="mins"
          value={longBreakLength}
          onChange={val =>
            this.onSettingsChange(
              'rounds.longBreakLength',
              val,
              setLongBreakLength
            )}
        />
        <Option
          title="Long Break Interval"
          max={totalRounds}
          unit="rounds"
          value={
            longBreakInterval > totalRounds ? totalRounds : longBreakInterval
          }
          onChange={val =>
            this.onSettingsChange(
              'rounds.longBreakInterval',
              val,
              setLongBreakInterval
            )}
        />
        <Option
          title="Rounds"
          min={1}
          max={100}
          unit="rounds"
          value={totalRounds}
          onChange={val =>
            this.onSettingsChange('rounds.totalRounds', val, setTotalRounds)}
        />
      </div>
    );
  }

  renderStylePreferences() {
    const { theme, setTheme } = this.props;

    return (
      <div className="mt-3">
        <h3 className="mb-3">Style Preferences</h3>
        <Switch
          label="Dark Theme"
          checked={theme === Themes.DARK}
          onChange={() =>
            setTheme(theme === Themes.DARK ? Themes.LIGHT : Themes.DARK)}
          className="pt-large"
        />
      </div>
    );
  }

  renderSystemPreferences() {
    const {
      audioDisabled,
      setAudioOff,
      setAudioOn,
      setElectronSettings
    } = this.props;

    return (
      <div className="mt-3">
        <h3 className="mb-3">System Preferences</h3>
        <Switch
          label="Sound"
          checked={!audioDisabled}
          onChange={e => {
            if (e.target.checked) setAudioOn();
            else setAudioOff();
            setElectronSettings('system.audioDisabled', !e.target.checked, {
              prettify: true
            });
          }}
          className="pt-large"
        />
      </div>
    );
  }

  render() {
    return (
      <div className="settings vh-100">
        <NavBar />
        <div className="container-fluid mt-4">
          {this.renderTimerPreferences()}
          {this.renderStylePreferences()}
          {this.renderSystemPreferences()}
        </div>
      </div>
    );
  }
}

Settings.propTypes = {
  audioDisabled: PropTypes.bool.isRequired,
  focusLength: PropTypes.number.isRequired,
  longBreakLength: PropTypes.number.isRequired,
  longBreakInterval: PropTypes.number.isRequired,
  shortBreakLength: PropTypes.number.isRequired,
  theme: PropTypes.string.isRequired,
  totalRounds: PropTypes.number.isRequired,
  setAudioOff: PropTypes.func.isRequired,
  setAudioOn: PropTypes.func.isRequired,
  setElectronSettings: PropTypes.func.isRequired,
  setFocusLength: PropTypes.func.isRequired,
  setLongBreakInterval: PropTypes.func.isRequired,
  setLongBreakLength: PropTypes.func.isRequired,
  setShortBreakLength: PropTypes.func.isRequired,
  setTheme: PropTypes.func.isRequired,
  setTotalRounds: PropTypes.func.isRequired
};
