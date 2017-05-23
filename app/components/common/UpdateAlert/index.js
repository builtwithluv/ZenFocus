import React from 'react';
import PropTypes from 'prop-types';
import { Alert, Intent } from '@blueprintjs/core';

const UpdateAlert = ({ needsUpdate, version, onRestartLater, onRestartNow }) => (
  <Alert
    isOpen={needsUpdate}
    intent={Intent.SUCCESS}
    cancelButtonText="Update Later"
    confirmButtonText="Update and Restart Now"
    onCancel={onRestartLater}
    onConfirm={onRestartNow}
  >
    Version {version} is available of Zen Focus. Would you like to update and restart now?
  </Alert>
);

UpdateAlert.propTypes = {
  needsUpdate: PropTypes.bool.isRequired,
  version: PropTypes.string.isRequired,
  onRestartLater: PropTypes.func.isRequired,
  onRestartNow: PropTypes.func.isRequired
};

export default UpdateAlert;
