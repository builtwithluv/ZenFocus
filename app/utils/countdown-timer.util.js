export const getSecondsFromPhase = (min, sec, fl, lbl, sbl, cp) => {
  if (cp === 0) return fl * 60;
  else if (cp === 1) return sbl * 60;
  return lbl * 60;
};

export const hasReachedEnd = (currentPhase, currentRound, minutes, seconds, totalRounds) => (
  currentRound >= totalRounds &&
  minutes === 0 &&
  seconds === 0 &&
  currentPhase >= 0
);

export const hasReachedLastRound = (currentPhase, currentRound, totalRounds) => (
  currentRound >= totalRounds && currentPhase >= 0
);

export const twoDigits = (n) => {
  if (n < 10) return `0${n}`;
  return n;
};
