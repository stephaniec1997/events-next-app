import React, { useState, useEffect, useContext, createContext } from "react";

import {
  getMessagingToken,
  onMessageListener,
} from "utils/firebase/push-notifications";

const MessagingContext = createContext();

export const MessagingProvider = ({ children }) => {
  const messaging = useProvideMessaging();
  return (
    <MessagingContext.Provider value={messaging}>
      {children}
    </MessagingContext.Provider>
  );
};

export const useMessagingContext = () => {
  return useContext(MessagingContext);
};

const useProvideMessaging = () => {
  const [isTokenFound, setTokenFound] = useState(false);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    getMessagingToken(setTokenFound);
    onMessageListener()
      .then((payload) => {
        setNotification({
          title: payload.notification.title,
          body: payload.notification.body,
        });
      })
      .catch(err => console.log("failed: ", err));
    // TODO:  unsubscribe?
  }, []);

  const dismissNotification = () => {
    setNotification(null);
  };

  return {
    isTokenFound,
    notification,
    dismissNotification,
  };
};
