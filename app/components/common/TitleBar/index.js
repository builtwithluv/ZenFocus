import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import TitleBar from './title-bar';

const mapStateFromProps = state => ({
  currentPhase: state.rounds.currentPhase,
  minutes: state.rounds.minutes,
  route: state.router.location.pathname,
  seconds: state.rounds.seconds
});

const mapDispatchToProps = dispatch => ({
  push: (route) => dispatch(push(route))
});

export default connect(mapStateFromProps, mapDispatchToProps)(TitleBar);
