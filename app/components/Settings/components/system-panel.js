import { ipcRenderer } from 'electron';
import React from 'react';
import PropTypes from 'prop-types';
import { Checkbox } from '@blueprintjs/core';
import { isWindows } from 'utils/platform.util';
import { ElectronSettingsPaths } from 'enums';
import { DESTROY_TRAY_ICON } from 'channels';

const SystemPanel = ({
  minimizeToTray,
  onSettingsChange,
  openGeneralAlert,
  showTimerByTray,
  showTrayIcon,
  toggleMinimizeToTray,
  toggleShowTimerByTray,
  toggleShowTrayIcon,
}) => (
    <div className="mt-1">
      <Checkbox
        label="Show tray icon"
        checked={showTrayIcon}
        onChange={e => {
          const checked = e.target.checked;

          onSettingsChange(
            ElectronSettingsPaths.SHOW_TRAY_ICON,
            checked,
            toggleShowTrayIcon
          );

          if (checked) {
            openGeneralAlert('Tray icon will appear after restart');
          }

          if (!checked) {
            ipcRenderer.send(DESTROY_TRAY_ICON);
          }
        }}
      />
      <Checkbox
        label="Show timer by tray icon"
        checked={showTimerByTray}
        onChange={e => {
          onSettingsChange(
            ElectronSettingsPaths.SHOW_TIMER_BY_TRAY,
            e.target.checked,
            toggleShowTimerByTray
          );
        }}
      />
      {isWindows() && (
        <Checkbox
          label="Minimize to Tray"
          checked={minimizeToTray}
          onChange={e =>
            onSettingsChange(
              ElectronSettingsPaths.MINIMIZE_TO_TRAY,
              e.target.checked,
              toggleMinimizeToTray
            )}
        />
      )}
    </div>
  );

SystemPanel.propTypes = {
  minimizeToTray: PropTypes.bool.isRequired,
  onSettingsChange: PropTypes.func.isRequired,
  toggleMinimizeToTray: PropTypes.func.isRequired
};

export default SystemPanel;
