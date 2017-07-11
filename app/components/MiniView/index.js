import { connect } from 'react-redux';

import { toggleCompactMode } from 'App/actions';

import MiniView from 'MiniView/mini-view';

const mapStateToProps = state => ({
  currentPhase: state.rounds.currentPhase,
  minutes: state.rounds.minutes,
  seconds: state.rounds.seconds
});

const mapDispatchToProps = dispatch => ({
  toggleCompactMode: () => dispatch(toggleCompactMode())
});

export default connect(mapStateToProps, mapDispatchToProps)(MiniView);
