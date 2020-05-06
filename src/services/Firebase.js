import firebase from 'firebase';
import firebaseConfig from './firebase.config';

firebase.initializeApp(firebaseConfig);

export default class Firebase {
  database = firebase.firestore();

  getUserDataByEmail = async (email) => {
    try {
      const user = await this.database
        .collection('users')
        .where('email', '==', email)
        .get();
      const userId = user.docs[0].id;
      const userName = user.docs[0].data().name;
      return { userId, userName };
    } catch (error) {
      console.error('User is not added to database. Try later.');
      return false;
    }
  };

  isUserExists = async (email) => {
    try {
      const user = await this.database
        .collection('users')
        .where('email', '==', email)
        .get();
      await this.createUserRole(email);
      return user.docs[0].exists;
    } catch (error) {
      console.error('User is not added to database. Try later.');
      return false;
    }
  };

  createUserRole = async (email) => {
    try {
      const newRole = { role: 'USER', email };
      const newRoleAdded = await this.database.collection('roles').add(newRole);
      return newRoleAdded;
    } catch (error) {
      console.error('Can not add user role. Try later.');
      return false;
    }
  };

  getUserRole = async (email) => {
    try {
      const userRole = await this.database
        .collection('roles')
        .where('email', '==', email)
        .get();
      return userRole.docs[0].data();
    } catch (error) {
      console.error("Can't get user role. Try later.");
      return error;
    }
  };

  addNewUser = async (user) => {
    try {
      const newUser = await this.database.collection('users').add(user);
      return newUser;
    } catch (error) {
      console.error("Can't add new user. Try later.");
      return error;
    }
  };

  getUserName = async (userId) => {
    try {
      const userData = await this.database
        .collection('users')
        .doc(userId)
        .get();
      return userData.data().name;
    } catch (error) {
      console.error("Can't add new user. Try later.");
      return error;
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
      return error;
    }
  };

  getUsersData = async () => {
    try {
      const usersData = await this.database.collection('users').get();
      const allUsers = usersData.docs.map((doc) => {
        return { ...doc.data(), id: doc.id };
      });
      return allUsers;
    } catch (error) {
      console.error("Can't get users data. Try later.");
      return error;
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
    return allData.map((el, idx) => ({ ...el, ...tasksInfo[idx] }));
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
    const { id, ...updData } = newData;
    try {
      await this.database
        .collection('users')
        .doc(id)
        .set(updData, { merge: true });
    } catch (error) {
      console.error("Can't update user data. Try later.");
    }
  };

  deleteUser = async (id) => {
    try {
      await this.database
        .collection('users')
        .doc(id)
        .delete();
      const deletingProgress = await this.database
        .collection('usersProgress')
        .where('userId', '==', id)
        .get();
      const deletingUsersTasks = await this.database
        .collection('usersTasks')
        .where('userId', '==', id)
        .get();
      deletingProgress.docs.map((subtask) => this.deleteSubtask(subtask.id));
      deletingUsersTasks.docs.map((userTask) => this.deleteUserTask(userTask.id));
    } catch (error) {
      console.error("Can't delete user data. Try later.");
    }
  };

  getAllTasks = async () => {
    try {
      const tasksData = await this.database.collection('tasks').get();
      const allTasks = tasksData.docs.map((doc) => {
        return { ...doc.data(), taskId: doc.id };
      });
      return allTasks;
    } catch (error) {
      console.error("Can't load tasks data. Try later.");
      return error;
    }
  };

  addNewSubtask = async (subtask) => {
    try {
      await this.database.collection('usersProgress').add(subtask);
    } catch (error) {
      console.error("Can't add new subtasks. Try later.");
    }
  };

  deleteSubtask = async (subtaskId) => {
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
    const { taskTrackId, ...updData } = newData;
    try {
      await this.database
        .collection('usersProgress')
        .doc(taskTrackId)
        .set(updData, { merge: true });
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
      return error;
    }
  };

  addUserTask = async (userTask) => {
    const { state, ...newUserTask } = userTask;
    try {
      const task = await this.database.collection('usersTasks').add({ ...newUserTask, stateId: this.statesIds[state] });
      return task.id;
    } catch (error) {
      console.error("Can't add new user tasks. Try later.");
      return error;
    }
  };

  deleteTask = async (taskId) => {
    try {
      await this.database
        .collection('tasks')
        .doc(taskId)
        .delete();
      const deletingProgress = await this.database
        .collection('usersProgress')
        .where('taskId', '==', taskId)
        .get();
      const deletingUsersTasks = await this.database
        .collection('usersTasks')
        .where('taskId', '==', taskId)
        .get();
      deletingProgress.docs.map((subtask) => this.deleteSubtask(subtask.id));
      deletingUsersTasks.docs.map((userTask) => this.deleteUserTask(userTask.id));
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
      return error;
    }
  };

  editTask = async (newTask, assignedMembers) => {
    const { taskId, ...updData } = newTask;
    try {
      await this.database
        .collection('tasks')
        .doc(taskId)
        .set(updData, { merge: true });
      await this.updateAssignedUsers(taskId, assignedMembers, newTask);
    } catch (error) {
      console.error("Can't update task data. Try later.");
    }
  };

  updateAssignedUsers = async (taskId, assignedMembers, newTask) => {
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
      unassignedUsers.map(async (userId) => {
        const userTask = { state: 'active', taskId, userId };
        this.addUserTask(userTask);
        const { name: taskName } = newTask;
        const firstSubtask = await this.createFirstSubtask(taskName, userId, taskId);
        await this.addNewSubtask(firstSubtask);
        return userTask;
      });
      tasksToDelete.map((task) => this.deleteUserTask(task));
    } catch (error) {
      console.error("Can't update assigned users. Try later.", error);
    }
  };

  createFirstSubtask = async (taskName, userId, taskId) => {
    const userName = await this.getUserName(userId);
    const trackDate = new Date().getTime();
    const trackNote = 'Recieve new task';
    const firstSubtask = {
      userId,
      taskId,
      taskName,
      trackDate,
      trackNote,
      userName,
    };
    return firstSubtask;
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

  statesIds = {
    active: 2,
    success: 1,
    fail: 0,
  };

  onSetUserMark = async (userTaskId, state) => {
    try {
      await this.database
        .collection('usersTasks')
        .doc(userTaskId)
        .update({ stateId: this.statesIds[state] });
      return 'updated';
    } catch (error) {
      console.error("Can't set mark. Try later.");
      return error;
    }
  };
}
