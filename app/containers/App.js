import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { ipcRenderer } from 'electron';
import classNames from 'classnames';
import settings from 'electron-settings';
import { Intent } from '@blueprintjs/core';
import Feedback from '../components/common/Feedback';
import WelcomeSlides from '../components/common/WelcomeSlides';
import GenAlert from '../components/common/GeneralAlerts';
import MiniView from '../components/MiniView';
import TitleBar from '../components/common/TitleBar';
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
  SEND_RESET_ROUND,
  SEND_TOGGLE_COMPACT,
  SEND_TOGGLE_WELCOME
} from '../electron/events';
import { Themes } from './enums';
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
    const {
      pushRoute,
      resetRound,
      resetSession,
      toggleCompactMode,
      toggleWelcomeSlides
    } = this.props;
    ipcRenderer.on(LOAD_CHARTS, () => pushRoute('/charts'));
    ipcRenderer.on(LOAD_SETTINGS, () => pushRoute('/settings'));
    ipcRenderer.on(SEND_RESET_ROUND, resetRound);
    ipcRenderer.on(SEND_CHECKING_FOR_UPDATES, () =>
      this.showCheckingForUpdates()
    );
    ipcRenderer.on(SEND_ERROR, (e, msg) => this.showError(msg));
    ipcRenderer.on(SEND_GENERAL_ALERT, (e, msg) => this.showGeneralAlert(msg));
    ipcRenderer.on(SEND_GIVE_FEEDBACK, () => this.showSurvey('feedback'));
    ipcRenderer.on(SEND_NEEDS_UPDATE, (e, version) =>
      this.showUpdateMessage(version)
    );
    ipcRenderer.on(SEND_NEW_SESSION, resetSession);
    ipcRenderer.on(SEND_REPORT_ISSUE, () => this.showSurvey('issue'));
    ipcRenderer.on(SEND_TOGGLE_COMPACT, toggleCompactMode);
    ipcRenderer.on(SEND_TOGGLE_WELCOME, toggleWelcomeSlides);
    this.loadSavedData();
  }

  closeFeedback() {
    this.setState({ showFeedback: false });
  }

  hideAlerts() {
    this.setState({
      checkingForUpdates: false,
      isDownloading: false,
      showFeedback: false
    });
  }

  loadSavedData() {
    const { loadRoundsData, setAppSettings, setTheme } = this.props;
    const { rounds = {}, styles = {}, system = {} } = settings.getAll();

    loadRoundsData(rounds);
    setAppSettings(system);
    setTheme(styles.theme);
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
    const msg = `Oops. ${message ||
      'Something went wrong.'} Please report this error.`;
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
    const onConfirm =
      version &&
      (() => {
        this.showDownloadProgress();
        ipcRenderer.send(ON_ACCEPT_UPDATE);
      });

    this.hideAlerts();

    openGeneralAlert(msg, onConfirm, {
      cancelText,
      confirmText,
      intent: Intent.SUCCESS
    });
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

  render() {
    const {
      compact,
      showWelcomeSlides,
      theme,
      setAppSettings,
      setElectronSettings
    } = this.props;
    const { checkingForUpdates, isDownloading, showFeedback, url } = this.state;

    const mainClass = classNames({
      'pt-dark': theme === Themes.DARK
    });

    return (
      <div>
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

        {compact
          ? <MiniView />
          : <main className={mainClass}>
              <TitleBar />
              {this.props.children}
            </main>};
      </div>
    );
  }
}

App.propTypes = {
  compact: PropTypes.bool.isRequired,
  showWelcomeSlides: PropTypes.bool.isRequired,
  theme: PropTypes.string.isRequired,
  loadRoundsData: PropTypes.func.isRequired,
  openGeneralAlert: PropTypes.func.isRequired,
  pushRoute: PropTypes.func.isRequired,
  resetRound: PropTypes.func.isRequired,
  resetSession: PropTypes.func.isRequired,
  setAppSettings: PropTypes.func.isRequired,
  setElectronSettings: PropTypes.func.isRequired,
  setTheme: PropTypes.func.isRequired,
  toggleCompactMode: PropTypes.func.isRequired,
  toggleWelcomeSlides: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired
};

export default App;
