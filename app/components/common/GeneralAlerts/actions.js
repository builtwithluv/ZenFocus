import { toggleCompactMode } from '../../../containers/actions';
import { CLOSE_GENERAL_ALERT, OPEN_GENERAL_ALERT } from './types';

export const closeGeneralAlert = () => ({
  type: CLOSE_GENERAL_ALERT
});

export const openGeneralAlert = (message, onConfirm, opts = {}) => (
  dispatch,
  getState
) => {
  const { app: { compact } } = getState();

  if (compact) dispatch(toggleCompactMode());

  dispatch({
    type: OPEN_GENERAL_ALERT,
    opts,
    message,
    onConfirm
  });
};
