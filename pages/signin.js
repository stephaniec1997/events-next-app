import { useState } from 'react';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';

import Form from 'components/form';
import FormError from 'components/form/error';

import { validateForm } from 'utils';

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
  const [error, setError] = useState(null);

  const createUser = (data) =>{
    const formErrors = validateForm(data);
    if(formErrors) {
      return setError(formErrors);
    }
    console.log('adding a new user');
  };

  const login = (data) =>{
    const formErrors = validateForm(data);
    if(formErrors) {
      return setError(formErrors);
    }
    console.log('logging in user', formErrors);
  };

  return(
    <Container className={classes.root}>
      <FormError error={error} setOpen={setError}/>
      <Form
        title={'Sign Up'}
        fields={[
          { label:'username', type:'text' },
          { label:'email', type:'text' },
          { label:'password', type:'password' },
        ]}
        buttonTitle={'Create Account'}
        onSubmit={createUser}
      />
      <Form
        title={'Log In'}
        fields={[
          { label:'email', type:'text' },
          { label:'password', type:'password' },
        ]}
        buttonTitle={'Log In'}
        onSubmit={login}
      />
    </Container>
  );
};

export default SignIn;
