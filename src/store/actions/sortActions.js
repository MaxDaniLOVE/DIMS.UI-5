import { SORT_DATA, RESET_SORT } from './actionTypes';
import sortHelper from '../../utils/sortHelper';

const sortData = (data, id, type, isSkipReseting = false) => {
  return (dispatch, getState) => {
    const {
      sort: {
        sortInfo: { id: previousId, type: previousType },
      },
    } = getState();

    const isResetSort = previousId === id && previousType === type && !isSkipReseting;

    if (isResetSort) {
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
