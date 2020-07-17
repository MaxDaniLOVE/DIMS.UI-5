import sortHelper from '../utils/sortHelper';

const givenArray = [
  {
    trackDate: 1588032000000,
    userName: 'User',
    birtDate: 200000000,
  },
  {
    trackDate: 0,
    userName: 'Mentor',
    birtDate: 10000000,
  },
  {
    trackDate: 12312322244,
    userName: 'Admin',
    birtDate: 0,
  },
];

describe('Sorting pages data:', () => {
  it('should return sorted from old trackDate to new array', () => {
    const id = 'trackDate';
    const type = 'UP';

    const expected = [
      {
        trackDate: 0,
        userName: 'Mentor',
        birtDate: 10000000,
      },
      {
        trackDate: 12312322244,
        userName: 'Admin',
        birtDate: 0,
      },
      {
        trackDate: 1588032000000,
        userName: 'User',
        birtDate: 200000000,
      },
    ];

    const result = sortHelper(givenArray, id, type);

    expect(result).toMatchObject(expected);
  });
  it('should return sorted from Z to A array', () => {
    const id = 'userName';
    const type = 'DOWN';

    const expected = [
      {
        trackDate: 1588032000000,
        userName: 'User',
        birtDate: 200000000,
      },
      {
        trackDate: 0,
        userName: 'Mentor',
        birtDate: 10000000,
      },
      {
        trackDate: 12312322244,
        userName: 'Admin',
        birtDate: 0,
      },
    ];

    const result = sortHelper(givenArray, id, type);

    expect(result).toMatchObject(expected);
  });
  it('should return sorted by birtDate array', () => {
    const id = 'birtDate';
    const type = 'UP';

    const expected = [
      {
        trackDate: 12312322244,
        userName: 'Admin',
        birtDate: 0,
      },
      {
        trackDate: 0,
        userName: 'Mentor',
        birtDate: 10000000,
      },
      {
        trackDate: 1588032000000,
        userName: 'User',
        birtDate: 200000000,
      },
    ];

    const result = sortHelper(givenArray, id, type);

    expect(result).toMatchObject(expected);
  });
});
