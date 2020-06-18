import { stringToDate, stringDateToLocaleString, compareDates } from './convertDate';

const validation = (data, inputs) => {
  const keys = Object.keys(data);
  const isValidArray = keys.map((key) => {
    if (key === 'id' || key === 'taskId') return true;
    const { validationPattern, dateToCompare } = inputs.find(({ id }) => id === key);

    if (dateToCompare) {
      const lesserDate = data[dateToCompare];
      const biggerDate = data[key];
      return compareDates(lesserDate, biggerDate);
    }

    const regExp = new RegExp(validationPattern);
    return regExp.test(data[key]);
  });
  return isValidArray.every((el) => el);
};

const fieldValidation = (value, errorMessage) => ({
  required: { value: true, errorMessage: "You can't leave empty field" },
  pattern: {
    value,
    errorMessage,
  },
});

const dateValidation = (validationPatter, startDate) => {
  const datePattern = {
    min: {
      value: stringToDate(startDate),
      errorMessage: `It can't be lesser than ${stringDateToLocaleString(startDate)}`,
    },
  };
  return { ...validationPatter, ...datePattern };
};

export { validation, fieldValidation, dateValidation };
