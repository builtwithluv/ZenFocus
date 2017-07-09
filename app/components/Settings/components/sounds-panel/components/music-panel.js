import React from 'react';
import PropTypes from 'prop-types';
import { Phases, SoundTypes } from '../../../../enums';
import SoundOption from './sound-option';

const MusicPanel = ({
  musicFiles,
  musicFocusPhase,
  onSettingsChange,
  setAudio,
}) => (
  <div>
    {musicFiles.length > 0 && (
      <SoundOption
        label="Focus"
        selectedSound={musicFocusPhase}
        sounds={musicFiles}
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

export default MusicPanel;
