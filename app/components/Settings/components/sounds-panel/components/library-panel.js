// @flow

import React, { PureComponent } from 'react';
import classNames from 'classnames';

type Props = {
  library: SoundLibrary
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
            <th>Title</th>
            <th>Sound Type</th>
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
              <td className="text-center">{sound.soundType}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}
