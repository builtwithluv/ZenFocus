import { connect } from 'react-redux';
import CountdownTimer from './countdown-timer';

import {
  goToNextPhase,
  resetTimer,
  setMinutes,
  setSeconds
} from '../Rounds/actions';

const mapStateToProps = (state) => ({
  currentPhase: state.rounds.currentPhase,
  currentRound: state.rounds.currentRound,
  minutes: state.rounds.minutes,
  seconds: state.rounds.seconds,
  totalRounds: state.rounds.totalRounds
});

const mapDispatchToProps = (dispatch) => ({
  goToNextPhase: () => dispatch(goToNextPhase()),
  resetTimer: () => dispatch(resetTimer()),
  setMinutes: (minutes) => dispatch(setMinutes(minutes)),
  setSeconds: (seconds) => dispatch(setSeconds(seconds))
});

export default connect(mapStateToProps, mapDispatchToProps)(CountdownTimer);
