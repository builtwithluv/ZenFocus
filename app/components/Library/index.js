import { connect } from 'react-redux';

import {
  library,
  soundFocusPhase,
  soundShortBreakPhase,
  soundLongBreakPhase,
  soundPhaseEnded,
} from 'selectors/sounds.selectors';

import { setElectronSettings } from 'components/App/actions';
import {
  addSound,
  removeSound,
  setAudio
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
  changeSound: (key, id, phase) => {
    dispatch(setAudio(id, phase));
    dispatch(setElectronSettings(key, id));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Library);
