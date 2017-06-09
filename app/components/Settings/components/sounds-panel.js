import React from 'react';
import PropTypes from 'prop-types';
import { Switch } from '@blueprintjs/core';

const SoundsPanel = ({
  audioDisabled,
  setAudioOff,
  setAudioOn,
  setElectronSettings
}) =>
  <div className="mt-1">
    <Switch
      label="Sound"
      checked={!audioDisabled}
      onChange={e => {
        if (e.target.checked) setAudioOn();
        else setAudioOff();
        setElectronSettings('system.audioDisabled', !e.target.checked);
      }}
      className="pt-large w-fit-content"
    />
  </div>;

SoundsPanel.propTypes = {
  audioDisabled: PropTypes.bool.isRequired,
  setAudioOff: PropTypes.func.isRequired,
  setAudioOn: PropTypes.func.isRequired,
  setElectronSettings: PropTypes.func.isRequired
};

export default SoundsPanel;
