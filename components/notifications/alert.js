import { useRouter } from "next/router";
import Alert from "@material-ui/lab/Alert";
import AlertTitle from "@material-ui/lab/AlertTitle";
import Snackbar from "@material-ui/core/Snackbar";

const NotificationAlert = ({ notification, setOpen }) => {
  const router = useRouter();

  const handleClose = () => {
    setOpen(null);
  };

  return (
    <div>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={!!notification}
        onClick={() => {
          handleClose();
          router.push(notification.link);
        }}
        onClose={handleClose}
      >
        <Alert
          severity="info"
          elevation={6}
          variant="filled"
          onClose={handleClose}
        >
          <AlertTitle>{notification?.title}</AlertTitle>
          {notification?.body}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default NotificationAlert;
