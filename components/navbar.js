import Link from 'next/link';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import EventNoteIcon from '@material-ui/icons/EventNote';
import { makeStyles } from '@material-ui/core/styles';

import MenuButton from 'components/menu-button';
import ThemeSwitch from 'components/theme-switch';

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
  },
  titleContainer: {
    flexGrow: 1,
    display: 'flex',
    flexDirection:'row',
    alignItems: 'center',
  },
}));

const Navbar = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <MenuButton />
          <Link href="/">
            <Container className={classes.titleContainer}>
              <Typography variant="h6" >
                Events
              </Typography>
              <EventNoteIcon />
            </Container>
          </Link>
          <ThemeSwitch />
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;
