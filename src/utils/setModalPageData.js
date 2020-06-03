const setModalPageData = (props, pageType) => {
  const { members, tasks, progress } = props;
  const mainData = {
    MEMBERS_PAGE: members,
    TASK_PAGE: tasks,
    TRACK_PAGE: progress,
  };
  return mainData[pageType];
};

export default setModalPageData;
