import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyDnppCb6XtHvk6u0lTTvxTOz9Wd9fIVQN4",
    authDomain: "crown-clothing-b36c8.firebaseapp.com",
    databaseURL: "https://crown-clothing-b36c8.firebaseio.com",
    projectId: "crown-clothing-b36c8",
    storageBucket: "crown-clothing-b36c8.appspot.com",
    messagingSenderId: "203814601537",
    appId: "1:203814601537:web:2cc7930d63155d472317c0",
    measurementId: "G-J2JFHDL0TY"
  };

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, data) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.id}`);
  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const {displayName, email} = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...data
      });
    } catch (error) {
      console.log('error creating user: ', error.message)
    }
  }

  return userRef;
}

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt: 'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
