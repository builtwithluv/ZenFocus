import { connect } from 'react-redux';
import Main from './main';

const mapStateToProps = (state) => ({
  currentPhase: state.rounds.currentPhase
});

export default connect(mapStateToProps)(Main);
