import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import Settings from './settings';

import {
  setFocusLength,
  setLongBreakLength,
  setShortBreakLength,
  setTotalRounds
} from '../common/Rounds/actions';

import {
  setElectronSettings
} from '../../actions';

const mapStateToProps = (state) => ({
  focusLength: state.rounds.focusLength,
  longBreakLength: state.rounds.longBreakLength,
  shortBreakLength: state.rounds.shortBreakLength,
  totalRounds: state.rounds.totalRounds
});

const mapDispatchToProps = (dispatch) => ({
  goToMain: () => dispatch(push('/')),
  setElectronSettings: (keyPath, val, opts) => dispatch(setElectronSettings(keyPath, val, opts)),
  setFocusLength: (len) => dispatch(setFocusLength(len)),
  setLongBreakLength: (len) => dispatch(setLongBreakLength(len)),
  setShortBreakLength: (len) => dispatch(setShortBreakLength(len)),
  setTotalRounds: (rounds) => dispatch(setTotalRounds(rounds))
});

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
