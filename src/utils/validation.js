const validation = (data, inputs) => {
  const keys = Object.keys(data);
  const isValidArray = keys.map((key) => {
    if (key === 'id' || key === 'taskId') return true;
    let radioId;
    if (key.includes('_')) {
      radioId = key.slice(0, key.indexOf('_'));
    }
    const searchedInput = inputs.find(({ id }) => id === key) || inputs.find(({ id }) => id === radioId);
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
