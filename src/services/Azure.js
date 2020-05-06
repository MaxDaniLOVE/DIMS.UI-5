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

  transformMembersData = (members) => {
    const transformed = members.map((member) => {
      const {
        UserId: id,
        FullName,
        Email: email,
        Direction: directionId,
        Sex,
        Education: education,
        Age,
        UniversityAverageScore: universityAverageScore,
        MathScore: mathScore,
        Address: address,
        MobilePhone: mobilePhone,
        Skype: skype,
        StartDate,
      } = member;
      const [name, lastName] = FullName.split(' ');
      const startDate = stringToDate(StartDate);
      const birthDate = convertAge(Age);
      const sex = convertSexName(Sex);
      return {
        address,
        birthDate,
        directionId,
        education,
        email,
        id,
        lastName,
        mathScore,
        mobilePhone,
        name,
        sex,
        skype,
        startDate,
        universityAverageScore,
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
}
