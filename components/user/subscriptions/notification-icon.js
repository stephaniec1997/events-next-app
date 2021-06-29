import { useState } from "react";
import IconButton from "@material-ui/core/IconButton";
import NotificationsActiveIcon from "@material-ui/icons/NotificationsActive";
import NotificationsOffIcon from "@material-ui/icons/NotificationsOff";

import { subscribeToEvent, unsubscribeToEvent } from "utils/api";

const NotificationIcon = ({ event }) => {
  const [notificationStatus, setNotificationStatus] = useState(
    event.subscriptionStatus.notificationStatus,
  );

  const handleClick = () => {
    const newNotificationStatus = notificationStatus === "on" ? "off" : "on";
    if (newNotificationStatus === "on") {
      subscribeToEvent(event.id);
    }
    if (newNotificationStatus === "off") {
      unsubscribeToEvent(event.id);
    }
    event.notificationStatus = newNotificationStatus;
    setNotificationStatus(newNotificationStatus);
  };

  return (
    <IconButton color="secondary" aria-label="edit" onClick={handleClick}>
      {notificationStatus === "on" ? <NotificationsActiveIcon /> : null}
      {notificationStatus === "off" || !notificationStatus ? (
        <NotificationsOffIcon />
      ) : null}
    </IconButton>
  );
};

export default NotificationIcon;
