import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import { ipcRenderer } from 'electron';
import classNames from 'classnames';
import settings from 'electron-settings';
import { Alert, Button, Intent } from '@blueprintjs/core';
import Feedback from '../components/common/Feedback';
import UpdateAlert from '../components/common/UpdateAlert';
import {
  LOAD_CHARTS,
  LOAD_SETTINGS,
  ON_ACCEPT_UPDATE,
  SEND_GENERAL_ALERT,
  SEND_NEEDS_UPDATE
} from '../electron/events';
import {
  setAppSettings
} from '../actions';
import {
  loadRoundsData
} from '../components/common/Rounds/actions';
import {
  Phases
} from '../components/common/CountdownTimer/enums';

class App extends PureComponent {
  constructor() {
    super();
    this.state = {
      generalAlertMsg: '',
      needsUpdate: false,
      showFeedback: false,
      showGeneralAlert: false,
      url: ''
    };
  }

  componentWillMount() {
    const { pushRoute } = this.props;
    ipcRenderer.on(LOAD_CHARTS, () => pushRoute('/charts'));
    ipcRenderer.on(LOAD_SETTINGS, () => pushRoute('/settings'));
    ipcRenderer.on(SEND_GENERAL_ALERT, (e, msg) => this.showGeneralAlert(msg));
    ipcRenderer.on(SEND_NEEDS_UPDATE, () => this.setState({ needsUpdate: true })); 
    this.loadSavedData();
  }

  // TODO: Remove when live
  componentDidMount() {
    ipcRenderer.send('yo');
  }

  showGeneralAlert(msg) {
    this.setState({
      generalAlertMsg: msg,
      showGeneralAlert: true
    });
  }

  loadSavedData() {
    const {
      loadRoundsData: loadRounds,
      setAppSettings: setSettings
    } = this.props;
    const {
      rounds = {},
      system = {}
    } = settings.getAll();

    loadRounds(rounds);
    setSettings(system);
  }

  onGiveFeedbackClick(type) {
    const url = type === 'feedback'
      ? 'https://docs.google.com/forms/d/e/1FAIpQLSccbcfGtY6MpQeRM2hYQ-Xzji6TDKnG9Mcr_1fluDQCU0JoTA/viewform?embedded=true'
      : 'https://docs.google.com/forms/d/e/1FAIpQLSc498W0BqVHGhhb_A9WyxrHGfbMeynnuEXa5NYpjMD9nDQpng/viewform?embedded=true';

    this.setState({
      showFeedback: true,
      url
    });
  }

  onRestartLater() {
    this.setState({ needsUpdate: false });
  }

  onGeneralAlertConfirm() {
    this.setState({ showGeneralAlert: false });
  }

  closeFeedback() {
    this.setState({ showFeedback: false });
  }

  render() {
    const { currentPhase, goToMain } = this.props;
    const {
      generalAlertMsg,
      needsUpdate,
      showFeedback,
      showGeneralAlert,
      url
    } = this.state;
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
        <div className="fixed-bottom ml-3 mb-2">
          <Button
            text="Please Leave Feedback"
            onClick={() => this.onGiveFeedbackClick('feedback')}
            className="bg-yellow text-black font-weight-bold mr-3"
          />
          <Button
            text="Report Issue"
            intent={Intent.DANGER}
            onClick={() => this.onGiveFeedbackClick('issue')}
            className="text-black font-weight-bold"
          />
        </div>
        <Feedback
          showFeedback={showFeedback}
          closeFeedback={() => this.closeFeedback()}
          url={url}
        />
        <UpdateAlert
          needsUpdate={needsUpdate}
          onRestartLater={() => this.onRestartLater()}
          onRestartNow={() => ipcRenderer.send(ON_ACCEPT_UPDATE)}
        />
        <Alert
          isOpen={showGeneralAlert}
          intent={Intent.SUCCESS}
          onConfirm={() => this.onGeneralAlertConfirm()}
        >
          {generalAlertMsg}
        </Alert>
      </main>
    );
  }
}

App.propTypes = {
  children: PropTypes.element.isRequired,
  currentPhase: PropTypes.number.isRequired,
  goToMain: PropTypes.func.isRequired,
  loadRoundsData: PropTypes.func.isRequired,
  pushRoute: PropTypes.func.isRequired,
  setAppSettings: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  currentPhase: state.rounds.currentPhase
});

const mapDispatchToProps = (dispatch) => ({
  goToMain: () => dispatch(push('/')),
  loadRoundsData: (data) => dispatch(loadRoundsData(data)),
  pushRoute: (route) => dispatch(push(route)),
  setAppSettings: (data) => dispatch(setAppSettings(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
