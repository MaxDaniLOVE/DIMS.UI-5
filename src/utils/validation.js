import { stringToDate, stringDateToLocaleString, compareDates } from './convertDate';
import { compareNumbers, comparePasswords } from './compareFields';

const validation = (data, inputs) => {
  const keys = Object.keys(data);
  const isValidArray = keys.map((key) => {
    if (key === 'id' || key === 'taskId') return true;
    const {
      validationPattern: { pattern, min, max },
      dateToCompare,
      isPassCompare,
    } = inputs.find(({ id }) => id === key);

    if (dateToCompare) return compareDates(data[dateToCompare], data[key]);

    if (min && max) return compareNumbers(min, max, data[key]);

    if (isPassCompare) return comparePasswords(data.newPassword, data[key]);

    const { value: patternValue } = pattern;

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

const passChangeValidation = (pattern, id, value) => {
  if (id === 'confirmPassword') {
    return {
      ...fieldValidation(pattern),
      pattern: {
        value,
        errorMessage: 'Passwords are not match',
      },
    };
  }
  return fieldValidation(pattern);
};

export { validation, fieldValidation, dateValidation, passChangeValidation };
