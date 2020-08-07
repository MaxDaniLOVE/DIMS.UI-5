import {
  getUsers,
  addUser,
  editUser,
  deleteUser,
  getTasks,
  getUserTasks,
  setMark,
  addTask,
  deleteTask,
  editTask,
  setFormData,
  setAssignedMembers,
  getUserProgress,
  deleteUserProgress,
  editUserProgress,
  addUserProgress,
  switchDarkMode,
  reorderTable,
} from './dataActions';

import {
  logIn,
  changeStatus,
  logOut,
  registerUser,
  startAuth,
  endAuth,
  changePassword,
  loginWithGithub,
  loginWithFacebook,
  loginWithGoogle,
} from './authActions';

import { sortData, resetSort, resetFilterData, filterData, setFilterInfo } from './sortActions';

import { throwAlert, removeAlert } from './alertsActions';

export {
  getUsers,
  addUser,
  editUser,
  deleteUser,
  getTasks,
  getUserTasks,
  setMark,
  addTask,
  deleteTask,
  editTask,
  setFormData,
  setAssignedMembers,
  getUserProgress,
  deleteUserProgress,
  editUserProgress,
  addUserProgress,
  logIn,
  changeStatus,
  logOut,
  registerUser,
  switchDarkMode,
  startAuth,
  endAuth,
  changePassword,
  reorderTable,
  loginWithGithub,
  loginWithFacebook,
  loginWithGoogle,
  sortData,
  resetSort,
  throwAlert,
  resetFilterData,
  filterData,
  removeAlert,
  setFilterInfo,
};
