import { connect } from 'react-redux';

import { getDefaultSound } from 'utils/sounds.util';

import { currentPhase, timer } from 'selectors/rounds.selectors';
import {
  library,
  soundFocusPhase,
  soundShortBreakPhase,
  soundLongBreakPhase,
  soundPhaseEnded,
} from 'selectors/sounds.selectors';

import {
  goToHome,
  setElectronSettings,
} from 'components/App/actions';
import {
  addSound,
  removeSound,
  setAudio,
} from 'common/Sounds/actions';
import { openGeneralAlert } from 'common/GeneralAlerts/actions';

import TitleBar from 'common/TitleBar/title-bar';

const mapStateFromProps = state => ({
  currentPhase: currentPhase(state),
  defaultSound: getDefaultSound(state),
  library: library(state),
  route: state.router.location.pathname,
  soundFocusPhase: soundFocusPhase(state),
  soundShortBreakPhase: soundShortBreakPhase(state),
  soundLongBreakPhase: soundLongBreakPhase(state),
  soundPhaseEnded: soundPhaseEnded(state),
  timer: timer(state),
});

const mapDispatchToProps = dispatch => ({
  addSound: (title, src, soundType) => dispatch(addSound(title, src, soundType)),
  changeSound: (key, id, phase) => {
    dispatch(setAudio(id, phase));
    dispatch(setElectronSettings(key, id));
  },
  goToHome: () => dispatch(goToHome()),
  openGeneralAlert: (msg, onConfirm, opts) => dispatch(openGeneralAlert(msg, onConfirm, opts)),
  removeSound: (id) => dispatch(removeSound(id)),
});

export default connect(mapStateFromProps, mapDispatchToProps)(TitleBar);
