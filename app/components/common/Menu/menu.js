import React, { Component } from 'react';
import { remote } from 'electron';
import classNames from 'classnames';
import { Menu, MenuItem, MenuDivider, Popover } from "@blueprintjs/core";
import {
  SEND_TOGGLE_COMPACT,
  SEND_TOGGLE_WELCOME,
  SEND_GIVE_FEEDBACK
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

  quit() {
    this.win.close();
  }

  render() {

    const menuContainer = classNames(
      'fixed-top-left-offset-10',
      'overlay',
      'w-50',
      'non-draggable'
    );

    const menuIcon = classNames(
      'pt-icon-standard',
      'pt-icon-menu'
    );

    const menu = (
      <Menu className={menuContainer}>
        <MenuItem
          onClick={this.resetSession}
          iconName="pt-icon-refresh"
          text="New Session"
        />
        <MenuItem
          onClick={this.resetRound}
          iconName="pt-icon-redo"
          text="Reset Round"
        />
        <MenuDivider />
        <MenuItem
          onClick={this.toggleFullscreen}
          iconName="pt-icon-maximize"
          text="Fullscreen"
        />
        <MenuItem
          onClick={this.toggleCompact}
          iconName="pt-icon-minimize"
          text="Compact Mode"
        />
        <MenuDivider />
        <MenuItem
          onClick={this.welcome}
          iconName="pt-icon-chat"
          text="Welcome"
        />
        <MenuItem
          onClick={this.feedback}
          iconName="pt-icon-annotation"
          text="Give Feedback"
        />
        <MenuItem
          onClick={this.quit}
          iconName="pt-icon-small-cross"
          text="Quit"
        />
      </Menu>
    );

    return (
      <Popover className={menuContainer} content={menu}>
        <a><span className={menuIcon}></span></a>
      </Popover>
    );
  }
}
