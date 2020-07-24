/* eslint-disable no-case-declarations */
import { SORT_DATA, RESET_SORT, FILTER_DATA, RESET_FILTER } from '../actions/actionTypes';

const sortInititalState = {
  sortedData: [],
  sortInfo: {},
  isSorted: false,
};

const filterInitialState = {
  isFiltered: false,
  filteredData: [],
  filterInfo: {},
};

const initialState = {
  ...sortInititalState,
  ...filterInitialState,
};

const sortReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SORT_DATA:
      const { sortedData, sortInfo } = payload;
      return { ...state, isSorted: true, sortedData, sortInfo };
    case RESET_SORT:
      return { ...state, ...sortInititalState };
    case FILTER_DATA:
      const { filteredData, filterInfo } = payload;
      return { ...state, isFiltered: true, filteredData, filterInfo };
    case RESET_FILTER:
      return { ...state, ...filterInitialState, filterInfo: payload };
    default:
      return state;
  }
};

export default sortReducer;
