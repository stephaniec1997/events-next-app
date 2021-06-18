import { useState } from "react";
import IconButton from "@material-ui/core/IconButton";
import NotificationsActiveIcon from "@material-ui/icons/NotificationsActive";
import NotificationsOffIcon from "@material-ui/icons/NotificationsOff";

const NotificationIcon = ({ event }) => {
  const [notificationStatus, setNotificationStatus] = useState(
    event.subscriptionStatus.notificationStatus,
  );

  const handleClick = () => {
    const newNotificationStatus = notificationStatus === "on" ? "off" : "on";
    if (newNotificationStatus === "on") {
      // TODO: create token and update user subcriptions doc with notifications on and token
    }
    if (newNotificationStatus === "off") {
      // TODO: delete token and update user subcriptions doc with notifications off and token null
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
