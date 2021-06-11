import { useState, useContext } from "react";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import VisibilityIcon from "@material-ui/icons/Visibility";
import { makeStyles } from "@material-ui/core/styles";

import ProfileEdit from "components/user/profile-edit";

import UserProfileContext from "contexts/user-profile";

const useStyles = makeStyles(theme => ({
  profile: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
    margin: theme.spacing(2),
  },
  displayName: {
    margin: theme.spacing(1),
  },
  avatar: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
}));

export default function Profile() {
  const classes = useStyles();

  const [edit, setEdit] = useState(false);

  const user = useContext(UserProfileContext);

  return (
    <div className={classes.profile}>
      {edit ? (
        <ProfileEdit />
      ) : (
        <>
          <Avatar src={user.avatarUrl} className={classes.avatar} />
          <Typography variant="h5" className={classes.displayName}>
            {user.displayName}
          </Typography>
        </>
      )}
      <IconButton
        color="secondary"
        edge="end"
        aria-label="edit"
        onClick={() => {
          setEdit(prevVal => !prevVal);
        }}
      >
        {edit ? <VisibilityIcon /> : <EditIcon />}
      </IconButton>
    </div>
  );
}
