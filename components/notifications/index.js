import NotificationAlert from "components/notifications/alert";

import { useMessagingContext } from "contexts/messaging";

const Notifications = () => {
  const messaging = useMessagingContext();

  return (
    <NotificationAlert
      notification={messaging.notification}
      setOpen={messaging.dismissNotification}
    />
  );
};

export default Notifications;
