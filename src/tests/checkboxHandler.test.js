import checkboxHandler from '../utils/checkboxHandler';

describe('Change checkbox inputs value', () => {
  it('should return same as given array', () => {
    const alreadyAddedData = [1, 2];
    const value = 2;
    const checked = true;

    const expected = [1, 2];

    const result = checkboxHandler(alreadyAddedData, value, checked);

    expect(result).toMatchObject(expected);
  });
  it('should return array with added number 3', () => {
    const alreadyAddedData = [1, 2];
    const value = 3;
    const checked = true;

    const expected = [1, 2, 3];

    const result = checkboxHandler(alreadyAddedData, value, checked);

    expect(result).toMatchObject(expected);
  });
  it('should return array without number 2', () => {
    const alreadyAddedData = [1, 2];
    const value = 2;
    const checked = false;

    const expected = [1];

    const result = checkboxHandler(alreadyAddedData, value, checked);

    expect(result).toMatchObject(expected);
  });
});
