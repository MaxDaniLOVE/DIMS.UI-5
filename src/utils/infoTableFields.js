export default [
  { actions: 'Watch the Member’s Manage Grid', admin: true, mentor: true, member: false },
  { actions: 'Add, edit, and delete a member on Member’s Manage Grid ', admin: true, mentor: false, member: false },
  { actions: 'Watch the Member’s Progress grid ', admin: true, mentor: true, member: false },
  { actions: 'Watch the Tasks Manage Grid', admin: true, mentor: true, member: false },
  { actions: 'Add, edit, and delete a New task', admin: true, mentor: true, member: false },
  { actions: 'Watch the Member’s Task Manage grid', admin: true, mentor: true, member: true },
  { actions: 'Set the Member task’s state as Success or Fail', admin: true, mentor: true, member: false },
  { actions: 'Watch the Subtasks Manage Grid of the current Task', admin: false, mentor: false, member: true },
  { actions: 'Add, edit, and delete a Subtasks of the current Task', admin: false, mentor: false, member: true },
];
