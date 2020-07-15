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

export { membersFilterInputs, tasksFilterInputs };
