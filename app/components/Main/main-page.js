import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Rounds from '../common/Rounds';
import CountdownTimer from '../common/CountdownTimer';

export default class MainPage extends PureComponent {
  render() {
    const containerStyles = classNames({
      'container-fluid': true,
      'vh-100': true
    });

    return (
      <div className={containerStyles}>
        <div className="d-flex flex-column justify-content-center align-items-center h-100">
          <CountdownTimer />
          <Rounds className="mt-2" />
        </div>
      </div>
    );
  }
}
