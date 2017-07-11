import { LOAD_CHART_DATA } from 'Charts/types';

const initialState = {
  data: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOAD_CHART_DATA: {
      const { data } = action;
      return { ...state, data };
    }

    default: {
      return state;
    }
  }
};
