import { Phases } from '../enums';

export const isFocus = phase => phase === Phases.FOCUS;

export const isShortBreak = phase => phase === Phases.SHORT_BREAK;

export const isLongBreak = phase => phase === Phases.LONG_BREAK;
