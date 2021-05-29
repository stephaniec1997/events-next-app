import Alert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";

const SuccessSnackbar = ({ message, setOpen }) => {
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Snackbar
        severity="success"
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={message}
        onClose={handleClose}
        autoHideDuration={3000}
      >
        <Alert elevation={6} variant="filled" severity="success">
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default SuccessSnackbar;
