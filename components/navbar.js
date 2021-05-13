import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import EventNoteIcon from '@material-ui/icons/EventNote';
import { makeStyles } from '@material-ui/core/styles';

import ThemeSwitch from 'components/theme-switch'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  titleContainer: {
    flexGrow: 1,
    display: 'flex',
    flexDirection:'row',
    alignItems: 'center'
  },
}));

const Navbar = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Container className={classes.titleContainer}>
            <Typography variant="h6" >
              Events
            </Typography>
            <EventNoteIcon />
          </Container>
          <ThemeSwitch />
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Navbar;
