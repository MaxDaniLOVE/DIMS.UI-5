/* eslint-disable no-case-declarations */
import { SORT_DATA, RESET_SORT, FILTER_DATA, RESET_FILTER, COMBINE_SORT_AND_FILTER } from '../actions/actionTypes';

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
  sortedAndFilteredData: [],
};

const sortReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SORT_DATA:
      const { sortedData, sortInfo } = payload;
      return { ...state, isSorted: true, sortedData, sortInfo };
    case RESET_SORT:
      return { ...state, ...sortInititalState, sortedAndFilteredData: [] };
    case FILTER_DATA:
      const { filteredData, filterInfo } = payload;
      return { ...state, isFiltered: true, filteredData, filterInfo };
    case RESET_FILTER:
      return { ...state, ...filterInitialState, filterInfo: payload, sortedAndFilteredData: [] };
    case COMBINE_SORT_AND_FILTER:
      const { sortedAndFilteredData } = payload;
      return { ...state, sortedAndFilteredData, filterInfo: payload.filterInfo, sortInfo: payload.sortInfo };
    default:
      return state;
  }
};

export default sortReducer;
