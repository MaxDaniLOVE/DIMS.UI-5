import inputsChangeHandler from '../utils/inputsChangeHandler';

describe('Change inputs value', () => {
  it("should return object with email 'test@gmail.com'", () => {
    expect(inputsChangeHandler('test@gmail.com', 'email', { email: '', password: '' })).toMatchObject({
      email: 'test@gmail.com',
      password: '',
    });
  });
  it("should return object with pass '12345678'", () => {
    expect(inputsChangeHandler('12345678', 'password', { email: '', password: '' })).toMatchObject({
      email: '',
      password: '12345678',
    });
  });
  it('should return object with empty pass', () => {
    expect(inputsChangeHandler('', 'password', { email: '', password: '12345678' })).toMatchObject({
      email: '',
      password: '',
    });
  });
});
