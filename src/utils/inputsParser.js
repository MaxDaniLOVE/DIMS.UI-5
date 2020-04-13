const inputsParser = (value, id, data) => {
  const coppiedObj = { ...data };
  coppiedObj[id] = value;
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

export { inputsParser, defaultRegisterData };
