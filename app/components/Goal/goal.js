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
          <div>
            <span className="h1">1</span>
            <span>/</span>
            <span>4</span>
          </div>
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
