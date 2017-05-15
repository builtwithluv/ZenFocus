import { connect } from 'react-redux';
import CountdownTimer from '../components/CountdownTimer';

const mapStateToProps = (state) => ({
  timer: state.countdowntimer
});

export default connect(mapStateToProps)(CountdownTimer);
