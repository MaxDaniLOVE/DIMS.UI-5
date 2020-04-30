import { dateToString, stringToDate, millisecondsToDate, millisecondsToAge } from '../utils/convertDate';

describe('Converting dates', () => {
  it("should return '2020-04-30' for given 1588204800000ms", () => {
    expect(dateToString(1588204800000)).toBe('2020-04-30');
  });
  it("should return '1970-01-01' for given 0ms", () => {
    expect(dateToString(0)).toBe('1970-01-01');
  });
  it("should return 0 for given '1970-01-01'", () => {
    expect(stringToDate('1970-01-01')).toBe(0);
  });
  it("should return 1588204800000 for given '2020-04-30'", () => {
    expect(stringToDate('2020-04-30')).toBe(1588204800000);
  });
  it('should return 50 years for given 0ms', () => {
    expect(millisecondsToAge(0)).toBe(50);
  });
  it('should return 22 years for given 0ms', () => {
    expect(millisecondsToAge(866235600000)).toBe(22);
  });
  it("should return '1997-6-14' years for given 866235600000ms", () => {
    expect(millisecondsToDate(866235600000)).toBe('1997-6-14');
  });
});
