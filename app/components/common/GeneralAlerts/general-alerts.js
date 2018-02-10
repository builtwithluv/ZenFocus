import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Alert } from '@blueprintjs/core';

export default class GenAlert extends PureComponent {
  static propTypes = {
    cancelText: PropTypes.string,
    className: PropTypes.string,
    closeGeneralAlert: PropTypes.func.isRequired,
    confirmText: PropTypes.string.isRequired,
    intent: PropTypes.number.isRequired,
    isOpen: PropTypes.bool.isRequired,
    message: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.node
    ]).isRequired,
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
      className,
      closeGeneralAlert,
      confirmText,
      intent,
      isOpen,
      message,
    } = this.props;

    return isOpen && (
      <Alert
        cancelButtonText={cancelText}
        className={className}
        confirmButtonText={confirmText}
        intent={intent}
        isOpen={isOpen}
        onCancel={closeGeneralAlert}
        onConfirm={this.whenConfirm}
      >
        {message}
      </Alert>
    );
  }
}
