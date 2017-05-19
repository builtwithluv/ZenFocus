import { connect } from 'react-redux';
import Main from './main-page';

const mapStateToProps = (state) => ({
  currentPhase: state.rounds.currentPhase
});

export default connect(mapStateToProps)(Main);
