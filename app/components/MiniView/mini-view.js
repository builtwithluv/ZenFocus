import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import MediaControls from '../common/MediaControls';
import { twoDigits } from '../../utils/countdown-timer.util';
import { Phases } from '../../containers/enums';

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
    const { currentPhase, minutes, seconds } = this.props;

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
  currentPhase: PropTypes.number.isRequired,
  minutes: PropTypes.number.isRequired,
  seconds: PropTypes.number.isRequired
};

export default MiniView;
