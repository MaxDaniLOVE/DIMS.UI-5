import { validation } from '../utils/validation';
import { authInputs } from '../utils/inputs';
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
});
