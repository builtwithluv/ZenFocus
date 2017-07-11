import { connect } from 'react-redux';

import { minutes, seconds } from 'common/Rounds/rounds.selectors';

import {
  goToHome,
  goToCharts,
  goToSettings
} from 'App/actions';

import TitleBar from 'common/TitleBar/title-bar';

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
