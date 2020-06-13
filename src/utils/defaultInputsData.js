import { getCurrentDate, getDateInWeek } from './convertDate';

const defaultRegisterData = {
  directionId: '',
  name: '',
  email: '',
  lastName: '',
  sex: '',
  education: '',
  birthDate: getCurrentDate(),
  universityAverageScore: '',
  mathScore: '',
  address: '',
  mobilePhone: '',
  skype: '',
  startDate: getCurrentDate(),
};

const defaultSubtaskData = {
  trackDate: getCurrentDate(),
  trackNote: '',
};

const defaultAuthData = {
  email: '',
  password: '',
};

const defaultTaskData = {
  deadlineDate: getDateInWeek(),
  description: '',
  name: '',
  startDate: getCurrentDate(),
};

const defaultInTouchData = {
  email: '',
  fullName: '',
  message: '',
};

export { defaultRegisterData, defaultSubtaskData, defaultAuthData, defaultTaskData, defaultInTouchData };
