import noteConverter from '../utils/noteConverter';

describe('Converting notes', () => {
  it("should return 'Hello world!' for given 'Hello world!'", () => {
    expect(noteConverter('Hello world!')).toBe('Hello world!');
  });
  it("should return 'This string is ...' for given 'This string is more than 20 charachters'", () => {
    expect(noteConverter('This string is more than 20 charachters')).toBe('This string is ...');
  });
});
