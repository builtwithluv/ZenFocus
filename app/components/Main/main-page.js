import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import CountdownTimer from '../common/CountdownTimer';
import MediaControls from '../common/MediaControls';
import Rounds from '../common/Rounds';

export default class MainPage extends PureComponent {
  onTimerClick() {
    const { isPlaying, pause, resume } = this.props;
    if (isPlaying) pause();
    else resume();
  }

  render() {
    const containerStyles = classNames('container-fluid', 'vh-100-offset-30');

    return (
      <div className={containerStyles}>
        <div className="d-flex mt-2 mr-2">
          <Rounds className="w-exact-150" />
        </div>
        <div className="d-flex flex-column justify-content-center align-items-center h-100-75">
          <div role="button" tabIndex={0} onClick={() => this.onTimerClick()}>
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
