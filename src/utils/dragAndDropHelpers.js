import { addCache, loadCache } from './cache';

const dataIdNames = {
  members: 'id',
  progress: 'taskTrackId',
  tasks: 'taskId',
  userTasks: 'userTaskId',
};

const addDragNDropCache = (key, data, userId) => {
  const idName = dataIdNames[key];

  const ids = data.map(({ [idName]: id }) => id);

  const fullKey = userId ? `${key}_${userId}` : key;

  addCache(fullKey, ids);
};

const sortCachedData = (key, data) => {
  const order = loadCache(key);

  const keyWithoutId = key.split('_')[0];

  if (order) {
    const idName = dataIdNames[keyWithoutId];

    const sortedData = [...data];
    sortedData.sort((a, b) => order.indexOf(a[idName]) - order.indexOf(b[idName]));
    return sortedData;
  }

  return data;
};

export { addDragNDropCache, sortCachedData };
