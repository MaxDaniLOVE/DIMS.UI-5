import isDataFitsToFilter from './isDataFitsToFilter';

const filterHelper = (dataToFilter, filterInfo) => {
  const keys = Object.keys(filterInfo);

  return dataToFilter.filter((item) => {
    const isEqualsArray = keys.map((key) => {
      if (!filterInfo[key]) {
        return true;
      }
      if (key === 'minAge') {
        const { age } = item;
        return age >= filterInfo[key];
      }
      if (key === 'maxAge') {
        const { age } = item;
        return age <= filterInfo[key];
      }
      return isDataFitsToFilter(item[key], filterInfo[key], key);
    });
    return isEqualsArray.every((element) => element);
  });
};

export default filterHelper;
