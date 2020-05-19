const rolesLinks = (role, userId) => {
  const links = {
    USER: [
      {
        link: '/member/subtasks',
        label: 'Tracking',
      },
      {
        link: `/member/${userId}/tasks`,
        label: 'My tasks',
      },
    ],
    MENTOR: [
      {
        link: '/members',
        label: 'All members',
      },
      {
        link: '/tasks',
        label: 'All tasks',
      },
    ],
    ADMIN: [
      {
        link: '/members',
        label: 'All members',
      },
      {
        link: '/tasks',
        label: 'All tasks',
      },
    ],
    AUTH: [
      {
        link: '/auth',
        label: 'Login',
      },
    ],
  };
  const aboutPageLink = {
    link: `/about`,
    label: 'About',
  };
  const linksWithRole = links[role] || links.AUTH;
  return [...linksWithRole, aboutPageLink];
};

export default rolesLinks;
