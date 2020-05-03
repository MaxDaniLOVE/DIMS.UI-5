import noteConverter from '../utils/noteConverter';

describe('Converting notes', () => {
  it("should return 'Hello world!' for given 'Hello world!'", () => {
    const givenStr = 'Hello world!';
    const expected = 'Hello world!';

    const result = noteConverter(givenStr);

    expect(result).toBe(expected);
  });
  it("should return 'This string is ...' for given 'This string is more than 20 charachters'", () => {
    const givenStr = 'This string is more than 20 charachters';
    const expected = 'This string is ...';

    const result = noteConverter(givenStr);

    expect(result).toBe(expected);
  });
});
