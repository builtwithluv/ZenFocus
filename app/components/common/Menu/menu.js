import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { ipcRenderer, remote } from 'electron';
import classNames from 'classnames';
import {
  Button,
  Menu,
  MenuItem,
  MenuDivider,
  Popover,
  Position
} from '@blueprintjs/core';

import {
  LOAD_CHARTS,
  LOAD_SETTINGS,
  SEND_TOGGLE_COMPACT,
  SEND_TOGGLE_WELCOME,
  SHOW_ISSUE_REPORTING_MODAL,
  CHECK_FOR_UPDATES,
} from 'channels';

import { Themes } from 'enums';

export default class CustomMenu extends PureComponent {
  static propTypes = {
    theme: PropTypes.string.isRequired,
    resetSession: PropTypes.func.isRequired,
    className: PropTypes.string
  };

  win = remote.getCurrentWindow();

  goToCharts = () => {
    this.win.webContents.send(LOAD_CHARTS);
  };

  goToSettings = () => {
    this.win.webContents.send(LOAD_SETTINGS);
  };

  resetSession = () => {
    const { resetSession } = this.props;
    resetSession();
  };

  toggleFullscreen = () => {
    this.win.setFullScreen(!this.win.isFullScreen());
  };

  toggleCompact = () => {
    if (this.win.isFullScreen()) this.toggleFullscreen();
    this.win.webContents.send(SEND_TOGGLE_COMPACT);
  };

  welcome = () => {
    this.win.webContents.send(SEND_TOGGLE_WELCOME);
  };

  report = () => {
    this.win.webContents.send(SHOW_ISSUE_REPORTING_MODAL);
  };

  quit = () => {
    this.win.close();
  };

  update = () => {
    ipcRenderer.send(CHECK_FOR_UPDATES);
  };

  minimize = () => {
    this.win.minimize();
  };

  render() {
    const { theme, className } = this.props;

    const portalContainer = classNames(
      'menu',
      {
        'pt-dark': theme === Themes.DARK
      }
    );

    const menuContainer = classNames(
      'non-draggable',
      'no-select',
      className
    );

    const menuStyle = classNames(
      'pt-minimal',
      'btn-no-hover',
      {
        'btn-white': className.includes('btn-white'),
        'btn-black': className.includes('btn-black')
      }
    );

    const menu = (
      <Menu className="non-draggable">
        <MenuItem
          onClick={this.goToCharts}
          iconName="timeline-line-chart"
          text="Charts"
        />
        <MenuDivider />
        <MenuItem
          onClick={this.resetSession}
          iconName="refresh"
          text="New Session"
        />
        <MenuDivider />
        <MenuItem
          onClick={this.toggleFullscreen}
          iconName="maximize"
          text="Fullscreen"
        />
        <MenuItem
          onClick={this.toggleCompact}
          iconName="minimize"
          text="Compact Mode"
        />
        <MenuDivider />
        <MenuItem
          onClick={this.welcome}
          iconName="chat"
          text="Welcome"
        />
        <MenuItem
          onClick={this.report}
          iconName="error"
          text="Report Issue"
        />
        <MenuDivider />
        <MenuItem
          onClick={this.update}
          iconName="automatic-updates"
          text="Check for updates"
        />
        <MenuItem
          onClick={this.goToSettings}
          iconName="cog"
          text="Settings"
        />
      </Menu>
    );

    return (
      <Popover
        content={menu}
        position={Position.BOTTOM_LEFT}
        popoverClassName="pt-minimal"
        portalClassName={portalContainer}
        className={menuContainer}
      >
        <Button iconName="menu" className={menuStyle} />
      </Popover>
    );
  }
}
