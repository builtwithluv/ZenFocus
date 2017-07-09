import React from 'react';
import PropTypes from 'prop-types';
import { Phases, SoundTypes } from '../../../../enums';
import SoundOption from './sound-option';

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
          e.target.value,
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
          e.target.value,
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
          e.target.value,
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
          e.target.value,
          setAudio,
          null,
          SoundTypes.TICK
        );
      }}
    />
  </div>
);

TickPanel.propTypes = {
  soundFocusPhase: PropTypes.string.isRequired,
  soundShortBreakPhase: PropTypes.string.isRequired,
  soundLongBreakPhase: PropTypes.string.isRequired,
  soundPhaseEnded: PropTypes.string.isRequired,
  sounds: PropTypes.arrayOf(PropTypes.any),
  onSettingsChange: PropTypes.func.isRequired,
  setAudio: PropTypes.func.isRequired,
};

export default TickPanel;
