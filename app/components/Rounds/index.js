import { connect } from 'react-redux';
import Rounds from './rounds';

const mapStateToProps = (state) => ({
  currentRound: state.rounds.currentRound,
  rounds: state.rounds.rounds
});

export default connect(mapStateToProps)(Rounds);
