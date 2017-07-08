import React from 'react';
import PropTypes from 'prop-types';
import { RadioGroup, Radio, Checkbox } from '@blueprintjs/core';
import { NotificationTypes } from '../../enums';

const NotificationsPanel = ({
  notificationType,
  onSettingsChange,
  customNotification,
  setNotificationType,
  setCustomNotification,
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
      <Radio label="Nothing" value={NotificationTypes.NOTHING} />
    </RadioGroup>
    <form
      className="pt-form-group"
      onSubmit={e => {
        e.preventDefault();
        const notification = {
          title: e.target[0].value,
          body: e.target[1].value
        };
        onSettingsChange(
          'system.customNotification',
          notification,
          setCustomNotification
        );
      }}
    >
      <label className="pt-label" htmlFor="focus-title">Focus Notification Title:</label>
      <input className="pt-input" placeholder={customNotification.title} />
      <label className="pt-label" htmlFor="focus-body">Focus Notification Body:</label>
      <input className="pt-input" placeholder={customNotification.body} />
      <button className="pt-button mt-3">Set</button>
    </form>
  </div>
);

NotificationsPanel.propTypes = {
  notificationType: PropTypes.string.isRequired,
  onSettingsChange: PropTypes.func.isRequired,
  setNotificationType: PropTypes.func.isRequired,
  setCustomNotification: PropTypes.func.isRequired,
  customNotification: PropTypes.shape({
    title: PropTypes.string,
    body: PropTypes.string
  }).isRequired,
  continuousMode: PropTypes.bool.isRequired,
  setContinuousMode: PropTypes.func.isRequired
};

export default NotificationsPanel;
