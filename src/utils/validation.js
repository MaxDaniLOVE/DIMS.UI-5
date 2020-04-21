const validation = (data, inputs) => {
  const keys = Object.keys(data);
  const isValidArray = keys.map((key) => {
    const searchedInput = inputs.find(({ id }) => id === key);
    return searchedInput.validationPattern.test(data[key]);
  });
  return isValidArray.reduce((prev, current) => prev && current);
};

export default validation;
