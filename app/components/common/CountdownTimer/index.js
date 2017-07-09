import { connect } from 'react-redux';
import CountdownTimer from './countdown-timer';
import { pause, resume } from '../MediaControls/actions';
import {
  goToNextPhase,
  resetTimer,
  setMinutes,
  setSeconds
} from '../Rounds/actions';
import { openGeneralAlert } from '../GeneralAlerts/actions';
import {
  currentPhase,
  currentRound,
  focusLength,
  longBreakLength,
  minutes,
  seconds,
  shortBreakLength,
  totalRounds,
} from '../../selectors/rounds.selectors';

const mapStateToProps = state => ({
  currentPhase: currentPhase(state),
  currentRound: currentRound(state),
  focusLength: focusLength(state),
  isPlaying: state.mediaControls.isPlaying,
  minutes: minutes(state),
  longBreakLength: longBreakLength(state),
  seconds: seconds(state),
  shortBreakLength: shortBreakLength(state),
  totalRounds: totalRounds(state)
});

const mapDispatchToProps = dispatch => ({
  goToNextPhase: () => dispatch(goToNextPhase()),
  openGeneralAlert: (msg, onConfirm, opts) =>
    dispatch(openGeneralAlert(msg, onConfirm, opts)),
  pause: (ticks) => dispatch(pause(ticks)),
  resetTimer: () => dispatch(resetTimer()),
  resume: (ticks) => dispatch(resume(ticks)),
  setMinutes: mins => dispatch(setMinutes(mins)),
  setSeconds: secs => dispatch(setSeconds(secs))
});

export default connect(mapStateToProps, mapDispatchToProps)(CountdownTimer);
