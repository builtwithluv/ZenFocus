import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

export default class Rounds extends PureComponent {
  static propTypes = {
    currentRound: PropTypes.number.isRequired,
    totalRounds: PropTypes.number.isRequired,
    className: PropTypes.string
  };

  render() {
    const {
      currentRound,
      totalRounds,
      className
    } = this.props;

    const containerStyles = cn('rounds', className);

    return (
      <div className={containerStyles} data-tid="container-rounds">
        <div className="text-center no-select">
          <span className="h4 font-weight-bold">{currentRound}</span>
          <span>/</span>
          <span>{totalRounds}</span>
        </div>
      </div>
    );
  }
}
