import React from 'react';
import PropTypes from 'prop-types';
import { RadioGroup, Radio } from '@blueprintjs/core';
import { NotificationTypes } from '../../enums';

const NotificationsPanel = ({
  notificationType,
  onSettingsChange,
  setNotificationType,
  setCustomNotification
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
    <form
      className="pt-form-group"
      onSubmit={(e) => {
        e.preventDefault();
        setCustomNotification(e.target[0].value, e.target[1].value);
      }}
    >
      <label className="pt-label" htmlFor="focus-title">Focus Title:</label>
      <input className="pt-input" />
      <label className="pt-label" htmlFor="focus-body">Focus Body:</label>
      <input className="pt-input" />
      <button className="pt-button">Set</button>
    </form>
  </div>
);

NotificationsPanel.propTypes = {
  notificationType: PropTypes.string.isRequired,
  onSettingsChange: PropTypes.func.isRequired,
  setNotificationType: PropTypes.func.isRequired,
  setCustomNotification: PropTypes.func.isRequired
};

export default NotificationsPanel;
