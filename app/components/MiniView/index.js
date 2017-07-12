import { connect } from 'react-redux';

import { toggleCompactMode } from 'components/App/actions';

import MiniView from 'components/MiniView/mini-view';

const mapStateToProps = state => ({
  currentPhase: state.rounds.currentPhase,
  minutes: state.rounds.minutes,
  seconds: state.rounds.seconds
});

const mapDispatchToProps = dispatch => ({
  toggleCompactMode: () => dispatch(toggleCompactMode())
});

export default connect(mapStateToProps, mapDispatchToProps)(MiniView);
