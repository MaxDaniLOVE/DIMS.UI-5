const removeStartNumbers = (string) => {
  const { index } = /[a-z]/.exec(string);
  return string.slice(index);
};

export default removeStartNumbers;
