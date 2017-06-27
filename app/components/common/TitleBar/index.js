import { connect } from 'react-redux';
import TitleBar from './title-bar';
import {
  goToHome,
  goToCharts,
  goToSettings
} from '../../actions';
import { minutes, seconds } from '../Rounds/rounds.selectors';

const mapStateFromProps = state => ({
  currentPhase: state.rounds.currentPhase,
  minutes: minutes(state),
  route: state.router.location.pathname,
  seconds: seconds(state)
});

const mapDispatchToProps = dispatch => ({
  goToHome: () => dispatch(goToHome()),
  goToCharts: () => dispatch(goToCharts()),
  goToSettings: () => dispatch(goToSettings())
});

export default connect(mapStateFromProps, mapDispatchToProps)(TitleBar);
