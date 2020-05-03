import sortFromOldToNew from '../utils/sortFromOldToNew';

describe('Sorting array:', () => {
  it('should return sort for given array from old trackDate to new', () => {
    const givenArray = [
      {
        trackDate: 1588032000000,
        userName: 'Tester',
      },
      {
        trackDate: 0,
        userName: 'Tester',
      },
      {
        trackDate: 12312322244,
        userName: 'Tester',
      },
    ];
    const expected = [
      {
        trackDate: 0,
        userName: 'Tester',
      },
      {
        trackDate: 12312322244,
        userName: 'Tester',
      },
      {
        trackDate: 1588032000000,
        userName: 'Tester',
      },
    ];

    const result = sortFromOldToNew(givenArray);

    expect(result).toMatchObject(expected);
  });
});
