import { connect } from 'react-redux';
import MiniView from './mini-view';

const mapStateToProps = state => ({
  currentPhase: state.rounds.currentPhase,
  minutes: state.rounds.minutes,
  seconds: state.rounds.seconds
});

export default connect(mapStateToProps)(MiniView);
