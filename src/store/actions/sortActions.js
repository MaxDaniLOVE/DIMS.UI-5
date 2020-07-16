import { SORT_DATA, RESET_SORT, FILTER_DATA, RESET_FILTER } from './actionTypes';
import sortHelper from '../../utils/sortHelper';
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

const resetFilterData = (pageType, dataToFilter = []) => {
  return (dispatch) => {
    const defaultFilters = {
      members: defaultMembersFilter,
      tasks: defaultTasksFilter,
      progress: defaultProgressFilter,
      userTasks: defaultUserTasksFilter,
    };

    const keys = Object.keys(defaultFilters[pageType]);
    const filterInfo = {};

    keys.map((key) => {
      const availiableFilters = new Set();
      dataToFilter.map((item) => availiableFilters.add(item[key]));
      filterInfo[key] = [...availiableFilters];
      return null;
    });

    const settedFilters = defaultFilters[pageType];

    dispatch({ type: RESET_FILTER, payload: { filterInfo, settedFilters } });
  };
};

const filterData = (sortTableId, settedFilters) => {
  return (dispatch, getState) => {
    const {
      data: { [sortTableId]: dataToFilter },
    } = getState();

    const keys = Object.keys(settedFilters);

    const filteredData = dataToFilter.filter((item) => {
      const isEqualsArray = keys.map((key) => {
        if (!settedFilters[key].length) {
          return true;
        }
        return settedFilters[key].includes(item[key]);
      });
      return isEqualsArray.every((element) => element);
    });

    return dispatch({ type: FILTER_DATA, payload: { settedFilters, filteredData } });
  };
};

export { sortData, resetSort, resetFilterData, filterData };
