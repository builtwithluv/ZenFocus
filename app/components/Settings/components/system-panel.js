import React from 'react';
import PropTypes from 'prop-types';
import { Switch } from '@blueprintjs/core';

const SystemPanel = ({
  audioTickDisabled,
  setAudioOff,
  setAudioOn,
  setElectronSettings
}) =>
  <div className="mt-1">
    <Switch
      label="Sound"
      checked={!audioTickDisabled}
      onChange={e => {
        if (e.target.checked) setAudioOn();
        else setAudioOff();
        setElectronSettings('system.audioTickDisabled', !e.target.checked);
      }}
      className="pt-large w-fit-content"
    />
  </div>;

SystemPanel.propTypes = {
  audioTickDisabled: PropTypes.bool.isRequired,
  setAudioOff: PropTypes.func.isRequired,
  setAudioOn: PropTypes.func.isRequired,
  setElectronSettings: PropTypes.func.isRequired
};

export default SystemPanel;
