import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import CountdownTimer from '../common/CountdownTimer';
import Rounds from '../common/Rounds';
import Menu from '../common/Menu';

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
      'draggable',
      'd-flex',
      'flex-column',
      'justify-content-center',
      'align-items-center'
    );

    return (
      <div className={containerStyles}>
        <Menu />
        <CountdownTimer />
        <Rounds className="mt-2" />
      </div>
    );
  }
}

MainPage.propTypes = {
  isPlaying: PropTypes.bool.isRequired,
  pause: PropTypes.func.isRequired,
  resume: PropTypes.func.isRequired
};
