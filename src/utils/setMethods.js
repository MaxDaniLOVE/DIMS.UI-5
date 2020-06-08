/* eslint-disable no-param-reassign */
import { membersInputs, tasksInputs, subtasksInputs } from './inputs';
import { defaultRegisterData, defaultTaskData, defaultSubtaskData } from './defaultInputsData';

const setMethods = (
  {
    getUsers,
    addUser,
    editUser,
    deleteUser,
    getTasks,
    addTask,
    editTask,
    deleteTask,
    getUserProgress,
    addUserProgress,
    editUserProgress,
    deleteUserProgress,
  },
  pageType,
) => {
  const pagesMethods = {
    MEMBERS_PAGE: {
      GET: getUsers,
      ADD: addUser,
      EDIT: editUser,
      DELETE: deleteUser,
      DEFAULT_INPUTS: defaultRegisterData,
      DATA_INPUTS: membersInputs,
    },
    TASK_PAGE: {
      GET: getTasks,
      ADD: addTask,
      EDIT: editTask,
      DELETE: deleteTask,
      DEFAULT_INPUTS: defaultTaskData,
      DATA_INPUTS: tasksInputs,
    },
    TRACK_PAGE: {
      GET: getUserProgress,
      ADD: addUserProgress,
      EDIT: editUserProgress,
      DELETE: deleteUserProgress,
      DEFAULT_INPUTS: defaultSubtaskData,
      DATA_INPUTS: subtasksInputs,
    },
  };
  return pagesMethods[pageType];
};

export default setMethods;
