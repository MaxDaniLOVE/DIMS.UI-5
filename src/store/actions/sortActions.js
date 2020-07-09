import { SORT_DATA, RESET_SORT } from './actionTypes';

const sortHelper = (data, id, type) => {
  const index = type === 'UP' ? 1 : -1;

  const sortedData = [...data].sort((a, b) => {
    if (typeof a[id] === 'number') {
      return (a[id] - b[id]) * index;
    }
    return index === 1 ? a[id].localeCompare(b[id]) : b[id].localeCompare(a[id]);
  });
  return sortedData;
};

const sortData = (data, id, type) => {
  return (dispatch, getState) => {
    const {
      sort: { sortInfo: previousSort },
    } = getState();

    if (previousSort.id === id && previousSort.type === type) {
      return dispatch(resetSort());
    }

    const sortedData = sortHelper(data, id, type);

    const sortInfo = { type, id };

    return dispatch({ type: SORT_DATA, payload: { sortedData, sortInfo } });
  };
};

const resetSort = () => {
  return { type: RESET_SORT };
};

export { sortData, resetSort };
