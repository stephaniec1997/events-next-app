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

const tokensRef = db.collection("tokens");

export const storeUserMessagingToken = async (token) => {
  const user = getCurrentUser();

  await tokensRef.doc(token).set({ user: user?.uid || null }, { merge: true });

  if (user) {
    await usersRef
      .doc(user.uid)
      .set({ messagingToken: token }, { merge: true });
  }
};

// FOR MESSAGING/NOTIFICATIONS https://firebase.google.com/docs/cloud-messaging/js/topic-messaging
