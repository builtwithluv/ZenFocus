import { connect } from 'react-redux';
import MediaControls from './media-controls';
import { pause, resume } from './actions';
import {
  goToNextPhase,
  resetTimer,
  setMinutes,
  setSeconds
} from '../Rounds/actions';
import { openGeneralAlert } from '../GeneralAlerts/actions';
import { library } from '../../selectors/sounds.selectors';
import {
  currentPhase,
  currentRound,
  totalRounds,
} from '../../selectors/rounds.selectors';

const mapStateToProps = state => ({
  library: library(state),
  currentPhase: currentPhase(state),
  currentRound: currentRound(state),
  isPlaying: state.mediaControls.isPlaying,
  totalRounds: totalRounds(state),
});

const mapDispatchToProps = dispatch => ({
  goToNextPhase: () => dispatch(goToNextPhase()),
  openGeneralAlert: (msg, onConfirm, opts) =>
    dispatch(openGeneralAlert(msg, onConfirm, opts)),
  pause: () => dispatch(pause()),
  resetTimer: () => dispatch(resetTimer()),
  resume: () => dispatch(resume()),
  setMinutes: minutes => dispatch(setMinutes(minutes)),
  setSeconds: seconds => dispatch(setSeconds(seconds))
});

export default connect(mapStateToProps, mapDispatchToProps)(MediaControls);
