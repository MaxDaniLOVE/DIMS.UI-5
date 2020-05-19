import inputsChangeHandler from '../utils/inputsChangeHandler';

describe('Change inputs value', () => {
  it("should return object with email 'test@gmail.com'", () => {
    const givenValue = 'test@gmail.com';
    const givenId = 'email';
    const previousData = { email: '', password: '' };

    const expected = {
      email: 'test@gmail.com',
      password: '',
    };

    const result = inputsChangeHandler(givenValue, givenId, previousData);

    expect(result).toMatchObject(expected);
  });
  it("should return object with pass '12345678'", () => {
    const givenValue = '12345678';
    const givenId = 'password';
    const previousData = { email: '', password: '' };

    const expected = {
      email: '',
      password: '12345678',
    };

    const result = inputsChangeHandler(givenValue, givenId, previousData);

    expect(result).toMatchObject(expected);
  });
  it('should return object with empty pass', () => {
    const givenValue = '';
    const givenId = 'password';
    const previousData = { email: '', password: '12345678' };

    const expected = {
      email: '',
      password: '',
    };

    const result = inputsChangeHandler(givenValue, givenId, previousData);

    expect(result).toMatchObject(expected);
  });
  it('should return object with direction', () => {
    const givenValue = 'Java';
    const givenId = 'directionId_Java';
    const previousData = { directionId: '', name: 'Max' };

    const expected = {
      directionId: 'Java',
      name: 'Max',
    };

    const result = inputsChangeHandler(givenValue, givenId, previousData);

    expect(result).toMatchObject(expected);
  });
});
