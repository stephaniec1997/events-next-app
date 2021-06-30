// src:  https://www.freecodecamp.org/news/how-to-add-push-notifications-to-a-web-app-with-firebase-528a702e13e1/
// https://blog.logrocket.com/push-notifications-with-react-and-firebase/
import { firebase } from "utils/firebase/config";

import { storeUserMessagingToken } from "utils/firebase";

import { MESSAGING_KEY } from "constants";

const messaging = () => {
  return firebase.messaging.isSupported() ? firebase.messaging() : null;
};
export const onMessageListener = () =>
  new Promise((resolve) => {
    messaging()?.onMessage((payload) => {
      resolve(payload);
    });
  });

export const getMessagingToken = (setTokenFound) => {
  return messaging()
    ?.getToken({ vapidKey: MESSAGING_KEY })
    .then((currentToken) => {
      if (currentToken) {
        console.log("current token for client: ", currentToken);
        setTokenFound(true);
        storeUserMessagingToken(currentToken);
      } else {
        setTokenFound(false);
        storeUserMessagingToken();
      }
    })
    .catch((err) => {
      console.log("An error occurred while retrieving token. ", err);
    });
};
