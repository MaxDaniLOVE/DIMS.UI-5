const membersProgressHeaders = [
  { value: '#', id: 'index', isSortable: false },
  { value: 'Task', id: 'taskName', isSortable: true },
  { value: 'Note', id: 'trackNote', isSortable: true },
  { value: 'Date', id: 'trackDate', isSortable: true },
];
const membersHeaders = [
  { value: '#', id: 'index', isSortable: false },
  { value: 'Full name', id: 'name', isSortable: true },
  { value: 'Direction', id: 'directionId', isSortable: true },
  { value: 'Education', id: 'education', isSortable: true },
  { value: 'Start', id: 'startDate', isSortable: true },
  { value: 'Age', id: 'birthDate', isSortable: true },
  { value: 'Manage', id: 'manage', isSortable: false },
];
const membersTasksHeaders = {
  USER: [
    { value: '#', id: 'index', isSortable: false },
    { value: 'Name', id: 'name', isSortable: true },
    { value: 'Start', id: 'startDate', isSortable: true },
    { value: 'Deadline', id: 'deadlineDate', isSortable: true },
    { value: 'Status', id: 'stateId', isSortable: true },
    { value: 'Manage', id: 'manage', isSortable: false },
  ],
  ADMIN: [
    { value: '#', id: 'index', isSortable: false },
    { value: 'Name', id: 'name', isSortable: true },
    { value: 'Start', id: 'startDate', isSortable: true },
    { value: 'Deadline', id: 'deadlineDate', isSortable: true },
    { value: 'Status', id: 'stateId', isSortable: true },
    { value: 'Mark', id: 'manage', isSortable: false },
  ],
  MENTOR: [
    { value: '#', id: 'index', isSortable: false },
    { value: 'Name', id: 'name', isSortable: true },
    { value: 'Start', id: 'startDate', isSortable: true },
    { value: 'Deadline', id: 'deadlineDate', isSortable: true },
    { value: 'Status', id: 'stateId', isSortable: true },
    { value: 'Mark', id: 'manage', isSortable: false },
  ],
};
const taskTableHeaders = [
  { value: '#', id: 'index', isSortable: false },
  { value: 'Name', id: 'name', isSortable: true },
  { value: 'Start', id: 'startDate', isSortable: true },
  { value: 'Deadline', id: 'deadlineDate', isSortable: true },
  { value: 'Manage', id: 'manage', isSortable: false },
];
const infoTableHeaders = [
  { value: 'Actions', id: 'actions', isSortable: false },
  { value: 'Admin', id: 'admin', isSortable: false },
  { value: 'Mentor', id: 'mentor', isSortable: false },
  { value: 'Member', id: 'member', isSortable: false },
];

export { membersProgressHeaders, membersHeaders, membersTasksHeaders, taskTableHeaders, infoTableHeaders };
