import { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import { makeStyles } from "@material-ui/core/styles";

import ProfileEdit from "components/user/profile-edit";

const useStyles = makeStyles(theme => ({
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

export default function Profile({ displayName, userAvatar }) {
  const classes = useStyles();

  const [edit, setEdit] = useState(false);

  return (
    <div className={classes.profile}>
      {edit ? (
        <ProfileEdit displayName={displayName} userAvatar={userAvatar} />
      ) : (
        <>
          <Avatar src={userAvatar} />
          <Typography variant="h5" className={classes.displayName}>
            {displayName}
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
        <EditIcon />
      </IconButton>
    </div>
  );
}
