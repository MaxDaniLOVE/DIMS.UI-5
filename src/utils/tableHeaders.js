const membersProgressHeaders = ['#', 'Task', 'Note', 'Date'];
const membersHeaders = ['#', 'Full name', 'Direction', 'Education', 'Start', 'Age', 'Manage'];
const membersTasksHeaders = {
  USER: ['#', 'Name', 'Start', 'Deadline', 'Status', 'Manage'],
  ADMIN: ['#', 'Name', 'Start', 'Deadline', 'Status', 'Mark'],
  MENTOR: ['#', 'Name', 'Start', 'Deadline', 'Status', 'Mark'],
};
const taskTableHeaders = ['#', 'Name', 'Start', 'Deadline', 'Manage'];
const infoTableHeaders = ['Actions', 'Admin', 'Mentor', 'Member'];

export { membersProgressHeaders, membersHeaders, membersTasksHeaders, taskTableHeaders, infoTableHeaders };
