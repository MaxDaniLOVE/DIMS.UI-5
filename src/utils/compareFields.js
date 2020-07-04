const compareNumbers = (min, max, numberToCompare) => {
  const { value: minValue } = min;
  const { value: maxValue } = max;
  return numberToCompare >= minValue && numberToCompare <= maxValue;
};

const comparePasswords = (password, passwordToCompare) => password === passwordToCompare;

export { compareNumbers, comparePasswords };
