import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

import UserProfile from "components/user/profile";
import EventSubcriptions from "components/user/subscriptions";

import { getEvents } from "utils/firebase/admin";

const useStyles = makeStyles(theme => ({
  root: {
    margin: theme.spacing(2),
  },
}));

export default function Profile({ user, userEvents }) {
  const classes = useStyles();

  return (
    <>
      <main className={classes.root}>
        <UserProfile
          displayName={user.displayName || user.email}
          userAvatar={user.photoURL}
        />
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
      user: userData,
      userEvents: userEvents,
    },
  };
}
