import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import { ipcRenderer } from 'electron';
import classNames from 'classnames';
import settings from 'electron-settings';
import { Alert, Button, Intent, Overlay, Spinner } from '@blueprintjs/core';
import Feedback from '../components/common/Feedback';
import UpdateAlert from '../components/common/UpdateAlert';
import {
  LOAD_CHARTS,
  LOAD_SETTINGS,
  ON_ACCEPT_UPDATE,
  SEND_GENERAL_ALERT,
  SEND_GIVE_FEEDBACK,
  SEND_NEEDS_UPDATE,
  SEND_REPORT_ISSUE
} from '../electron/events';
import {
  setAppSettings,
  setAudio
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
      isDownloading: false,
      needsUpdate: false,
      showFeedback: false,
      showGeneralAlert: false,
      url: '',
      version: ''
    };
  }

  componentWillMount() {
    const { pushRoute } = this.props;
    ipcRenderer.on(LOAD_CHARTS, () => pushRoute('/charts'));
    ipcRenderer.on(LOAD_SETTINGS, () => pushRoute('/settings'));
    ipcRenderer.on(SEND_GENERAL_ALERT, (e, msg) => this.showGeneralAlert(msg));
    ipcRenderer.on(SEND_GIVE_FEEDBACK, () => this.showSurvey('feedback'));
    ipcRenderer.on(SEND_NEEDS_UPDATE, (e, version) => {
      this.setState({ version, needsUpdate: true });
    });
    ipcRenderer.on(SEND_REPORT_ISSUE, () => this.showSurvey('issue'));
    this.loadSavedData();
  }

  componentDidMount() {
    const { setAudio: audio } = this.props;
    audio(this.audio);
  }

  showDownloadProgress() {
    this.setState({
      needsUpdate: false,
      isDownloading: true
    });
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

  showSurvey(type) {
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
    const { currentPhase, pushRoute } = this.props;
    const {
      generalAlertMsg,
      isDownloading,
      needsUpdate,
      showFeedback,
      showGeneralAlert,
      url,
      version
    } = this.state;
    const buttonClass = classNames({
      'pt-minimal': true,
      'btn-phase': true,
      'w-100': true,
      'bg-focus-phase': currentPhase === 0,
      'bg-break-phase': currentPhase !== 0
    });

    return (
      <main className="pt-dark bg-dark-gray-3">
        <Button
          text={Phases[currentPhase]}
          onClick={() => pushRoute('/')}
          className={buttonClass}
        />
        {this.props.children}
        <Feedback
          showFeedback={showFeedback}
          closeFeedback={() => this.closeFeedback()}
          url={url}
        />
        <UpdateAlert
          needsUpdate={needsUpdate}
          version={version}
          onRestartLater={() => this.onRestartLater()}
          onRestartNow={() => {
            this.showDownloadProgress();
            ipcRenderer.send(ON_ACCEPT_UPDATE);
          }}
        />
        <Overlay
          canEscapeKeyClose={false}
          canOutsideClickClose={false}
          isOpen={isDownloading}
          backdropClassName="bg-black"
        >
          <div
            className={`
              d-flex align-items-center justify-content-center
              w-100 h-100 bring-to-front
            `}
          >
            <Spinner
              intent={Intent.SUCCESS}
              className="w-50"
            />
          </div>
        </Overlay>
        <Alert
          isOpen={showGeneralAlert}
          intent={Intent.SUCCESS}
          onConfirm={() => this.onGeneralAlertConfirm()}
        >
          {generalAlertMsg}
        </Alert>
        <audio
          src="assets/tick.mp3"
          ref={(audio) => { this.audio = audio; }}
        />
      </main>
    );
  }
}

App.propTypes = {
  children: PropTypes.element.isRequired,
  currentPhase: PropTypes.number.isRequired,
  loadRoundsData: PropTypes.func.isRequired,
  pushRoute: PropTypes.func.isRequired,
  setAppSettings: PropTypes.func.isRequired,
  setAudio: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  currentPhase: state.rounds.currentPhase
});

const mapDispatchToProps = (dispatch) => ({
  loadRoundsData: (data) => dispatch(loadRoundsData(data)),
  pushRoute: (route) => dispatch(push(route)),
  setAppSettings: (data) => dispatch(setAppSettings(data)),
  setAudio: (audioRef) => dispatch(setAudio(audioRef))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
