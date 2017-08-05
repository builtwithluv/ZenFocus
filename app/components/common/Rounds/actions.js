import settings from 'electron-settings';
import { ipcRenderer } from 'electron';

import { Phases } from 'enums';

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
  SET_LONG_BREAK_INTERVAL,
  SET_LONG_BREAK_PHASE,
  SET_MINUTES,
  SET_SECONDS,
  SET_SHORT_BREAK_LENGTH,
  SET_TOTAL_ROUNDS
} from 'common/Rounds/types';

import { UPDATE_TRAY_TIMER } from 'channels';

import { getDate } from 'utils/date.util';
import { hasReachedLastRound, twoDigits } from 'utils/countdown-timer.util';
import { triggerNotification } from 'utils/notifications.util';
import { showWindow } from 'utils/windows.util';

import {
  currentPhase as getCurrentPhase,
  currentRound as getCurrentRound,
  focusLength as getFocusLength,
  longBreakInterval as getLongBreakInterval,
  longBreakLength as getLongBreakLength,
  minutes as getMinutes,
  seconds as getSeconds,
  shortBreakLength as getShortBreakLength,
  totalRounds as getTotalRounds,
} from 'selectors/rounds.selectors';

import { setElectronSettings } from 'components/App/actions';
import { openGeneralAlert } from 'common/GeneralAlerts/actions';
import { pause, resume } from 'common/MediaControls/actions';

export const goToNextPhase = () => (dispatch, getState) => {
  const state = getState();
  const currentPhase = getCurrentPhase(state);
  const currentRound = getCurrentRound(state);
  const focusLength = getFocusLength(state);
  const lbi = getLongBreakInterval(state);
  const lbl = getLongBreakLength(state);
  const mins = getMinutes(state);
  const secs = getSeconds(state);
  const sbl = getShortBreakLength(state);
  const totalRounds = getTotalRounds(state);

  const { continuousMode } = state.app;
  if (continuousMode) {
    showWindow();
    dispatch(pause());
    dispatch(
      openGeneralAlert(
        'Move on to next phase?',
        () => dispatch(resume()),
        {
          cancelText: 'Cancel'
        }
      )
    );
  }

  const date = getDate();
  const data = settings.get('chart', []);
  const isCompact = settings.get('system.compact');
  let record = data.find(d => d.date === date);

  if (!record) {
    const newRecord = { date };
    data.push(newRecord);
    record = newRecord;
  }

  switch (currentPhase) {
    case Phases.FOCUS: {
      record.focusLength =
        (record.focusLength || 0) + (secs < 30 ? focusLength - mins : 0);

      if (!hasReachedLastRound(currentPhase, currentRound, totalRounds)) {
        if (currentRound % lbi === 0) dispatch(setLongBreakPhase());
        else dispatch(setBreakPhase());
        if (!isCompact) triggerNotification(currentPhase);
      } else {
        record.rounds = (record.rounds || 0) + 1;
        dispatch(incrementRound());
      }

      dispatch(setElectronSettings('chart', data));
      break;
    }

    case Phases.SHORT_BREAK: {
      record.shortBreakLength =
        (record.shortBreakLength || 0) + (secs < 30 ? sbl - mins : 0);
      record.rounds = (record.rounds || 0) + 1;

      dispatch(setElectronSettings('chart', data));

      if (!hasReachedLastRound(currentPhase, currentRound, totalRounds)) {
        dispatch(setFocusPhase());
        dispatch(incrementRound());
        if (!isCompact) triggerNotification(currentPhase);
      }

      break;
    }

    case Phases.LONG_BREAK: {
      record.longBreakLength =
        (record.lengthBreakLength || 0) + (secs < 30 ? lbl - mins : 0);
      record.rounds = (record.rounds || 0) + 1;

      dispatch(setElectronSettings('chart', data));

      if (!hasReachedLastRound(currentPhase, currentRound, totalRounds)) {
        dispatch(setFocusPhase());
        dispatch(incrementRound());
        if (!isCompact) triggerNotification(currentPhase);
      }

      break;
    }

    default: {
      return null;
    }
  }
};

export const incrementRound = () => ({
  type: INCREMENT_ROUND
});

export const loadRoundsData = data => ({
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

export const setFocusLength = length => ({
  type: SET_FOCUS_LENGTH,
  length
});

export const setFocusPhase = () => ({
  type: SET_FOCUS_PHASE
});

export const setLongBreakLength = length => ({
  type: SET_LONG_BREAK_LENGTH,
  length
});

export const setLongBreakInterval = interval => ({
  type: SET_LONG_BREAK_INTERVAL,
  interval
});

export const setLongBreakPhase = () => ({
  type: SET_LONG_BREAK_PHASE
});

export const setMinutes = minutes => ({
  type: SET_MINUTES,
  minutes
});

export const setSeconds = seconds => (dispatch, getState) => {
  const state = getState();
  const minutes = getMinutes(state);
  ipcRenderer.send(UPDATE_TRAY_TIMER, `${minutes}:${twoDigits(seconds)}`);
  dispatch({
    type: SET_SECONDS,
    seconds
  });
};

export const setShortBreakLength = length => ({
  type: SET_SHORT_BREAK_LENGTH,
  length
});

export const setTotalRounds = rounds => ({
  type: SET_TOTAL_ROUNDS,
  rounds
});
