import { connect } from 'react-redux';

import { currentPhase, timer } from 'selectors/rounds.selectors';

import {
  goToHome,
  goToCharts,
  goToLibrary,
  goToSettings
} from 'components/App/actions';

import TitleBar from 'common/TitleBar/title-bar';

const mapStateFromProps = state => ({
  currentPhase: currentPhase(state),
  route: state.router.location.pathname,
  timer: timer(state),
});

const mapDispatchToProps = dispatch => ({
  goToHome: () => dispatch(goToHome()),
  goToCharts: () => dispatch(goToCharts()),
  goToLibrary: () => dispatch(goToLibrary()),
  goToSettings: () => dispatch(goToSettings())
});

export default connect(mapStateFromProps, mapDispatchToProps)(TitleBar);
