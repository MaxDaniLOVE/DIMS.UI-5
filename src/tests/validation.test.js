import validation from '../utils/validation';
import { authInputs } from '../utils/inputs';
import { defaultAuthData } from '../utils/defaultInputsData';

describe('Validation', () => {
  it('should return false for default inputs ', () => {
    expect(validation(defaultAuthData, authInputs)).toBe(false);
  });
  it('should return false for empty password input', () => {
    expect(validation({ email: 'test@gmail.com', password: '' }, authInputs)).toBe(false);
  });
  it('should return false for empty email input', () => {
    expect(validation({ email: '', password: '12345678' }, authInputs)).toBe(false);
  });
  it('should return true for valid inputs', () => {
    expect(validation({ email: 'test@gmail.com', password: '12345678' }, authInputs)).toBe(true);
  });
});
