import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import { ipcRenderer } from 'electron';
import classNames from 'classnames';
import settings from 'electron-settings';
import { Button } from '@blueprintjs/core';
import {
  LOAD_CHARTS,
  LOAD_SETTINGS
} from '../events';
import {
  loadRoundsData
} from '../components/common/Rounds/actions';
import {
  Phases
} from '../components/common/CountdownTimer/enums';

class App extends PureComponent {
  componentWillMount() {
    const { pushRoute } = this.props;
    ipcRenderer.on(LOAD_CHARTS, () => pushRoute('/charts'));
    ipcRenderer.on(LOAD_SETTINGS, () => pushRoute('/settings'));
    this.loadSavedData();
  }

  loadSavedData() {
    const {
      setRoundsData
    } = this.props;
    const data = settings.getAll();

    const { rounds = {} } = data;
    setRoundsData(rounds);
  }

  render() {
    const { currentPhase, goToMain } = this.props;
    const buttonClass = classNames({
      'pt-minimal': true,
      'btn-phase': true,
      'w-100': true,
      'bg-focus-phase': currentPhase === 0,
      'bg-short-break-phase': currentPhase === 1,
      'bg-long-break-phase': currentPhase === 2
    });

    return (
      <main className="pt-dark">
        <Button
          text={Phases[currentPhase]}
          onClick={goToMain}
          className={buttonClass}
        />
        {this.props.children}
      </main>
    );
  }
}

App.propTypes = {
  children: PropTypes.element.isRequired,
  currentPhase: PropTypes.number.isRequired,
  goToMain: PropTypes.func.isRequired,
  setRoundsData: PropTypes.func.isRequired,
  pushRoute: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  currentPhase: state.rounds.currentPhase
});

const mapDispatchToProps = (dispatch) => ({
  goToMain: () => dispatch(push('/')),
  setRoundsData: (data) => dispatch(loadRoundsData(data)),
  pushRoute: (route) => dispatch(push(route))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
