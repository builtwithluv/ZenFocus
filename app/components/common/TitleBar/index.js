import { connect } from 'react-redux';
import TitleBar from './title-bar';
import {
  goToHome,
  goToCharts,
  goToSettings
} from '../../actions';

const mapStateFromProps = state => ({
  currentPhase: state.rounds.currentPhase,
  minutes: state.rounds.minutes,
  route: state.router.location.pathname,
  seconds: state.rounds.seconds
});

const mapDispatchToProps = dispatch => ({
  goToHome: () => dispatch(goToHome()),
  goToCharts: () => dispatch(goToCharts()),
  goToSettings: () => dispatch(goToSettings())
});

export default connect(mapStateFromProps, mapDispatchToProps)(TitleBar);
