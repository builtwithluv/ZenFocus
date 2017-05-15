import { connect } from 'react-redux';
import CountdownTimer from './countdown-timer';

const mapStateToProps = (state) => ({
  timer: state.countdowntimer
});

export default connect(mapStateToProps)(CountdownTimer);
