/* eslint-disable no-useless-escape */
const membersInputs = [
  {
    label: 'Name:',
    id: 'name',
    type: 'text',
    validationPattern: {
      pattern: {
        value: '[A-za-z]{3,}',
        errorMessage: 'Name should contain at least 3 characters',
      },
    },
  },
  {
    label: 'Last name:',
    id: 'lastName',
    type: 'text',
    validationPattern: {
      pattern: {
        value: '[A-za-z]{2,}',
        errorMessage: 'Last name should contain at least 2 characters',
      },
    },
  },
  {
    label: 'Birth date:',
    id: 'birthDate',
    type: 'date',
    validationPattern: {
      pattern: {
        value: '([12]\\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\\d|3[01]))',
        errorMessage: 'Enter valid date',
      },
    },
  },
  {
    label: 'Start date:',
    id: 'startDate',
    type: 'date',
    validationPattern: {
      pattern: {
        value: '([12]\\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\\d|3[01]))',
        errorMessage: 'Enter valid date',
      },
    },
    dateToCompare: 'birthDate',
  },
  {
    label: 'Education:',
    id: 'education',
    type: 'text',
    validationPattern: {
      pattern: {
        value: '[A-za-z]{3,}',
        errorMessage: 'Name of university should contain at least 3 characters',
      },
    },
  },
  {
    label: 'Address:',
    id: 'address',
    type: 'text',
    validationPattern: {
      pattern: {
        value: '.{8,}[^\n]',
        errorMessage: 'Address should contain at least 8 characters',
      },
    },
  },
  {
    label: 'Math score:',
    id: 'mathScore',
    type: 'number',
    validationPattern: {
      pattern: {
        value: '[0-9]{1}',
        errorMessage: 'Please enter valid number',
      },
      min: {
        value: 4,
        errorMessage: "It can't be lesser than 4",
      },
      max: {
        value: 10,
        errorMessage: "It can't be greater than 10",
      },
    },
  },
  {
    label: 'Average score:',
    id: 'universityAverageScore',
    type: 'number',
    validationPattern: {
      pattern: {
        value: '[0-9]{1}',
        errorMessage: 'Please enter valid number',
      },
      min: {
        value: 4,
        errorMessage: "It can't be lesser than 4",
      },
      max: {
        value: 10,
        errorMessage: "It can't be greater than 10",
      },
    },
  },
  {
    label: 'Sex:',
    id: 'sex',
    type: 'radio',
    options: ['Male', 'Female'],
    validationPattern: {
      pattern: {
        value: '\\Male|\\Female',
      },
    },
  },
  {
    label: 'Direction:',
    id: 'directionId',
    type: 'radio',
    options: ['Java', 'Frontend', '.Net', 'Salesforce'],
    validationPattern: {
      pattern: {
        value: '\\Java|\\.Net|\\Frontend|\\Salesforce',
      },
    },
  },
  {
    label: 'E-mail:',
    id: 'email',
    type: 'email',
    validationPattern: {
      pattern: {
        value: '^\\S+@\\S+\\.\\S+$',
        errorMessage: 'Please enter valid email',
      },
    },
  },
  {
    label: 'Skype:',
    id: 'skype',
    type: 'text',
    validationPattern: {
      pattern: {
        value: '.{6,}',
        errorMessage: 'Your Skype login should contain at least 6 characters',
      },
    },
  },
  {
    label: 'Mobile phone:',
    id: 'mobilePhone',
    type: 'text',
    validationPattern: {
      pattern: {
        value: '^\\+375[0-9]{9}$',
        errorMessage: "Mobile phone should be written in format '+375*********'",
      },
    },
  },
];

const subtasksInputs = [
  {
    label: 'Track date:',
    id: 'trackDate',
    type: 'date',
    validationPattern: {
      pattern: {
        value: '([12]\\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\\d|3[01]))',
        errorMessage: 'Enter valid date',
      },
    },
  },
  {
    label: 'Note:',
    id: 'trackNote',
    type: 'textarea',
    validationPattern: {
      pattern: {
        value: '^(.|\\s){10,}$',
        errorMessage: 'Note should contain at least 10 characters',
      },
    },
  },
];

const authInputs = [
  {
    label: 'Email:',
    id: 'email',
    type: 'email',
    validationPattern: {
      pattern: {
        value: '^\\S+@\\S+\\.\\S+$',
        errorMessage: 'Please enter valid email',
      },
    },
  },
  {
    label: 'Password:',
    id: 'password',
    type: 'password',
    validationPattern: {
      pattern: {
        value: '.{8,}',
        errorMessage: 'Password should contain 8 characters',
      },
    },
  },
];

const tasksInputs = [
  {
    label: 'Name:',
    id: 'name',
    type: 'text',
    validationPattern: {
      pattern: {
        value: '.{3,}',
        errorMessage: 'Name should contain at least 3 characters',
      },
    },
  },
  {
    label: 'Start date:',
    id: 'startDate',
    type: 'date',
    validationPattern: {
      pattern: {
        value: '([12]\\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\\d|3[01]))',
        errorMessage: 'Enter valid date',
      },
    },
  },
  {
    label: 'Deadline date:',
    id: 'deadlineDate',
    type: 'date',
    validationPattern: {
      pattern: {
        value: '([12]\\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\\d|3[01]))',
        errorMessage: 'Enter valid date',
      },
    },
    dateToCompare: 'startDate',
  },
  {
    label: 'Description:',
    id: 'description',
    type: 'textarea',
    validationPattern: {
      pattern: {
        value: '^(.|\\s){10,}$',
        errorMessage: 'Description should contain at least 10 characters',
      },
    },
  },
];

const inTouchInputs = [
  {
    label: 'Full name:',
    id: 'fullName',
    type: 'text',
    validationPattern: {
      pattern: {
        value: '.{5,}',
        errorMessage: 'Full name should contain at least 5 characters',
      },
    },
  },
  {
    label: 'Email:',
    id: 'email',
    type: 'email',
    validationPattern: {
      pattern: {
        value: '^\\S+@\\S+\\.\\S+$',
        errorMessage: 'Please enter valid email',
      },
    },
  },
  {
    label: 'Message:',
    id: 'message',
    type: 'textarea',
    validationPattern: {
      pattern: {
        value: '^(.|\\s){10,}$',
        errorMessage: 'Message should contain at least 10 characters',
      },
    },
  },
];

const changePassInputs = [
  {
    label: 'Password:',
    id: 'password',
    type: 'password',
    validationPattern: {
      pattern: {
        value: '.{8,}',
        errorMessage: 'Password should contain 8 characters',
      },
    },
  },
];

export { membersInputs, subtasksInputs, authInputs, tasksInputs, inTouchInputs, changePassInputs };
