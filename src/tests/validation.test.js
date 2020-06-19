import { validation, fieldValidation, dateValidation } from '../utils/validation';
import { authInputs, tasksInputs } from '../utils/inputs';
import { defaultAuthData } from '../utils/defaultInputsData';

describe('Validation', () => {
  it('should return false for default inputs ', () => {
    const expected = false;

    const result = validation(defaultAuthData, authInputs);

    expect(result).toBe(expected);
  });
  it('should return false for empty password input', () => {
    const givenObj = { email: 'test@gmail.com', password: '' };
    const expected = false;

    const result = validation(givenObj, authInputs);

    expect(result).toBe(expected);
  });
  it('should return false for empty email input', () => {
    const givenObj = { email: '', password: '12345678' };
    const expected = false;

    const result = validation(givenObj, authInputs);

    expect(result).toBe(expected);
  });
  it('should return true for valid inputs', () => {
    const givenObj = { email: 'test@gmail.com', password: '12345678' };
    const expected = true;

    const result = validation(givenObj, authInputs);

    expect(result).toBe(expected);
  });
  it('should return true for valid task inputs', () => {
    const givenObj = {
      taskId: '1',
      name: 'TaskName',
      description: 'Another one task description',
      startDate: '2020-06-18',
      deadlineDate: '2020-06-25',
    };
    const expected = true;

    const result = validation(givenObj, tasksInputs);

    expect(result).toBe(expected);
  });
  it('should return false for task inputs with bigger start date', () => {
    const givenObj = {
      taskId: '1',
      name: 'TaskName',
      description: 'Another one task description',
      startDate: '2020-06-25',
      deadlineDate: '2020-06-18',
    };
    const expected = false;

    const result = validation(givenObj, tasksInputs);

    expect(result).toBe(expected);
  });
  it('should return true for task inputs with equal dates', () => {
    const givenObj = {
      taskId: '1',
      name: 'TaskName',
      description: 'Another one task description',
      startDate: '2020-06-18',
      deadlineDate: '2020-06-18',
    };
    const expected = true;

    const result = validation(givenObj, tasksInputs);

    expect(result).toBe(expected);
  });
  it('should return object with patterns for validation', () => {
    const value = /[a-zA-z]/;
    const errorMessage = 'Error!';
    const expected = {
      required: { value: true, errorMessage: "You can't leave empty field" },
      pattern: {
        value,
        errorMessage,
      },
    };

    const result = fieldValidation(value, errorMessage);

    expect(result).toMatchObject(expected);
  });
  it('should return object with patterns for date validation', () => {
    const alreadyExistedPattern = {
      required: { value: true, errorMessage: "You can't leave empty field" },
      pattern: { value: /[a-zA-z]/, errorMessage: 'Error!' },
    };
    const startDate = '2020-06-26';
    const expected = {
      ...alreadyExistedPattern,
      min: {
        value: 1593129600000,
        errorMessage: `It can't be lesser than 2020-6-26`,
      },
    };

    const result = dateValidation(alreadyExistedPattern, startDate);

    expect(result).toMatchObject(expected);
  });
});
