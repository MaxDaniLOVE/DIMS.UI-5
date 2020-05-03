import firebase from 'firebase';
import Firebase from './Firebase';

const db = new Firebase();

export default class Authentication {
  auth = firebase.auth();

  registerNewUser = async ({ email, password }) => {
    try {
      const isUserAddedToDb = await db.isUserExists(email);
      if (isUserAddedToDb) {
        await this.auth.createUserWithEmailAndPassword(email, password);
        const userRole = await db.getUserRole(email);
        return userRole;
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  onStatusChanged = async () => {
    const isLoggedIn = await new Promise((res) => {
      this.auth.onAuthStateChanged(async (user) => {
        if (user) {
          let userRole = await db.getUserRole(user.email);
          if (userRole.role === 'USER') {
            const additionalData = await db.getUserDataByEmail(user.email);
            userRole = { ...userRole, ...additionalData };
          }
          res({
            isLoggedIn: true,
            ...userRole,
          });
        } else {
          res({
            isLoggedIn: false,
          });
        }
      });
    });
    return isLoggedIn;
  };

  login = async ({ email, password }) => {
    try {
      await this.auth.signInWithEmailAndPassword(email, password);
      const userRole = await db.getUserRole(email);
      return userRole;
    } catch (error) {
      console.error(error.message);
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
