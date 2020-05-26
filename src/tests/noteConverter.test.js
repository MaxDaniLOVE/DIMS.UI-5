import noteConverter from '../utils/noteConverter';

describe('Converting notes', () => {
  it("should return 'Hello world!' for given 'Hello world!'", () => {
    const givenStr = 'Hello world!';
    const maxLength = 20;
    const expected = 'Hello world!';

    const result = noteConverter(givenStr, maxLength);

    expect(result).toBe(expected);
  });
  it("should return 'This string is ...' for given 'This string is more than 20 charachters'", () => {
    const givenStr = 'This string is more than 20 charachters';
    const maxLength = 20;
    const expected = 'This string is more...';

    const result = noteConverter(givenStr, maxLength);

    expect(result).toBe(expected);
  });
  it("should return 'Armando...' for given 'Armando Abbott'", () => {
    const givenStr = 'Armando Abbott';
    const maxLength = 10;
    const expected = 'Armando...';

    const result = noteConverter(givenStr, maxLength);

    expect(result).toBe(expected);
  });
  it("should return 'Armando' for given 'Armando'", () => {
    const givenStr = 'Armando';
    const maxLength = 10;
    const expected = 'Armando';

    const result = noteConverter(givenStr, maxLength);

    expect(result).toBe(expected);
  });
});
