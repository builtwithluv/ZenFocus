import { connect } from 'react-redux';

import {
  customNotification,
  minimizeToTray,
  notificationType,
  theme as getTheme,
} from 'selectors/app.selectors';
import {
  audioPhaseDisabled,
  audioTickDisabled,
  library,
  soundFocusPhase,
  soundShortBreakPhase,
  soundLongBreakPhase,
  soundPhaseEnded,
  tickSounds,
} from 'selectors/sounds.selectors';

import {
  setAppSettings,
  setElectronSettings,
  setNotificationType,
  setCustomNotification,
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
  addSound,
  removeSound,
  setAudio,
  toggleAudioPhase,
  toggleAudioTick,
} from 'common/Sounds/actions';
import { openGeneralAlert } from 'common/GeneralAlerts/actions';

import Settings from 'components/Settings/settings';

const mapStateToProps = state => ({
  audioPhaseDisabled: audioPhaseDisabled(state),
  audioTickDisabled: audioTickDisabled(state),
  currentPhase: state.rounds.currentPhase,
  focusLength: state.rounds.focusLength,
  library: library(state),
  longBreakInterval: state.rounds.longBreakInterval,
  longBreakLength: state.rounds.longBreakLength,
  minimizeToTray: minimizeToTray(state),
  notificationType: notificationType(state),
  customNotification: customNotification(state),
  continuousMode: state.app.continuousMode,
  shortBreakLength: state.rounds.shortBreakLength,
  soundFocusPhase: soundFocusPhase(state),
  soundShortBreakPhase: soundShortBreakPhase(state),
  soundLongBreakPhase: soundLongBreakPhase(state),
  soundPhaseEnded: soundPhaseEnded(state),
  tickSounds: tickSounds(state),
  theme: getTheme(state),
  totalRounds: state.rounds.totalRounds
});

const mapDispatchToProps = dispatch => ({
  addSound: (title, src, soundType) => dispatch(addSound(title, src, soundType)),
  openGeneralAlert: (msg, onConfirm, opts) => dispatch(openGeneralAlert(msg, onConfirm, opts)),
  removeSound: id => dispatch(removeSound(id)),
  setAudio: (sel, ...args) => dispatch(setAudio(sel, ...args)),
  setAppSettings: data => dispatch(setAppSettings(data)),
  setElectronSettings: (keyPath, val, opts) =>
    dispatch(setElectronSettings(keyPath, val, opts)),
  setFocusLength: len => dispatch(setFocusLength(len)),
  setLongBreakInterval: interval => dispatch(setLongBreakInterval(interval)),
  setLongBreakLength: len => dispatch(setLongBreakLength(len)),
  setNotificationType: notType => dispatch(setNotificationType(notType)),
  setCustomNotification: obj => dispatch(setCustomNotification(obj)),
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
