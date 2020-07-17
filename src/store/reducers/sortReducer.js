import { SORT_DATA, RESET_SORT } from '../actions/actionTypes';

const initialState = {
  sortedData: [],
  sortInfo: {},
  isSorted: false,
};

const sortReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SORT_DATA:
      const { sortedData, sortInfo } = payload;
      return { ...state, isSorted: true, sortedData, sortInfo };
    case RESET_SORT:
      return { ...initialState };
    default:
      return state;
  }
};

export default sortReducer;
