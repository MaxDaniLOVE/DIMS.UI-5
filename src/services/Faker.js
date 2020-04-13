import faker from 'faker';
import Firebase from './Firebase';

const db = new Firebase();

export default class Faker {
  genereteUsers = async () => {
    const users = [...new Array(10)].map(() => ({
      directionId: faker.helpers.randomize(['Java', 'Frontend', '.Net', 'Saleforce']),
      name: faker.name.firstName(),
      email: faker.internet.email(),
      lastName: faker.name.lastName(),
      sex: faker.helpers.randomize(['Male', 'Female']),
      education: faker.helpers.randomize(['BSU', 'BSUIR', 'BNTU']),
      birthDate: faker.date.between('1990-01-01', '2000-12-31').getTime(),
      universityAverageScore: faker.finance.amount(4, 10),
      mathScore: faker.finance.amount(4, 10, 1),
      address: faker.address.streetAddress(),
      mobilePhone: faker.phone.phoneNumberFormat(1),
      skype: faker.internet.userName(),
      startDate: faker.date.between('2020-01-01', '2020-04-11').getTime(),
    }));
    users.map((user) => db.addNewUser(user));
  };

  generateUsersTasks = async (userId) => {
    const tasks = await db.database.collection('tasks').get();
    const membersTasks = [...new Array(3)].map(() => ({
      userId,
      taskId: faker.helpers.randomize(tasks.docs).id,
      stateId: faker.random.number({ min: 0, max: 2 }),
    }));
    membersTasks.map((task) => db.database.collection('usersTasks').add(task));
  };
}
