const dateToString = (milliseconds) => {
  if (typeof milliseconds !== 'number') {
    return new Date().toISOString().substr(0, 10);
  }
  return new Date(milliseconds).toISOString().substr(0, 10);
};

const stringToDate = (string) => {
  if (!string.length) {
    return new Date().getTime();
  }
  return Date.parse(string);
};

const millisecondsToDate = (milliseconds) => new Date(milliseconds).toLocaleDateString();

const millisecondsToAge = (milliseconds) => {
  const ageMs = new Date().getTime() - new Date(milliseconds).getTime();
  return new Date(ageMs).getFullYear() - 1970;
};

const getCurrentYear = () => new Date().getFullYear();

export { dateToString, stringToDate, millisecondsToDate, millisecondsToAge, getCurrentYear };
