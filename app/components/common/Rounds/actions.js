import settings from 'electron-settings';
import {
  setElectronSettings
} from '../../../actions';
import {
  getDate
} from '../../../utils/date.util';
import {
  hasReachedLastRound
} from '../../../utils/countdown-timer.util';
import {
  INCREMENT_ROUND,
  LOAD_ROUNDS_DATA,
  RESET_ROUND,
  RESET_SESSION,
  RESET_TIMER,
  SET_BREAK_PHASE,
  SET_FOCUS_LENGTH,
  SET_FOCUS_PHASE,
  SET_LONG_BREAK_LENGTH,
  SET_LONG_BREAK_PHASE,
  SET_MINUTES,
  SET_SECONDS,
  SET_SHORT_BREAK_LENGTH,
  SET_TOTAL_ROUNDS
} from './types';

export const goToNextPhase = () => (dispatch, getState) => {
  const state = getState();
  const {
    currentPhase,
    currentRound,
    focusLength,
    longBreakInterval: lbi,
    longBreakLength: lbl,
    minutes: mins,
    seconds: secs,
    shortBreakLength: sbl,
    totalRounds
  } = state.rounds;

  const date = getDate();
  const data = settings.get('chart', []);
  let record = data.find((d) => d.date === date);

  if (!record) {
    const newRecord = { date };
    data.push(newRecord);
    record = newRecord;
  }

  if (currentPhase === 0) {
    record.focusLength = (record.focusLength || 0) + (secs < 30 ? focusLength - mins : 0);

    if (!hasReachedLastRound(currentPhase, currentRound, totalRounds)) {
      dispatch(setBreakPhase());
    } else {
      record.rounds = (record.rounds || 0) + 1;
      dispatch(incrementRound());
    }

    dispatch(setElectronSettings('chart', data, { prettify: true }));
  } else if (currentPhase === 1) {
    record.shortBreakLength = (record.shortBreakLength || 0) + (secs < 30 ? sbl - mins : 0);

    if (currentRound % lbi !== 0) {
      record.rounds = (record.rounds || 0) + 1;
    }

    dispatch(setElectronSettings('chart', data, { prettify: true }));

    if (!hasReachedLastRound(currentPhase, currentRound, totalRounds)) {
      if (currentRound % lbi === 0) dispatch(setLongBreakPhase());
      else {
        dispatch(setFocusPhase());
        dispatch(incrementRound());
      }
    }
  } else {
    record.longBreakLength = (record.lengthBreakLength || 0) + (secs < 30 ? lbl - mins : 0);
    record.rounds = (record.rounds || 0) + 1;

    dispatch(setElectronSettings('chart', data, { prettify: true }));

    if (!hasReachedLastRound(currentPhase, currentRound, totalRounds)) {
      dispatch(setFocusPhase());
      dispatch(incrementRound());
    }
  }
};

export const incrementRound = () => ({
  type: INCREMENT_ROUND
});

export const loadRoundsData = (data) => ({
  type: LOAD_ROUNDS_DATA,
  data
});

export const resetRound = () => ({
  type: RESET_ROUND
});

export const resetSession = () => ({
  type: RESET_SESSION
});

export const resetTimer = () => ({
  type: RESET_TIMER
});

export const setBreakPhase = () => ({
  type: SET_BREAK_PHASE
});

export const setFocusLength = (length) => ({
  type: SET_FOCUS_LENGTH,
  length
});

export const setFocusPhase = () => ({
  type: SET_FOCUS_PHASE
});

export const setLongBreakLength = (length) => ({
  type: SET_LONG_BREAK_LENGTH,
  length
});

export const setLongBreakPhase = () => ({
  type: SET_LONG_BREAK_PHASE
});

export const setMinutes = (minutes) => ({
  type: SET_MINUTES,
  minutes
});

export const setSeconds = (seconds) => ({
  type: SET_SECONDS,
  seconds
});

export const setShortBreakLength = (length) => ({
  type: SET_SHORT_BREAK_LENGTH,
  length
});

export const setTotalRounds = (rounds) => ({
  type: SET_TOTAL_ROUNDS,
  rounds
});
