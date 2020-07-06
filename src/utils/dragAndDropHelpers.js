import { addCache, loadCache } from './cache';

const dataIdNames = {
  members: 'id',
  progress: 'taskTrackId',
  tasks: 'taskId',
  userTasks: 'userTaskId',
};

const addDragNDropCache = (key, data) => {
  const idName = dataIdNames[key];

  const ids = data.map(({ [idName]: id }) => id);

  addCache(key, ids);
};

const sortCachedData = (key, data) => {
  const order = loadCache(key);

  if (order) {
    const idName = dataIdNames[key];
    const sortedData = [...data];
    sortedData.sort((a, b) => order.indexOf(a[idName]) - order.indexOf(b[idName]));
    return sortedData;
  }

  return data;
};

export { addDragNDropCache, sortCachedData };
