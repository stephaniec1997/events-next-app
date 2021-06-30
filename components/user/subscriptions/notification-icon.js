import { useState } from "react";
import IconButton from "@material-ui/core/IconButton";
import NotificationsActiveIcon from "@material-ui/icons/NotificationsActive";
import NotificationsOffIcon from "@material-ui/icons/NotificationsOff";

import NotificationAlert from "components/notifications/alert";

import { useMessagingContext } from "contexts/messaging";

import { subscribeToEvent, unsubscribeToEvent } from "utils/api";

const NotificationIcon = ({ event }) => {
  const messaging = useMessagingContext();

  const [error, setError] = useState(null);
  const [notificationStatus, setNotificationStatus] = useState(
    event.notificationStatus,
  );

  const handleClick = () => {
    const newNotificationStatus = notificationStatus === "on" ? "off" : "on";
    if (messaging.isTokenFound) {
      if (newNotificationStatus === "on") {
        subscribeToEvent(event.id);
      }
      if (newNotificationStatus === "off") {
        unsubscribeToEvent(event.id);
      }
      // TODO: handle any errors
      event.notificationStatus = newNotificationStatus;
      setNotificationStatus(newNotificationStatus);
    } else {
      setError({
        title:
          "Notifications are not turned on for this browserr Or browser does not support push notifications.",
      });
      messaging.getToken();
    }
  };

  return (
    <>
      <NotificationAlert notification={error} setOpen={() => setError(null)} />
      <IconButton color="secondary" aria-label="edit" onClick={handleClick}>
        {notificationStatus === "on" ? <NotificationsActiveIcon /> : null}
        {notificationStatus === "off" || !notificationStatus ? (
          <NotificationsOffIcon />
        ) : null}
      </IconButton>
    </>
  );
};

export default NotificationIcon;
