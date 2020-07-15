import { comparePasswords } from '../utils/compareFields';

describe('Compare  passwords', () => {
  it("should return 'true' for same passwords", () => {
    const password = 'qwerty123';
    const passwordToCompare = 'qwerty123';

    const expected = true;

    const result = comparePasswords(password, passwordToCompare);

    expect(result).toBe(expected);
  });
  it("should return 'false' for different passwords", () => {
    const password = 'qwerty123';
    const passwordToCompare = 'qwerty12';

    const expected = false;

    const result = comparePasswords(password, passwordToCompare);

    expect(result).toBe(expected);
  });
});
