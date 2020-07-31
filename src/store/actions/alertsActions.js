import { THROW_ALERT, REMOVE_ALERT } from './actionTypes';

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

const removeAlert = (recievedId) => {
  return (dispatch, getState) => {
    const {
      data: { alerts },
    } = getState();

    const index = alerts.findIndex(({ id }) => id === recievedId);

    const updatedAlerts = [...alerts.slice(0, index), ...alerts.slice(index + 1)];
    setTimeout(dispatch, 150, { type: REMOVE_ALERT, payload: updatedAlerts });
  };
};

export { defaultErrorCallback, successCallback, throwAlert, removeAlert };
