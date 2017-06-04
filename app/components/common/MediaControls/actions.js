import { hasReachedEnd } from '../../../utils/countdown-timer.util';
import { getAllSounds } from '../../../utils/sounds.util';
import { goToNextPhase, setMinutes, setSeconds } from '../Rounds/actions';
import { PAUSE, RESUME } from './types';

const sounds = getAllSounds();

let ticker = null;

export const pause = () => {
  clearInterval(ticker);
  return { type: PAUSE };
};

export const resume = () => (dispatch, getState) => {
  const { rounds } = getState();
  const { currentPhase, currentRound, minutes, seconds, totalRounds } = rounds;

  if (hasReachedEnd(currentPhase, currentRound, minutes, seconds, totalRounds))
    return;

  ticker = setInterval(() => tick(dispatch, getState), 1000);

  return dispatch({ type: RESUME });
};

export const tick = (dispatch, getState) => {
  const { app, rounds } = getState();
  const { audioDisabled, audioSelection } = app;
  const { currentPhase, currentRound, minutes, seconds, totalRounds } = rounds;

  const audio = sounds[audioSelection];

  if (seconds > 0) {
    dispatch(setSeconds(seconds - 1));
    if (!audioDisabled) audio.play();
  } else if (minutes > 0) {
    dispatch(setMinutes(minutes - 1));
    dispatch(setSeconds(59));
    if (!audioDisabled) audio.play();
  } else {
    sounds[sounds.length - 1].play();
    if (
      hasReachedEnd(currentPhase, currentRound, minutes, seconds, totalRounds)
    )
      dispatch(pause());
    dispatch(goToNextPhase());
  }
};
