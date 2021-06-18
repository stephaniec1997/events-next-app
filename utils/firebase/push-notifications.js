// src:  https://www.freecodecamp.org/news/how-to-add-push-notifications-to-a-web-app-with-firebase-528a702e13e1/
// https://blog.logrocket.com/push-notifications-with-react-and-firebase/
import { firebase } from "utils/firebase/config";

import { storeUserMessagingToken } from "utils/firebase";

import { MESSAGING_KEY } from "constants";

const messaging = firebase.messaging;

export const onMessageListener = () =>
  new Promise((resolve) => {
    messaging().onMessage((payload) => {
      resolve(payload);
    });
  });

export const getMessagingToken = (setTokenFound) => {
  return messaging()
    .getToken({ vapidKey: MESSAGING_KEY })
    .then((currentToken) => {
      if (currentToken) {
        console.log("current token for client: ", JSON.stringify(currentToken));
        setTokenFound(true);
        storeUserMessagingToken(JSON.stringify(currentToken));
      } else {
        setTokenFound(false);
      }
    })
    .catch((err) => {
      console.log("An error occurred while retrieving token. ", err);
    });
};
