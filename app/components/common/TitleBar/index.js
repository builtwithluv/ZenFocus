import { connect } from 'react-redux';

import { minutes, seconds } from 'selectors/rounds.selectors';

import {
  goToHome,
  goToCharts,
  goToLibrary,
  goToSettings
} from 'components/App/actions';

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
  goToLibrary: () => dispatch(goToLibrary()),
  goToSettings: () => dispatch(goToSettings())
});

export default connect(mapStateFromProps, mapDispatchToProps)(TitleBar);
