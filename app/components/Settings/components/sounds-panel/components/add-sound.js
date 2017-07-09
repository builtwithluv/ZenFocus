import { remote } from 'electron';
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Button, Dialog, Intent } from '@blueprintjs/core';
import { SoundTypes } from '../../../../enums';

class AddSound extends PureComponent {
  static propTypes = {
    addSound: PropTypes.func.isRequired,
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
      addSound
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

export default AddSound;
