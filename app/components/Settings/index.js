import { connect } from 'react-redux';
import Settings from './settings';

import {
  setFocusLength,
  setLongBreakInterval,
  setLongBreakLength,
  setShortBreakLength,
  setTotalRounds
} from '../common/Rounds/actions';

import {
  setAppSettings,
  setAudioOff,
  setAudioOn,
  setElectronSettings,
  setTheme
} from '../../containers/actions';

const mapStateToProps = state => ({
  audioDisabled: state.app.audioDisabled,
  focusLength: state.rounds.focusLength,
  longBreakInterval: state.rounds.longBreakInterval,
  longBreakLength: state.rounds.longBreakLength,
  shortBreakLength: state.rounds.shortBreakLength,
  theme: state.app.theme,
  totalRounds: state.rounds.totalRounds
});

const mapDispatchToProps = dispatch => ({
  setAppSettings: data => dispatch(setAppSettings(data)),
  setAudioOff: () => dispatch(setAudioOff()),
  setAudioOn: () => dispatch(setAudioOn()),
  setElectronSettings: (keyPath, val, opts) =>
    dispatch(setElectronSettings(keyPath, val, opts)),
  setFocusLength: len => dispatch(setFocusLength(len)),
  setLongBreakInterval: interval => dispatch(setLongBreakInterval(interval)),
  setLongBreakLength: len => dispatch(setLongBreakLength(len)),
  setShortBreakLength: len => dispatch(setShortBreakLength(len)),
  setTheme: theme => dispatch(setTheme(theme)),
  setTotalRounds: rounds => dispatch(setTotalRounds(rounds))
});

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
