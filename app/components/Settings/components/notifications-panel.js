import React from 'react';
import PropTypes from 'prop-types';
import { RadioGroup, Radio, Checkbox } from '@blueprintjs/core';

import { NotificationTypes } from 'enums';

const NotificationsPanel = ({
  notificationType,
  onSettingsChange,
  setNotificationType,
  continuousMode,
  setContinuousMode
}) => (
  <div className="mt-1">
    <label className="pt-label">Continuous Mode</label>
    <Checkbox
      label="Ask for confirmation before moving onto the next phase"
      checked={continuousMode}
      onChange={e => {
        onSettingsChange(
          'system.continuousMode',
          e.target.checked,
          setContinuousMode
        );
      }}
    />
    <RadioGroup
      label="Notify me of..."
      onChange={e =>
        onSettingsChange(
          'system.notificationType',
          e.target.value,
          setNotificationType
        )}
      selectedValue={notificationType}
    >
      <Radio
        label="Phase changes when window is not active"
        value={NotificationTypes.PHASE_CHANGES_NO_WINDOW}
      />
      <Radio
        label="Phase changes all the time"
        value={NotificationTypes.PHASE_CHANGES_ALL}
      />
    </RadioGroup>
  </div>
);

NotificationsPanel.propTypes = {
  notificationType: PropTypes.string.isRequired,
  onSettingsChange: PropTypes.func.isRequired,
  setNotificationType: PropTypes.func.isRequired,
  continuousMode: PropTypes.bool.isRequired,
  setContinuousMode: PropTypes.func.isRequired
};

export default NotificationsPanel;
