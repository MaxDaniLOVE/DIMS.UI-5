const api = process.env.REACT_APP_HEROKU_API;

const getUsersUrl = `${api}/profiles`;
const addUserUrl = `${api}/create`;
const editUserUrl = `${api}/profile/edit`;
const deleteUserUrl = `${api}/profile/delete`;
const isUserExistsUrl = `${api}/profile/exists`;
const getUserByIdUrl = `${api}/profile/details`;

const getTasksUrl = `${api}/tasks`;
const addTaskUrl = `${api}/task/create`;
const deleteTaskUrl = `${api}/task/delete`;
const editTaskUrl = `${api}/task/edit`;
const getAssignedUsersUrl = `${api}/task/users`;

const getUsersTasksUrl = `${api}/user/tasks`;
const setMarkUrl = `${api}/user/task`;
const assignTaskUrl = `${api}/user/task/add`;

const getProgressUrl = `${api}/user/tracks`;
const addProgressUrl = `${api}/track/create`;
const editProgressUrl = `${api}/user/tracks`;
const deleteProgressUrl = `${api}/user/tracks/delete`;

const sendMailUrl = `${api}/intouch`;
const sendUserMailUrl = `${api}/notify_user`;

export {
  getUsersUrl,
  addUserUrl,
  editUserUrl,
  deleteUserUrl,
  getTasksUrl,
  addTaskUrl,
  deleteTaskUrl,
  editTaskUrl,
  assignTaskUrl,
  getAssignedUsersUrl,
  isUserExistsUrl,
  getUsersTasksUrl,
  setMarkUrl,
  getUserByIdUrl,
  getProgressUrl,
  addProgressUrl,
  editProgressUrl,
  deleteProgressUrl,
  sendMailUrl,
  sendUserMailUrl,
};
