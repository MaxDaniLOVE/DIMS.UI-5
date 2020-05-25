import { dateToString } from './convertDate';

const transformEditData = (pageType, pageData, recievedId) => {
  if (pageType === 'MEMBERS_PAGE') {
    const editedData = pageData.find(({ id }) => id === recievedId);
    const { birthDate, startDate } = editedData;
    return { ...editedData, birthDate: dateToString(birthDate), startDate: dateToString(startDate) };
  }
  if (pageType === 'TASK_PAGE') {
    const editedData = pageData.find(({ taskId }) => taskId === recievedId);
    const { deadlineDate, startDate } = editedData;
    return { ...editedData, deadlineDate: dateToString(deadlineDate), startDate: dateToString(startDate) };
  }
  if (pageType === 'TRACK_PAGE') {
    const editedData = pageData.find(({ taskTrackId }) => taskTrackId === recievedId);
    const { trackDate } = editedData;
    return { ...editedData, trackDate: dateToString(trackDate) };
  }
  return null;
};

export default transformEditData;
