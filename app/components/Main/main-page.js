import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Button } from '@blueprintjs/core';

import Rounds from '../common/Rounds';
import CountdownTimer from '../common/CountdownTimer';

export default class MainPage extends PureComponent {
  render() {
    const { pushRoute } = this.props;

    const containerStyles = classNames({
      'container-fluid': true,
      'vh-100': true
    });

    return (
      <div className={containerStyles}>
        <div className="position-absolute absolute-top-right mt-2 mr-2">
          <Button
            iconName="timeline-line-chart"
            onClick={() => pushRoute('/charts')}
            className="mr-1"
          />
          <Button
            iconName="cog"
            onClick={() => pushRoute('/settings')}
          />
        </div>
        <div className="d-flex flex-column justify-content-center align-items-center h-100">
          <CountdownTimer />
          <Rounds className="mt-2" />
        </div>
      </div>
    );
  }
}

MainPage.propTypes = {
  pushRoute: PropTypes.func.isRequired
};
