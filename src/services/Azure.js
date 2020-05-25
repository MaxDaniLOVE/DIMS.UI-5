import axios from 'axios';
import { dateToString, convertAge, stringToDate } from '../utils/convertDate';
import convertSexName from '../utils/convertSexName';

export default class Azure {
  api = process.env.REACT_APP_AZURE_API;

  getUsersData = async () => {
    try {
      const { data: members } = await axios.get(`${this.api}/profiles`);
      return this.transformMembersData(members);
    } catch (error) {
      throw new Error("Can't load members. Please, try later.");
    }
  };

  addNewUser = async (user) => {
    try {
      const newUser = this.convertData(user, true, true);
      const response = await axios.post(`${this.api}/create`, newUser);
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
      const response = await axios.put(`${this.api}/profile/edit/${id}`, editedUser);
      return response;
    } catch (error) {
      throw new Error("Can't update member. Please, try later.");
    }
  };

  deleteUser = async (id) => {
    try {
      const response = await axios.delete(`${this.api}/profile/delete/${id}`);
      return response;
    } catch (error) {
      throw new Error("Can't delete member. Please, try later.");
    }
  };

  getAllTasks = async () => {
    try {
      const tasks = (await axios.get(`${this.api}/tasks`)).data;
      const convertedTasks = tasks.map((task) => this.convertData(task));
      return convertedTasks;
    } catch (error) {
      throw new Error("Can't load tasks. Please, try later.");
    }
  };

  getUsersTasks = async (userId) => {
    try {
      const { data: userTasks } = await axios.get(`${this.api}/user/tasks/${userId}`);
      const allUsersTasks = userTasks.map((task, index) => {
        const { state, taskName: name, ...convertedTasks } = this.convertData(task);
        const stateId = this.statesIdsForUI[state.toLowerCase()];
        const userTaskId = index; // TODO REMOVE IT AFTER UPDATING API
        return { ...convertedTasks, stateId, name, userTaskId };
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
      const response = await axios.put(`${this.api}/user/task`, result);
      return response;
    } catch (error) {
      throw new Error("Can't set mark. Please, try later.");
    }
  };

  addNewTask = async (task, assignedMembers) => {
    // TODO add assigning members after fixing backend
    try {
      const newTask = this.convertData(task, true, true);
      const response = await axios.post(`${this.api}/task/create`, newTask);
      return response;
    } catch (error) {
      console.error("Can't add task. Please, try later.", error.message); // TODO change to `Throw new Error()` after fixing backend
      return error;
    }
  };

  deleteTask = async (id) => {
    try {
      const response = await axios.delete(`${this.api}/task/delete/${id}`);
      return response;
    } catch (error) {
      throw new Error("Can't delete task. Please, try later.");
    }
  };

  editTask = async (task, assignedMembers) => {
    try {
      const { taskId } = task;
      const newTask = this.convertData(task, true, true);
      const response = await axios.put(`${this.api}/task/edit`, newTask);
      await this.assignTaskToUsers(taskId, assignedMembers);
      return response;
    } catch (error) {
      throw new Error("Can't update task. Please, try later.");
    }
  };

  assignTaskToUsers = async (id, users) => {
    try {
      const response = await axios.post(`${this.api}/user/task/add/${id}`, users);
      return response;
    } catch (error) {
      throw new Error("Can't update task. Please, try later.");
    }
  };

  isUserExists = async (userEmail) => {
    try {
      const userData = await this.getUsersData();
      const isUserExists = userData.filter(({ email }) => email === userEmail);
      if (!isUserExists.length) {
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
      const { data } = await axios.get(`${this.api}/profile/details/${id}`);
      const { FullName, ...userData } = data;
      const [name, lastName] = FullName.split(' ');
      return { name, lastName, ...this.convertData(userData) };
    } catch (error) {
      throw new Error("Can't load members. Please, try later.");
    }
  };

  getUsersProgress = async (id) => {
    // TODO add feature after backend will be ready
    throw new Error('Sorry, but feature for this page is still being drafted.');
  };

  transformMembersData = (members) => {
    const transformed = members.map((member) => {
      const { StartDate, FullName, Sex, Age, UserId, Direction: directionId, ...dataToTransform } = member;
      const [name, lastName] = FullName.split(' ');
      const startDate = stringToDate(StartDate);
      const birthDate = convertAge(Age);
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
