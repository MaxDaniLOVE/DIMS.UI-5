const findModalPageData = (pageType, pageData, recievedId) => {
  const dataToShow =
    pageType === 'MEMBERS_PAGE'
      ? pageData.find(({ id }) => id === recievedId)
      : pageData.find(({ taskTrackId }) => taskTrackId === recievedId);
  return dataToShow;
};

export default findModalPageData;
