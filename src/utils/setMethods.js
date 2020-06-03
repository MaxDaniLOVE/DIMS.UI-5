/* eslint-disable no-param-reassign */
import { membersInputs, tasksInputs, subtasksInputs } from './inputs';
import { defaultRegisterData, defaultTaskData, defaultSubtaskData } from './defaultInputsData';

const setMethods = (props, pageType) => {
  const pagesMethods = {
    MEMBERS_PAGE: {
      GET: props.getUsers,
      ADD: props.addUser,
      EDIT: props.editUser,
      DELETE: props.deleteUser,
      DEFAULT_INPUTS: defaultRegisterData,
      DATA_INPUTS: membersInputs,
    },
    TASK_PAGE: {
      GET: props.getTasks,
      ADD: props.addTask,
      EDIT: props.editTask,
      DELETE: props.deleteTask,
      DEFAULT_INPUTS: defaultTaskData,
      DATA_INPUTS: tasksInputs,
    },
    TRACK_PAGE: {
      GET: props.getUserProgress,
      ADD: props.addUserProgress,
      EDIT: props.editUserProgress,
      DELETE: props.deleteUserProgress,
      DEFAULT_INPUTS: defaultSubtaskData,
      DATA_INPUTS: subtasksInputs,
    },
  };
  return pagesMethods[pageType];
};

export default setMethods;
