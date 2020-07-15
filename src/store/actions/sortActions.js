import { SORT_DATA, RESET_SORT, FILTER_DATA, RESET_FILTER } from './actionTypes';
import sortHelper from '../../utils/sortHelper';
import { defaultMembersFilter, defaultTasksFilter, defaultProgressFilter } from '../../utils/defaultFiltersData';

const sortData = (sortTableId, id, type, isSkipReseting = false) => {
  return (dispatch, getState) => {
    const {
      data: { [sortTableId]: dataToSort },
      sort: {
        sortInfo: { id: previousId, type: previousType },
      },
    } = getState();

    const isResetSort = previousId === id && previousType === type && !isSkipReseting;

    if (isResetSort) {
      return dispatch(resetSort());
    }

    const sortedData = sortHelper(dataToSort, id, type);

    const sortInfo = { type, id };

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
  };
  return { type: RESET_FILTER, payload: defaultFilters[pageType] };
};

const filterData = (sortTableId, filterInfo) => {
  return (dispatch, getState) => {
    const {
      data: { [sortTableId]: dataToFilter },
    } = getState();

    const keys = Object.keys(filterInfo);

    const filteredData = dataToFilter.filter((item) => {
      const isEqualsArray = keys.map((key) => {
        if (!filterInfo[key]) {
          return true;
        }
        return filterInfo[key] === item[key];
      });
      return isEqualsArray.every((element) => element);
    });

    return dispatch({ type: FILTER_DATA, payload: { filteredData, filterInfo } });
  };
};

export { sortData, resetSort, resetFilterData, filterData };
