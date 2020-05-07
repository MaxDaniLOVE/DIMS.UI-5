import axios from 'axios';
import { dateToString, convertAge, stringToDate } from '../utils/convertDate';
import convertSexName from '../utils/convertSexName';

export default class Azure {
  api = process.env.REACT_APP_AZURE_API;

  getUsersData = async () => {
    try {
      const members = (await axios.get(`${this.api}/profiles`)).data;
      return this.transformMembersData(members);
    } catch (error) {
      console.error("Can't load members", error.message);
      return error;
    }
  };

  addNewUser = async (user) => {
    try {
      const newUser = this.convertData(user, true, true);
      const response = await axios.post(`${this.api}/create`, newUser);
      return response;
    } catch (error) {
      console.error("Can't add member", error.message);
      return error;
    }
  };

  editUserData = async (user) => {
    try {
      const { id, ...data } = user;
      const convertedData = this.convertData(data, true, true);
      const editedUser = { id, ...convertedData };
      const response = await axios.put(`${this.api}/profile/edit/${id}`, editedUser);
      return response;
    } catch (error) {
      console.error("Can't update member", error.message);
      return error;
    }
  };

  deleteUser = async (id) => {
    try {
      const response = await axios.delete(`${this.api}/profile/delete/${id}`);
      return response;
    } catch (error) {
      console.error("Can't add member", error.message);
      return error;
    }
  };

  getAllTasks = async () => {
    try {
      const tasks = (await axios.get(`${this.api}/tasks`)).data;
      const convertedTasks = tasks.map((task) => this.convertData(task, false, false));
      return convertedTasks;
    } catch (error) {
      console.error("Can't load tasks", error.message);
      return error;
    }
  };

  getUsersTasks = async (userId) => {
    try {
      const userTasks = (await axios.get(`${this.api}/user/tasks/${userId}`)).data;
      const allUsersTasks = userTasks.map((task, index) => {
        const { state, taskName: name, ...convertedTasks } = this.convertData(task, false, false);
        const stateId = this.statesIdsForUI[state.toLowerCase()];
        const userTaskId = index; // TODO REMOVE IT AFTER UPDATING API
        return { ...convertedTasks, stateId, name, userTaskId };
      });
      return allUsersTasks;
    } catch (error) {
      console.error("Can't load tasks", error.message);
      return error;
    }
  };

  onSetUserMark = async (...mark) => {
    try {
      const [state, , TaskId, UserId] = mark;
      const StatusId = this.statesIdsForBackend[state];
      const result = { TaskId, UserId, StatusId };
      const response = axios.put(`${this.api}/user/task`, result);
      return response;
    } catch (error) {
      console.error("Can't set mark", error.message);
      return error;
    }
  };

  addNewTask = async (task) => {
    try {
      const newTask = this.convertData(task, true, true);
      const response = await axios.post(`${this.api}/task/create`, newTask);
      return response;
    } catch (error) {
      console.error("Can't add task", error.message);
      return error;
    }
  };

  transformMembersData = (members) => {
    const transformed = members.map((member) => {
      const { StartDate, FullName, Sex, Age, UserId: id, Direction: directionId, ...dataToTransform } = member;
      const [name, lastName] = FullName.split(' ');
      const startDate = stringToDate(StartDate);
      const birthDate = convertAge(Age);
      const sex = convertSexName(Sex);
      const userData = this.convertData(dataToTransform, false, false);
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

  convertData = (user, isPascalCase, isDateToString) => {
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
          React: 1,
          '.Net': 2,
          Angular: 3,
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
}
