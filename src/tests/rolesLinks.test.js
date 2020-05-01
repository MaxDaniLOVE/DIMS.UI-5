import rolesLinks from '../utils/rolesLinks';

describe('Roles links', () => {
  it('should return Mentors links ', () => {
    expect(rolesLinks('MENTOR')).toMatchObject([
      {
        link: '/members',
        label: 'All members',
      },
      {
        link: '/tasks',
        label: 'All tasks',
      },
    ]);
  });
  it('should return Mentors links ', () => {
    expect(rolesLinks('MENTOR', undefined)).toMatchObject([
      {
        link: '/members',
        label: 'All members',
      },
      {
        link: '/tasks',
        label: 'All tasks',
      },
    ]);
  });
  it('should return Admin links ', () => {
    expect(rolesLinks('ADMIN', undefined)).toMatchObject([
      {
        link: '/members',
        label: 'All members',
      },
      {
        link: '/tasks',
        label: 'All tasks',
      },
    ]);
  });
  it("should return links of user with id 'uid1'", () => {
    expect(rolesLinks('USER', 'uid1')).toMatchObject([
      {
        link: '/member/subtasks',
        label: 'Tracking',
      },
      {
        link: `/member/uid1/tasks`,
        label: 'My tasks',
      },
    ]);
  });
  it('should return link to auth page', () => {
    expect(rolesLinks('', '')).toMatchObject([
      {
        link: '/auth',
        label: 'Login',
      },
    ]);
  });
});
