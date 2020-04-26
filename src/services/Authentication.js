import firebase from 'firebase';

export default class Authentication {
  auth = firebase.auth();

  registerNewUser = async ({ email, password }) => {
    try {
      const newUser = await this.auth.createUserWithEmailAndPassword(email, password);
      return newUser;
    } catch (error) {
      console.error(error.message);
    }
  };

  onStatusChanged = () => {
    this.auth.onAuthStateChanged((user) => {
      if (user) {
        console.log('user logged in');
      } else {
        console.log('user logged out');
      }
    });
  };

  login = async ({ email, password }) => {
    try {
      const userData = await this.auth.signInWithEmailAndPassword(email, password);
      return userData;
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
