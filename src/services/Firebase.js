import firebase from 'firebase';
import firebaseConfig from './firebase.config';

firebase.initializeApp(firebaseConfig);

export default class Firebase {
  database = firebase.firestore();

  addNewUser = async (user) => {
    try {
      const newUser = await this.database.collection('users').add(user);
      return newUser;
    } catch (error) {
      throw new Error("Can't add new user. Try later.");
    }
  };

  getUserData = async (userId) => {
    try {
      const userData = await this.database
        .collection('users')
        .doc(userId)
        .get();
      return userData.data();
    } catch (error) {
      throw new Error("Can't get user data. Try later.");
    }
  };

  getUsersData = async () => {
    try {
      const usersData = await this.database.collection('users').get();
      return usersData;
    } catch (error) {
      throw new Error("Can't get users data. Try later.");
    }
  };

  getUsersTasks = async (id) => {
    const allData = [];
    const data = await this.database
      .collection('usersTasks')
      .where('userId', '==', id)
      .get();
    data.forEach((task) => {
      allData.push({ ...task.data(), userTaskId: task.id });
    });
    const withAllData = allData.map((task) => {
      const { taskId } = task;
      const allTaskData = this.getTasks(taskId);
      return allTaskData;
    });
    const tasksInfo = await Promise.all(withAllData);
    return allData.map((el, idx) => ({ ...el, tasksInfo: tasksInfo[idx] }));
  };

  getTasks = async (id) => {
    const taskData = await this.database
      .collection('tasks')
      .doc(id)
      .get();
    return taskData.data();
  };

  getUsersProgress = async (id) => {
    let userProgress;
    try {
      userProgress = await this.database
        .collection('usersProgress')
        .where('userId', '==', id)
        .get();
    } catch (error) {
      throw new Error("Can't get user progress. Try later.");
    }
    const userProgressData = [];
    userProgress.forEach((el) => userProgressData.push({ ...el.data(), taskTrackId: el.id }));
    return userProgressData;
  };

  editUserData = async (newData) => {
    try {
      await this.database
        .collection('users')
        .doc(newData.id)
        .set(newData, { merge: true });
    } catch (error) {
      throw new Error("Can't update user data. Try later.");
    }
  };

  deleteUser = async (id) => {
    // TODO add deliting users tasks and progress
    try {
      await this.database
        .collection('users')
        .doc(id)
        .delete();
    } catch (error) {
      throw new Error("Can't delete user data. Try later.");
    }
  };
}
