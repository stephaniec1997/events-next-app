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

const db = firebase.firestore();
const usersRef = db.collection("users");

export const subscribeToEvent = async (uid, eid) => {
  return await usersRef
    .doc(uid)
    .collection("subscriptions")
    .doc(eid)
    .set({ notificationStatus: "off" });
};

export const unsubscribeFromEvent = async (uid, eid) => {
  return await usersRef
    .doc(uid)
    .collection("subscriptions")
    .doc(eid)
    .delete()
    .then(() => {
      // TODO: remove notification/messaging token if it exists
    });
};

export const storeUserMessagingToken = async (uid, token) => {
  // TODO: store token in db
  // TODO: fix this
  //   return await usersRef.doc(uid).set({ messagingToken: token });
};

// FOR MESSAGING/NOTIFICATIONS https://firebase.google.com/docs/cloud-messaging/js/topic-messaging
