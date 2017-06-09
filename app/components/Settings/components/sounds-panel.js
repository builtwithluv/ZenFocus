import React from 'react';
import PropTypes from 'prop-types';
import { Checkbox } from '@blueprintjs/core';

const SoundsPanel = ({
  audioPhaseDisabled,
  audioTickDisabled,
  setElectronSettings,
  toggleAudioPhase,
  toggleAudioTick
}) =>
  <div className="mt-1">
    <Checkbox
      label="Play ticking sound"
      checked={!audioTickDisabled}
      onChange={e => {
        toggleAudioTick();
        setElectronSettings('system.audioTickDisabled', !e.target.checked);
      }}
    />
    <Checkbox
      label="Play sound when phase ends"
      checked={!audioPhaseDisabled}
      onChange={e => {
        toggleAudioPhase();
        setElectronSettings('system.audioPhaseDisabled', !e.target.checked);
      }}
    />
  </div>;

SoundsPanel.propTypes = {
  audioPhaseDisabled: PropTypes.bool.isRequired,
  audioTickDisabled: PropTypes.bool.isRequired,
  setElectronSettings: PropTypes.func.isRequired,
  toggleAudioPhase: PropTypes.func.isRequired,
  toggleAudioTick: PropTypes.func.isRequired
};

export default SoundsPanel;
