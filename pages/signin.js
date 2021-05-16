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
      />
      <Form
        title={'Log In'}
        fields={[
          {label:'email', type:'text'},
          {label:'password', type:'password'},
        ]}
        buttonTitle={'Log In'}
      />
    </Container>
  );
};

export default SignIn;
