import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Button } from '@blueprintjs/core';

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
    const { pushRoute } = this.props;

    const containerStyles = classNames({
      'container-fluid': true,
      'vh-100': true
    });

    return (
      <div className={containerStyles}>
        <div className="d-flex mt-2 mr-2">
          <Rounds className="w-exact-150" />
          <div className="ml-auto">
            <Button
              iconName="timeline-line-chart"
              onClick={() => pushRoute('/charts')}
              className="mr-1"
            />
            <Button iconName="cog" onClick={() => pushRoute('/settings')} />
          </div>
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
  pushRoute: PropTypes.func.isRequired,
  resume: PropTypes.func.isRequired
};
