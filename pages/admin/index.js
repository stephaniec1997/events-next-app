import Link from 'next/link';
import Container from '@material-ui/core/Container';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

import AddIcon from '@material-ui/icons/Add';
import Form from 'components/form';
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
        <Form
          title='New Admin'
          fields={[{label: 'email', type:'text'}]}
          buttonTitle='Add New Admin'
        />
        <Form
          title='Remove Admin'
          fields={[{label: 'email', type:'text'}]}
          buttonTitle='Remove Admin'
        />
      </Container>
      <Divider variant="fullWidth" light/>
      <Link href="/admin/event/create">
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
        >
          {/* TODO: ONCLICK FUNCTIONALITY*/}
           <AddIcon /> New Event
        </Button>
      </Link>
      <Events edit />
    </Container>
  );
};

export default Admin;
