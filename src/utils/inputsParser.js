import { stringToDate } from './convertDate';

const inputsParser = (value, id, data) => {
  const coppiedObj = { ...data };
  if (id === 'startDate' || id === 'birthDate' || id === 'trackDate') {
    coppiedObj[id] = stringToDate(value);
  } else {
    coppiedObj[id] = value;
  }
  return coppiedObj;
};

export default inputsParser;
