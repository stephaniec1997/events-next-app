import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';

import Form from 'components/form';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection:'row',
    marginTop: theme.spacing(2),
    justifyContent: 'center',
  },
}));

const SignIn = () => {
  const classes = useStyles();

  const createUser = ({email, username, password}) =>{
    // TODO: verify email is email b4 sending to api
    console.log('adding a new user',{email, username, password} );
  };

  const login = ({email, password}) =>{
    // TODO: verify email is email b4 sending to api
    console.log('logging in user',{email, password} );
  };

  return(
    <Container className={classes.root}>
      <Form
        title={'Sign Up'}
        fields={[
          {label:'username', type:'text'},
          {label:'email', type:'text'},
          {label:'password', type:'password'},
        ]}
        buttonTitle={'Create Account'}
        onSubmit={createUser}
      />
      <Form
        title={'Log In'}
        fields={[
          {label:'email', type:'text'},
          {label:'password', type:'password'},
        ]}
        buttonTitle={'Log In'}
        onSubmit={login}
      />
    </Container>
  );
};

export default SignIn;
