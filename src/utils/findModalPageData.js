const findModalPageData = (pageType, pageData, recievedId) => {
  const dataToShow = {
    MEMBERS_PAGE: pageData.find(({ id }) => id === recievedId),
    TASK_PAGE: pageData.find(({ taskId }) => taskId === recievedId),
    TRACK_PAGE: pageData.find(({ taskTrackId }) => taskTrackId === recievedId),
  };

  return dataToShow[pageType];
};

export default findModalPageData;
