const dateToString = (milliseconds) => {
  const date = new Date(milliseconds).toISOString();
  return date.substr(0, 10);
};

const stringToDate = (string) => {
  // const date = new Date(milliseconds).toISOString();
  return null;
};

export { dateToString, stringToDate };
