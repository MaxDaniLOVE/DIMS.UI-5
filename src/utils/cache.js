const addCache = (key, data) => localStorage.setItem(key, JSON.stringify(data));

const loadCache = (key) => (localStorage[key] ? JSON.parse(localStorage[key]) : null);

const removeCache = (key) => localStorage.removeItem(key);

export { addCache, loadCache, removeCache };
