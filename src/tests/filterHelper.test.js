import filterHelper from '../utils/filterHelper';

const givenArray = [
  {
    userName: 'User',
    birtDate: 200000000,
  },
  {
    userName: 'Mentor',
    birtDate: 10000000,
  },
  {
    userName: 'Admin',
    birtDate: 0,
  },
];

describe('Filter pages data', () => {
  it('should return array same as given array', () => {
    const filterInfo = {
      userName: '',
      birtDate: '',
    };

    const expected = [
      {
        userName: 'User',
        birtDate: 200000000,
      },
      {
        userName: 'Mentor',
        birtDate: 10000000,
      },
      {
        userName: 'Admin',
        birtDate: 0,
      },
    ];

    const result = filterHelper(givenArray, filterInfo);

    expect(result).toMatchObject(expected);
  });
  it("should return objects with userName which contains 'e' letter", () => {
    const filterInfo = {
      userName: 'e',
      birtDate: '',
    };

    const expected = [
      {
        userName: 'User',
        birtDate: 200000000,
      },
      {
        userName: 'Mentor',
        birtDate: 10000000,
      },
    ];

    const result = filterHelper(givenArray, filterInfo);

    expect(result).toMatchObject(expected);
  });
  it('should return array same as given array', () => {
    const filterInfo = {
      userName: '',
      birtDate: '1970-01-03',
    };

    const expected = [
      {
        userName: 'User',
        birtDate: 200000000,
      },
    ];

    const result = filterHelper(givenArray, filterInfo);

    expect(result).toMatchObject(expected);
  });
});
