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
      throw new Error(error);
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
      throw new Error(error);
    }
    return userData.data();
  };

  getUsersData = async () => {
    let usersData;
    try {
      usersData = await this.database.collection('users').get();
    } catch (error) {
      throw new Error(error);
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
}
