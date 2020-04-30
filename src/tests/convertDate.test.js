import { dateToString } from '../utils/convertDate';

describe('Converting dates', () => {
  it('should return 2020-04-30 for given 1588258875524ms', () => {
    expect(dateToString(1588258875524)).toBe('2020-04-30');
  });
  it('should return 1970-01-01 for given 0ms', () => {
    expect(dateToString(0)).toBe('1970-01-01');
  });
});
