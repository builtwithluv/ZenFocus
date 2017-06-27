import { connect } from 'react-redux';
import Settings from './settings';
import {
  setFocusLength,
  setLongBreakInterval,
  setLongBreakLength,
  setShortBreakLength,
  setTotalRounds,
  setMinutes,
  setSeconds
} from '../common/Rounds/actions';
import {
  setAudio,
  setAppSettings,
  setElectronSettings,
  setNotificationType,
  setTheme,
  toggleAudioPhase,
  toggleAudioTick,
  toggleMinimizeToTray
} from '../actions';

const mapStateToProps = state => ({
  audioPhaseDisabled: state.app.audioPhaseDisabled,
  audioSelection: state.app.audioSelection,
  audioTickDisabled: state.app.audioTickDisabled,
  currentPhase: state.rounds.currentPhase,
  focusLength: state.rounds.focusLength,
  longBreakInterval: state.rounds.longBreakInterval,
  longBreakLength: state.rounds.longBreakLength,
  minimizeToTray: state.app.minimizeToTray,
  notificationType: state.app.notificationType,
  shortBreakLength: state.rounds.shortBreakLength,
  theme: state.app.theme,
  totalRounds: state.rounds.totalRounds
});

const mapDispatchToProps = dispatch => ({
  setAudio: sel => dispatch(setAudio(sel)),
  setAppSettings: data => dispatch(setAppSettings(data)),
  setElectronSettings: (keyPath, val, opts) =>
    dispatch(setElectronSettings(keyPath, val, opts)),
  setFocusLength: len => dispatch(setFocusLength(len)),
  setLongBreakInterval: interval => dispatch(setLongBreakInterval(interval)),
  setLongBreakLength: len => dispatch(setLongBreakLength(len)),
  setNotificationType: notType => dispatch(setNotificationType(notType)),
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
