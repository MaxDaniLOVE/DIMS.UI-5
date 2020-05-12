const convertSexName = (sex) => {
  if (sex.length === 1) {
    return sex === 'M' ? 'Male' : 'Female';
  }
  return sex === 'Male' ? 'M' : 'F';
};

export default convertSexName;
