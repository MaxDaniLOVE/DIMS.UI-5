import { getCurrentDate } from './convertDate';

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
  trackDate: getCurrentDate(),
  trackNote: '',
};

const defaultAuthData = {
  email: '',
  password: '',
};

const defaultTaskData = {
  deadlineDate: '',
  description: '',
  name: '',
  startDate: '',
};

const defaultInTouchData = {
  email: '',
  fullName: '',
  message: '',
};

export { defaultRegisterData, defaultSubtaskData, defaultAuthData, defaultTaskData, defaultInTouchData };
