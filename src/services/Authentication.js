import firebase from 'firebase';
import { addCache } from '../utils/cache';
import initializeService from '../utils/initializeService';
import firebaseConfig from './firebase.config';

const api = initializeService();
const appForRegistration = firebase.initializeApp(firebaseConfig, 'Secondary');

export default class Authentication {
  auth = firebase.auth();

  secondaryAuthApp = appForRegistration.auth();

  registerNewUser = async ({ email, password }) => {
    try {
      const isUserAddedToDb = await api.isUserExists(email);
      if (isUserAddedToDb) {
        await this.secondaryAuthApp.createUserWithEmailAndPassword(email, password);
        await this.secondaryAuthApp.signOut();
      }
    } catch ({ message }) {
      throw new Error(message);
    }
  };

  onStatusChanged = async () => {
    const isLoggedIn = await new Promise((resolve, reject) => {
      const unsubscribe = this.auth.onAuthStateChanged(async (user) => {
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
        unsubscribe();
      }, reject);
    });

    addCache('members', []);

    return isLoggedIn;
  };

  login = async ({ email, password }) => {
    try {
      await this.auth.signInWithEmailAndPassword(email, password);
    } catch (error) {
      throw new Error('Check your login and password');
    }
  };

  logout = async () => {
    try {
      await this.auth.signOut();
    } catch (error) {
      throw new Error('An error occured during logout. Try later.');
    }
  };
}
