import React from 'react';
import PropTypes from 'prop-types';
import { Checkbox } from '@blueprintjs/core';

const SoundsPanel = ({
  audioPhaseDisabled,
  audioTickDisabled,
  onSettingsChange,
  toggleAudioPhase,
  toggleAudioTick,
  className
}) => (
  <div className={className}>
    <Checkbox
      label="Play ticking sound"
      checked={!audioTickDisabled}
      onChange={e =>
        onSettingsChange(
          'sounds.audioTickDisabled',
          !e.target.checked,
          toggleAudioTick
        )
      }
    />
    <Checkbox
      label="Play sound when phase ends"
      checked={!audioPhaseDisabled}
      onChange={e =>
        onSettingsChange(
          'sounds.audioPhaseDisabled',
          !e.target.checked,
          toggleAudioPhase
        )
      }
    />
  </div>
);

SoundsPanel.displayName = 'Settings.SoundsPanel';

SoundsPanel.propTypes = {
  audioPhaseDisabled: PropTypes.bool.isRequired,
  audioTickDisabled: PropTypes.bool.isRequired,
  onSettingsChange: PropTypes.func.isRequired,
  toggleAudioPhase: PropTypes.func.isRequired,
  toggleAudioTick: PropTypes.func.isRequired,
  className: PropTypes.string
};

export default SoundsPanel;
