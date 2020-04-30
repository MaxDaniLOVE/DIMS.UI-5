import sortFromOldToNew from '../utils/sortFromOldToNew';

describe('Sorting array:', () => {
  const sortingArray = [
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
  it('should return sort for given array from old trackDate to new', () => {
    expect(sortFromOldToNew(sortingArray)).toMatchObject([
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
    ]);
  });
});
