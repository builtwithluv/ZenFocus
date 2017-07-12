// @flow

import React, { PureComponent } from 'react';
import classNames from 'classnames';
import { Button, Intent } from '@blueprintjs/core';

type Props = {
  library: SoundLibrary,
  openGeneralAlert: Dispatch,
  removeSound: Dispatch,
  soundFocusPhase: SoundID,
  soundShortBreakPhase: SoundID,
  soundLongBreakPhase: SoundID,
  soundPhaseEnded: SoundID
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
    const { library } = this.props;
    const { selectedId } = this.state;

    return (
      <table className="library-panel pt-table pt-striped pt-condensed">
        <thead>
          <tr>
            <th className="align-middle">Title</th>
            <th className="align-middle">Sound Type</th>
            <th>
              <Button
                className="pt-minimal btn-no-hover btn-no-bg"
                iconName="trash"
                intent={Intent.DANGER}
                disabled={!selectedId}
                onClick={this.onRemove}
              />
            </th>
          </tr>
        </thead>
        <tbody>
          {library.map(sound => (
            <tr
              key={`LibRow-${sound.id}`}
              onClick={() => this.select(sound)}
              className={classNames('lib-row', { highlight: selectedId === sound.id })}
            >
              <td>{sound.title}</td>
              <td colSpan={2}>{sound.soundType}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}
