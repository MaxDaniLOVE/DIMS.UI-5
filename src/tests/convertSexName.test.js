import convertSexName from '../utils/convertSexName';

describe('Returns sex name', () => {
  it("should return 'Male'", () => {
    const givenValue = 'M';

    const expected = 'Male';

    const result = convertSexName(givenValue);

    expect(result).toBe(expected);
  });
  it("should return 'M'", () => {
    const givenValue = 'Male';

    const expected = 'M';

    const result = convertSexName(givenValue);

    expect(result).toBe(expected);
  });
  it("should return 'Female'", () => {
    const givenValue = 'F';

    const expected = 'Female';

    const result = convertSexName(givenValue);

    expect(result).toBe(expected);
  });
  it("should return 'F'", () => {
    const givenValue = 'Female';

    const expected = 'F';

    const result = convertSexName(givenValue);

    expect(result).toBe(expected);
  });
});
