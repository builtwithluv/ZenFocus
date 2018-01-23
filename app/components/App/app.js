import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { ipcRenderer } from 'electron';
import classNames from 'classnames';
import settings from 'electron-settings';
import { Intent } from '@blueprintjs/core';

import { Themes } from 'enums';

import {
  LOAD_CHARTS,
  LOAD_SETTINGS,
  ON_ACCEPT_UPDATE,
  SEND_CHECKING_FOR_UPDATES,
  SEND_ERROR,
  SEND_GENERAL_ALERT,
  SEND_NEEDS_UPDATE,
  SEND_NEW_SESSION,
  SEND_TOGGLE_COMPACT,
  SEND_TOGGLE_WELCOME,
  SHOW_ISSUE_REPORTING_MODAL
} from 'channels';

import { PAUSE, RESUME } from 'common/MediaControls/types';

import MiniView from 'components/MiniView';
import IssueReporter from 'common/IssueReporter';
import WelcomeSlides from 'common/WelcomeSlides';
import GenAlert from 'common/GeneralAlerts';
import TitleBar from 'common/TitleBar';
import OverlaySpinner from 'common/OverlaySpinner';

export default class App extends PureComponent {
  static propTypes = {
    compact: PropTypes.bool.isRequired,
    showWelcomeSlides: PropTypes.bool.isRequired,
    theme: PropTypes.string.isRequired,
    goToHome: PropTypes.func.isRequired,
    goToCharts: PropTypes.func.isRequired,
    goToSettings: PropTypes.func.isRequired,
    loadRoundsData: PropTypes.func.isRequired,
    openGeneralAlert: PropTypes.func.isRequired,
    pause: PropTypes.func.isRequired,
    resetSession: PropTypes.func.isRequired,
    resume: PropTypes.func.isRequired,
    setAppSettings: PropTypes.func.isRequired,
    setElectronSettings: PropTypes.func.isRequired,
    setTheme: PropTypes.func.isRequired,
    toggleCompactMode: PropTypes.func.isRequired,
    toggleWelcomeSlides: PropTypes.func.isRequired,
    children: PropTypes.element.isRequired
  };

  state = {
    checkingForUpdates: false,
    isDownloading: false,
    showIssueReportingModal: false
  };

  componentWillMount() {
    const {
      goToHome,
      goToCharts,
      goToSettings,
      pause,
      resetSession,
      resume,
      toggleCompactMode,
      toggleWelcomeSlides
    } = this.props;

    // NOTE: Fix for not loading correct path in production
    goToHome();

    // Listeners from main process
    ipcRenderer.on(LOAD_CHARTS, goToCharts);
    ipcRenderer.on(LOAD_SETTINGS, goToSettings);
    ipcRenderer.on(PAUSE, pause);
    ipcRenderer.on(RESUME, resume);
    ipcRenderer.on(SEND_CHECKING_FOR_UPDATES, this.showCheckingForUpdates);
    ipcRenderer.on(SEND_ERROR, this.showError);
    ipcRenderer.on(SEND_GENERAL_ALERT, this.showGeneralAlert);
    ipcRenderer.on(SHOW_ISSUE_REPORTING_MODAL, this.showIssueReportingModal);
    ipcRenderer.on(SEND_NEEDS_UPDATE, this.showUpdateMessage);
    ipcRenderer.on(SEND_NEW_SESSION, resetSession);
    ipcRenderer.on(SEND_TOGGLE_COMPACT, toggleCompactMode);
    ipcRenderer.on(SEND_TOGGLE_WELCOME, toggleWelcomeSlides);

    this.loadSavedData();
  }

  closeFeedback = () => {
    this.setState({ showIssueReportingModal: false });
  };

  hideAlerts = () => {
    this.setState({
      checkingForUpdates: false,
      isDownloading: false,
      showIssueReportingModal: false
    });
  };

  loadSavedData = () => {
    const { loadRoundsData, setAppSettings, setTheme } = this.props;
    const { rounds = {}, styles = {}, system = {} } = settings.getAll();

    loadRoundsData(rounds);
    setAppSettings(system);
    setTheme(styles.theme);
  };

  showCheckingForUpdates = () => {
    this.setState({ checkingForUpdates: true });
  };

  showDownloadProgress = () => {
    this.setState({
      checkingForUpdates: false,
      isDownloading: true
    });
  };

  showGeneralAlert = (e, message) => {
    const { openGeneralAlert } = this.props;
    this.hideAlerts();
    openGeneralAlert(message, null, { cancelText: 'Cancel' });
  };

  showError = (e, message) => {
    const { openGeneralAlert } = this.props;
    const msg = `Oops. ${message ||
      'Something went wrong.'} Please report this error.`;
    const opts = { cancelText: 'Cancel', confirmText: 'Report' };

    this.hideAlerts();

    openGeneralAlert(msg, this.showIssueReportingModal, opts);
  };

  showUpdateMessage = (e, version) => {
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
  };

  showIssueReportingModal = () => {
    this.setState({ showIssueReportingModal: true });
  };

  renderView = () => {
    const {
      compact,
      showWelcomeSlides,
      theme,
      setAppSettings,
      setElectronSettings
    } = this.props;

    if (showWelcomeSlides) {
      return (
        <WelcomeSlides
          setAppSettings={setAppSettings}
          setElectronSettings={setElectronSettings}
        />
      );
    }

    if (compact) return <MiniView />;

    const mainClass = classNames({
      'pt-dark': theme === Themes.DARK
    });

    return (
      <main className={mainClass}>
        <TitleBar />
        {this.props.children}
      </main>
    );
  };

  render() {
    const { checkingForUpdates, isDownloading, showIssueReportingModal } = this.state;

    return (
      <div>
        {/* General Alert */}
        <GenAlert />

        {/* Feedback */}
        <IssueReporter
          showIssueReportingModal={showIssueReportingModal}
          closeFeedback={this.closeFeedback}
        />

        {/* Updating */}
        <OverlaySpinner isOpen={checkingForUpdates || isDownloading}>
          {checkingForUpdates ? 'Checking for updates...' : 'Downloading update...'}
        </OverlaySpinner>

        {this.renderView()}
      </div>
    );
  }
}
