import React from 'react';
import { Subtitle } from '../UI/Titles';

const modalHeaders = (pageType, isEditMode, isDetailMode, { taskName }) => {
  const headers = {
    MEMBERS_PAGE:
      isEditMode || isDetailMode ? <Subtitle>User&apos;s details:</Subtitle> : <Subtitle>Add new user:</Subtitle>,
    TASK_PAGE:
      isEditMode || isDetailMode ? <Subtitle>Task&apos;s details:</Subtitle> : <Subtitle>Add new task:</Subtitle>,
    TRACK_PAGE: <Subtitle>{`Task track - ${taskName}`}</Subtitle>,
  };
  return headers[pageType];
};

export default modalHeaders;
