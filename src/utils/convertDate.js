const dateToString = (milliseconds) => {
  if (typeof milliseconds !== 'number') {
    return false;
  }
  return new Date(milliseconds).toISOString().substr(0, 10);
};

const stringToDate = (string) => Date.parse(string);

const millisecondsToDate = (milliseconds) => new Date(milliseconds).toLocaleDateString();

const millisecondsToAge = (milliseconds) => {
  const ageMs = new Date().getTime() - new Date(milliseconds).getTime();
  return new Date(ageMs).getFullYear() - 1970;
};

export { dateToString, stringToDate, millisecondsToDate, millisecondsToAge };
