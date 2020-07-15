import { compareNumbers } from '../utils/compareFields';

const min = {
  value: 4,
  errorMessage: "It can't be lesser than 4",
};

const max = {
  value: 10,
  errorMessage: "It can't be greater than 10",
};

describe('Compare numbers', () => {
  it("should return 'true' for given 5", () => {
    const numberToCompare = 5;

    const expected = true;

    const result = compareNumbers(min, max, numberToCompare);

    expect(result).toBe(expected);
  });
  it("should return 'false' for given 3", () => {
    const numberToCompare = 3;

    const expected = false;

    const result = compareNumbers(min, max, numberToCompare);

    expect(result).toBe(expected);
  });
  it("should return 'false' for given 11", () => {
    const numberToCompare = 11;

    const expected = false;

    const result = compareNumbers(min, max, numberToCompare);

    expect(result).toBe(expected);
  });
});
