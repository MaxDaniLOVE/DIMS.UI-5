import { stringToDate, stringDateToLocaleString, compareDates } from './convertDate';

const validation = (data, inputs) => {
  const keys = Object.keys(data);
  const isValidArray = keys.map((key) => {
    if (key === 'id' || key === 'taskId') return true;
    const {
      validationPattern: { pattern, min, max },
      dateToCompare,
    } = inputs.find(({ id }) => id === key);

    const { value: patternValue } = pattern;

    if (dateToCompare) {
      const lesserDate = data[dateToCompare];
      const biggerDate = data[key];
      return compareDates(lesserDate, biggerDate);
    }

    if (min && max) {
      const { value: minValue } = min;
      const { value: maxValue } = max;
      return data[key] >= minValue && data[key] <= maxValue;
    }

    const regExp = new RegExp(patternValue);
    return regExp.test(data[key]);
  });
  return isValidArray.every((el) => el);
};

const fieldValidation = (pattern) => ({
  required: { value: true, errorMessage: "You can't leave empty field" },
  ...pattern,
});

const dateValidation = (validationPattern, startDate) => {
  const datePattern = {
    min: {
      value: stringToDate(startDate),
      errorMessage: `It can't be lesser than ${stringDateToLocaleString(startDate)}`,
    },
  };
  return { ...validationPattern, ...datePattern };
};

export { validation, fieldValidation, dateValidation };
