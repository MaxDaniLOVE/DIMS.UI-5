import React from 'react';

const modalHeaders = (pageType, isEditMode, isDetailMode, { taskName }) => {
  const headers = {
    MEMBERS_PAGE: isEditMode || isDetailMode ? <h3>User&apos;s details:</h3> : <h3>Add new user:</h3>,
    TASK_PAGE: isEditMode || isDetailMode ? <h3>Task&apos;s details:</h3> : <h3>Add new task:</h3>,
    TRACK_PAGE: <h3>{`Task track - ${taskName}`}</h3>,
  };
  return headers[pageType];
};

export default modalHeaders;
