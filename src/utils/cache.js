const addCache = (key, data) => localStorage.setItem(key, JSON.stringify(data));

const loadCache = (key) => (localStorage[key] ? JSON.parse(localStorage[key]) : null);

const removeCacheItemByKey = (key) => localStorage.removeItem(key);

const addDragNDropCache = (key, data) => {
  const ids = data.map(({ id, taskTrackId, taskId, userTaskId }) => {
    if (id) {
      return id;
    }
    if (userTaskId) {
      return userTaskId;
    }
    if (taskTrackId) {
      return taskTrackId;
    }
    if (taskId) {
      return taskId;
    }
    return null;
  });

  addCache(key, ids);
};

const sortCachedData = (key, data) => {
  const order = loadCache(key);

  const dataIdNames = {
    members: 'id',
    progress: 'taskTrackId',
    tasks: 'taskId',
    userTasks: 'userTaskId',
  };

  if (order) {
    const idName = dataIdNames[key];
    const sortedData = [...data];
    sortedData.sort((a, b) => order.indexOf(a[idName]) - order.indexOf(b[idName]));
    return sortedData;
  }

  return data;
};

export { addCache, loadCache, removeCacheItemByKey, addDragNDropCache, sortCachedData };
