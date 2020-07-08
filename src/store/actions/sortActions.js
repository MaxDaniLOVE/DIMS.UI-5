import { SORT_FROM_A_TO_Z, SORT_FROM_Z_TO_A, RESET_SORT } from './actionTypes';

const sortFromAToZ = (data, id) => {
  const sortedData = [...data].sort((a, b) => {
    if (typeof a[id] === 'number') {
      return a[id] - b[id];
    }
    return a[id].localeCompare(b[id]);
  });
  return { type: SORT_FROM_A_TO_Z, payload: sortedData };
};

const sortFromZToA = (data, id) => {
  const sortedData = [...data].sort((a, b) => {
    if (typeof a[id] === 'number') {
      return b[id] - a[id];
    }
    return b[id].localeCompare(a[id]);
  });
  return { type: SORT_FROM_Z_TO_A, payload: sortedData };
};

const resetSort = () => {
  return { type: RESET_SORT };
};

export { sortFromAToZ, sortFromZToA, resetSort };
