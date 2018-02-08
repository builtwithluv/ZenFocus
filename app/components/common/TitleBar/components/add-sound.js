import { remote } from 'electron';
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Button, Dialog, Intent, Radio, RadioGroup } from '@blueprintjs/core';

import {
  ElectronSettingsPaths,
  Phases,
  Sounds,
  SoundTypes,
} from 'enums';

import { getTitleFromSrc } from 'utils/sounds.util';
import { isLongBreak } from 'utils/phases.util';
import { isHome } from 'utils/routes.util';

class AddSound extends PureComponent {
  static propTypes = {
    addSound: PropTypes.func.isRequired,
    className: PropTypes.string
  };

  state = {
    isOpen: false,
  };

  determineIfDefaultSoundIsUsed() {
    const {
      currentPhase,
      soundFocusPhase,
      soundLongBreakPhase,
      soundShortBreakPhase,
    } = this.props;

    switch (currentPhase) {
      case Phases.FOCUS: {
        return Sounds.TICK === soundFocusPhase;
      }
      case Phases.SHORT_BREAK: {
        return Sounds.TICK === soundShortBreakPhase;
      }
      case Phases.LONG_BREAK: {
        return Sounds.TICK === soundLongBreakPhase;
      }
      default: {
        return false;
      }
    }
  }

  determineSelectedSound() {
    const {
      currentPhase,
      soundFocusPhase,
      soundLongBreakPhase,
      soundShortBreakPhase,
    } = this.props;

    switch (currentPhase) {
      case Phases.FOCUS: {
        return soundFocusPhase;
      }
      case Phases.SHORT_BREAK: {
        return soundShortBreakPhase;
      }
      case Phases.LONG_BREAK: {
        return soundLongBreakPhase;
      }
      default: {
        return soundFocusPhase;
      }
    }
  }

  getCustomSounds() {
    const { library } = this.props;
    const defaultSounds = Object.values(Sounds);
    return library.filter((sound) => !defaultSounds.includes(sound.id));
  }

  getElectronSettingsPath() {
    const { currentPhase } = this.props;

    switch (currentPhase) {
      case Phases.FOCUS: {
        return ElectronSettingsPaths.FOCUS_SOUND;
      }
      case Phases.SHORT_BREAK: {
        return ElectronSettingsPaths.SHORT_BREAK_SOUND;
      }
      case Phases.LONG_BREAK: {
        return ElectronSettingsPaths.LONG_BREAK_SOUND;
      }
      default: {
        return ElectronSettingsPaths.FOCUS_SOUND;
      }
    }
  }

  onRemoveSound({ id, title }) {
    const { openGeneralAlert, removeSound } = this.props;

    const message = (
      <div>
        Are you sure you want to remove {''}
        <span className="font-weight-bold">{title}</span>
        ?
      </div>
    );

    openGeneralAlert(message, () => removeSound(id), { cancelText: 'Cancel' });
  }

  render() {
    const {
      addSound,
      changeSound,
      className,
      currentPhase,
      defaultSound,
      route,
    } = this.props;

    const {
      isOpen,
    } = this.state;

    const buttonStyles = classNames(
      'pt-minimal',
      'non-draggable',
      'btn-no-hover',
      'btn-no-bg',
      {
        'btn-white': !isHome(route) && !isLongBreak(currentPhase),
        'btn-black': !isHome(route) && isLongBreak(currentPhase),
      }
    );

    const customSounds = this.getCustomSounds();

    return (
      <div className={className}>
        <Button
          className={buttonStyles}
          iconName="music"
          onClick={() => this.setState({ isOpen: true })}
        />
        <Dialog
          className="h-60 w-80"
          isOpen={isOpen}
          onClose={() => this.setState({ isOpen: false })}
        >
          <div className="mx-3 mt-3">
            <RadioGroup
              selectedValue={this.determineIfDefaultSoundIsUsed() ? 'default' : this.determineSelectedSound()}
              onChange={(e) => {
                const val = e.target.value;
                if (val === 'default') {
                  const { key, id } = defaultSound;
                  changeSound(key, id, currentPhase);
                } else {
                  changeSound(this.getElectronSettingsPath(), val, currentPhase);
                }
              }}
            >
              <Radio label="Use default sound" value={'default'} />
              {customSounds.map((sound) => (
                <Radio
                  className="d-flex"
                  key={sound.id}
                  label={sound.title}
                  value={sound.id}
                >
                  <Button
                    className="remove-button pt-minimal btn-no-bg ml-1"
                    iconName="cross"
                    onClick={() => this.onRemoveSound(sound)}
                  />
                </Radio>
              ))}
            </RadioGroup>
            <Button
              className="float-right mt-2"
              text="Add a sound"
              intent={Intent.PRIMARY}
              onClick={() => {
                const opts = {
                  filters: [
                    { name: 'Audio', extensions: ['flac', 'mp3', 'mp4', 'ogg', 'wav'] }
                  ]
                };
                remote.dialog.showOpenDialog(opts, (filePaths) => {
                  if (filePaths) {
                    const src = filePaths[0];
                    const title = getTitleFromSrc(src);
                    addSound(title, src, SoundTypes.TICK);
                  }
                });
              }}
            />
          </div>
        </Dialog>
      </div>
    );
  }
}

export default AddSound;
