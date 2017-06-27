import { hasReachedEnd } from '../../utils/countdown-timer.util';
import { getAllSounds } from '../../utils/sounds.util';
import { goToNextPhase, setMinutes, setSeconds } from '../Rounds/actions';
import { PAUSE, RESUME } from './types';
import { Sounds } from '../../enums';

const sounds = getAllSounds();

let ticker = null;

export const pause = () => {
  clearInterval(ticker);
  return { type: PAUSE };
};

export const resume = () => (dispatch, getState) => {
  const { rounds } = getState();
  const { currentPhase, currentRound, minutes, seconds, totalRounds } = rounds;
  const end = hasReachedEnd(
    currentPhase,
    currentRound,
    minutes,
    seconds,
    totalRounds
  );
  if (end) return;
  ticker = setInterval(() => tick(dispatch, getState), 1000);
  return dispatch({ type: RESUME });
};

export const tick = (dispatch, getState) => {
  const { app, rounds } = getState();
  const { audioPhaseDisabled, audioTickDisabled, audioSelection } = app;
  const { currentPhase, currentRound, minutes, seconds, totalRounds } = rounds;

  const audio = sounds[audioSelection];

  if (seconds > 0) {
    dispatch(setSeconds(seconds - 1));
    if (!audioTickDisabled) audio.play();
  } else if (minutes > 0) {
    dispatch(setMinutes(minutes - 1));
    dispatch(setSeconds(59));
    if (!audioTickDisabled) audio.play();
  } else {
    const end = hasReachedEnd(
      currentPhase,
      currentRound,
      minutes,
      seconds,
      totalRounds
    );
    if (!audioPhaseDisabled) sounds[Sounds.CORSICA_DING].play();
    if (end) dispatch(pause());
    dispatch(goToNextPhase());
  }
};
