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

const mapStateToProps = (state) => ({
  audio: state.app.audioRef,
  audioDisabled: state.app.audioDisabled,
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
  pause: () => dispatch(pause()),
  resetTimer: () => dispatch(resetTimer()),
  resume: () => dispatch(resume()),
  setMinutes: (minutes) => dispatch(setMinutes(minutes)),
  setSeconds: (seconds) => dispatch(setSeconds(seconds))
});

export default connect(mapStateToProps, mapDispatchToProps)(CountdownTimer);
