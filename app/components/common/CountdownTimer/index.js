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
import { minutes, seconds } from '../Rounds/rounds.selectors';
import { tickSounds } from '../../selectors/sounds.selectors';

const mapStateToProps = state => ({
  currentPhase: state.rounds.currentPhase,
  currentRound: state.rounds.currentRound,
  focusLength: state.rounds.focusLength,
  isPlaying: state.mediaControls.isPlaying,
  minutes: minutes(state),
  longBreakLength: state.rounds.longBreakLength,
  seconds: seconds(state),
  shortBreakLength: state.rounds.shortBreakLength,
  tickSounds: tickSounds(state),
  totalRounds: state.rounds.totalRounds
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
