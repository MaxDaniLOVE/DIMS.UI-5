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

const defaultRegisterData = {
  directionId: '',
  name: '',
  email: '',
  lastName: '',
  sex: '',
  education: '',
  birthDate: '',
  universityAverageScore: '',
  mathScore: '',
  address: '',
  mobilePhone: '',
  skype: '',
  startDate: '',
};

const defaultSubtaskData = {
  trackDate: '',
  trackNote: '',
};

export { inputsParser, defaultRegisterData, defaultSubtaskData };
