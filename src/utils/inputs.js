/* eslint-disable no-useless-escape */
const membersInputs = [
  {
    label: 'Name:',
    id: 'name',
    type: 'text',
    validationPattern: /[A-za-z]{3,}/,
  },
  {
    label: 'Last name:',
    id: 'lastName',
    type: 'text',
    validationPattern: /[A-za-z]{2,}/,
  },
  {
    label: 'Direction:',
    id: 'directionId',
    type: 'radio',
    options: ['Java', 'Frontend', '.Net', 'Saleforce'],
    validationPattern: /\Java|\.Net|\Frontend|\Saleforce/,
  },
  {
    label: 'Birth date:',
    id: 'birthDate',
    type: 'date',
    validationPattern: /[0-9]{1,}/,
  },
  {
    label: 'Education:',
    id: 'education',
    type: 'text',
    validationPattern: /[A-za-z]{3,}/,
  },
  {
    label: 'E-mail:',
    id: 'email',
    type: 'email',
    validationPattern: /^\S+@\S+\.\S+$/,
  },
  {
    label: 'Math score:',
    id: 'mathScore',
    type: 'number',
    validationPattern: /[0-9]{1}/,
  },
  {
    label: 'University average score:',
    id: 'universityAverageScore',
    type: 'number',
    validationPattern: /[0-9]{1}/,
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
    validationPattern: /\Male|\Female/,
  },
  {
    label: 'Skype:',
    id: 'skype',
    type: 'text',
    validationPattern: /.{6,}/,
  },
  {
    label: 'Address:',
    id: 'address',
    type: 'text',
    validationPattern: /[A-za-z0-9]{8,}/,
  },
  {
    label: 'Mobile phone:',
    id: 'mobilePhone',
    type: 'tel',
    validationPattern: /[0-9]{12}/,
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

const tasksInputs = [
  {
    label: 'Name:',
    id: 'name',
    type: 'text',
    validationPattern: /.{3,}/,
  },
  {
    label: 'Start date:',
    id: 'startDate',
    type: 'date',
    validationPattern: /[0-9]{13}/,
  },
  {
    label: 'Deadline date:',
    id: 'deadlineDate',
    type: 'date',
    validationPattern: /[0-9]{13}/,
  },
  {
    label: 'Description:',
    id: 'description',
    type: 'text',
    validationPattern: /.{3,}/,
  },
];

export { membersInputs, subtasksInputs, authInputs, tasksInputs };
