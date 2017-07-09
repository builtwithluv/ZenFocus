import React from 'react';
import PropTypes from 'prop-types';
import { Phases, SoundTypes } from '../../../../enums';
import SoundOption from './sound-option';

const MusicPanel = ({
  library,
  musicFocusPhase,
  onSettingsChange,
  setAudio,
}) => (
  <div>
    {library.length > 0 && (
      <SoundOption
        label="Focus"
        selectedSound={musicFocusPhase}
        sounds={library}
        onChange={e => {
          onSettingsChange(
            'sounds.focusPhaseMusic',
            e.target.value,
            setAudio,
            Phases.FOCUS,
            SoundTypes.MUSIC
          );
        }}
      />
    )}
  </div>
);

MusicPanel.propTypes = {
  library: PropTypes.arrayOf(
    PropTypes.shape({
      url: PropTypes.string,
      title: PropTypes.string.isRequired
    })
  ),
  musicFocusPhase: PropTypes.string,
  onSettingsChange: PropTypes.func.isRequired,
  setAudio: PropTypes.func.isRequired,
};

export default MusicPanel;
