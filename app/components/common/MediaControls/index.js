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
import { tickSounds } from '../../selectors/sounds.selectors';

const mapStateToProps = state => ({
  currentPhase: state.rounds.currentPhase,
  currentRound: state.rounds.currentRound,
  isPlaying: state.mediaControls.isPlaying,
  tickSounds: tickSounds(state),
  totalRounds: state.rounds.totalRounds
});

const mapDispatchToProps = dispatch => ({
  goToNextPhase: () => dispatch(goToNextPhase()),
  openGeneralAlert: (msg, onConfirm, opts) =>
    dispatch(openGeneralAlert(msg, onConfirm, opts)),
  pause: (ticks) => dispatch(pause(ticks)),
  resetTimer: () => dispatch(resetTimer()),
  resume: (ticks) => dispatch(resume(ticks)),
  setMinutes: minutes => dispatch(setMinutes(minutes)),
  setSeconds: seconds => dispatch(setSeconds(seconds))
});

export default connect(mapStateToProps, mapDispatchToProps)(MediaControls);
