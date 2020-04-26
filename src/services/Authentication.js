import firebase from 'firebase';
import Firebase from './Firebase';

export default class Authentication extends Firebase {
  auth = firebase.auth();

  registerNewUser = async ({ email, password }) => {
    try {
      const isUserAddedToDb = await this.isUserExists(email);
      if (isUserAddedToDb) {
        await this.auth.createUserWithEmailAndPassword(email, password);
        const userRole = await this.getUserRole(email);
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
          const userRole = await this.getUserRole(user.email);
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
      const userRole = await this.getUserRole(email);
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
