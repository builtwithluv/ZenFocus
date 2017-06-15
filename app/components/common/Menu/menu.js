import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { remote } from 'electron';
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
  SEND_TOGGLE_COMPACT,
  SEND_TOGGLE_WELCOME,
  SEND_GIVE_FEEDBACK,
  SEND_REPORT_ISSUE
} from '../../../electron/events';

export default class CustomMenu extends Component {
  constructor(props) {
    super(props);
    this.win = remote.getCurrentWindow();
    this.resetRound = this.resetRound.bind(this);
    this.resetSession = this.resetSession.bind(this);
    this.toggleFullscreen = this.toggleFullscreen.bind(this);
    this.toggleCompact = this.toggleCompact.bind(this);
    this.welcome = this.welcome.bind(this);
    this.feedback = this.feedback.bind(this);
    this.report = this.report.bind(this);
    this.quit = this.quit.bind(this);
  }

  resetRound() {
    const { resetRound } = this.props;
    resetRound();
  }

  resetSession() {
    const { resetSession } = this.props;
    resetSession();
  }

  toggleFullscreen() {
    this.win.setFullScreen(!this.win.isFullScreen());
  }

  toggleCompact() {
    this.win.webContents.send(SEND_TOGGLE_COMPACT);
  }

  welcome() {
    this.win.webContents.send(SEND_TOGGLE_WELCOME);
  }

  feedback() {
    this.win.webContents.send(SEND_GIVE_FEEDBACK);
  }

  report() {
    this.win.webContents.send(SEND_REPORT_ISSUE);
  }

  quit() {
    this.win.close();
  }

  render() {
    const { className } = this.props;

    const menuContainer = classNames(
      'non-draggable',
      'no-select',
      className
    );

    const menu = (
      <Menu className="non-draggable">
        <MenuItem
          onClick={this.resetSession}
          iconName="refresh"
          text="New Session"
        />
        <MenuItem
          onClick={this.resetRound}
          iconName="redo"
          text="Reset Round"
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
          onClick={this.feedback}
          iconName="annotation"
          text="Give Feedback"
        />
        <MenuItem
          onClick={this.report}
          iconName="error"
          text="Report Issue"
        />
        <MenuDivider />
        <MenuItem
          onClick={this.quit}
          iconName="small-cross"
          text="Quit"
        />
      </Menu>
    );

    return (
      <Popover
        content={menu}
        position={Position.BOTTOM_LEFT}
        popoverClassName="pt-minimal"
        portalClassName="menu"
        className={menuContainer}
      >
        <Button iconName="menu" className="pt-minimal btn-no-hover" />
      </Popover>
    );
  }
}

CustomMenu.propTypes = {
  resetRound: PropTypes.func.isRequired,
  resetSession: PropTypes.func.isRequired,
  className: PropTypes.string
};
