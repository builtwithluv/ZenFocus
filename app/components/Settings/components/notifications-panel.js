import React from 'react';
import PropTypes from 'prop-types';
import { RadioGroup, Radio } from '@blueprintjs/core';
import { NotificationTypes } from '../../enums';

const NotificationsPanel = ({
  notificationType,
  onSettingsChange,
  setNotificationType
}) => (
  <div className="mt-1">
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
      <Radio label="Nothing" value={NotificationTypes.NOTHING} />
    </RadioGroup>
  </div>
);

NotificationsPanel.propTypes = {
  notificationType: PropTypes.string.isRequired,
  onSettingsChange: PropTypes.func.isRequired,
  setNotificationType: PropTypes.func.isRequired
};

export default NotificationsPanel;
