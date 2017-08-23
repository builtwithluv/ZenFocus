// @flow

import React, { PureComponent } from 'react';
import classNames from 'classnames';
import { Button, Intent } from '@blueprintjs/core';

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
          <thead>
            <tr>
              <th className="align-middle">Title</th>
            </tr>
          </thead>
          <tbody>
            {library.map(sound => (
              <tr
                key={`LibRow-${sound.id}`}
                onClick={() => this.select(sound)}
                className={classNames('lib-row', { highlight: selectedId === sound.id })}
              >
                <td>
                  {sound.title}
                </td>
                <td>
                  {activeSounds.map(acts => acts.id === sound.id && <Token key={`LibToken-${acts.type}`} phase={acts.type} />)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}
