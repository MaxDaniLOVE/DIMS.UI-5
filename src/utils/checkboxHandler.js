const checkboxHandler = (alreadyAddedData, value, checked) => {
  const helperSet = new Set(alreadyAddedData);

  if (checked) {
    helperSet.add(value);
  } else {
    helperSet.delete(value);
  }

  return [...helperSet];
};

export default checkboxHandler;
