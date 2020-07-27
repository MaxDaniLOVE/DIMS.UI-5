import isDataFitsToFilter from './isDataFitsToFilter';

const filterHelper = (dataToFilter, filterInfo) => {
  const keys = Object.keys(filterInfo);

  return dataToFilter.filter((item) => {
    const isEqualsArray = keys.map((key) => {
      if (!filterInfo[key]) {
        return true;
      }
      return isDataFitsToFilter(item[key], filterInfo[key], key);
    });
    return isEqualsArray.every((element) => element);
  });
};

export default filterHelper;
