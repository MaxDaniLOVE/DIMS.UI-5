const dateToString = (milliseconds) => {
  const date = new Date(milliseconds).toISOString();
  return date.substr(0, 10);
};

const stringToDate = (string) => {
  const date = Date.parse(string);
  return date;
};

export { dateToString, stringToDate };
