import nookies from "nookies";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

import UserProfile from "components/user/profile";
import EventSubcriptions from "components/user/subscriptions";

import UserModel from "models/user";

import UserProfileContext from "contexts/user-profile";

import { getEvents, getUser } from "utils/firebase/admin";

const useStyles = makeStyles(theme => ({
  root: {
    margin: theme.spacing(2),
  },
}));

export default function Profile({ user }) {
  const classes = useStyles();

  const userData = new UserModel(user);

  return (
    <UserProfileContext.Provider value={userData}>
      <main className={classes.root}>
        <UserProfile />
        <Typography variant="h6">Subscriptions: </Typography>
        <EventSubcriptions />
      </main>
    </UserProfileContext.Provider>
  );
}

export const getServerSideProps = async (ctx) => {
  const cookies = nookies.get(ctx);

  const userData = await getUser(cookies.token);
  const userEvents = await getEvents(); // TODO: get the correct data

  return {
    props: {
      user: {
        uid: userData.uid,
        displayName: userData.displayName,
        email: userData.email,
        photoURL: userData.photoURL,
        subscriptions: userEvents,
      },
    },
  };
};
