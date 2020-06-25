import { THROW_ALERT } from './actionTypes';

const defaultErrorCallback = (dispatch, error) => {
  const { message } = error;
  dispatch(throwAlert({ type: 'ERROR', message }));
};

const successCallback = (dispatch, message) => {
  dispatch(throwAlert({ type: 'SUCCESS', message }));
};

const throwAlert = (alert) => {
  return { type: THROW_ALERT, payload: alert };
};

export { defaultErrorCallback, successCallback, throwAlert };
