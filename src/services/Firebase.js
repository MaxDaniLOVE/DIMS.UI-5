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
      console.error("Can't add new user. Try later.");
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
      console.error("Can't get user data. Try later.");
    }
  };

  getUsersData = async () => {
    try {
      const usersData = await this.database.collection('users').get();
      return usersData;
    } catch (error) {
      console.error("Can't get users data. Try later.");
    }
  };

  getUsersTasks = async (id) => {
    const data = await this.database
      .collection('usersTasks')
      .where('userId', '==', id)
      .get();

    const allData = data.docs.map((task) => ({ ...task.data(), userTaskId: task.id }));
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
      console.error("Can't get user progress. Try later.");
    }
    const userProgressData = userProgress.docs.map((el) => ({ ...el.data(), taskTrackId: el.id }));
    return userProgressData;
  };

  editUserData = async (newData) => {
    const { id } = newData;
    const updatedData = { ...newData };
    delete updatedData.id;
    try {
      await this.database
        .collection('users')
        .doc(id)
        .set(updatedData, { merge: true });
    } catch (error) {
      console.error("Can't update user data. Try later.");
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
      console.error("Can't delete user data. Try later.");
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
      console.error("Can't add new subtasks. Try later.");
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
      console.error("Can't delete subtasks. Try later.");
    }
  };

  editUserProgress = async (newData) => {
    const { taskTrackId } = newData;
    const updatedData = { ...newData };
    delete updatedData.taskTrackId;
    try {
      await this.database
        .collection('usersProgress')
        .doc(taskTrackId)
        .set(updatedData, { merge: true });
    } catch (error) {
      console.error("Can't update subtask data. Try later.");
    }
  };

  addNewTask = async (newTask) => {
    try {
      const task = await this.database.collection('tasks').add(newTask);
      return task.id;
    } catch (error) {
      console.error("Can't add new tasks. Try later.");
    }
  };

  addUserTask = async (newUserTask) => {
    try {
      const task = await this.database.collection('usersTasks').add(newUserTask);
      return task.id;
    } catch (error) {
      console.error("Can't add new user tasks. Try later.");
    }
  };

  deleteTask = async (taskId) => {
    // TODO add deliting users progress
    try {
      await this.database
        .collection('tasks')
        .doc(taskId)
        .delete();
    } catch (error) {
      console.error("Can't delete tasks. Try later.");
    }
  };

  getAssignedUsers = async (taskId) => {
    try {
      const userTasks = await this.database
        .collection('usersTasks')
        .where('taskId', '==', taskId)
        .get();
      return userTasks.docs.map((task) => task.data().userId);
    } catch (error) {
      console.error("Can't get assigned users. Try later.");
    }
  };

  editTask = async (newTask, assignedMembers) => {
    const { taskId } = newTask;
    const updatedData = { ...newTask };
    delete updatedData.taskId;
    try {
      await this.database
        .collection('tasks')
        .doc(taskId)
        .set(updatedData, { merge: true });
      await this.updateAssignedUsers(taskId, assignedMembers);
    } catch (error) {
      console.error("Can't update task data. Try later.");
    }
  };

  updateAssignedUsers = async (taskId, assignedMembers) => {
    try {
      const alreadyAssignedUsers = await this.getAssignedUsers(taskId);
      const unassignedUsers = assignedMembers.filter((el) => !alreadyAssignedUsers.includes(el));
      const userTasks = await this.database
        .collection('usersTasks')
        .where('taskId', '==', taskId)
        .get();
      const tasksToDelete = [];
      userTasks.docs.map(async (task) => {
        const taskObject = task.data();
        const { userId } = taskObject;
        if (!assignedMembers.includes(userId)) {
          tasksToDelete.push(task.id);
          return false;
        }
        return task.id;
      });
      unassignedUsers.map((userId) => {
        const userTask = { stateId: 2, taskId, userId };
        this.addUserTask(userTask);
        return userTask;
      });
      tasksToDelete.map((task) => this.deleteUserTask(task));
    } catch (error) {
      console.error("Can't update assigned users. Try later.", error);
    }
  };

  deleteUserTask = async (userTaskId) => {
    try {
      await this.database
        .collection('usersTasks')
        .doc(userTaskId)
        .delete();
    } catch (error) {
      console.error("Can't delete tasks. Try later.");
    }
  };
}
