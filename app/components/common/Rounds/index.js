import { connect } from 'react-redux';
import Rounds from './rounds';

const mapStateToProps = state => ({
  currentPhase: state.rounds.currentPhase,
  currentRound: state.rounds.currentRound,
  totalRounds: state.rounds.totalRounds
});

export default connect(mapStateToProps)(Rounds);
