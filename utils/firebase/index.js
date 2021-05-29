import { firebase } from "utils/firebase/config";

export const authenticateUser = (observer) => {
  console.log("authenticating user");
  firebase.auth().onIdTokenChanged(observer);
};

export const getCurrentUser = () => {
  return firebase.auth().currentUser;
};

export const signUpUser = (email, password) => {
  console.log("signing up user");
  return firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((response) => {
      return response.user;
    });
};

export const signInUser = (email, password) => {
  console.log("signing in user");
  return firebase.auth().signInWithEmailAndPassword(email, password);
};

export const signOutUser = () => {
  console.log("signing out user");
  return firebase.auth().signOut();
};
