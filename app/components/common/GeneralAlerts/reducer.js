import { Intent } from '@blueprintjs/core';
import { CLOSE_GENERAL_ALERT, OPEN_GENERAL_ALERT } from './types';

const initialState = {
  cancelText: null,
  confirmText: 'OK',
  intent: Intent.DANGER,
  isOpen: false,
  message: '',
  onConfirm: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CLOSE_GENERAL_ALERT: {
      return { ...initialState };
    }

    case OPEN_GENERAL_ALERT: {
      const { message, opts, onConfirm } = action;
      return {
        ...state,
        message,
        onConfirm,
        cancelText: opts.cancelText || null,
        confirmText: opts.confirmText || state.confirmText,
        intent: opts.intent || state.intent,
        isOpen: true
      };
    }

    default: {
      return state;
    }
  }
};
