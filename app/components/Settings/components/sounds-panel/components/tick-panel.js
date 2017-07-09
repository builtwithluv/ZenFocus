import React from 'react';
import PropTypes from 'prop-types';
import { Phases, SoundTypes } from '../../../../enums';
import SoundOption from './sound-option';
import AddSound from './add-sound';

const TickPanel = props => {
  const {
    soundFocusPhase,
    soundShortBreakPhase,
    soundLongBreakPhase,
    soundPhaseEnded,
    tickSounds,
    onSettingsChange,
    setAudio,
  } = props;

  return (
    <div>
      <SoundOption
        label="Focus"
        selectedSound={soundFocusPhase}
        sounds={tickSounds}
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
        sounds={tickSounds}
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
        sounds={tickSounds}
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
        sounds={tickSounds}
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
      <AddSound className="mt-4" {...props} />
    </div>
  );
};

TickPanel.propTypes = {
  soundFocusPhase: PropTypes.string.isRequired,
  soundShortBreakPhase: PropTypes.string.isRequired,
  soundLongBreakPhase: PropTypes.string.isRequired,
  soundPhaseEnded: PropTypes.string.isRequired,
  tickSounds: PropTypes.arrayOf(PropTypes.any),
  onSettingsChange: PropTypes.func.isRequired,
  setAudio: PropTypes.func.isRequired,
};

export default TickPanel;
