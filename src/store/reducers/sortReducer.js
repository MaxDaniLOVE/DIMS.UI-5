/* eslint-disable no-case-declarations */
import { SORT_DATA, RESET_SORT, FILTER_DATA, SET_FILTER } from '../actions/actionTypes';

const sortInititalState = {
  sortedData: [],
  sortInfo: {},
  isSorted: false,
};

const filterInitialState = {
  isFiltered: false,
  filteredData: [],
  filterInfo: {},
  settedFilters: {},
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
      return { ...state, isFiltered: true, settedFilters: payload.settedFilters, filteredData: payload.filteredData };
    case SET_FILTER:
      const { settedFilters } = payload;
      return { ...state, isFiltered: false, filterInfo: payload.filterInfo, settedFilters, filteredData: [] };
    default:
      return state;
  }
};

export default sortReducer;
