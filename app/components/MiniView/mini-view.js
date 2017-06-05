import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { ipcRenderer } from 'electron';
import { Button } from '@blueprintjs/core';
import classNames from 'classnames';
import MediaControls from '../common/MediaControls';
import { twoDigits } from '../../utils/countdown-timer.util';
import { Phases } from '../../containers/enums';
import { ON_CHANGE_COMPACT_MODE } from '../../electron/events';

class MiniView extends PureComponent {
  constructor() {
    super();
    this.state = {
      shouldShowMediaControls: false
    };
  }

  hideMediaControls() {
    this.setState({ shouldShowMediaControls: false });
  }

  showMediaControls() {
    this.setState({ shouldShowMediaControls: true });
  }

  render() {
    const { shouldShowMediaControls } = this.state;
    const {
      compact,
      currentPhase,
      minutes,
      seconds,
      toggleCompactMode
    } = this.props;

    const containerStyles = classNames(
      'mini-view',
      'd-flex',
      'align-items-center',
      'justify-content-center',
      'vh-100',
      'w-exact-150',
      'draggable',
      {
        'bg-focus-phase': currentPhase === Phases.FOCUS,
        'bg-short-break-phase': currentPhase === Phases.SHORT_BREAK,
        'bg-long-break-phase': currentPhase === Phases.LONG_BREAK
      }
    );

    return (
      <div
        onMouseEnter={() => this.showMediaControls()}
        onMouseLeave={() => this.hideMediaControls()}
        className={containerStyles}
      >
        <div className="position-absolute absolute-top-right">
          <Button
            iconName="maximize"
            onClick={() => {
              ipcRenderer.send(ON_CHANGE_COMPACT_MODE, !compact);
              toggleCompactMode();
            }}
            className="pt-minimal"
          />
        </div>
        <div className="zf-timer-mini">
          <span className="zf-timer-mini-minute w-exact-75">
            {twoDigits(minutes)}
          </span>
          <span className="zf-timer-mini-divider">:</span>
          <span className="zf-timer-mini-seconds w-exact-75">
            {twoDigits(seconds)}
          </span>
        </div>
        {shouldShowMediaControls &&
          <div className="fixed-bottom text-center w-100 bg-white">
            <MediaControls compact />
          </div>}
      </div>
    );
  }
}

MiniView.propTypes = {
  compact: PropTypes.bool.isRequired,
  currentPhase: PropTypes.number.isRequired,
  minutes: PropTypes.number.isRequired,
  seconds: PropTypes.number.isRequired,
  toggleCompactMode: PropTypes.func.isRequired
};

export default MiniView;
