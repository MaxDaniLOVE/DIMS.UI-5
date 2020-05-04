import axios from 'axios';

export default class Azure {
  api = process.env.REACT_APP_AZURE_API;

  getMembers = async () => {
    try {
      const members = (await axios.get(`${this.api}/profiles`)).data;
      return this.transformMembersData(members);
    } catch (error) {
      console.error("Can't load members", error.message);
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
}
