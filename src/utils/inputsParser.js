import { stringToDate } from './convertDate';

const inputsParser = (value, id, data) => {
  const coppiedObj = { ...data };
  if (id === 'startDate' || id === 'birthDate' || id === 'deadlineDate') {
    coppiedObj[id] = stringToDate(value);
  } else if (id === 'members') {
    const itemIdx = data.members.findIndex(({ userId }) => userId === value.userId);
    const oldItem = data.members[itemIdx];
    const newItem = { ...oldItem, isSelected: value.checked };
    const newMembers = [...data.members.slice(0, itemIdx), newItem, ...data.members.slice(itemIdx + 1)];
    coppiedObj[id] = newMembers;
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
  members: [],
};

export { inputsParser, defaultRegisterData, defaultTaskData };
