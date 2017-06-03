import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { ipcRenderer } from 'electron';
import classNames from 'classnames';
import settings from 'electron-settings';
import { Button, Intent } from '@blueprintjs/core';
import Feedback from '../components/common/Feedback';
import WelcomeSlides from '../components/common/WelcomeSlides';
import GenAlert from '../components/common/GeneralAlerts';
import {
  LOAD_CHARTS,
  LOAD_SETTINGS,
  ON_ACCEPT_UPDATE,
  SEND_CHECKING_FOR_UPDATES,
  SEND_ERROR,
  SEND_GENERAL_ALERT,
  SEND_GIVE_FEEDBACK,
  SEND_NEEDS_UPDATE,
  SEND_NEW_SESSION,
  SEND_REPORT_ISSUE,
  SEND_RESET_ROUND
} from '../electron/events';
import {
  Phases,
  Themes
} from './enums';
import OverlaySpinner from '../components/common/OverlaySpinner';

class App extends PureComponent {
  constructor() {
    super();
    this.state = {
      checkingForUpdates: false,
      isDownloading: false,
      showFeedback: false,
      url: ''
    };
  }

  componentWillMount() {
    const { pushRoute, resetRound, resetSession } = this.props;
    ipcRenderer.on(LOAD_CHARTS, () => pushRoute('/charts'));
    ipcRenderer.on(LOAD_SETTINGS, () => pushRoute('/settings'));
    ipcRenderer.on(SEND_RESET_ROUND, resetRound);
    ipcRenderer.on(SEND_CHECKING_FOR_UPDATES, () => this.showCheckingForUpdates());
    ipcRenderer.on(SEND_ERROR, (e, msg) => this.showError(msg));
    ipcRenderer.on(SEND_GENERAL_ALERT, (e, msg) => this.showGeneralAlert(msg));
    ipcRenderer.on(SEND_GIVE_FEEDBACK, () => this.showSurvey('feedback'));
    ipcRenderer.on(SEND_NEEDS_UPDATE, (e, version) => this.showUpdateMessage(version));
    ipcRenderer.on(SEND_NEW_SESSION, resetSession);
    ipcRenderer.on(SEND_REPORT_ISSUE, () => this.showSurvey('issue'));
    this.loadSavedData();
  }

  hideAlerts() {
    this.setState({
      checkingForUpdates: false,
      isDownloading: false,
      showFeedback: false
    });
  }

  showCheckingForUpdates() {
    this.setState({ checkingForUpdates: true });
  }

  showDownloadProgress() {
    this.setState({
      checkingForUpdates: false,
      isDownloading: true
    });
  }

  showGeneralAlert(message) {
    const { openGeneralAlert } = this.props;
    this.hideAlerts();
    openGeneralAlert(message, null, { cancelText: 'Cancel' });
  }

  showError(message) {
    const { openGeneralAlert } = this.props;
    const msg = `Oops. ${message || 'Something went wrong.'} Please report this error.`;
    const onConfirm = () => this.showSurvey('issue');
    const opts = { cancelText: 'Cancel', confirmText: 'Report' };

    this.hideAlerts();

    openGeneralAlert(msg, onConfirm, opts);
  }

  showUpdateMessage(version) {
    const { openGeneralAlert } = this.props;
    const msg = version
      ? `Version ${version} is available of Zen Focus. Would you like to update and restart now?`
      : 'You are currently up-to-date.';
    const cancelText = version && 'Update Later';
    const confirmText = version && 'Update and Restart Now';
    const onConfirm = version && (() => {
      this.showDownloadProgress();
      ipcRenderer.send(ON_ACCEPT_UPDATE);
    });

    this.hideAlerts();

    openGeneralAlert(msg, onConfirm, { cancelText, confirmText, intent: Intent.SUCCESS });
  }

  loadSavedData() {
    const {
      loadRoundsData,
      setAppSettings,
      setTheme
    } = this.props;
    const {
      rounds = {},
      styles = {},
      system = {}
    } = settings.getAll();

    loadRoundsData(rounds);
    setAppSettings(system);
    setTheme(styles.theme);
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

  closeFeedback() {
    this.setState({ showFeedback: false });
  }

  render() {
    const {
      currentPhase,
      showWelcomeSlides,
      theme,
      pushRoute,
      setAppSettings,
      setElectronSettings
    } = this.props;
    const {
      checkingForUpdates,
      isDownloading,
      showFeedback,
      url
    } = this.state;

    const mainClass = classNames({
      'pt-dark': theme === Themes.DARK
    });

    const buttonClass = classNames({
      'pt-minimal': true,
      'btn-phase': true,
      'w-100': true,
      'bg-focus-phase': currentPhase === Phases.FOCUS,
      'bg-short-break-phase': currentPhase === Phases.SHORT_BREAK,
      'bg-long-break-phase': currentPhase === Phases.LONG_BREAK
    });

    return (
      <main className={mainClass}>
        <Button
          text={['Focus', 'Short Break', 'Long Break'][currentPhase]}
          onClick={() => pushRoute('/')}
          className={buttonClass}
        />
        {this.props.children}

        {/* General Alert */}
        <GenAlert />

        {/* Welcome Screen */}
        <WelcomeSlides
          showWelcomeSlides={showWelcomeSlides}
          setAppSettings={setAppSettings}
          setElectronSettings={setElectronSettings}
        />

        {/* Feedback */}
        <Feedback
          showFeedback={showFeedback}
          closeFeedback={() => this.closeFeedback()}
          url={url}
        />

        {/* Downloading */}
        <OverlaySpinner isOpen={isDownloading}>
          Downloading updates...
        </OverlaySpinner>

        {/* Checking for Updates */}
        <OverlaySpinner isOpen={checkingForUpdates}>
          Checking for updates...
        </OverlaySpinner>
      </main>
    );
  }
}

App.propTypes = {
  children: PropTypes.element.isRequired,
  currentPhase: PropTypes.number.isRequired,
  loadRoundsData: PropTypes.func.isRequired,
  showWelcomeSlides: PropTypes.bool.isRequired,
  theme: PropTypes.string.isRequired,
  openGeneralAlert: PropTypes.func.isRequired,
  pushRoute: PropTypes.func.isRequired,
  resetRound: PropTypes.func.isRequired,
  resetSession: PropTypes.func.isRequired,
  setAppSettings: PropTypes.func.isRequired,
  setElectronSettings: PropTypes.func.isRequired,
  setTheme: PropTypes.func.isRequired
};

export default App;
