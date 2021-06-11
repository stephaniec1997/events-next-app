import { firebase } from "utils/firebase/config";

export const authenticateUser = (observer) => {
  firebase.auth().onIdTokenChanged(observer);
};

export const getCurrentUser = () => {
  return firebase.auth().currentUser;
};

export const signUpUser = (email, password) => {
  return firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((response) => {
      return response.user;
    });
};

export const signInUser = (email, password) => {
  return firebase.auth().signInWithEmailAndPassword(email, password);
};

export const signOutUser = () => {
  return firebase.auth().signOut();
};

export const updateUser = (data) => {
  const user = getCurrentUser();
  return user.updateProfile(data);
};
