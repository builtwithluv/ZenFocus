import { connect } from 'react-redux';
import CountdownTimer from './countdown-timer';
import {
  pause,
  resume
} from './actions';
import {
  goToNextPhase,
  resetTimer,
  setMinutes,
  setSeconds
} from '../Rounds/actions';
import {
  openGeneralAlert
} from '../GeneralAlerts/actions';

const mapStateToProps = (state) => ({
  audioDisabled: state.app.audioDisabled,
  audioSelection: state.app.audioSelection,
  currentPhase: state.rounds.currentPhase,
  currentRound: state.rounds.currentRound,
  focusLength: state.rounds.focusLength,
  isPlaying: state.countdowntimer.isPlaying,
  minutes: state.rounds.minutes,
  longBreakLength: state.rounds.longBreakLength,
  seconds: state.rounds.seconds,
  shortBreakLength: state.rounds.shortBreakLength,
  totalRounds: state.rounds.totalRounds
});

const mapDispatchToProps = (dispatch) => ({
  goToNextPhase: () => dispatch(goToNextPhase()),
  openGeneralAlert: (msg, onConfirm) => dispatch(openGeneralAlert(msg, onConfirm)),
  pause: () => dispatch(pause()),
  resetTimer: () => dispatch(resetTimer()),
  resume: () => dispatch(resume()),
  setMinutes: (minutes) => dispatch(setMinutes(minutes)),
  setSeconds: (seconds) => dispatch(setSeconds(seconds))
});

export default connect(mapStateToProps, mapDispatchToProps)(CountdownTimer);
