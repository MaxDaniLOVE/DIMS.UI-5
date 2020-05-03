import {
  dateToString,
  stringToDate,
  millisecondsToDate,
  millisecondsToAge,
  getCurrentYear,
} from '../utils/convertDate';

describe('Converting dates', () => {
  it("should return '2020-04-30' for given 1588204800000ms", () => {
    const givenMs = 1588204800000;
    const expectedDate = '2020-04-30';

    const result = dateToString(givenMs);

    expect(result).toBe(expectedDate);
  });
  it("should return '1970-01-01' for given 0ms", () => {
    const givenMs = 0;
    const expectedDate = '1970-01-01';

    const result = dateToString(givenMs);

    expect(result).toBe(expectedDate);
  });
  it("should return 0 for given '1970-01-01'", () => {
    const givenDate = '1970-01-01';
    const expectedMs = 0;

    const result = stringToDate(givenDate);

    expect(result).toBe(expectedMs);
  });
  it("should return 1588204800000 for given '2020-04-30'", () => {
    const givenDate = '2020-04-30';
    const expectedMs = 1588204800000;

    const result = stringToDate(givenDate);

    expect(result).toBe(expectedMs);
  });
  it('should return 50 years for given 0ms', () => {
    const givenMs = 0;
    const expectedAge = 50;

    const result = millisecondsToAge(givenMs);

    expect(result).toBe(expectedAge);
  });
  it('should return 22 years for given 0ms', () => {
    const givenMs = 866235600000;
    const expectedAge = 22;

    const result = millisecondsToAge(givenMs);

    expect(result).toBe(expectedAge);
  });
  it("should return '1997-6-14' years for given 866235600000ms", () => {
    const givenMs = 866235600000;
    const expectedDate = '1997-6-14';

    const result = millisecondsToDate(givenMs);

    expect(result).toBe(expectedDate);
  });
  it('should return 2020 year', () => {
    const expectedYear = 2020;

    const result = getCurrentYear();

    expect(result).toBe(expectedYear);
  });
});
