import React from 'react';
import PropTypes from 'prop-types';
import { Checkbox } from '@blueprintjs/core';

const SystemPanel = ({
  minimizeToTray,
  onSettingsChange,
  toggleMinimizeToTray
}) => (
  <div className="mt-1">
    <Checkbox
      label="Minimize to Tray"
      checked={minimizeToTray}
      onChange={e =>
        onSettingsChange(
          'system.minimizeToTray',
          e.target.checked,
          toggleMinimizeToTray
        )}
    />
  </div>
);

SystemPanel.propTypes = {
  minimizeToTray: PropTypes.bool.isRequired,
  onSettingsChange: PropTypes.func.isRequired,
  toggleMinimizeToTray: PropTypes.func.isRequired
};

export default SystemPanel;
