import firebase from 'firebase';

export default class Authentication {
  auth = firebase.auth();

  registerNewUser = async ({ email, password }) => {
    this.auth.createUserWithEmailAndPassword(email, password).catch((error) => {
      console.error(error.message);
    });
  };

  login = async ({ email, password }) => {
    try {
      const userData = await this.auth.signInWithEmailAndPassword(email, password);
      console.log(userData.user.email);
    } catch (error) {
      console.error(error.message);
    }
  };
}
