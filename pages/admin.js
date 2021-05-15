import Container from '@material-ui/core/Container';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

import AddIcon from '@material-ui/icons/Add';
import TextForm from 'components/signin/text-form';
import Events from 'components/events';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection:'column',
    marginTop: theme.spacing(2),
  },
  button: {
    marginTop: theme.spacing(2),
  },
  adminChanges: {
    display: 'flex',
    flexDirection:'row',
    justifyContent: 'center',
  },
}));

const Admin = () => {
  const classes = useStyles();

  return (
    <Container className={classes.root}>
      <Container className={classes.adminChanges}>
        <TextForm title='Add New Admin' fields={['email']} />
        <TextForm title='Remove Admin' fields={['email']} />
      </Container>
      <Divider variant="fullWidth" light/>
      <Button
        variant="contained"
        color="primary"
        className={classes.button}
      >
        {/* TODO: ONCLICK FUNCTIONALITY*/}
         <AddIcon /> New Event
      </Button>
      <Events edit />
    </Container>
  );
};

export default Admin;
