import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Tab2, Tabs2 } from '@blueprintjs/core';
import Header from '../common/Header';
import { ColorsPanel, TimerPanel, SystemPanel } from './components';

export default class Settings extends PureComponent {
  onSettingsChange(keyPath, val, fn) {
    const { setElectronSettings } = this.props;
    fn(val);
    setElectronSettings(keyPath, val);
  }

  render() {
    return (
      <div className="settings vh-100-offset-30">
        <Header title="Preferences" />
        <Tabs2 id="PreferencesMenus" animate={false} vertical className="ml-2">
          <Tab2
            id="timer"
            title="Timer"
            panel={
              <TimerPanel
                {...this.props}
                onSettingsChange={(key, val, fn) =>
                  this.onSettingsChange(key, val, fn)}
              />
            }
          />
          <Tab2
            id="colors"
            title="Colors"
            panel={<ColorsPanel {...this.props} />}
          />
          <Tab2
            id="system"
            title="System"
            panel={
              <SystemPanel
                {...this.props}
                onSettingsChange={(key, val, fn) =>
                  this.onSettingsChange(key, val, fn)}
              />
            }
          />
        </Tabs2>
      </div>
    );
  }
}

Settings.propTypes = {
  setElectronSettings: PropTypes.func.isRequired
};
