import { stringToDate } from './convertDate';

const inputsParser = (value, id, data) => {
  const coppiedObj = { ...data };
  if (id === 'startDate' || id === 'birthDate') {
    coppiedObj[id] = stringToDate(value);
  } else if (id === 'members') {
    if (value.checked) {
      data.members.add(value.userId);
    } else {
      data.members.delete(value.userId);
    }
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

const defaultTaskData = {
  description: '',
  name: '',
  startDate: '',
  deadlineDate: '',
  members: new Set(),
};

export { inputsParser, defaultRegisterData, defaultTaskData };
