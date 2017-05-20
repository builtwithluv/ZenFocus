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
  audioDisabled: state.app.audioDisabled,
  currentPhase: state.rounds.currentPhase,
  currentRound: state.rounds.currentRound,
  disableSlider: state.countdowntimer.disableSlider,
  isPlaying: state.countdowntimer.isPlaying,
  minutes: state.rounds.minutes,
  seconds: state.rounds.seconds,
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
