import {
  CLOSE_GENERAL_ALERT,
  OPEN_GENERAL_ALERT
} from './types';

export const closeGeneralAlert = () => ({
  type: CLOSE_GENERAL_ALERT
});

export const openGeneralAlert = (message, onConfirm, opts = {}) => ({
  type: OPEN_GENERAL_ALERT,
  opts,
  message,
  onConfirm
});
