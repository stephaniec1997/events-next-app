import nookies from "nookies";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

import UserProfile from "components/user/profile";
import EventSubcriptions from "components/user/subscriptions";

import { getEvents, getUser } from "utils/firebase/admin";

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

export const getServerSideProps = async (ctx) => {
  const cookies = nookies.get(ctx);

  const userData = await getUser(cookies.token);
  const userEvents = await getEvents(); // TODO: get the correct data

  return {
    props: {
      user: {
        displayName: userData.displayName,
        email: userData.email,
        photoURL: userData.photoURL,
      },
      userEvents: userEvents,
    },
  };
};
