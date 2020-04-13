const addCache = (key, data) => {
  const stringifyedData = JSON.stringify(data);
  localStorage.setItem(key, stringifyedData);
};

const loadCache = (key) => {
  if (!localStorage[key]) {
    return null;
  }
  const parsedData = JSON.parse(localStorage[key]);
  return parsedData;
};

export { addCache, loadCache };
