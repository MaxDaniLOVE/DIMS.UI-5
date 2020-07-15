import axios from 'axios';
import { dateToString, stringToDate } from '../utils/convertDate';
import convertSexName from '../utils/convertSexName';
import {
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
} from './heroku.config';

export default class Heroku {
  api = process.env.REACT_APP_HEROKU_API;

  getUsersData = async () => {
    try {
      const { data: members } = await axios.get(getUsersUrl);
      return this.transformMembersData(members);
    } catch (error) {
      throw new Error("Can't load members. Please, try later.");
    }
  };

  addNewUser = async (user) => {
    try {
      const newUser = this.convertData(user, true, true);
      const response = await axios.post(addUserUrl, newUser);
      return response;
    } catch (error) {
      throw new Error("Can't add member. Please, try later.");
    }
  };

  editUserData = async (user) => {
    try {
      const { id, ...data } = user;
      const convertedData = this.convertData(data, true, true);
      const editedUser = { id, ...convertedData };
      const response = await axios.put(`${editUserUrl}/${id}`, editedUser);
      return response;
    } catch (error) {
      throw new Error("Can't update member. Please, try later.");
    }
  };

  deleteUser = async (id) => {
    try {
      const response = await axios.delete(`${deleteUserUrl}/${id}`);
      return response;
    } catch (error) {
      throw new Error("Can't delete member. Please, try later.");
    }
  };

  getAllTasks = async () => {
    try {
      const tasks = (await axios.get(getTasksUrl)).data;
      const convertedTasks = tasks.map((task) => this.convertData(task));
      return convertedTasks;
    } catch (error) {
      throw new Error("Can't load tasks. Please, try later.");
    }
  };

  getUsersTasks = async (userId) => {
    try {
      const { data: userTasks } = await axios.get(`${getUsersTasksUrl}/${userId}`);
      const allUsersTasks = userTasks.map((task) => {
        const { state, taskName: name, ...convertedTasks } = this.convertData(task);
        const stateId = this.statesIdsForUI[state.toLowerCase()];
        return { ...convertedTasks, stateId, name };
      });
      return allUsersTasks;
    } catch (error) {
      throw new Error("Can't load tasks. Please, try later.");
    }
  };

  onSetUserMark = async (...mark) => {
    try {
      const [state, , TaskId, UserId] = mark;
      const StatusId = this.statesIdsForBackend[state];
      const result = { TaskId, UserId, StatusId };
      const response = await axios.put(setMarkUrl, result);
      return response;
    } catch (error) {
      throw new Error("Can't set mark. Please, try later.");
    }
  };

  addNewTask = async (task, assignedMembers) => {
    try {
      const newTask = this.convertData(task, true, true);
      const {
        data: { TaskId },
      } = await axios.post(addTaskUrl, newTask);
      await this.assignTaskToUsers(TaskId, assignedMembers);
      return TaskId;
    } catch (error) {
      throw new Error("Can't add task. Please, try later.");
    }
  };

  deleteTask = async (id) => {
    try {
      const response = await axios.delete(`${deleteTaskUrl}/${id}`);
      return response;
    } catch (error) {
      throw new Error("Can't delete task. Please, try later.");
    }
  };

  editTask = async (task, assignedMembers) => {
    try {
      const { taskId } = task;
      const newTask = this.convertData(task, true, true);
      const response = await axios.put(editTaskUrl, newTask);
      await this.assignTaskToUsers(taskId, assignedMembers);
      return response;
    } catch (error) {
      throw new Error("Can't update task. Please, try later.");
    }
  };

  assignTaskToUsers = async (id, users) => {
    try {
      const response = await axios.post(`${assignTaskUrl}/${id}`, users);
      return response;
    } catch (error) {
      throw new Error("Can't update task. Please, try later.");
    }
  };

  getAssignedUsers = async (taskId) => {
    try {
      const { data } = await axios.get(`${getAssignedUsersUrl}/${taskId}`);
      return data;
    } catch (error) {
      throw new Error("Can't load users. Please, try later.");
    }
  };

  isUserExists = async (userEmail) => {
    try {
      const { data: isUserExists } = await axios.get(`${isUserExistsUrl}/${userEmail}`);
      if (!isUserExists) {
        throw new Error('User is not added to database. Try later.');
      }
      return isUserExists;
    } catch (error) {
      throw new Error('An error occured. Please, try later.');
    }
  };

