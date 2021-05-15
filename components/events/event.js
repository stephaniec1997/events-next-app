import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: '36ch',
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  },
}));

const Event = ({event}) => {
  const classes = useStyles();

  return (
    <>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt={event.name} src="/static/images/avatar/1.jpg" />
        </ListItemAvatar>
        <ListItemText
          primary={
            <>
              <Typography
                component="span"
                variant="h5"
                className={classes.inline}
                color="textPrimary"
              >
                {event.name}
              </Typography>
              <Typography
                component="span"
                variant="body2"
                className={classes.inline}
                color="textSecondary"
              >
                {`  --- ${event.startDate}`}{event.endDate && ` - ${event.endDate}`}
              </Typography>
            </>
          }
          secondary={
            <>
              <Typography
                variant="body2"
              >
                {event.place}
              </Typography>
              <Typography
                variant="body1"
              >
                {event.description}
              </Typography>
            </>
          }
        />
      </ListItem>
      <Divider variant="inset" component="li" />
    </>
  );
};

export default Event;
