import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Alert } from '@blueprintjs/core';

class GenAlert extends PureComponent {
  render() {
    const {
      cancelText,
      confirmText,
      intent,
      isOpen,
      message,
      closeGeneralAlert,
      onConfirm
    } = this.props;

    return (
      <Alert
        isOpen={isOpen}
        cancelButtonText={cancelText}
        confirmButtonText={confirmText}
        intent={intent}
        onCancel={closeGeneralAlert}
        onConfirm={() => {
          onConfirm();
          closeGeneralAlert();
        }}
      >
        {message}
      </Alert>
    );
  }
}

GenAlert.propTypes = {
  cancelText: PropTypes.string.isRequired,
  confirmText: PropTypes.string.isRequired,
  intent: PropTypes.number.isRequired,
  isOpen: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired,
  closeGeneralAlert: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired
};

export default GenAlert;
