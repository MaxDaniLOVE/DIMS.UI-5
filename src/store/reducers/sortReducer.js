/* eslint-disable no-case-declarations */
import { SORT_DATA, RESET_SORT, FILTER_DATA, RESET_FILTER } from '../actions/actionTypes';

const initialState = {
  sortedData: [],
  sortInfo: {},
  isSorted: false,
  isFiltered: false,
  filteredData: [],
  filterInfo: {},
  settedFilters: {},
};

const sortReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SORT_DATA:
      const { sortedData, sortInfo } = payload;
      return { ...state, isSorted: true, sortedData, sortInfo };
    case RESET_SORT:
      return { ...initialState };
    case FILTER_DATA:
      return { ...state, isFiltered: true, settedFilters: payload.settedFilters, filteredData: payload.filteredData };
    case RESET_FILTER:
      const { settedFilters } = payload;
      return { ...state, isFiltered: false, filterInfo: payload.filterInfo, settedFilters, filteredData: [] };
    default:
      return state;
  }
};

export default sortReducer;
