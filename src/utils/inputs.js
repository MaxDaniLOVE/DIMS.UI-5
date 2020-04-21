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
    validationPattern: /[0-9]{13}/,
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
    validationPattern: /[0-9]{13}/,
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

const subtasksInputs = [
  {
    label: 'Track date:',
    id: 'trackDate',
    type: 'date',
    validationPattern: /[0-9]{13}/,
  },
  {
    label: 'Note:',
    id: 'trackNote',
    type: 'text',
    validationPattern: /.{10,}/,
  },
];

const authInputs = [
  {
    label: 'Email:',
    id: 'email',
    type: 'email',
    validationPattern: /^\S+@\S+\.\S+$/,
  },
  {
    label: 'Password:',
    id: 'password',
    type: 'password',
    validationPattern: /.{8,}/,
  },
];

export { membersInputs, subtasksInputs, authInputs };
