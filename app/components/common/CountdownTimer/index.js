import { connect } from 'react-redux';
import CountdownTimer from './countdown-timer';

const mapStateToProps = (state) => ({
  currentPhase: state.rounds.currentPhase,
  focusLength: state.rounds.focusLength,
  minutes: state.rounds.minutes,
  longBreakLength: state.rounds.longBreakLength,
  seconds: state.rounds.seconds,
  shortBreakLength: state.rounds.shortBreakLength
});

export default connect(mapStateToProps)(CountdownTimer);
