import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import CountdownTimer from 'common/CountdownTimer';

export default class Home extends PureComponent {
  static propTypes = {
    isPlaying: PropTypes.bool.isRequired,
    pause: PropTypes.func.isRequired,
    resume: PropTypes.func.isRequired
  };

  render() {
    const containerStyles = classNames(
      'container-fluid',
      'vh-100-offset-60',
      'draggable',
      'd-flex',
      'flex-column',
      'justify-content-center',
      'align-items-center'
    );

    return (
      <div className={containerStyles}>
        <CountdownTimer dataTid="container-countdown-timer" />
      </div>
    );
  }
}
