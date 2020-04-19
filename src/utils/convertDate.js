const dateToString = (milliseconds) => new Date(milliseconds).toISOString().substr(0, 10);

const stringToDate = (string) => Date.parse(string);

export { dateToString, stringToDate };
