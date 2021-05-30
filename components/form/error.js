import Alert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';

const ErrorSnackbar = ({ error, setOpen }) =>{

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Snackbar
        severity="error"
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={!!error}
        onClose={handleClose}
        autoHideDuration={6000}
      >
        <Alert elevation={6} variant="filled" severity="error">{error}</Alert>
      </Snackbar>
    </div>
  );
};

export default ErrorSnackbar;
