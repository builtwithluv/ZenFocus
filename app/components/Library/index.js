import { connect } from 'react-redux';

import {
  library,
  soundFocusPhase,
  soundShortBreakPhase,
  soundLongBreakPhase,
  soundPhaseEnded,
} from 'selectors/sounds.selectors';

import {
  addSound,
  removeSound,
} from 'common/Sounds/actions';
import { openGeneralAlert } from 'common/GeneralAlerts/actions';

import Library from 'components/Library/library';

const mapStateToProps = state => ({
  library: library(state),
  soundFocusPhase: soundFocusPhase(state),
  soundShortBreakPhase: soundShortBreakPhase(state),
  soundLongBreakPhase: soundLongBreakPhase(state),
  soundPhaseEnded: soundPhaseEnded(state),
});

const mapDispatchToProps = dispatch => ({
  addSound: (title, src, soundType) => dispatch(addSound(title, src, soundType)),
  openGeneralAlert: (msg, onConfirm, opts) => dispatch(openGeneralAlert(msg, onConfirm, opts)),
  removeSound: id => dispatch(removeSound(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Library);
