import React from 'react';
import PropTypes from 'prop-types';
import { Checkbox } from '@blueprintjs/core';
import { getAllSounds } from '../../utils/sounds.util';

const SoundsPanel = ({
  audioPhaseDisabled,
  audioSelection,
  audioTickDisabled,
  sounds,
  onSettingsChange,
  toggleAudioPhase,
  toggleAudioTick,
  setAudio
}) => (
  <div className="mt-1">
    <div className="mb-2">
      <span>Ticking: </span>
      <div className="pt-select">
        <select
          value={audioSelection}
          onChange={e =>
            onSettingsChange(
              'system.audioSelection',
              +e.target.value,
              setAudio
            )
          }
        >
          {sounds.map((sound, i) => {
            const { title } = sound;
            return <option key={title} value={i}>{title}</option>;
          })}
        </select>
      </div>
    </div>
    <div>
      <label className="pt-label">Volume Control</label>
      <Checkbox
        label="Play ticking sound"
        checked={!audioTickDisabled}
        onChange={e =>
          onSettingsChange(
            'system.audioTickDisabled',
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
            'system.audioPhaseDisabled',
            !e.target.checked,
            toggleAudioPhase
          )
        }
      />
    </div>
  </div>
);

SoundsPanel.defaultProps = {
  sounds: Array.from(getAllSounds())
};

SoundsPanel.propTypes = {
  audioPhaseDisabled: PropTypes.bool.isRequired,
  audioSelection: PropTypes.number.isRequired,
  audioTickDisabled: PropTypes.bool.isRequired,
  sounds: PropTypes.arrayOf(PropTypes.any),
  onSettingsChange: PropTypes.func.isRequired,
  toggleAudioPhase: PropTypes.func.isRequired,
  toggleAudioTick: PropTypes.func.isRequired,
  setAudio: PropTypes.func.isRequired
};

export default SoundsPanel;
