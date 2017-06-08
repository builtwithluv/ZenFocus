import os from 'os';
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import CountdownTimer from '../common/CountdownTimer';
import MediaControls from '../common/MediaControls';
import Rounds from '../common/Rounds';

const PLATFORM = os.platform();

export default class MainPage extends PureComponent {
  onTimerClick() {
    const { isPlaying, pause, resume } = this.props;
    if (isPlaying) pause();
    else resume();
  }

  render() {
    const containerStyles = classNames(
      'container-fluid',
      'vh-100-offset-30',
      'draggable'
    );

    const roundStyles = classNames('w-exact-150', {
      'fixed-top': PLATFORM === 'win32',
      'mt-2': PLATFORM === 'win32',
      'ml-2': PLATFORM === 'win32'
    });

    const countdownStyles = classNames(
      'd-flex',
      'flex-column',
      'justify-content-center',
      'align-items-center',
      {
        'h-100': PLATFORM === 'win32' || PLATFORM === 'linux',
        'h-100-75': PLATFORM === 'darwin'
      }
    );

    return (
      <div className={containerStyles}>
        <div className="d-flex mt-2 mr-2">
          <Rounds className={roundStyles} />
        </div>
        <div className={countdownStyles}>
          <div
            role="button"
            tabIndex={0}
            onClick={() => this.onTimerClick()}
            className="non-draggable remove-focus"
          >
            <CountdownTimer />
          </div>
          <MediaControls />
        </div>
      </div>
    );
  }
}

MainPage.propTypes = {
  isPlaying: PropTypes.bool.isRequired,
  pause: PropTypes.func.isRequired,
  resume: PropTypes.func.isRequired
};
