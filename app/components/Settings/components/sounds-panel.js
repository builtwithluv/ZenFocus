import React from 'react';
import PropTypes from 'prop-types';
import { Checkbox } from '@blueprintjs/core';
import { getAllSounds } from '../../utils/sounds.util';
import { Phases } from '../../enums';

const TickSoundOption = ({
  label,
  selectedSound,
  sounds,
  onChange,
}) => (
  <div className="mb-2">
    <span>{label}: </span>
    <div className="pt-select">
      <select value={selectedSound} onChange={onChange}>
        {sounds.map((sound, i) => {
          const { title } = sound;
          return <option key={`${label}-${title}`} value={i}>{title}</option>;
        })}
      </select>
    </div>
  </div>
);

TickSoundOption.propTypes = {
  label: PropTypes.string.isRequired,
  selectedSound: PropTypes.number.isRequired,
  sounds: PropTypes.arrayOf(PropTypes.any),
  onChange: PropTypes.func.isRequired,
};

const SoundsPanel = ({
  audioPhaseDisabled,
  audioTickDisabled,
  sounds,
  soundFocusPhase,
  soundShortBreakPhase,
  soundLongBreakPhase,
  onSettingsChange,
  toggleAudioPhase,
  toggleAudioTick,
  setAudio
}) => (
  <div className="mt-1">
    <div className="mb-3">
      <TickSoundOption
        label="Focus Tick"
        selectedSound={soundFocusPhase}
        sounds={sounds}
        onChange={e => {
          onSettingsChange(
            'sounds.focusPhase',
            +e.target.value,
            setAudio,
            Phases.FOCUS
          );
        }}
      />
      <TickSoundOption
        label="Short Break Tick"
        selectedSound={soundShortBreakPhase}
        sounds={sounds}
        onChange={e => {
          onSettingsChange(
            'sounds.shortBreakPhase',
            +e.target.value,
            setAudio,
            Phases.SHORT_BREAK
          );
        }}
      />
      <TickSoundOption
        label="Long Break Tick"
        selectedSound={soundLongBreakPhase}
        sounds={sounds}
        onChange={e => {
          onSettingsChange(
            'sounds.longBreakPhase',
            +e.target.value,
            setAudio,
            Phases.LONG_BREAK
          );
        }}
      />
    </div>
    <div>
      <label className="pt-label">Volume Control</label>
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
  </div>
);

SoundsPanel.defaultProps = {
  sounds: Array.from(getAllSounds())
};

SoundsPanel.propTypes = {
  audioPhaseDisabled: PropTypes.bool.isRequired,
  audioTickDisabled: PropTypes.bool.isRequired,
  soundFocusPhase: PropTypes.number.isRequired,
  soundShortBreakPhase: PropTypes.number.isRequired,
  soundLongBreakPhase: PropTypes.number.isRequired,
  sounds: PropTypes.arrayOf(PropTypes.any),
  onSettingsChange: PropTypes.func.isRequired,
  toggleAudioPhase: PropTypes.func.isRequired,
  toggleAudioTick: PropTypes.func.isRequired,
  setAudio: PropTypes.func.isRequired
};

export default SoundsPanel;
