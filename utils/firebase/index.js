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

/*       SUBSCRIPTION       */

export const getUsersRef = () => {
  const db = firebase.firestore();
  return db.collection("users");
};

export const subscribeToEvent = async (uid, eid) => {
  const usersRef = await getUsersRef();

  return await usersRef
    .doc(uid)
    .collection("subscriptions")
    .doc(eid)
    .set({ notificationStatus: "off" });
};

export const unsubscribeFromEvent = async (uid, eid) => {
  const usersRef = await getUsersRef();
  return await usersRef
    .doc(uid)
    .collection("subscriptions")
    .doc(eid)
    .delete()
    .then(() => {
      // TODO: remove notification/messaging token if it exists
    });
};

// FOR MESSAGING/NOTIFICATIONS https://firebase.google.com/docs/cloud-messaging/js/topic-messaging
