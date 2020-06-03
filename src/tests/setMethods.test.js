import setMethods from '../utils/setMethods';
import { membersInputs, tasksInputs, subtasksInputs } from '../utils/inputs';
import { defaultRegisterData, defaultTaskData, defaultSubtaskData } from '../utils/defaultInputsData';

const defaultProps = {
  getUsers: () => {},
  addUser: () => {},
  editUser: () => {},
  deleteUser: () => {},
  getTasks: () => {},
  addTask: () => {},
  editTask: () => {},
  deleteTask: () => {},
  getUserProgress: () => {},
  addUserProgress: () => {},
  editUserProgress: () => {},
  deleteUserProgress: () => {},
};

describe('Set methods for modal page:', () => {
  it('should return object with members page methods', () => {
    const pageType = 'MEMBERS_PAGE';
    const expected = {
      GET: defaultProps.getUsers,
      ADD: defaultProps.addUser,
      EDIT: defaultProps.editUser,
      DELETE: defaultProps.deleteUser,
      DEFAULT_INPUTS: defaultRegisterData,
      DATA_INPUTS: membersInputs,
    };

    const result = setMethods(defaultProps, pageType);

    expect(result).toMatchObject(expected);
  });
  it('should return object with task page methods', () => {
    const pageType = 'TASK_PAGE';
    const expected = {
      GET: defaultProps.getTasks,
      ADD: defaultProps.addTask,
      EDIT: defaultProps.editTask,
      DELETE: defaultProps.deleteTask,
      DEFAULT_INPUTS: defaultTaskData,
      DATA_INPUTS: tasksInputs,
    };

    const result = setMethods(defaultProps, pageType);

    expect(result).toMatchObject(expected);
  });
  it('should return object with task track page methods', () => {
    const pageType = 'TRACK_PAGE';
    const expected = {
      GET: defaultProps.getUserProgress,
      ADD: defaultProps.addUserProgress,
      EDIT: defaultProps.editUserProgress,
      DELETE: defaultProps.deleteUserProgress,
      DEFAULT_INPUTS: defaultSubtaskData,
      DATA_INPUTS: subtasksInputs,
    };

    const result = setMethods(defaultProps, pageType);

    expect(result).toMatchObject(expected);
  });
});
