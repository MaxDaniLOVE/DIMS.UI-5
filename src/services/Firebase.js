import firebase from 'firebase';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: `${process.env.REACT_APP_AUTH_DOMAIN}`,
  databaseURL: `${process.env.REACT_APP_DATABASE_URL}`,
  projectId: `${process.env.REACT_APP_PROJECT_ID}`,
  storageBucket: `${process.env.REACT_APP_STORAGE_BUCKET}`,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
};

firebase.initializeApp(firebaseConfig);

export default class Firebase {
  database = firebase.firestore();

  addNewUser = async (user) => {
    try {
      await this.database.collection('users').add(user);
    } catch (error) {
      throw new Error("Can't add new user. Try later.");
    }
  };

  getUserData = async (userId) => {
    let userData;
    try {
      userData = await this.database
        .collection('users')
        .doc(userId)
        .get();
    } catch (error) {
      throw new Error("Can't get user data. Try later.");
    }
    return userData.data();
  };

  getUsersData = async () => {
    let usersData;
    try {
      usersData = await this.database.collection('users').get();
    } catch (error) {
      throw new Error("Can't get users data. Try later.");
    }
    return usersData;
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

  getAllTasks = async () => {
    let tasks;
    try {
      tasks = await this.database.collection('tasks').get();
    } catch (error) {
      throw new Error("Can't load tasks data. Try later.");
    }
    return tasks;
  };

  addNewSubtask = async (subtask) => {
    try {
      await this.database.collection('usersProgress').add(subtask);
    } catch (error) {
      throw new Error("Can't add new subtasks. Try later.");
    }
  };

  deleteSubtask = async (subtaskId) => {
    // TODO add deliting users tasks and progress
    try {
      await this.database
        .collection('usersProgress')
        .doc(subtaskId)
        .delete();
    } catch (error) {
      throw new Error("Can't delete subtasks. Try later.");
    }
  };
}
