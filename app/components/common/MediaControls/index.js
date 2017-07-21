import { connect } from 'react-redux';

import {
  currentPhase,
  currentRound,
  totalRounds,
} from 'selectors/rounds.selectors';

import { pause, resume, skip } from 'common/MediaControls/actions';
import { openGeneralAlert } from 'common/GeneralAlerts/actions';
import {
  resetTimer,
  setMinutes,
  setSeconds
} from 'common/Rounds/actions';

import MediaControls from 'common/MediaControls/media-controls';

const mapStateToProps = state => ({
  currentPhase: currentPhase(state),
  currentRound: currentRound(state),
  isPlaying: state.mediaControls.isPlaying,
  totalRounds: totalRounds(state),
});

const mapDispatchToProps = dispatch => ({
  openGeneralAlert: (msg, onConfirm, opts) =>
    dispatch(openGeneralAlert(msg, onConfirm, opts)),
  pause: () => dispatch(pause()),
  resetTimer: () => dispatch(resetTimer()),
  resume: () => dispatch(resume()),
  setMinutes: minutes => dispatch(setMinutes(minutes)),
  setSeconds: seconds => dispatch(setSeconds(seconds)),
  skip: () => dispatch(skip()),
});

export default connect(mapStateToProps, mapDispatchToProps)(MediaControls);
