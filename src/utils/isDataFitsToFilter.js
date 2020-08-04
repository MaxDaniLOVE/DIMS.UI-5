import { dateToString } from './convertDate';

const isDataFitsToFilter = (existingData, dataToCompare, key) => {
  if (key.includes('Date')) {
    return dataToCompare === dateToString(existingData);
  }
  if (Array.isArray(dataToCompare)) {
    return dataToCompare.some((element) => element === existingData) || !dataToCompare.length;
  }
  if (typeof existingData === 'string') {
    return existingData.toLowerCase().includes(dataToCompare.toLowerCase());
  }
  if (typeof existingData === 'number') {
    return existingData === +dataToCompare;
  }
  return dataToCompare === existingData;
};

export default isDataFitsToFilter;
