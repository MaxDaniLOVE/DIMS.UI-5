import { SORT_FROM_A_TO_Z, SORT_FROM_Z_TO_A, RESET_SORT } from './actionTypes';

const sortFromAToZ = (data, id) => {
  const sortedData = [...data].sort((a, b) => {
    if (typeof a[id] === 'number') {
      return a[id] - b[id];
    }
    return a[id].localeCompare(b[id]);
  });

  const sortInfo = { type: 'UP', id };

  return { type: SORT_FROM_A_TO_Z, payload: { sortedData, sortInfo } };
};

const sortFromZToA = (data, id) => {
  const sortedData = [...data].sort((a, b) => {
    if (typeof a[id] === 'number') {
      return b[id] - a[id];
    }
    return b[id].localeCompare(a[id]);
  });

  const sortInfo = { type: 'DOWN', id };

  return { type: SORT_FROM_Z_TO_A, payload: { sortedData, sortInfo } };
};

const resetSort = () => {
  return { type: RESET_SORT };
};

export { sortFromAToZ, sortFromZToA, resetSort };
