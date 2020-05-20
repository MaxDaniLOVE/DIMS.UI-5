import rolesLinks from '../utils/rolesLinks';

describe('Roles links', () => {
  it('should return Mentors links ', () => {
    const givenStr = 'MENTOR';
    const expected = [
      {
        link: '/members',
        label: 'All members',
      },
      {
        link: '/tasks',
        label: 'All tasks',
      },
      {
        label: 'About',
        link: '/about',
      },
    ];

    const result = rolesLinks(givenStr);

    expect(result).toMatchObject(expected);
  });
  it('should return Admin links ', () => {
    const givenStr = 'ADMIN';
    const expected = [
      {
        link: '/members',
        label: 'All members',
      },
      {
        link: '/tasks',
        label: 'All tasks',
      },
      {
        label: 'About',
        link: '/about',
      },
    ];

    const result = rolesLinks(givenStr);

    expect(result).toMatchObject(expected);
  });
  it("should return links of user with id 'uid1'", () => {
    const givenStr = 'USER';
    const givenId = 'uid1';
    const expected = [
      {
        link: '/member/subtasks',
        label: 'Tracking',
      },
      {
        link: `/member/uid1/tasks`,
        label: 'My tasks',
      },
      {
        label: 'About',
        link: '/about',
      },
    ];

    const result = rolesLinks(givenStr, givenId);

    expect(result).toMatchObject(expected);
  });
  it('should return link to auth page', () => {
    const givenStr = '';
    const givenId = '';
    const expected = [
      {
        link: '/auth',
        label: 'Login',
      },
      {
        label: 'About',
        link: '/about',
      },
    ];

    const result = rolesLinks(givenStr, givenId);

    expect(result).toMatchObject(expected);
  });
});
