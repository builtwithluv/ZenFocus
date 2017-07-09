import { remote } from 'electron';
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Button, Checkbox, Dialog, Intent, Tab2, Tabs2 } from '@blueprintjs/core';
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
        {sounds.map(sound => {
          const { id, title } = sound;
          return <option key={`${label}-${id}`} value={id}>{title}</option>;
        })}
      </select>
    </div>
  </div>
);

SoundOption.propTypes = {
  label: PropTypes.string.isRequired,
  selectedSound: PropTypes.string.isRequired,
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

class MusicPanel extends PureComponent {
  static propTypes = {
    musicFiles: PropTypes.arrayOf(
      PropTypes.shape({
        url: PropTypes.string,
        title: PropTypes.string.isRequired
      })
    ),
    musicFocusPhase: PropTypes.string,
    addSound: PropTypes.func.isRequired,
    onSettingsChange: PropTypes.func.isRequired,
    setAudio: PropTypes.func.isRequired,
  };

  state = {
    isOpen: false,
    path: '',
    title: '',
    hasPath: null,
    hasTitle: null,
  };

  render() {
    const {
      musicFiles,
      musicFocusPhase,
      addSound,
      onSettingsChange,
      setAudio,
    } = this.props;

    const {
      isOpen,
      path,
      title,
      hasPath,
      hasTitle,
    } = this.state;

    return (
      <div>
        {musicFiles.length > 0 && (
          <div className="mb-3">
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
          </div>
        )}

        <Button
          iconName="upload"
          text="Upload Sound File"
          onClick={() => this.setState({ isOpen: true })}
        />

        <Dialog isOpen={isOpen} onClose={() => this.setState({ isOpen: false })}>
          <div className="mx-3 mt-3">
            <div
              className="pt-input-group mb-1"
              onClick={() => {
                const files = remote.dialog.showOpenDialog();
                if (files) this.setState({ path: files[0], hasPath: true });
              }}
            >
              <span className="pt-icon pt-icon-music" />
              <input
                readOnly
                className={classNames('pt-input', {
                  'pt-intent-danger': hasPath === false,
                  'pt-intent-success': hasPath === true,
                })}
                type="text"
                placeholder="Browse files..."
                value={path}
                dir="auto"
              />
            </div>
            <div className="pt-input-group mb-3">
              <span className="pt-icon pt-icon-tag" />
              <input
                className={classNames('pt-input', {
                  'pt-intent-danger': hasTitle === false,
                  'pt-intent-success': hasTitle === true && title
                })}
                type="text"
                placeholder="Title"
                value={title}
                dir="auto"
                onChange={e => this.setState({ title: e.target.value, hasTitle: true })}
              />
            </div>
            <Button
              className="float-right"
              iconName="add"
              text="Add sound"
              intent={Intent.SUCCESS}
              onClick={() => {
                if (!title) return this.setState({ hasTitle: false });
                if (!path) return this.setState({ hasPath: false });
                addSound(title, path, SoundTypes.MUSIC);
                this.setState({ title: '', path: '', hasTitle: null, hasPath: null, isOpen: false });
              }}
            />
          </div>
        </Dialog>
      </div>
    );
  }
}

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
  sounds: getAllSounds()
};

export default SoundsPanel;
