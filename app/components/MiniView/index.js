import { connect } from 'react-redux';
import MiniView from './mini-view';
import { toggleCompactMode } from '../../containers/actions';

const mapStateToProps = state => ({
  currentPhase: state.rounds.currentPhase,
  minutes: state.rounds.minutes,
  seconds: state.rounds.seconds
});

const mapDispatchToProps = dispatch => ({
  toggleCompactMode: () => dispatch(toggleCompactMode())
});

export default connect(mapStateToProps, mapDispatchToProps)(MiniView);
