import { connect } from 'react-redux';
import CountdownTimer from './countdown-timer';

import {
  incrementRound,
  setBreakPhase,
  setFocusPhase,
  setMinutes,
  setSeconds
} from '../Rounds/actions';

const mapStateToProps = (state) => ({
  currentPhase: state.rounds.currentPhase,
  currentRound: state.rounds.currentRound,
  focusLength: state.rounds.focusLength,
  minutes: state.rounds.minutes,
  seconds: state.rounds.seconds,
  shortBreakLength: state.rounds.shortBreakLength,
  totalRounds: state.rounds.totalRounds
});

const mapDispatchToProps = (dispatch) => ({
  incrementRound: () => dispatch(incrementRound()),
  setBreakPhase: () => dispatch(setBreakPhase()),
  setFocusPhase: () => dispatch(setFocusPhase()),
  setMinutes: (minutes) => dispatch(setMinutes(minutes)),
  setSeconds: (seconds) => dispatch(setSeconds(seconds))
});

export default connect(mapStateToProps, mapDispatchToProps)(CountdownTimer);
