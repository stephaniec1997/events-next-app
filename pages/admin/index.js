import Link from 'next/link';
import Container from '@material-ui/core/Container';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

import AddIcon from '@material-ui/icons/Add';
import Form from 'components/form';
import Events from 'components/events';

import {EVENTS} from 'helpers/mock-data';

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

const Admin = ({events}) => {
  const classes = useStyles();

  const removeAdmin = ({email}) => {
    // TODO: verify email is email b4 sending to api
    console.log('removing user as admin', email);
  };

  const addAdmin = ({email}) => {
    // TODO: verify email is email b4 sending to api
    console.log('adding user as admin', email);
  };

  return (
    <Container className={classes.root}>
      <Container className={classes.adminChanges}>
        <Form
          title='New Admin'
          fields={[{label: 'email', type:'text'}]}
          buttonTitle='Add New Admin'
          onSubmit={addAdmin}
        />
        <Form
          title='Remove Admin'
          fields={[{label: 'email', type:'text'}]}
          buttonTitle='Remove Admin'
          onSubmit={removeAdmin}
        />
      </Container>
      <Divider variant="fullWidth" light/>
      <Link href="/admin/event/create">
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
        >
           <AddIcon /> New Event
        </Button>
      </Link>
      <Events data={events} edit />
    </Container>
  );
};

export async function getServerSideProps() {
  const data = EVENTS; // TODO: Actually fetch this data

  return {
    props: {
      events: data,
    },
  };
}

export default Admin;
