import { connect } from 'react-redux';

import { library } from 'selectors/sounds.selectors';
import {
  currentPhase,
  currentRound,
  focusLength,
  longBreakLength,
  minutes,
  seconds,
  shortBreakLength,
  totalRounds,
} from 'selectors/rounds.selectors';

import { pause, resume } from 'common/MediaControls/actions';
import {
  goToNextPhase,
  resetTimer,
  setMinutes,
  setSeconds
} from 'common/Rounds/actions';
import { openGeneralAlert } from 'common/GeneralAlerts/actions';

import CountdownTimer from 'common/CountdownTimer/countdown-timer';

const mapStateToProps = state => ({
  currentPhase: currentPhase(state),
  currentRound: currentRound(state),
  focusLength: focusLength(state),
  library: library(state),
  isPlaying: state.mediaControls.isPlaying,
  minutes: minutes(state),
  longBreakLength: longBreakLength(state),
  seconds: seconds(state),
  shortBreakLength: shortBreakLength(state),
  totalRounds: totalRounds(state)
});

const mapDispatchToProps = dispatch => ({
  goToNextPhase: () => dispatch(goToNextPhase()),
  openGeneralAlert: (msg, onConfirm, opts) =>
    dispatch(openGeneralAlert(msg, onConfirm, opts)),
  pause: () => dispatch(pause()),
  resetTimer: () => dispatch(resetTimer()),
  resume: () => dispatch(resume()),
  setMinutes: mins => dispatch(setMinutes(mins)),
  setSeconds: secs => dispatch(setSeconds(secs))
});

export default connect(mapStateToProps, mapDispatchToProps)(CountdownTimer);
