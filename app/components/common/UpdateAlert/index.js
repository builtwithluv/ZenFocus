import React from 'react';
import PropTypes from 'prop-types';
import { Alert, Intent } from '@blueprintjs/core';

const UpdateAlert = ({ needsUpdate, onRestartLater, onRestartNow }) => (
  <Alert
    isOpen={needsUpdate}
    intent={Intent.SUCCESS}
    cancelButtonText="Restart Later"
    confirmButtonText="Restart Now"
    onCancel={onRestartLater}
    onConfirm={onRestartNow}
  >
    Zen Focus will be updated after it restarts.
  </Alert>
);

UpdateAlert.propTypes = {
  needsUpdate: PropTypes.bool.isRequired,
  onRestartLater: PropTypes.func.isRequired,
  onRestartNow: PropTypes.func.isRequired
};

export default UpdateAlert;
