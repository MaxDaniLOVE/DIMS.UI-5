import convertSexName from '../utils/convertSexName';

describe('Returns users gender', () => {
  it("should return 'Male' for 'M'", () => {
    const givenValue = 'M';

    const expected = 'Male';

    const result = convertSexName(givenValue);

    expect(result).toBe(expected);
  });
  it("should return 'M' for 'Male'", () => {
    const givenValue = 'Male';

    const expected = 'M';

    const result = convertSexName(givenValue);

    expect(result).toBe(expected);
  });
  it("should return 'Female' for 'F'", () => {
    const givenValue = 'F';

    const expected = 'Female';

    const result = convertSexName(givenValue);

    expect(result).toBe(expected);
  });
  it("should return 'F' for 'Female'", () => {
    const givenValue = 'Female';

    const expected = 'F';

    const result = convertSexName(givenValue);

    expect(result).toBe(expected);
  });
});
