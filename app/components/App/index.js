import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import { openGeneralAlert } from 'common/GeneralAlerts/actions';
import {
  goToHome,
  goToCharts,
  goToSettings,
  setAppSettings,
  setElectronSettings,
  setTheme,
  toggleCompactMode,
  toggleWelcomeSlides
} from 'components/App/actions';
import {
  loadRoundsData,
  resetSession
} from 'common/Rounds/actions';
import {
  pause,
  resume
} from 'common/MediaControls/actions';

import App from 'components/App/app';

const mapStateToProps = state => ({
  compact: state.app.compact,
  showWelcomeSlides: state.app.showWelcomeSlides,
  theme: state.app.theme
});

const mapDispatchToProps = dispatch => ({
  goToHome: () => dispatch(goToHome()),
  goToCharts: () => dispatch(goToCharts()),
  goToSettings: () => dispatch(goToSettings()),
  loadRoundsData: data => dispatch(loadRoundsData(data)),
  openGeneralAlert: (msg, onConfirm, opts) =>
    dispatch(openGeneralAlert(msg, onConfirm, opts)),
  pause: () => dispatch(pause()),
  pushRoute: route => dispatch(push(route)),
  resetSession: () => dispatch(resetSession()),
  resume: () => dispatch(resume()),
  setAppSettings: data => dispatch(setAppSettings(data)),
  setElectronSettings: (keypath, val) =>
    dispatch(setElectronSettings(keypath, val)),
  setTheme: theme => dispatch(setTheme(theme)),
  toggleCompactMode: () => dispatch(toggleCompactMode()),
  toggleWelcomeSlides: () => dispatch(toggleWelcomeSlides())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
