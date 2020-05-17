import firebase from 'firebase';
import { addCache } from '../utils/cache';
import initializeService from '../utils/initializeService';

const api = initializeService();

export default class Authentication {
  auth = firebase.auth();

  registerNewUser = async ({ email, password }) => {
    try {
      const isUserAddedToDb = await api.isUserExists(email);
      if (isUserAddedToDb) {
        await this.auth.createUserWithEmailAndPassword(email, password);
        const userRole = await api.getUserRole(email);
        return userRole;
      }
      return {};
    } catch (error) {
      console.error(error.message);
      return error;
    }
  };

  onStatusChanged = async () => {
    const isLoggedIn = await new Promise((resolve) => {
      this.auth.onAuthStateChanged(async (user) => {
        if (user) {
          let userRole = await api.getUserRole(user.email);
          if (userRole.role === 'USER') {
            const additionalData = await api.getUserDataByEmail(user.email);
            userRole = { ...userRole, ...additionalData };
          }
          resolve({
            isLoggedIn: true,
            ...userRole,
          });
        } else {
          resolve({
            isLoggedIn: false,
          });
        }
      });
    });

    addCache('members', []);

    return isLoggedIn;
  };

  login = async ({ email, password }) => {
    try {
      await this.auth.signInWithEmailAndPassword(email, password);
      const userRole = await api.getUserRole(email);
      return userRole;
    } catch (error) {
      console.error(error.message);
      return error;
    }
  };

  logout = async () => {
    try {
      await this.auth.signOut();
    } catch (error) {
      console.error(error.message);
    }
  };
}
