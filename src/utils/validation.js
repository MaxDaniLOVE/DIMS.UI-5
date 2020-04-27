const validation = (data, inputs) => {
  const keys = Object.keys(data);
  const isValidArray = keys.map((key) => {
    const searchedInput = inputs.find(({ id }) => id === key);
    const regExp = new RegExp(searchedInput.validationPattern);
    console.log(regExp);
    console.log(key, regExp.test(data[key]));
    return regExp.test(data[key]);
  });
  return isValidArray.reduce((prev, current) => prev && current);
};

export default validation;
