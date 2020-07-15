const membersFilterInputs = [
  {
    label: 'Name:',
    id: 'name',
    type: 'text',
  },
  {
    label: 'Age:',
    id: 'birthDate',
    type: 'text',
  },
  {
    label: 'Start date:',
    id: 'startDate',
    type: 'date',
  },
  {
    label: 'Education:',
    id: 'education',
    type: 'text',
  },
  {
    label: 'Direction:',
    id: 'directionId',
    type: 'radio',
    options: ['Java', 'Frontend', '.Net', 'Salesforce'],
  },
];

const tasksFilterInputs = [
  {
    label: 'Name:',
    id: 'name',
    type: 'text',
  },
  {
    label: 'Start date:',
    id: 'startDate',
    type: 'date',
  },
  {
    label: 'Deadline date:',
    id: 'deadlineDate',
    type: 'date',
  },
];

const progressFilterInputs = [
  {
    label: 'Task name:',
    id: 'taskName',
    type: 'text',
  },
  {
    label: 'Track date:',
    id: 'trackDate',
    type: 'date',
  },
  {
    label: 'Note:',
    id: 'trackNote',
    type: 'text',
  },
];

export { membersFilterInputs, tasksFilterInputs, progressFilterInputs };
