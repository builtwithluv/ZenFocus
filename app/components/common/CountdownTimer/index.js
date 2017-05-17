import { connect } from 'react-redux';
import CountdownTimer from './countdown-timer';

import {
  incrementRound,
  setBreakPhase,
  setFocusPhase
} from '../Rounds/actions';

const mapStateToProps = (state) => ({
  currentPhase: state.rounds.currentPhase,
  currentRound: state.rounds.currentRound,
  rounds: state.rounds.rounds
});

const mapDispatchToProps = (dispatch) => ({
  incrementRound: () => dispatch(incrementRound()),
  setBreakPhase: () => dispatch(setBreakPhase()),
  setFocusPhase: () => dispatch(setFocusPhase())
});

export default connect(mapStateToProps, mapDispatchToProps)(CountdownTimer);
