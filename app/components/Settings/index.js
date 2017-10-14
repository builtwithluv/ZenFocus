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
  currentPhase,
  focusLength,
  longBreakInterval,
  longBreakLength,
  shortBreakLength,
  totalRounds,
} from 'selectors/rounds.selectors';
import {
  isPlaying,
} from 'selectors/mediaControls.selectors';

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
  setTimer,
} from 'common/Rounds/actions';
import {
  toggleAudioPhase,
  toggleAudioTick,
} from 'common/Sounds/actions';

import Settings from 'components/Settings/settings';

const mapStateToProps = state => ({
  audioPhaseDisabled: audioPhaseDisabled(state),
  audioTickDisabled: audioTickDisabled(state),
  currentPhase: currentPhase(state),
  focusLength: focusLength(state),
  isPlaying: isPlaying(state),
  longBreakInterval: longBreakInterval(state),
  longBreakLength: longBreakLength(state),
  minimizeToTray: minimizeToTray(state),
  notificationType: notificationType(state),
  continuousMode: state.app.continuousMode,
  shortBreakLength: shortBreakLength(state),
  theme: getTheme(state),
  totalRounds: totalRounds(state),
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
  setTimer: ms => dispatch(setTimer(ms)),
  setTotalRounds: rounds => dispatch(setTotalRounds(rounds)),
  toggleAudioPhase: () => dispatch(toggleAudioPhase()),
  toggleAudioTick: () => dispatch(toggleAudioTick()),
  toggleMinimizeToTray: () => dispatch(toggleMinimizeToTray())
});

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
