const validation = (data, inputs) => {
  const keys = Object.keys(data);
  const isValidArray = keys.map((key) => {
    if (key === 'id' || key === 'taskId') return true;
    const searchedInput = inputs.find(({ id }) => id === key);
    const regExp = new RegExp(searchedInput.validationPattern);
    return regExp.test(data[key]);
  });
  return isValidArray.every((el) => el);
};

const fieldValidation = (value, errorMessage) => ({
  required: { value: true, errorMessage: "You can't leave empty field" },
  pattern: {
    value,
    errorMessage,
  },
});

export { validation, fieldValidation };
