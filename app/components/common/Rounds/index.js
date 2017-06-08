import { connect } from 'react-redux';
import Rounds from './rounds';
import { resetRound, resetSession } from './actions';

const mapStateToProps = state => ({
  currentPhase: state.rounds.currentPhase,
  currentRound: state.rounds.currentRound,
  totalRounds: state.rounds.totalRounds
});

const mapDispatchToProps = dispatch => ({
  resetRound: () => dispatch(resetRound()),
  resetSession: () => dispatch(resetSession())
});

export default connect(mapStateToProps, mapDispatchToProps)(Rounds);
