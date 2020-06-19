import {
  dateToString,
  stringToDate,
  millisecondsToDate,
  millisecondsToAge,
  getCurrentYear,
  getCurrentDate,
  convertAge,
  getCurrentDateInMs,
  getDateInWeek,
  compareDates,
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
  it('should return 23 years for given 0ms', () => {
    const givenMs = 866235600000;
    const expectedAge = 23;

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
  it('should return current date', () => {
    const currentTime = new Date().getTime();
    const expectedDate = dateToString(currentTime);

    const result = getCurrentDate();

    expect(result).toBe(expectedDate);
  });
  it('should return current date', () => {
    const givenAge = 33;
    const expectedDate = 547719460000;

    const result = convertAge(givenAge);

    expect(result).toBeGreaterThan(expectedDate);
  });
  it('should return current date in ms', () => {
    const expectedDate = new Date().getTime();

    const result = getCurrentDateInMs();

    expect(result).toBe(expectedDate);
  });
  it('should return date in a week', () => {
    const currenatDate = new Date();
    const nextWeek = new Date(currenatDate.getTime() + 7 * 24 * 60 * 60 * 1000).getTime();
    const expectedDate = dateToString(nextWeek);

    const result = getDateInWeek();

    expect(result).toBe(expectedDate);
  });
  it("should return true for start date '2020-06-19' and deadline '2020-06-26'", () => {
    const startDate = '2020-06-19';
    const deadlineDate = '2020-06-26';
    const expected = true;

    const result = compareDates(startDate, deadlineDate);

    expect(result).toBe(expected);
  });
  it("should return false for start date '2020-06-26' and deadline '2020-06-19'", () => {
    const startDate = '2020-06-26';
    const deadlineDate = '2020-06-19';
    const expected = false;

    const result = compareDates(startDate, deadlineDate);

    expect(result).toBe(expected);
  });
  it('should return true for equal dates', () => {
    const startDate = '2020-06-19';
    const deadlineDate = '2020-06-19';
    const expected = true;

    const result = compareDates(startDate, deadlineDate);

    expect(result).toBe(expected);
  });
});
