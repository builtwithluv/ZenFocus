import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import App from './App';
import {
  setAppSettings,
  setElectronSettings,
  setTheme
} from './actions';
import {
  loadRoundsData,
  resetRound,
  resetSession
} from '../components/common/Rounds/actions';
import {
  openGeneralAlert
} from '../components/common/GeneralAlerts/actions';

const mapStateToProps = (state) => ({
  showWelcomeSlides: state.app.showWelcomeSlides,
  theme: state.app.theme
});

const mapDispatchToProps = (dispatch) => ({
  loadRoundsData: (data) => dispatch(loadRoundsData(data)),
  openGeneralAlert: (msg, onConfirm, opts) => dispatch(openGeneralAlert(msg, onConfirm, opts)),
  pushRoute: (route) => dispatch(push(route)),
  resetRound: () => dispatch(resetRound()),
  resetSession: () => dispatch(resetSession()),
  setAppSettings: (data) => dispatch(setAppSettings(data)),
  setElectronSettings: (keypath, val) => dispatch(setElectronSettings(keypath, val)),
  setTheme: (theme) => dispatch(setTheme(theme))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
