import { connect } from 'react-redux';

import {
  minimizeToTray,
  notificationType,
  theme as getTheme,
} from 'selectors/app.selectors';
import {
  audioPhaseDisabled,
  audioTickDisabled
} from 'selectors/sounds.selectors';

import {
  setAppSettings,
  setElectronSettings,
  setNotificationType,
  setContinuousMode,
  setTheme,
  toggleMinimizeToTray
} from 'components/App/actions';
import {
  setFocusLength,
  setLongBreakInterval,
  setLongBreakLength,
  setShortBreakLength,
  setTotalRounds,
  setMinutes,
  setSeconds
} from 'common/Rounds/actions';
import {
  toggleAudioPhase,
  toggleAudioTick,
} from 'common/Sounds/actions';

import Settings from 'components/Settings/settings';

const mapStateToProps = state => ({
  audioPhaseDisabled: audioPhaseDisabled(state),
  audioTickDisabled: audioTickDisabled(state),
  currentPhase: state.rounds.currentPhase,
  focusLength: state.rounds.focusLength,
  longBreakInterval: state.rounds.longBreakInterval,
  longBreakLength: state.rounds.longBreakLength,
  minimizeToTray: minimizeToTray(state),
  notificationType: notificationType(state),
  continuousMode: state.app.continuousMode,
  shortBreakLength: state.rounds.shortBreakLength,
  theme: getTheme(state),
  totalRounds: state.rounds.totalRounds
});

const mapDispatchToProps = dispatch => ({
  setAppSettings: data => dispatch(setAppSettings(data)),
  setElectronSettings: (keyPath, val, opts) =>
    dispatch(setElectronSettings(keyPath, val, opts)),
  setFocusLength: len => dispatch(setFocusLength(len)),
  setLongBreakInterval: interval => dispatch(setLongBreakInterval(interval)),
  setLongBreakLength: len => dispatch(setLongBreakLength(len)),
  setNotificationType: notType => dispatch(setNotificationType(notType)),
  setContinuousMode: bool => dispatch(setContinuousMode(bool)),
  setShortBreakLength: len => dispatch(setShortBreakLength(len)),
  setTheme: theme => dispatch(setTheme(theme)),
  setTotalRounds: rounds => dispatch(setTotalRounds(rounds)),
  setMinutes: minutes => dispatch(setMinutes(minutes)),
  setSeconds: seconds => dispatch(setSeconds(seconds)),
  toggleAudioPhase: () => dispatch(toggleAudioPhase()),
  toggleAudioTick: () => dispatch(toggleAudioTick()),
  toggleMinimizeToTray: () => dispatch(toggleMinimizeToTray())
});

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
