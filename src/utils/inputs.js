const membersInputs = [
  {
    label: 'Name:',
    id: 'name',
    type: 'text',
  },
  {
    label: 'Last name:',
    id: 'lastName',
    type: 'text',
  },
  {
    label: 'Direction:',
    id: 'directionId',
    type: 'radio',
    options: ['Java', 'Frontend', '.Net', 'Saleforce'],
  },
  {
    label: 'Birth date:',
    id: 'birthDate',
    type: 'date',
  },
  {
    label: 'Education:',
    id: 'education',
    type: 'text',
  },
  {
    label: 'E-mail:',
    id: 'email',
    type: 'email',
  },
  {
    label: 'Math score:',
    id: 'mathScore',
    type: 'number',
  },
  {
    label: 'University average score:',
    id: 'universityAverageScore',
    type: 'number',
  },
  {
    label: 'Start date:',
    id: 'startDate',
    type: 'date',
  },
  {
    label: 'Sex:',
    id: 'sex',
    type: 'radio',
    options: ['Male', 'Female'],
  },
  {
    label: 'Skype:',
    id: 'skype',
    type: 'text',
  },
  {
    label: 'Address:',
    id: 'address',
    type: 'text',
  },
  {
    label: 'Mobile phone:',
    id: 'mobilePhone',
    type: 'tel',
  },
];

const tasksInputs = [
  {
    label: 'Description:',
    id: 'description',
    type: 'text',
  },
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
  {
    label: 'Members:',
    id: 'members',
    type: 'checkbox',
    options: new Set().add('u1id').add('u2id'),
  },
];

export { membersInputs, tasksInputs };
