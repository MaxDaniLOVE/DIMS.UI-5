/* eslint-disable no-useless-escape */
const membersInputs = [
  {
    label: 'Name:',
    id: 'name',
    type: 'text',
    validationPattern: '[A-za-z]{3,}',
    errorMessage: 'Name should contain at least 3 characters',
  },
  {
    label: 'Last name:',
    id: 'lastName',
    type: 'text',
    validationPattern: '[A-za-z]{2,}',
    errorMessage: 'Last name should contain at least 2 characters',
  },
  {
    label: 'Birth date:',
    id: 'birthDate',
    type: 'date',
    validationPattern: '([12]\\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\\d|3[01]))',
    errorMessage: 'Enter valid date',
  },
  {
    label: 'Start date:',
    id: 'startDate',
    type: 'date',
    validationPattern: '([12]\\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\\d|3[01]))',
    errorMessage: 'Enter valid date',
  },
  {
    label: 'Education:',
    id: 'education',
    type: 'text',
    validationPattern: '[A-za-z]{3,}',
    errorMessage: 'Name of university should contain at least 3 characters',
  },
  {
    label: 'Address:',
    id: 'address',
    type: 'text',
    validationPattern: '.{8,}[^\n]',
    errorMessage: 'Address should contain at least 8 characters',
  },
  {
    label: 'Math score:',
    id: 'mathScore',
    type: 'number',
    validationPattern: '[0-9]{1}',
    errorMessage: 'Please enter valid number',
  },
  {
    label: 'Average score:',
    id: 'universityAverageScore',
    type: 'number',
    validationPattern: '[0-9]{1}',
    errorMessage: 'Please enter valid number',
  },
  {
    label: 'Sex:',
    id: 'sex',
    type: 'radio',
    options: ['Male', 'Female'],
    validationPattern: '\\Male|\\Female',
  },
  {
    label: 'Direction:',
    id: 'directionId',
    type: 'radio',
    options: ['Java', 'Frontend', '.Net', 'Salesforce'],
    validationPattern: '\\Java|\\.Net|\\Frontend|\\Salesforce',
  },
  {
    label: 'E-mail:',
    id: 'email',
    type: 'email',
    validationPattern: '^\\S+@\\S+\\.\\S+$',
    errorMessage: 'Please enter valid email',
  },
  {
    label: 'Skype:',
    id: 'skype',
    type: 'text',
    validationPattern: '.{6,}',
    errorMessage: 'Your Skype login should contain at least 6 characters',
  },
  {
    label: 'Mobile phone:',
    id: 'mobilePhone',
    type: 'text',
    validationPattern: '^\\+375[0-9]{9}$',
    errorMessage: "Mobile phone should be written in format '+375*********'",
  },
];

const subtasksInputs = [
  {
    label: 'Track date:',
    id: 'trackDate',
    type: 'date',
    validationPattern: '([12]\\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\\d|3[01]))',
    errorMessage: 'Enter valid date',
  },
  {
    label: 'Note:',
    id: 'trackNote',
    type: 'textarea',
    validationPattern: '^(.|\\s){10,}$',
    errorMessage: 'Note should contain at least 10 characters',
  },
];

const authInputs = [
  {
    label: 'Email:',
    id: 'email',
    type: 'email',
    validationPattern: '^\\S+@\\S+\\.\\S+$',
    errorMessage: 'Please enter valid email',
  },
  {
    label: 'Password:',
    id: 'password',
    type: 'password',
    validationPattern: '.{8,}',
    errorMessage: 'Password should contain 8 characters',
  },
];

const tasksInputs = [
  {
    label: 'Name:',
    id: 'name',
    type: 'text',
    validationPattern: '.{3,}',
    errorMessage: 'name should contain at least 3 characters',
  },
  {
    label: 'Start date:',
    id: 'startDate',
    type: 'date',
    validationPattern: '([12]\\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\\d|3[01]))',
    errorMessage: 'Enter valid date',
  },
  {
    label: 'Deadline date:',
    id: 'deadlineDate',
    type: 'date',
    validationPattern: '([12]\\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\\d|3[01]))',
    errorMessage: 'Enter valid date',
  },
  {
    label: 'Description:',
    id: 'description',
    type: 'textarea',
    validationPattern: '^(.|\\s){10,}$',
    errorMessage: 'Description should contain at least 10 characters',
  },
];

export { membersInputs, subtasksInputs, authInputs, tasksInputs };
