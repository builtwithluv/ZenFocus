import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Alert } from '@blueprintjs/core';

export default class GenAlert extends PureComponent {
  static propTypes = {
    cancelText: PropTypes.string,
    confirmText: PropTypes.string.isRequired,
    intent: PropTypes.number.isRequired,
    isOpen: PropTypes.bool.isRequired,
    message: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.node
    ]).isRequired,
    closeGeneralAlert: PropTypes.func.isRequired,
    onConfirm: PropTypes.func
  };

  whenConfirm = () => {
    const { closeGeneralAlert, onConfirm } = this.props;
    if (typeof onConfirm === 'function') onConfirm();
    closeGeneralAlert();
  };

  render() {
    const {
      cancelText,
      confirmText,
      intent,
      isOpen,
      message,
      closeGeneralAlert
    } = this.props;

    return (
      <Alert
        isOpen={isOpen}
        cancelButtonText={cancelText}
        confirmButtonText={confirmText}
        intent={intent}
        onCancel={closeGeneralAlert}
        onConfirm={this.whenConfirm}
      >
        {message}
      </Alert>
    );
  }
}
