import firebase from 'firebase';
import initializeService from '../utils/initializeService';
import firebaseConfig from './firebase.config';
import Azure from './Azure';

const api = initializeService();
const appForRegistration = firebase.initializeApp(firebaseConfig, 'Secondary');

export default class Authentication {
  auth = firebase.auth();

  githubAuth = new firebase.auth.GithubAuthProvider();

  facebookAuth = new firebase.auth.FacebookAuthProvider().addScope('email');

  googleAuth = new firebase.auth.GoogleAuthProvider().addScope('email');

  secondaryAuthApp = appForRegistration.auth();

  registerNewUser = async (registrationData) => {
    const { email, password } = registrationData;
    try {
      const isUserAddedToDb = await api.isUserExists(email);
      if (isUserAddedToDb) {
        await this.secondaryAuthApp.createUserWithEmailAndPassword(email, password);
        await this.secondaryAuthApp.signOut();
        const sendMailApi = api instanceof Azure ? api : new Azure();
        await sendMailApi.sendMailToUser(registrationData);
      }
    } catch ({ message }) {
      throw new Error(message);
    }
  };

  onStatusChanged = async () => {
    const isLoggedIn = await new Promise((resolve, reject) => {
      const unsubscribe = this.auth.onAuthStateChanged(async (user) => {
        if (user) {
          const { email } = user.providerData[0];
          let userRole = await api.getUserRole(email);
          if (userRole.role === 'USER') {
            const additionalData = await api.getUserDataByEmail(email);
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

  changePass = async (password) => {
    const { currentUser } = this.auth;
    try {
      await currentUser.updatePassword(password);
    } catch ({ message }) {
      throw new Error(message);
    }
  };

  signInWithProvider = async (provider) => {
    try {
      await this.auth.signInWithRedirect(provider);
    } catch ({ message }) {
      throw new Error(message);
    }
  };

  loginWithGithub = async () => {
    await this.signInWithProvider(this.githubAuth);
  };

  loginWithFacebook = async () => {
    await this.signInWithProvider(this.facebookAuth);
  };

  loginWithGoogle = async () => {
    await this.signInWithProvider(this.googleAuth);
  };
}
