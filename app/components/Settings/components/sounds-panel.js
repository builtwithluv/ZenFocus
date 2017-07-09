import React from 'react';
import PropTypes from 'prop-types';
import { Checkbox, Tab2, Tabs2 } from '@blueprintjs/core';
import { getAllSounds } from '../../utils/sounds.util';
import { Phases, SoundTypes } from '../../enums';

const SoundOption = ({
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

SoundOption.propTypes = {
  label: PropTypes.string.isRequired,
  selectedSound: PropTypes.number.isRequired,
  sounds: PropTypes.arrayOf(PropTypes.any),
  onChange: PropTypes.func.isRequired,
};

const TickPanel = ({
  sounds,
  soundFocusPhase,
  soundShortBreakPhase,
  soundLongBreakPhase,
  soundPhaseEnded,
  onSettingsChange,
  setAudio,
}) => (
  <div>
    <SoundOption
      label="Focus"
      selectedSound={soundFocusPhase}
      sounds={sounds}
      onChange={e => {
        onSettingsChange(
          'sounds.focusPhase',
          +e.target.value,
          setAudio,
          Phases.FOCUS,
          SoundTypes.TICK
        );
      }}
    />
    <SoundOption
      label="Short Break"
      selectedSound={soundShortBreakPhase}
      sounds={sounds}
      onChange={e => {
        onSettingsChange(
          'sounds.shortBreakPhase',
          +e.target.value,
          setAudio,
          Phases.SHORT_BREAK,
          SoundTypes.TICK
        );
      }}
    />
    <SoundOption
      label="Long Break"
      selectedSound={soundLongBreakPhase}
      sounds={sounds}
      onChange={e => {
        onSettingsChange(
          'sounds.longBreakPhase',
          +e.target.value,
          setAudio,
          Phases.LONG_BREAK,
          SoundTypes.TICK
        );
      }}
    />
    <SoundOption
      label="Phase Ended"
      selectedSound={soundPhaseEnded}
      sounds={sounds}
      onChange={e => {
        onSettingsChange(
          'sounds.phaseEnded',
          +e.target.value,
          setAudio,
          null,
          SoundTypes.TICK
        );
      }}
    />
  </div>
);

TickPanel.propTypes = {
  soundFocusPhase: PropTypes.number.isRequired,
  soundShortBreakPhase: PropTypes.number.isRequired,
  soundLongBreakPhase: PropTypes.number.isRequired,
  soundPhaseEnded: PropTypes.number.isRequired,
  sounds: PropTypes.arrayOf(PropTypes.any),
  onSettingsChange: PropTypes.func.isRequired,
  setAudio: PropTypes.func.isRequired,
};

const MusicPanel = ({
  musicFiles,
  musicFocusPhase,
  onSettingsChange,
  setAudio,
}) => (
  <div>
    {musicFiles.length > 1 && (
      <SoundOption
        label="Focus"
        selectedSound={musicFocusPhase}
        sounds={musicFiles}
        onChange={e => {
          onSettingsChange(
            'sounds.focusPhaseMusic',
            +e.target.value,
            setAudio,
            Phases.FOCUS,
            SoundTypes.MUSIC
          );
        }}
      />
    )}

    <label className="pt-file-upload">
      <input type="file" />
      <span className="pt-file-upload-input">Add music...</span>
    </label>
  </div>
);

MusicPanel.propTypes = {
  musicFiles: PropTypes.arrayOf(
    PropTypes.shape({
      url: PropTypes.string,
      title: PropTypes.string.isRequired
    })
  ),
  musicFocusPhase: PropTypes.string,
  onSettingsChange: PropTypes.func.isRequired,
  setAudio: PropTypes.func.isRequired,
};

const VolumnControl = ({
  audioPhaseDisabled,
  audioTickDisabled,
  onSettingsChange,
  toggleAudioPhase,
  toggleAudioTick,
  className
}) => (
  <div className={className}>
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
);

VolumnControl.propTypes = {
  audioPhaseDisabled: PropTypes.bool.isRequired,
  audioTickDisabled: PropTypes.bool.isRequired,
  onSettingsChange: PropTypes.func.isRequired,
  toggleAudioPhase: PropTypes.func.isRequired,
  toggleAudioTick: PropTypes.func.isRequired,
  className: PropTypes.string
};

const SoundsPanel = (props) => (
  <div>
    <Tabs2 id="SoundType" animate={false}>
      <Tab2
        id="soundTypeTick"
        title="Tick"
        panel={<TickPanel {...props} />}
      />
      <Tab2
        id="soundTypeMusic"
        title="Music"
        panel={<MusicPanel {...props} />}
      />
    </Tabs2>
    <VolumnControl className="mt-4" {...props} />
  </div>
);

SoundsPanel.defaultProps = {
  sounds: Array.from(getAllSounds())
};

export default SoundsPanel;
