import { SORT_FROM_A_TO_Z, SORT_FROM_Z_TO_A } from '../actions/actionTypes';

const initialState = {
  sortedData: [],
  sortInfo: {},
  isSorted: false,
};

const sortReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SORT_FROM_A_TO_Z:
    case SORT_FROM_Z_TO_A:
      return { ...state, isSorted: true, sortedData: payload };
    default:
      return state;
  }
};

export default sortReducer;
