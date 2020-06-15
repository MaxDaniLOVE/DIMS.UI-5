import getMailLogin from '../utils/getMailLogin';

describe('Returns login from email', () => {
  it("should return 'admin' for 'admin@gmail.com'", () => {
    const givenValue = 'admin@gmail.com';

    const expected = 'admin';

    const result = getMailLogin(givenValue);

    expect(result).toBe(expected);
  });
  it("should return 'mentor' for 'mentor@gmail.com'", () => {
    const givenValue = 'mentor@gmail.com';

    const expected = 'mentor';

    const result = getMailLogin(givenValue);

    expect(result).toBe(expected);
  });
  it("should return 'user_with_strange_mail' for 'admin@asdasdasdasdasd.com'", () => {
    const givenValue = 'user_with_strange_mail@asdasdasdasdasd.com';

    const expected = 'user_with_strange_mail';

    const result = getMailLogin(givenValue);

    expect(result).toBe(expected);
  });
});
