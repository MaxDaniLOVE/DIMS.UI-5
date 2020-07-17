import addAgeFieldToUsers from '../utils/addAgeFieldToUsers';

describe('Sorting pages data:', () => {
  it('should add age to object with users data', () => {
    const givenArray = [
      {
        userName: 'User',
        birthDate: 158803200000,
      },
      {
        userName: 'Mentor',
        birthDate: 10000000,
      },
      {
        userName: 'Admin',
        birthDate: 0,
      },
    ];

    const expected = [
      {
        age: 45,
        userName: 'User',
        birthDate: 158803200000,
      },
      {
        age: 50,
        userName: 'Mentor',
        birthDate: 10000000,
      },
      {
        age: 50,
        userName: 'Admin',
        birthDate: 0,
      },
    ];

    const result = addAgeFieldToUsers(givenArray);

    expect(result).toMatchObject(expected);
  });
});
