import { connect } from 'react-redux';

import { library } from 'selectors/sounds.selectors';
import {
  currentPhase,
  currentRound,
  totalRounds,
} from 'selectors/rounds.selectors';

import { pause, resume } from 'common/MediaControls/actions';
import { openGeneralAlert } from 'common/GeneralAlerts/actions';
import {
  goToNextPhase,
  resetTimer,
  setMinutes,
  setSeconds
} from 'common/Rounds/actions';

import MediaControls from 'common/MediaControls/media-controls';

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
