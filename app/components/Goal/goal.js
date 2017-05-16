import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ProgressBar } from '@blueprintjs/core';

export default class Goal extends Component {
  render() {
    const { title, intent, value } = this.props;

    return (
      <div>
        <p className="text-center text-muted font-weight-bold">
          <span>{title.toUpperCase()} </span>
          <span>1/4</span>
        </p>

        <ProgressBar
          intent={intent}
          value={value}
        />
      </div>
    );
  }
}

Goal.propTypes = {
  title: PropTypes.string.isRequired,
  intent: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired
};
