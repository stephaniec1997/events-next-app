import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';

import TextForm from 'components/signin/text-form';

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
      <TextForm title={'Sign Up'} fields={['username','email', 'password']} />
      <TextForm title={'Log In'} fields={['email', 'password']} />
    </Container>
  );
};

export default SignIn;
