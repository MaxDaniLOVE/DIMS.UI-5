export default [
  { actions: 'Watch the Member’s Manage Grid', admin: '+', mentor: '+', member: '-' },
  { actions: 'Add, edit, and delete a member on Member’s Manage Grid ', admin: '+', mentor: '-', member: '-' },
  { actions: 'Watch the Member’s Progress grid ', admin: '+', mentor: '+', member: '-' },
  { actions: 'Watch the Tasks Manage Grid', admin: '+', mentor: '+', member: '-' },
  { actions: 'Add, edit, and delete a New task', admin: '+', mentor: '+', member: '-' },
  { actions: 'Watch the Member’s Task Manage grid', admin: '+', mentor: '+', member: '+' },
  { actions: 'Set the Member task’s state as Success or Fail', admin: '+', mentor: '+', member: '-' },
  { actions: 'Watch the Subtasks Manage Grid of the current Task', admin: '-', mentor: '-', member: '+' },
  { actions: 'Add, edit, and delete a Subtasks of the current Task', admin: '-', mentor: '-', member: '+' },
];
