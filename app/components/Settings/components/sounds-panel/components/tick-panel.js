import React from 'react';
import PropTypes from 'prop-types';

import { Phases } from 'enums';

import SoundOption from 'Settings/components/sounds-panel/components/sound-option';
import AddSound from 'Settings/components/sounds-panel/components/add-sound';

const TickPanel = props => {
  const {
    soundFocusPhase,
    soundShortBreakPhase,
    soundLongBreakPhase,
    soundPhaseEnded,
    library,
    onSettingsChange,
    setAudio,
  } = props;

  return (
    <div>
      <SoundOption
        label="Focus"
        selectedSound={soundFocusPhase}
        sounds={library}
        onChange={e => {
          onSettingsChange(
            'sounds.focusPhase',
            e.target.value,
            setAudio,
            Phases.FOCUS
          );
        }}
      />
      <SoundOption
        label="Short Break"
        selectedSound={soundShortBreakPhase}
        sounds={library}
        onChange={e => {
          onSettingsChange(
            'sounds.shortBreakPhase',
            e.target.value,
            setAudio,
            Phases.SHORT_BREAK
          );
        }}
      />
      <SoundOption
        label="Long Break"
        selectedSound={soundLongBreakPhase}
        sounds={library}
        onChange={e => {
          onSettingsChange(
            'sounds.longBreakPhase',
            e.target.value,
            setAudio,
            Phases.LONG_BREAK
          );
        }}
      />
      <SoundOption
        label="Phase Ended"
        selectedSound={soundPhaseEnded}
        sounds={library}
        onChange={e => {
          onSettingsChange(
            'sounds.phaseEnded',
            e.target.value,
            setAudio
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
  library: PropTypes.arrayOf(PropTypes.instanceOf(HTMLAudioElement)),
  onSettingsChange: PropTypes.func.isRequired,
  setAudio: PropTypes.func.isRequired,
};

export default TickPanel;
