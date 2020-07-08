import { SORT_FROM_A_TO_Z, SORT_FROM_Z_TO_A, RESET_SORT } from '../actions/actionTypes';

const initialState = {
  sortedData: [],
  sortInfo: {},
  isSorted: false,
};

const sortReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SORT_FROM_A_TO_Z:
    case SORT_FROM_Z_TO_A:
      const { sortedData, sortInfo } = payload;
      return { ...state, isSorted: true, sortedData, sortInfo };
    case RESET_SORT:
      return { ...initialState };
    default:
      return state;
  }
};

export default sortReducer;
