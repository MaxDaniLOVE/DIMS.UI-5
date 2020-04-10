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
  db = firebase.firestore();

  setTestData = async () => {
    try {
      await this.db
        .collection('test')
        .doc('test')
        .set({
          test: 'test',
        });
    } catch (error) {
      throw new Error(error);
    }
  };

  getTestData = async () => {
    let testData;
    try {
      testData = await this.db
        .collection('test')
        .doc('test')
        .get();
    } catch (error) {
      throw new Error(error);
    }
    return testData.data();
  };
}
