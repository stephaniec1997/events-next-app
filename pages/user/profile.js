import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import { makeStyles } from "@material-ui/core/styles";

import EventSubcriptions from "components/events/subscriptions";

import { getEvents } from "utils/firebase/admin";

const useStyles = makeStyles(theme => ({
  root: {
    margin: theme.spacing(2),
  },
  profile: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    [theme.breakpoints.up("md")]: {
      flexDirection: "row",
      alignItems: "center",
    },
  },
  displayName: {
    [theme.breakpoints.up("md")]: {
      margin: theme.spacing(1),
    },
  },
}));

export default function Profile({ displayName, userAvatar, userEvents = [] }) {
  const classes = useStyles();

  return (
    <>
      <main className={classes.root}>
        <div className={classes.profile}>
          <Avatar src={userAvatar} />
          <Typography variant="h5" className={classes.displayName}>
            {displayName}
          </Typography>
          <IconButton color="secondary" edge="end" aria-label="edit">
            <EditIcon />
          </IconButton>
        </div>
        <Typography variant="h6">Subscriptions: </Typography>
        <EventSubcriptions data={userEvents} />
      </main>
    </>
  );
}

export async function getServerSideProps() {
  // TODO: make these endpoints/functions; actually get the data
  const userData = {
    displayName: null, //"Heyyy",
    email: "testing@email.lkd",
    photoURL: null,
  };
  const userEvents = await getEvents(); // TODO: get the correct data

  return {
    props: {
      displayName: userData.displayName || userData.email,
      userAvatar: userData.photoURL,
      userEvents: userEvents,
    },
  };
}
