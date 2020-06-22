import removeStartNumbers from '../utils/cutStartNumbers';

describe('Remove numbers from beggining of stirng', () => {
  it("should return 'test' for given '1588204800000test'", () => {
    const givenString = '1588204800000test';
    const expectedString = 'test';

    const result = removeStartNumbers(givenString);

    expect(result).toBe(expectedString);
  });
  it("should return 'test' for given '   test'", () => {
    const givenString = '   test';
    const expectedString = 'test';

    const result = removeStartNumbers(givenString);

    expect(result).toBe(expectedString);
  });
  it("should return 'test' for given 'test'", () => {
    const givenString = 'test';
    const expectedString = 'test';

    const result = removeStartNumbers(givenString);

    expect(result).toBe(expectedString);
  });
});
