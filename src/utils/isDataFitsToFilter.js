import { dateToString } from './convertDate';

const isDataFitsToFilter = (existingData, dataToCompare, key) => {
  if (key.includes('Date')) {
    return dataToCompare === dateToString(existingData);
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