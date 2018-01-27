import React, { PureComponent } from 'react';
import { remote } from 'electron';
import classNames from 'classnames';
import { Button } from '@blueprintjs/core';

import Menu from 'common/Menu';

export default class MenuBar extends PureComponent {
  win = remote.getCurrentWindow();

  minimize = () => {
    this.win.minimize();
  };

  quit = () => {
    this.win.close();
  };

  render() {
    const containerStyles = classNames(
      'menu-bar',
      'd-flex',
      'align-items-center',
      'justify-content-center',
      'draggable',
      'position-relative',
      'no-select',
      'py-1',
      'bg-black',
    );

    const buttonStyles = classNames(
      'pt-minimal',
      'mr-1',
      'non-draggable',
      'btn-no-hover',
      'btn-no-bg',
      'btn-white',
    );

    const menuStyles = classNames(
      'position-absolute',
      'absolute-left',
      'btn-white',
    );

    return (
      <div className={containerStyles} data-tid="container-menu-bar" >
        <Menu className={menuStyles} />
        <div className="position-absolute absolute-top-right">
          <Button
            iconName="minus"
            onClick={this.minimize}
            className={buttonStyles}
          />
          <Button
            iconName="small-cross"
            onClick={this.quit}
            className={buttonStyles}
          />
        </div>
      </div>
    );
  }
}
