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

const getCurrentDate = () => {
  const currentTime = new Date().getTime();
  return dateToString(currentTime);
};

const getCurrentDateInMs = () => new Date().getTime();

const convertAge = (Age) => {
  const difference = new Date().getFullYear() - Age;
  const birthDate = new Date().setYear(difference);
  return birthDate;
};

const getDateInWeek = () => {
  const currenatDate = new Date();
  const nextWeek = new Date(currenatDate.getTime() + 7 * 24 * 60 * 60 * 1000).getTime();
  return dateToString(nextWeek);
};

const stringDateToLocaleString = (date) => new Date(date).toLocaleDateString();

const compareDates = (lesserDate, biggerDate) => {
  return stringToDate(lesserDate) <= stringToDate(biggerDate);
};

export {
  convertAge,
  dateToString,
  stringToDate,
  millisecondsToDate,
  millisecondsToAge,
  getCurrentYear,
  getCurrentDate,
  getCurrentDateInMs,
  getDateInWeek,
  stringDateToLocaleString,
  compareDates,
};
