import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Tab2, Tabs2 } from '@blueprintjs/core';
import Header from '../common/Header';
import {
  ColorsPanel,
  NotificationsPanel,
  SoundsPanel,
  SystemPanel,
  TimerPanel
} from './components';

export default class Settings extends PureComponent {
  onSettingsChange(keyPath, val, fn) {
    const { setElectronSettings } = this.props;
    fn(val);
    setElectronSettings(keyPath, val);
  }

  render() {
    const containerStyles = classNames(
      'settings',
      'vh-100-offset-30',
      'no-select'
    );

    return (
      <div className={containerStyles}>
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
            id="notifications"
            title="Notifications"
            panel={
              <NotificationsPanel
                {...this.props}
                onSettingsChange={(key, val, fn) =>
                  this.onSettingsChange(key, val, fn)}
              />
            }
          />
          <Tab2
            id="colors"
            title="Colors"
            panel={
              <ColorsPanel
                {...this.props}
                onSettingsChange={(key, val, fn) =>
                  this.onSettingsChange(key, val, fn)}
              />
            }
          />
          <Tab2
            id="sounds"
            title="Sounds"
            panel={
              <SoundsPanel
                {...this.props}
                onSettingsChange={(key, val, fn) =>
                  this.onSettingsChange(key, val, fn)}
              />
            }
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
