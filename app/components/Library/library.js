// @flow

import React, { PureComponent } from 'react';
import classNames from 'classnames';
import { Button, Icon, Intent, Menu, MenuItem, Popover } from '@blueprintjs/core';

import Header from 'common/Header';
import AddSound from 'components/Library/components/add-sound';
import Token from 'components/Library/components/token';

import { Phases } from 'enums';

type Props = {
  library: SoundLibrary,
  soundFocusPhase: SoundID,
  soundShortBreakPhase: SoundID,
  soundLongBreakPhase: SoundID,
  soundPhaseEnded: SoundID,
  addSound: Dispatch,
  changeSound: Dispatch,
  openGeneralAlert: Dispatch,
  removeSound: Dispatch
};

type State = {
  selected: ?HTMLAudioElement,
  selectedId: string
};

export default class LibraryPanel extends PureComponent<void, Props, State> {
  state = {
    selected: null,
    selectedId: '',
  };

  onRemove = () => {
    const {
      openGeneralAlert,
      removeSound,
      soundFocusPhase,
      soundShortBreakPhase,
      soundLongBreakPhase,
      soundPhaseEnded
    } = this.props;
    const { selected, selectedId } = this.state;

    const activeSounds = [
      soundFocusPhase,
      soundShortBreakPhase,
      soundLongBreakPhase,
      soundPhaseEnded
    ];

    let message = '';
    let onConfirm;
    let opts = {};

    if (!activeSounds.includes(selectedId)) {
      message = (
        <div>
          Are you sure you want to remove {''}
          <span className="font-weight-bold">{selected && selected.title}</span>
          ?
        </div>
      );
      onConfirm = () => {
        removeSound(selectedId);
        this.setState({ selected: null, selectedId: '' });
      };
      opts = { cancelText: 'Cancel' };
    } else {
      message = 'Cannot remove sound that is currently active.';
    }

    openGeneralAlert(message, onConfirm, opts);
  };

  select = (selected: HTMLAudioElement) => {
    this.setState({ selected, selectedId: selected.id });
  };

  menu = () => {
    const { changeSound } = this.props;
    const { selectedId } = this.state;

    return (
      <Menu>
        <MenuItem
          onClick={() => changeSound('sounds.focusPhase', selectedId, Phases.FOCUS)}
          text="Use when Focus"
        />
        <MenuItem
          onClick={() => changeSound('sounds.shortBreakPhase', selectedId, Phases.SHORT_BREAK)}
          text="Use when Short Break"
        />
        <MenuItem
          onClick={() => changeSound('sounds.longBreakPhase', selectedId, Phases.LONG_BREAK)}
          text="Use when Long Break"
        />
        <MenuItem
          onClick={() => changeSound('sounds.phaseEnded', selectedId)}
          text="Use when Transition"
        />
      </Menu>
    );
  };

  render() {
    const {
      library,
      soundFocusPhase,
      soundShortBreakPhase,
      soundLongBreakPhase,
      soundPhaseEnded,
      addSound
    } = this.props;

    const { selectedId } = this.state;

    const activeSounds = [
      {
        id: soundFocusPhase,
        type: Phases.FOCUS
      },
      {
        id: soundShortBreakPhase,
        type: Phases.SHORT_BREAK
      },
      {
        id: soundLongBreakPhase,
        type: Phases.LONG_BREAK
      },
      {
        id: soundPhaseEnded,
        type: Phases.TRANSITION
      }
    ];

    const containerStyles = classNames(
      'library-panel',
      'vh-100-offset-30',
      'no-select',
    );

    return (
      <div className={containerStyles}>
        <Header title="Library" />
        <div className="text-right mr-3">
          <AddSound className="d-inline" addSound={addSound} />
          <Button
            className="pt-minimal btn-no-hover btn-no-bg"
            iconName="trash"
            intent={Intent.DANGER}
            disabled={!selectedId}
            onClick={this.onRemove}
          />
        </div>
        <table className="w-100 pt-table pt-striped pt-condensed pt-bordered">
          <tbody>
            {library.map(sound => (
              <tr
                key={`LibRow-${sound.id}`}
                onClick={() => this.select(sound)}
                className={classNames('lib-row', { highlight: selectedId === sound.id })}
              >
                <td className="w-exact-125">
                  {activeSounds.map(acts => acts.id === sound.id && <Token key={`LibToken-${acts.type}`} phase={acts.type} />)}
                </td>
                <td>
                  {sound.title}
                  {sound.id === selectedId && (
                    <Popover className="ml-2" content={this.menu()}>
                      <Icon iconName="more" />
                    </Popover>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}
