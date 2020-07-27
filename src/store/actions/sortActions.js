import { SORT_DATA, RESET_SORT, FILTER_DATA, RESET_FILTER, COMBINE_SORT_AND_FILTER } from './actionTypes';
import sortHelper from '../../utils/sortHelper';
import filterHelper from '../../utils/filterHelper';
import {
  defaultMembersFilter,
  defaultTasksFilter,
  defaultProgressFilter,
  defaultUserTasksFilter,
} from '../../utils/defaultFiltersData';

const sortData = (sortTableId, id, type, isSkipReseting = false) => {
  return (dispatch, getState) => {
    const {
      data: { [sortTableId]: dataToSort },
      sort: {
        sortInfo: { id: previousId, type: previousType },
        isFiltered,
        filteredData,
        filterInfo,
      },
    } = getState();

    const isResetSort = previousId === id && previousType === type && !isSkipReseting;

    if (isResetSort) {
      return dispatch(resetSort());
    }

    const sortedData = sortHelper(dataToSort, id, type);

    const sortInfo = { type, id };

    if (isFiltered) {
      const sortedAndFilteredData = sortHelper(filteredData, id, type);
      dispatch({ type: COMBINE_SORT_AND_FILTER, payload: { sortedAndFilteredData, filterInfo, sortInfo } });
    }

    return dispatch({ type: SORT_DATA, payload: { sortedData, sortInfo } });
  };
};

const resetSort = () => {
  return { type: RESET_SORT };
};

const resetFilterData = (pageType) => {
  const defaultFilters = {
    members: defaultMembersFilter,
    tasks: defaultTasksFilter,
    progress: defaultProgressFilter,
    userTasks: defaultUserTasksFilter,
  };
  return { type: RESET_FILTER, payload: defaultFilters[pageType] };
};

const filterData = (sortTableId, filterInfo) => {
  return (dispatch, getState) => {
    const {
      data: { [sortTableId]: dataToFilter },
      sort: { isSorted, sortedData, sortInfo },
    } = getState();

    const filteredData = filterHelper(dataToFilter, filterInfo);

    if (isSorted) {
      const sortedAndFilteredData = filterHelper(sortedData, filterInfo);
      dispatch({ type: COMBINE_SORT_AND_FILTER, payload: { sortedAndFilteredData, filterInfo, sortInfo } });
    }

    return dispatch({ type: FILTER_DATA, payload: { filteredData, filterInfo } });
  };
};

export { sortData, resetSort, resetFilterData, filterData };
