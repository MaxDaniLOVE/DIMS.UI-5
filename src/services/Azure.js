import axios from 'axios';
import { dateToString } from '../utils/convertDate';

export default class Azure {
  api = process.env.REACT_APP_AZURE_API;

  getUsersData = async () => {
    try {
      const members = (await axios.get(`${this.api}/profiles`)).data;
      return this.transformMembersData(members);
    } catch (error) {
      console.error("Can't load members", error.message);
    }
  };

  addNewUser = async (user) => {
    try {
      const newUser = this.convertNewUSer(user);
      const response = await axios.post(`${this.api}/create`, JSON.stringify(newUser));
      console.log(response);
    } catch (error) {
      console.error("Can't add member", error.message);
    }
  };

  transformMembersData = (members) => {
    const transformed = members.map((member) => {
      const {
        UserId: id,
        FullName,
        Email: email,
        Direction: directionId,
        Sex: sex,
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
      const startDate = Date.parse(StartDate);
      const difference = new Date().getFullYear() - Age;
      const birthDate = new Date().setYear(difference);
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

  convertNewUSer = (user) => {
    const entries = Object.entries(user);
    const withConvertedFields = {};
    entries.map((field) => {
      const [key, value] = field;
      const newKey = key[0].toUpperCase() + key.substring(1);
      let newValue = value;
      if (newKey.includes('Date')) {
        newValue = dateToString(value);
      }
      if (newKey === 'Sex') {
        newValue = value === 'Male' ? 'M' : 'F';
      }
      if (newKey === 'DirectionId') {
        const ids = {
          React: 1,
          '.NET': 2,
          Angular: 3,
          Java: 4,
        };
        newValue = ids[value];
      }
      withConvertedFields[newKey] = newValue;
    });
    return withConvertedFields;
  };
}