  getUserRole = (email) => {
    const { REACT_APP_ADMIN_MAIL, REACT_APP_MENTOR_MAIL } = process.env;
    switch (email) {
      case REACT_APP_ADMIN_MAIL:
        return { email, role: 'ADMIN' };
      case REACT_APP_MENTOR_MAIL:
        return { email, role: 'MENTOR' };
      default:
        return { email, role: 'USER' };
    }
  };

  getUserDataByEmail = async (userEmail) => {
    try {
      const userData = await this.getUsersData();
      const user = userData.filter(({ email: fetchedMail }) => fetchedMail === userEmail)[0];
      if (user) {
        const { email, id: userId, name: userName } = user;
        return { email, userId, userName };
      }
      return null;
    } catch (error) {
      throw new Error('An error occured. Please, try later.');
    }
  };

  getUserById = async (id) => {
    try {
      const { data } = await axios.get(`${getUserByIdUrl}/${id}`);
      const { FullName, ...userData } = data;
      const [name, lastName] = FullName.split(' ');
      return { name, lastName, ...this.convertData(userData) };
    } catch (error) {
      throw new Error("Can't load members. Please, try later.");
    }
  };

  getUsersProgress = async (id) => {
    try {
      const { data } = await axios.get(`${getProgressUrl}/${id}`);
      return data.map((track) => this.convertData(track));
    } catch (error) {
      throw new Error("Can't load user progress. Please, try later.");
    }
  };

  addNewSubtask = async (track) => {
    try {
      const newTrack = this.convertData(track, true, true);
      const response = await axios.post(addProgressUrl, newTrack);
      return response;
    } catch (error) {
      throw new Error("Can't add user progress. Please, try later.");
    }
  };

  editUserProgress = async (newTrack) => {
    try {
      const updatedTrack = this.convertData(newTrack, true, true);
      const response = await axios.put(editProgressUrl, updatedTrack);
      return response;
    } catch (error) {
      throw new Error("Can't update track. Please, try later.");
    }
  };

  deleteSubtask = async (id) => {
    try {
      const response = await axios.delete(`${deleteProgressUrl}/${id}`);
      return response;
    } catch (error) {
      throw new Error("Can't delete track. Please, try later.");
    }
  };

  transformMembersData = (members) => {
    const transformed = members.map((member) => {
      const { StartDate, FullName, Sex, BirthDate, UserId, Direction: directionId, ...dataToTransform } = member;
      const [name, lastName] = FullName.split(' ');
      const startDate = stringToDate(StartDate);
      const birthDate = stringToDate(BirthDate);
      const sex = convertSexName(Sex);
      const userData = this.convertData(dataToTransform);
      const id = `${UserId}`;
      return {
        id,
        directionId,
        birthDate,
        lastName,
        name,
        sex,
        startDate,
        ...userData,
      };
    });
    return transformed;
  };

  convertData = (user, isPascalCase = false, isDateToString = false) => {
    const entries = Object.entries(user);
    const withConvertedFields = {};
    entries.map((field) => {
      const [key, value] = field;
      const newKey = isPascalCase ? key[0].toUpperCase() + key.substring(1) : key[0].toLowerCase() + key.substring(1);
      let newValue = value;
      if (newKey.includes('Date')) {
        newValue = isDateToString ? dateToString(value) : stringToDate(value);
      }
      if (newKey === 'Sex') {
        newValue = convertSexName(value);
      }
      if (newKey === 'DirectionId') {
        const ids = {
          Frontend: 1,
          '.Net': 2,
          Salesforce: 3,
          Java: 4,
        };
        newValue = ids[value];
      }
      withConvertedFields[newKey] = newValue;
      return newValue;
    });
    return withConvertedFields;
  };

  statesIdsForUI = {
    active: 2,
    done: 1,
    failed: 0,
  };

  statesIdsForBackend = {
    active: 1,
    success: 2,
    fail: 3,
  };

  sendMail = async (mailData) => {
    try {
      await axios.post(sendMailUrl, mailData);
    } catch (error) {
      throw new Error("Can't send message. Please, try later.");
    }
  };

  sendMailToUser = async (mailData) => {
    try {
      await axios.post(sendUserMailUrl, mailData);
    } catch (error) {
      throw new Error("Can't send message. Please, try later.");
    }
  };
}
