import { millisecondsToAge } from './convertDate';

const addAgeFieldToUsers = (users) =>
  users.map(({ birthDate, ...data }) => ({
    ...data,
    birthDate,
    age: millisecondsToAge(birthDate),
  }));

export default addAgeFieldToUsers;
